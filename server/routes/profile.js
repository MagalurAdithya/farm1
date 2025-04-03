import express from "express";
const router = express.Router();
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Profile from "../models/Profile.js";
import { auth, checkRole } from "../middleware/auth.js";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './uploads/farms';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File Filter
function checkFileType(file, cb) {
  const filetypes = /.jpeg|.jpg|.png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG images are allowed!'));
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('document');


router.post("/add",[auth,checkRole(["farmer","investor"])],async(req,res) =>{
     upload(req, res, async function (err) {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                try {
                    if (!req.file) {
                        return res.status(400).json({ message: "No file uploaded" });
                    }
    
                    const { fullName, EmailAddress, PhoneNumber, Country, State, City, PostalCode, Address, DateofBirth, Gender, type, filePath, owner,title } = req.body;
                    
    
                    // if (!fullName || !EmailAddress || !PhoneNumber || !Country || !State || !City || !PostalCode || !Address || !DateofBirth || !Gender || !type ||!owner) {
                    //     return res.status(400).json({ message: "All fields are required." });
                    // }
                    const pprofile = await Profile.create({
                        fullName,
                        EmailAddress,
                        PhoneNumber,
                        Country,
                        State,
                        City,
                        PostalCode,
                        Address,
                        DateofBirth,
                        Gender,
                        title,
                        type,
                        owner: req.user.userId,
                        filePath: req.file ? req.file.path : undefined,
                    });
                    res.status(201).json({ message: "File uploaded successfully", pprofile });
           await pprofile.save();
          } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
})

router.put("/verify/:id/profile",[auth,checkRole(["admin"])],async(req,res)=>{
  try{
    const user = await Profile.findById(req.params.id)
      if(!user) return res.status(400).json({message:"no profile found"})
        if(user.isVerified === false)
          user.isVerified = true
          await user.save()
          console.log(user)
          res.status(201).json({message: "Document verified successfully"})
  }catch{
    res.status(500).json({ message: "Internal Server Error"});
  }
})

router.delete("/remove/:id/profile",[auth,checkRole(["admin"])],async(req,res)=>{
  try {

              const profile = await Profile.findById(req.params.id);
              if (!profile) {
                return res.status(404).json({ message: "No profile found" });
              }
          
              profile.isVerified = false; 
              await profile.save();
          
              res.status(200).json({ message: "Profile deleted successfully" });
            } catch (error) {
              console.error("Error rejecting profile:", error);
              res.status(500).json({ message: "Internal Server Error" });
            }
          
})

router.get("/all/profile",[auth,checkRole(["admin"])],async(req,res)=>{
  try {
            const users = await Profile.find()
              res.status(200).json(users);
            } catch (error) {
              res.status(500).json({ message: "Server error", error: error.message});
  }
})

router.get("/:id/profile",[auth,checkRole(["farmer","investor","admin"])],async(req,res)=>{

try{
  const user = await Profile.findById(req.params.id)
  if(!user){
    res.status(404).json("no user found")
  }
  res.status(200).json(user)
}catch(error){
  res.status(400).json({message:"server error"})
}

})



export default router