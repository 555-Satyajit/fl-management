// routes/forum.js
const express = require('express');
const router = express.Router();
const { ForumPost, Comment } = require('../models/forums');
const { protect } = require('../middleware/auth'); // ✅ Correct



// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Forum route is working' });
});

// Get all forum posts with pagination
router.get('/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await ForumPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name profilePicture');
    
    const total = await ForumPost.countDocuments();
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific post with comments
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('author', 'name profilePicture');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comments = await Comment.find({ postId: req.params.id })
      .sort({ createdAt: 1 })
      .populate('author', 'name profilePicture');
    
    res.json({ post, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/posts', protect, async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      
      const newPost = new ForumPost({
        title,
        content,
        author: req.user.id,
        tags: tags || []
      });
      
      const savedPost = await newPost.save();
      const populatedPost = await ForumPost.findById(savedPost._id)
        .populate('author', 'name profilePicture');
      
      res.status(201).json(populatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Add a comment to a post
router.post('/posts/:id/comments', protect, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const newComment = new Comment({
      postId: req.params.id,
      content,
      author: req.user.id
    });
    
    const savedComment = await newComment.save();
    const populatedComment = await Comment.findById(savedComment._id)
      .populate('author', 'name profilePicture');
    
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Like/unlike a post
router.put('/posts/:id/like', protect, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const userId = req.user.id;
    
    // Check if already liked
    const alreadyLiked = post.likes.some(id => id.toString() === userId);
    
    if (alreadyLiked) {
      // Unlike the post
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like the post
      post.likes.push(userId);
    }
    
    await post.save();
    res.json({ likes: post.likes.length, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;