import express from 'express';
import { auth } from '../middleware/auth.js'; // Now using named import
import {
  register,
  login,
  currentUser,
  logout
} from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (protected route)
router.get('/current', auth, currentUser);

// Logout user
router.post('/logout', auth, logout);

export default router;