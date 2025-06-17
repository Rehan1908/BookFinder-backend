import User from '../models/User.js';
import Book from '../models/Book.js';
import Review from '../models/Review.js';

export async function getAdminStats(req, res, next) {
  try {
    const [totalBooks, totalUsers, totalReviews, recentBooks] = await Promise.all([
      Book.countDocuments(),
      User.countDocuments(),
      Review.countDocuments(),
      Book.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Calculate average rating
    const avgRatingResult = await Review.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const averageRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;

    res.json({
      totalBooks,
      totalUsers,
      totalReviews,
      averageRating,
      recentBooks
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Don't allow deleting the last admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        res.status(400);
        throw new Error('Cannot delete the last admin user');
      }
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function getAllReviews(req, res, next) {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('book', 'title')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}