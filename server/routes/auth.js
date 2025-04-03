import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { sendEmail } from '../utils/email.js'
import User from "../models/User.js";  

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profilepic");  
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, Date.now() + fileExtension);  
  },
});

const upload = multer({ storage });


router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
  
    console.log("File uploaded: ", req.file);
    
    const { email, password, role, firstName, lastName } = req.body;
    const profilePic = req.file ? req.file.path : "";  

   
    console.log("Profile picture path: ", profilePic);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      profilePic,  
    });

    await user.save();
    await sendEmail(
      email,
      "Farm IT - Registration Successful",
      `<p><strong>Dear ${firstName},</strong></p>
      <p>Your account has been successfully registered.</p>
      <p><strong>Admin verification takes 2 days.</strong> Once verified, you will receive another email notification, and then you can log in.</p>
      <p>Thank you for your patience.</p>
      <p><strong>Best Regards,</strong><br>Farm IT Team</p>`
    );

    res.json({ message: "Registration successful", user });
    console.log(sendEmail)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (["farmer", "investor"].includes(user.role) && user.isVerified === false) {
      return res.status(400).json({ message: "Admin has to verify your account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
   

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;