import express from 'express';
import { 
  submitFeedback, 
  getFeedbacks,
  adminLogin,
  checkAuth
} from '../controllers/feedbackController.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit-feedback', submitFeedback);
router.post('/admin/login', adminLogin);
router.get('/feedbacks', authenticateAdmin, getFeedbacks);
router.get('/check-auth', authenticateAdmin, checkAuth);

export default router;