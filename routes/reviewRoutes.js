const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get("/reviews", reviewController.getReviews);

router.post("/reviews", reviewController.createReview);

router.put("/reviews/:id", reviewController.updateReview);

router.delete("/reviews/:id", reviewController.deleteReview);

router.put("/reviews/report/:id", reviewController.reportReview);
// NEW ROUTE (Report Review)


module.exports = router;