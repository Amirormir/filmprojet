const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/users', usersController.createUser);
router.get('/users/:email', usersController.getUserByEmail);

module.exports = router;
