import Meme from '../models/Meme.js';  // Fixed import - should be from models, not controllers

// Create a new meme
const createMeme = async (req, res) => {
  try {
    const { title, imageUrl, tags } = req.body;
    
    const meme = new Meme({
      title,
      imageUrl,
      creator: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    await meme.save();
    res.status(201).json(meme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all memes
const getAllMemes = async (req, res) => {
  try {
    const memes = await Meme.find().populate('creator', 'username').sort({ createdAt: -1 });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single meme
const getMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id).populate('creator', 'username');
    if (!meme) {
      return res.status(404).json({ error: 'Meme not found' });
    }
    res.json(meme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a meme
const updateMeme = async (req, res) => {
  try {
    const { title, tags } = req.body;
    
    const meme = await Meme.findOneAndUpdate(
      { _id: req.params.id, creator: req.user.id },
      { title, tags: tags ? tags.split(',').map(tag => tag.trim()) : [] },
      { new: true }
    );

    if (!meme) {
      return res.status(404).json({ error: 'Meme not found or unauthorized' });
    }

    res.json(meme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a meme
const deleteMeme = async (req, res) => {
  try {
    const meme = await Meme.findOneAndDelete({ _id: req.params.id, creator: req.user.id });

    if (!meme) {
      return res.status(404).json({ error: 'Meme not found or unauthorized' });
    }

    res.json({ message: 'Meme deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upvote a meme
const upvoteMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) {
      return res.status(404).json({ error: 'Meme not found' });
    }

    // Check if user already upvoted
    if (meme.upvotes.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already upvoted' });
    }

    // Remove from downvotes if exists
    meme.downvotes = meme.downvotes.filter(
      userId => userId.toString() !== req.user.id.toString()
    );

    // Add to upvotes
    meme.upvotes.push(req.user.id);
    await meme.save();

    res.json(meme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Downvote a meme
const downvoteMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) {
      return res.status(404).json({ error: 'Meme not found' });
    }

    // Check if user already downvoted
    if (meme.downvotes.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already downvoted' });
    }

    // Remove from upvotes if exists
    meme.upvotes = meme.upvotes.filter(
      userId => userId.toString() !== req.user.id.toString()
    );

    // Add to downvotes
    meme.downvotes.push(req.user.id);
    await meme.save();

    res.json(meme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createMeme,
  getAllMemes,
  getMeme,
  updateMeme,
  deleteMeme,
  upvoteMeme,
  downvoteMeme
};