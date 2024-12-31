const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { protect, admin } = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Generate verification token
    const verificationToken = user.createVerificationToken();
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // Create token for user session
    const token = createToken(user._id);

    res.status(201).json({
      message: 'Registration successful! Please check your email for verification.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = createToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Email verification
router.get('/verify-email/:token', async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Request password reset
router.post('/reset-password-request', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({
      message: 'Password reset email sent successfully.',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile (protected route)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationTokenExpires')
      .populate('connectedFarms'); // If you have farm references

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileData: user.profileData || {},
        connectedFarms: user.connectedFarms || [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Add any other fields you want to return
        address: user.address,
        phoneNumber: user.phoneNumber,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update user profile (protected route)
router.put('/profile', protect, async (req, res) => {
  try {
    const {
      name,
      email,
      profileData,
      address,
      phoneNumber,
      preferences
    } = req.body;

    // Check if email is being changed and if it already exists
    if (email && email !== req.user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    const updatedFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(profileData && { profileData }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
      ...(preferences && { preferences })
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationTokenExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profileData: user.profileData,
        connectedFarms: user.connectedFarms,
        address: user.address,
        phoneNumber: user.phoneNumber,
        preferences: user.preferences,
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
module.exports = router;