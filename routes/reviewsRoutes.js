const express = require('express');
const reviewsController = require('../controllers/reviewsController');

const router = express.Router();

router.post('/reviews', reviewsController.addReview);
router.get('/reviews/film/:id', reviewsController.getReviewsByFilmId);

module.exports = router;
