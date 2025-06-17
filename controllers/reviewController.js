import Review from '../models/Review.js';
import Book from '../models/Book.js';

/**
 * Controller function to get reviews for a specific book.
 * Retrieves reviews from the database that match the provided book ID,
 * populates the user field with only the name, and sorts them by creation date in descending order.
 */
export async function getReviewsByBook(req, res, next) {
  try {
    // Find reviews that match the bookId from the URL parameter.
    // .populate('user', 'name') fills in the user field with user details, limiting the result to the 'name' field.
    // .sort({ createdAt: -1 }) sorts the reviews so that the most recent reviews come first.
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
      
    // Send the retrieved reviews back as a JSON response.
    res.json(reviews);
  } catch (err) {
    // If an error occurs, pass it to the Express error-handling middleware.
    next(err);
  }
}

/**
 * Controller function to add a new review for a book.
 * Creates a review document in the database for the book identified by the book ID in the URL.
 */
export async function addReview(req, res, next) {
  try {
    // Destructure rating and comment from the request body.
    const { rating, comment } = req.body;
    
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      book: req.params.bookId,
      user: req.user._id
    });
    
    if (existingReview) {
      res.status(400);
      throw new Error('You have already reviewed this book');
    }
    
    // Create a new review using the Review model.
    // The review is associated with the user (from req.user._id) and the book (from req.params.bookId).
    const review = await Review.create({
      book: req.params.bookId,
      user: req.user._id,
      rating,
      comment
    });
    
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name');
    
    // Send a 201 Created status with the newly created review in JSON format.
    res.status(201).json(populatedReview);
  } catch (err) {
    // Pass any errors to the next middleware.
    next(err);
  }
}

/**
 * Controller function to update an existing review.
 * Checks if the review exists and if the current user is authorized to modify it.
 * Then updates the review's rating and/or comment accordingly.
 */
export async function updateReview(req, res, next) {
  try {
    // Find the review by its ID provided in the URL.
    const review = await Review.findById(req.params.reviewId);
    
    // If the review doesn't exist, respond with a 404 Not Found status and throw an error.
    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }
    
    // Check if the current user is the owner of the review.
    // Compare the current user's ID (from req.user._id) with the review's user field.
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You can only edit your own reviews');
    }
    
    // Update the review:
    // The nullish coalescing operator (??) ensures that if a new rating/comment isn't provided,
    // the existing value remains unchanged.
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name');
    
    // Save the updated review document in the database.
    await review.save();
    
    // Send the updated review as a JSON response.
    res.json(updatedReview);
  } catch (err) {
    // Forward errors to the error-handling middleware.
    next(err);
  }
}

/**
 * Controller function to delete an existing review.
 * Confirms that the review exists and validates the user's authorization before deleting.
 */
export async function deleteReview(req, res, next) {
  try {
    // Locate the review by its ID from the URL parameters.
    const review = await Review.findById(req.params.reviewId);
    
    // If the review isn't found, set status to 404 Not Found and throw an error.
    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }
    
    // Verify that the review belongs to the current user.
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('You can only delete your own reviews');
    }
    
    // Remove the located review from the database.
    await Review.findByIdAndDelete(req.params.reviewId);
    
    // Respond with a 204 No Content status to indicate successful deletion.
    res.status(204).end();
  } catch (err) {
    // Pass any errors to Express's error handler.
    next(err);
  }
}