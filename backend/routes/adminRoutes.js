import express from 'express';
import Protect from '../middleware/authProtect.js';
import adminOnly from '../middleware/adminValidate.js';
const router = express.Router();

router.get('/', Protect, adminOnly, (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});

export default router;
