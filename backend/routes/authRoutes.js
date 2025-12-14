import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import Protect from '../middleware/authProtect.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/api/auth/login');
});

router.get('/dashboard', Protect, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

export default router;