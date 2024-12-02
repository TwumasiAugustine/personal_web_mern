const express = require('express');
const router = express.Router();
const { SignUp, LogIn, getUserData, LogOut } = require('../controller/authController');
const authenticate = require('../middleware/authMiddleware');
// SignUp route
router.post('/blog/signup', SignUp)

// LogIn route
router.post('/blog/login', LogIn)

// Get user data 
router.get('/profile', authenticate(['user', 'admin']), getUserData)

// Logout user

router.post('/logout', LogOut)



module.exports = router;