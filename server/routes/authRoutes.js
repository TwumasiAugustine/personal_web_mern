const express = require('express');
const router = express.Router();
const {SignUp, LogIn, getUserData, LogOut}= require('../controller/authController');
// SignUp route
router.post('/blog/signup', SignUp)

// LogIn route
router.post('/blog/login', LogIn)

// Get user data 
router.get('/profile', getUserData)

// Logout user

router.post('/logout', LogOut)



module.exports = router;