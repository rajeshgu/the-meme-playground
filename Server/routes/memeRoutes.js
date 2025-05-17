import express from 'express';
import {
  createMeme,
  getAllMemes,
  getMeme,
  updateMeme,
  deleteMeme,
  upvoteMeme,
  downvoteMeme
} from '../controllers/memeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a meme (auth required)
router.post('/', auth, createMeme);

// Get all memes (public)
router.get('/', getAllMemes);

// Get single meme (public)
router.get('/:id', getMeme);

// Update meme (auth required, creator only)
router.put('/:id', auth, updateMeme);

// Delete meme (auth required, creator only)
router.delete('/:id', auth, deleteMeme);

// Upvote meme (auth required)
router.post('/:id/upvote', auth, upvoteMeme);

// Downvote meme (auth required)
router.post('/:id/downvote', auth, downvoteMeme);

export default router;