import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUsersByQuery,
  updateSocialLinks,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id/friends', verifyToken, getUserFriends);
router.get('/search', verifyToken, getUsersByQuery);
router.get('/:id', verifyToken, getUser);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);
router.patch('/:id/socialLinks', verifyToken, updateSocialLinks);

export default router;
