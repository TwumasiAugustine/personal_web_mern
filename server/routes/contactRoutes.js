const express = require('express');
const router = express.Router();
const { SendMessage } = require('../controller/contactController');
router.post('/send_message', SendMessage);
module.exports = router;