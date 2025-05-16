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

// Create a new meme
router.post('/', auth, createMeme);

// Get all memes
router.get('/', getAllMemes);

// Get a single meme
router.get('/:id', getMeme);

// Update a meme
router.put('/:id', auth, updateMeme);

// Delete a meme
router.delete('/:id', auth, deleteMeme);

// Upvote a meme
router.post('/:id/upvote', auth, upvoteMeme);

// Downvote a meme
router.post('/:id/downvote', auth, downvoteMeme);

export default router;