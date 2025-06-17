import express from 'express';
import {getReviewsByBook,addReview,updateReview,deleteReview} from '../controllers/reviewController.js';
import {protect} from '../middleware/auth.js';
import {validateBody} from '../middleware/vaildator.js';

const router = express.Router({mergeParams: true});

router.route("/")
  .get(getReviewsByBook)
  .post(protect, validateBody(["rating", "comment"]), addReview);

router.route("/:reviewId")
  .put(protect, validateBody(["rating", "comment"]), updateReview)  // Remove requireAdmin
  .delete(protect, deleteReview);  // Remove requireAdmin

export default router;