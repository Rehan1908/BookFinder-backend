import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { validateBody } from '../middleware/vaildator.js';

const router = express.Router();

router.post('/register', validateBody(['name', 'email', 'password']), registerUser);
router.post('/login', validateBody(['email', 'password']), loginUser);
router.post('/logout', logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;