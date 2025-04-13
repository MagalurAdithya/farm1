import express from "express";
const router = express.Router();
import { auth, checkRole } from "../middleware/auth.js";
import Farm from "../models/Farm.js";
import User from "../models/User.js";
import Document from "../models/Document.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/farms",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limixt
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/my-farms", auth, async (req, res) => {
  try {
    const farms = await Farm.find({ farmer: req.user.userId });
    res.json(farms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/",
  [auth, checkRole(["farmer"]), upload.array("images", 5)],
  async (req, res) => {
    try {
      const {
        name,
        description,
        location,
        farmType,
        size,
        productionCapacity,
      } = req.body;
      const document =await Document.findOne({owner: req.user.userId })
      if (!document) {
        return res.status(400).json({ message: "upload document for verification" });
      }
      if (document.isVerified === false) {
        return res.status(400).json({ message: "Verification document not found" });
      }
      
    
      const images = req.files.map((file) => file.path);

      const farm = new Farm({
        farmer: req.user.userId,
        name,
        description,
        location,
        farmType,
        size,
        productionCapacity,
        images,
      });

      await farm.save();
      res.json(farm);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.put("/:id", [auth, checkRole(["farmer"])], async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.userId },
      req.body,
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.json(farm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
