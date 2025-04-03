// import mongoose from "mongoose";

// const farmsSchema = new mongoose.Schema({
//     farmer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//       location: {
//         type: String,
//         required: true,
//       },
//       farmType: {
//         type: String,
//         required: true,
//       },
//       size: {
//         type: Number,
//         required: true,
//       },
//       productionCapacity: {
//         type: String,
//         required: true,
//       },
//       images: [{
//         type: String,
//       }],
//       status: {
//         type: String,
//         enum: ['active', 'funded', 'completed'],
//         default: 'active',
//     },
//     title: {
//         type: String,
//         required: true
//       },
//       type: {
//         type: String,
//         enum: ['farm_certificate', 'loan_agreement', 'identity_proof', 'other'],
//         required: true
//       },
//       filePath: {
//         type: String,
//         required: true
//       },
//       owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//       },
//       relatedTo: {
//         model: {
//           type: String,
//           enum: ['Farm', 'Loan', 'User']
//         },
//         id: mongoose.Schema.Types.ObjectId
//       },
//       uploadedAt: {
//         type: Date,
//         default: Date.now
//       }
// })

// export default mongoose.model('Myfarm', farmsSchema); 
