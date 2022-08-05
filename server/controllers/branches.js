import express from 'express';
import mongoose from 'mongoose';

import BranchMessage from '../models/branchMessage.js';

const router = express.Router();

export const getBranches = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await BranchMessage.countDocuments({});
        const branches = await BranchMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: branches, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const likeBranch = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No branch with id: ${id}`);
    
    const branch = await BranchMessage.findById(id);

    const index = branch.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      branch.likes.push(req.userId);
    } else {
      branch.likes = branch.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await BranchMessage.findByIdAndUpdate(id, branch, { new: true });

    res.status(200).json(updatedPost);
}

export const getBranchesBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const branchName = new RegExp(searchQuery, "i");

        const branches = await BranchMessage.find({ $or: [ { branchName }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: branches });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getBranch = async (req, res) => { 
    const { id } = req.params;

    try {
        const branch = await BranchMessage.findById(id);
        
        res.status(200).json(branch);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBranch = async (req, res) => {
    const branch = req.body;

    const newBranchMessage = new BranchMessage({ ...branch, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newBranchMessage.save();

        res.status(201).json(newBranchMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBranch = async (req, res) => {
    const { id } = req.params;
    const { branchName, branchAddress, branchManager, numberOfEmployees, branchRating } = req.body;    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No branch with id: ${id}`);

    const updatedBranch = {  branchName, branchAddress, branchManager, numberOfEmployees, branchRating, _id: id };

    await BranchMessage.findByIdAndUpdate(id, updatedBranch, { new: true });

    res.json(updatedBranch);
}

export const getAllBranches = async (req,res) => {

    try {
        const branch = await BranchMessage.find();
        res.status(200).json(branch);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
 