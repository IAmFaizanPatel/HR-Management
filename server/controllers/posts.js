import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import BranchMessage from '../models/branchMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const fullName = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({ $or: [ { fullName }, { tags: { $in: tags.split(',') } }]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPostMessage.save();
        const branch = await BranchMessage.findOne({branchName: newPostMessage.branch}) 
        const index = branch.employees.findIndex((id) => id ===String(newPostMessage._id));

        if (index === -1) {
            await branch.employees.push(newPostMessage);
        }      

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePostTimeSheets = async (req, res) => {
    console.log( req.body, 'called' );

    const { id } = req.params;
    const { profilePic, fullName, gender, IdNumber, phoneNumber, nextOfKin, address, dob, qualifications, currency, monthlySalary,
         advanceSalary, allowances, leaveDays, category, employer, expiry, contracts, policeClearance, department, branch, 
         designation, notes, timeSheets, status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { profilePic, fullName, gender, IdNumber, phoneNumber, nextOfKin, address, dob, qualifications, currency, monthlySalary,
         advanceSalary, allowances, leaveDays, category, employer, expiry, contracts, policeClearance, department, branch, 
         designation, notes, timeSheets, status, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const {profilePic, fullName, gender, IdNumber, phoneNumber, nextOfKin, address, dob, qualifications, currency, monthlySalary,
         advanceSalary, allowances, leaveDays, category, employer, expiry, contracts, policeClearance, department, branch, 
         designation, notes, timeSheets, status } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const oldPost = await PostMessage.findOne({ _id: id })
    const oldBranch = await BranchMessage.findOne({branchName: oldPost.branch}) 
    
    const updatedPost = { profilePic, fullName, gender, IdNumber, phoneNumber, nextOfKin, address, dob, qualifications, currency, monthlySalary,
         advanceSalary, allowances, leaveDays, category, employer, expiry, contracts, policeClearance, department, branch, 
         designation, notes, timeSheets, status, _id: id };

    const newBranch = await BranchMessage.findOne({branchName: branch}) 

    if(oldBranch === null){
        const index = newBranch.employees.findIndex((id) => id._id ===String(id));
        if (index === -1) {
            newBranch.employees.push(updatedPost);
        }
        await BranchMessage.findByIdAndUpdate(newBranch._id, newBranch, { new: true });

    } else if(newBranch === null){
        if(oldBranch.employees !== null ){
            oldBranch.employees = oldBranch.employees.filter((employee) => employee._id !== String(updatedPost._id));
        } 
        await BranchMessage.findByIdAndUpdate(oldBranch._id, oldBranch, { new: true });

    } else{
        if(newBranch._id !== oldBranch._id){
            if(newBranch.employees !== null ){
                const index = newBranch.employees.findIndex((id) => id._id ===String(id));
                if (index === -1) {
                    newBranch.employees.push(updatedPost);
                    if(oldBranch.employees !== null ){
                        oldBranch.employees = oldBranch.employees.filter((employee) => employee._id !== String(updatedPost._id));
                    } 
            }
        }

            await BranchMessage.findByIdAndUpdate(oldBranch._id, oldBranch, { new: true });

            await BranchMessage.findByIdAndUpdate(newBranch._id, newBranch, { new: true });
        }
    }





    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//       }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id ===String(req.userId));

//     if (index === -1) {
//       post.likes.push(req.userId);
//     } else {
//       post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.status(200).json(updatedPost);
// }

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export const getAllEmployees = async (req,res) => {

    try {
        const employees = await PostMessage.find();

        res.status(200).json(employees);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

// export const countEmployees = async (req,res) => {

//     try {
//         const total = await PostMessage.countDocuments();
//         const males = await PostMessage.countDocuments( { gender: 'male' } );
//         console.log('total ', total,' males ', males);
//         res.status(200).json(total);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }

// }



export default router;