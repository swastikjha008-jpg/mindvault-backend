import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { connectDB } from "./db";
import { authMiddleware, AuthedRequest } from "./middlewares";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

// --------------------
// Schemas / Models
// --------------------
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const brainShareSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    shareId: { type: String, unique: true, sparse: true },
    isShared: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
const BrainShare =
  mongoose.models.BrainShare || mongoose.model("BrainShare", brainShareSchema);

// --------------------
// Routes
// --------------------
app.get("/", (_req, res) => {
  res.json({ message: "MindVault API is running" });
});

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is missing" });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      secret,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post(
  "/api/v1/brain/share",
  authMiddleware,
  async (req: AuthedRequest, res) => {
    try {
      const { share } = req.body;

      if (typeof share !== "boolean") {
        return res.status(400).json({ message: "`share` must be a boolean" });
      }

      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let brainShare = await BrainShare.findOne({ userId });

      if (!brainShare) {
        brainShare = await BrainShare.create({
          userId,
          isShared: false
        });
      }

      if (share) {
        if (!brainShare.shareId) {
          brainShare.shareId = crypto.randomBytes(12).toString("hex");
        }
        brainShare.isShared = true;
      } else {
        brainShare.isShared = false;
      }

      await brainShare.save();

      const baseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
      const shareUrl = brainShare.isShared
        ? `${baseUrl}/brain/${brainShare.shareId}`
        : null;

      return res.status(200).json({
        message: brainShare.isShared ? "Sharing enabled" : "Sharing disabled",
        share: brainShare.isShared,
        shareUrl
      });
    } catch (error) {
      console.error("Share error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});