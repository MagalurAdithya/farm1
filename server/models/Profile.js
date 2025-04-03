import mongoose, { model } from "mongoose";


const profile = new mongoose.Schema({
    fullName: {
        type: String,
    },
    EmailAddress: {
        type: String,
    },
    PhoneNumber: {
        type: Number,
       
    },
    Country: {
        type: String,
       
    },
    State: {
        type: String,
    
    },
    City:{
        type: String,
    
    },
    PostalCode: {
        type: Number,
        
    },
    Address: {
        type: String,
        
    },
    DateofBirth: {
        type: String,
    },
    Gender: {
        type: String,
        enum:['male','female','other'],
       
    },
  
    title: { type: String},
    type: {
        type: String,
        enum: ['farm_certificate', 'loan_agreement', 'identity_proof', 'other'],
  
      },
      filePath: {
        type: String,
      
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
        }
})
export default new mongoose.model('Profile',profile)