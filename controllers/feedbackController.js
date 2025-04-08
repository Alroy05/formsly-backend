import Feedback from '../models/Feedback.js';
import jwt from 'jsonwebtoken';

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const feedback = new Feedback({
      name,
      email,
      message
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const payload = {
      user: {
        id: 'admin-id',
        username: process.env.ADMIN_USERNAME,
        role: 'admin'
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'none',
      maxAge: 3600000, 
      path: '/',
    });

    res.status(200).json({ 
      success: true,
      user: {
        username: payload.user.username,
        role: payload.user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        username: req.user.username,
        role: req.user.role
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};