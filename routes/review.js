const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const Review = require('../models/review');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware');
const reviewController = require('../controllers/reviews')



router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId",isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;