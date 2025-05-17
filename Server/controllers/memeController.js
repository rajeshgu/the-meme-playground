import Meme from '../models/Meme.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary (recommended for production)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('image');

// Create a new meme with image upload
const createMeme = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { title, topText, bottomText, font, fontSize, textColor, tags } = req.body;
      const userId = req.user._id;

      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      // Upload to Cloudinary (or use local path for development)
      let imageUrl;
      if (process.env.NODE_ENV === 'production') {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
        // Remove temp file
        fs.unlinkSync(req.file.path);
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const newMeme = new Meme({
        title,
        imageUrl,
        topText,
        bottomText,
        font,
        fontSize,
        textColor,
        tags: tags.split(',').map(tag => tag.trim()),
        creator: userId,
        upvotes: [],
        downvotes: []
      });

      await newMeme.save();

      res.status(201).json(newMeme);
    } catch (error) {
      console.error('Error creating meme:', error);
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ error: 'Failed to create meme' });
    }
  });
};

// Get all memes with pagination
const getAllMemes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const memes = await Meme.find()
      .populate('creator', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalMemes = await Meme.countDocuments();

    res.json({
      memes,
      currentPage: page,
      totalPages: Math.ceil(totalMemes / limit),
      totalMemes
    });
  } catch (error) {
    console.error('Error fetching memes:', error);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
};

// Get a single meme
const getMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id)
      .populate('creator', 'username avatar')
      .populate('upvotes', 'username')
      .populate('downvotes', 'username');

    if (!meme) {
      return res.status(404).json({ error: 'Meme not found' });
    }

    // Increment view count (optional)
    meme.views = (meme.views || 0) + 1;
    await meme.save();

    res.json(meme);
  } catch (error) {
    console.error('Error fetching meme:', error);
    res.status(500).json({ error: 'Failed to fetch meme' });
  }
};

// Update a meme (text only)
const updateMeme = async (req, res) => {
  try {
    const { title, topText, bottomText, font, fontSize, textColor, tags } = req.body;

    const meme = await Meme.findOneAndUpdate(
      { _id: req.params.id, creator: req.user._id },
      {
        title,
        topText,
        bottomText,
        font,
        fontSize,
        textColor,
        tags: tags.split(',').map(tag => tag.trim())
      },
      { new: true }
    ).populate('creator', 'username');

    if (!meme) {
      return res.status(404).json({ error: 'Meme not found or unauthorized' });
    }

    res.json(meme);
  } catch (error) {
    console.error('Error updating meme:', error);
    res.status(500).json({ error: 'Failed to update meme' });
  }
};

// Delete a meme
const deleteMeme = async (req, res) => {
  try {
    const meme = await Meme.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!meme) {
      return res.status(404).json({ error: 'Meme not found or unauthorized' });
    }

    // Delete image from storage (optional)
    if (meme.imageUrl.includes('cloudinary')) {
      const publicId = meme.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    } else if (process.env.NODE_ENV === 'production') {
      const filePath = path.join(__dirname, '..', meme.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Meme deleted successfully' });
  } catch (error) {
    console.error('Error deleting meme:', error);
    res.status(500).json({ error: 'Failed to delete meme' });
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
    const alreadyUpvoted = meme.upvotes.includes(req.user._id);
    if (alreadyUpvoted) {
      // Remove upvote
      meme.upvotes = meme.upvotes.filter(
        userId => userId.toString() !== req.user._id.toString()
      );
    } else {
      // Remove from downvotes if exists
      meme.downvotes = meme.downvotes.filter(
        userId => userId.toString() !== req.user._id.toString()
      );
      // Add to upvotes
      meme.upvotes.push(req.user._id);
    }

    await meme.save();
    res.json(meme);
  } catch (error) {
    console.error('Error upvoting meme:', error);
    res.status(500).json({ error: 'Failed to upvote meme' });
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
    const alreadyDownvoted = meme.downvotes.includes(req.user._id);
    if (alreadyDownvoted) {
      // Remove downvote
      meme.downvotes = meme.downvotes.filter(
        userId => userId.toString() !== req.user._id.toString()
      );
    } else {
      // Remove from upvotes if exists
      meme.upvotes = meme.upvotes.filter(
        userId => userId.toString() !== req.user._id.toString()
      );
      // Add to downvotes
      meme.downvotes.push(req.user._id);
    }

    await meme.save();
    res.json(meme);
  } catch (error) {
    console.error('Error downvoting meme:', error);
    res.status(500).json({ error: 'Failed to downvote meme' });
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