import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, commentPost, deletePost, getAllEmployees, updatePostTimeSheets } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/all', getAllEmployees)
// router.get('/count', countEmployees)
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.patch('/timeSheets/:id', auth, updatePostTimeSheets);
router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router;