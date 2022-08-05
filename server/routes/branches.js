import express from 'express';
import { createBranch, updateBranch, getBranchesBySearch, getBranches, getBranch, getAllBranches, likeBranch } from '../controllers/branches.js';
const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getBranchesBySearch);
router.get('/', getBranches);
router.get('/all', getAllBranches)
router.get('/:id', getBranch);
router.post('/', auth,  createBranch);
router.patch('/:id', auth, updateBranch);
router.patch('/:id/likeBranch', auth, likeBranch);


export default router;