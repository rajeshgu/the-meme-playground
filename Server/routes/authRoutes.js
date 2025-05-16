import express from 'express';
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

// Get current user
router.get('/current', currentUser);

// Logout user
router.post('/logout', logout);

export default router;