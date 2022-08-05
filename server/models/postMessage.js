import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    profilePic: String,  
    fullName: String,
    gender: String,
    IdNumber: String,
    phoneNumber: String,
    nextOfKin: String,
    address: String,
    dob: Date,
    qualifications: [String],  

    currency: String,
    monthlySalary: String,
    advanceSalary: String,
    allowances: [String],
    leaveDays: [String],

    category: String,
    employer: String,
    start: Date,
    expiry: Date,
    contracts: [String],  
    policeClearance: [String],  
    department: String,
    branch: String,
    designation: String,
    contractType: String,
    notes: String,

    timeSheets: [{}],

    status: String,
    
    createdAt: {
        type: Date,
        default: new Date(),
    },

})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;