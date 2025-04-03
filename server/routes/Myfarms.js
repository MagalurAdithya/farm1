// import express from 'express'
// const route = express.Router()
// import { auth,checkRole } from '../middleware/auth.js'
// import Myfarms from '../models/Myfarms.js'
// import multer from "multer"
// import path from "path"
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//   destination: "./uploads/myfarms",
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 }, // 10MB limixt
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Invalid file!");
//   }
// }


// // route.post("/",[auth,checkRole(["farmer","investor"]),upload.array("images",5),upload.single("file")],
// // async (req,res)=>{
// //     try{
// //         const{
// //             name,
// //             description,
// //             location,
// //             farmType,
// //             size,
// //             productionCapacity,  
// //             title,
// //             type,
// //             filePath: req.file.path,
// //             owner: req.user.userId,
// //             relatedTo: {
// //               model: relatedModel,
// //               id: relatedId,
// //             }
// //         }
// //     }
// // }


// // )

// route.post(
//     '/',
//     [
//       auth,
//       checkRole(['farmer', 'investor']),
//       upload.fields([
//         { name: 'images', maxCount: 5 },
//         { name: 'file', maxCount: 1 },
//       ]),
//     ],
//     async (req, res) => {
//       try {
//         const {
//           name,
//           description,
//           location,
//           farmType,
//           size,
//           productionCapacity,
//           title,
//           type,
//           owner,
//           relatedTo,
//         } = req.body;
  
//         // Handling file uploads
//         const images = req.files?.images?.map((file) => file.path) || [];
//         const filePath = req.files?.file ? req.files.file[0].path : null;
  
//         const newFarm = new Myfarms({
//           name,
//           description,
//           location,
//           farmType,
//           size,
//           productionCapacity,
//           title,
//           type,
//           filePath,
//           owner: req.user.userId,
//           relatedTo: {
//             model: relatedTo?.model || null,
//             id: relatedTo?.id || null,
//           },
//           images,
//         });
  
//         await newFarm.save();
//         res.status(201).json({ success: true, message: 'Farm created successfully', data: newFarm });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server Error', error: error.message });
//       }
//     }
//   );