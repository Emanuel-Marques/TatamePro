import express from 'express';
const router = express.Router();
import { login } from './login.controller.js';
import { authMiddleware } from '../middlewares/index.js';

router.post('/login', login);
router.get('/verifyToken', authMiddleware, (req, res) => {
  return res.json({ valid: true });
});

export default router;