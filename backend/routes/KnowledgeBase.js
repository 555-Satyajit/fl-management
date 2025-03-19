// routes/knowledgeBase.js
const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../controllers/knowledgeBaseController');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/tip', knowledgeBaseController.getDailyTip);
router.get('/myths', knowledgeBaseController.getMyths);
router.get('/facts', knowledgeBaseController.getFacts);
router.get('/farmer-spotlight', knowledgeBaseController.getFarmerSpotlight);
router.get('/success-stories', knowledgeBaseController.getSuccessStories);

// Admin routes - protected
router.post('/', protect, restrictTo('admin'), knowledgeBaseController.createKnowledgeItem);
router.put('/:id', protect, restrictTo('admin'), knowledgeBaseController.updateKnowledgeItem);
router.delete('/:id', protect, restrictTo('admin'), knowledgeBaseController.deleteKnowledgeItem);

module.exports = router;