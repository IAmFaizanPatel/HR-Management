import mongoose from 'mongoose';

const branchSchema = mongoose.Schema({
    branchName: String,  
    branchAddress: String,
    branchManager: String,
    numberOfEmployees: String,
    designations: [String],
    branchRating: String,
    employees: [{}],
    })

var BranchMessage = mongoose.model('BranchMessage', branchSchema);

export default BranchMessage;