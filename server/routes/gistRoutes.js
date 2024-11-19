import express from 'express';
import { exportGist } from '../controllers/gistController.js'; // Import controller
import { protect } from '../middleware/authMiddleware.js'; // Import authentication middleware

const router = express.Router();

// Export Gist Route
router.route('/export')
  .post(protect, exportGist); // Protect route with authentication middleware

export default router;
