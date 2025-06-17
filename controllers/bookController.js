import Book from '../models/Book.js';
import Review from '../models/Review.js';

export async function getBooks(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { genre: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);
    const pages = Math.ceil(total / limit);

    // Calculate ratings for each book
    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book: book._id });
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
          : 0;
        
        return {
          ...book.toObject(),
          avgRating: Math.round(avgRating * 10) / 10,
          numReviews: reviews.length
        };
      })
    );

    res.json({
      books: booksWithRatings,
      page,
      pages,
      total,
      limit
    });
  } catch (err) {
    next(err);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Get reviews and calculate ratings
    const reviews = await Review.find({ book: book._id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    const bookWithRatings = {
      ...book.toObject(),
      avgRating: Math.round(avgRating * 10) / 10,
      numReviews: reviews.length,
      reviews
    };

    res.json(bookWithRatings);
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Delete all reviews for this book
    await Review.deleteMany({ book: req.params.id });
    
    // Delete the book
    await Book.findByIdAndDelete(req.params.id);
    
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function getTopRatedBooks(req, res, next) {
  try {
    const books = await Review.aggregate([
      {
        $group: {
          _id: '$book',
          avgRating: { $avg: '$rating' },
          numReviews: { $sum: 1 }
        }
      },
      { $sort: { avgRating: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book'
        }
      },
      { $unwind: '$book' }
    ]);
    res.json(
      books.map(b => ({
        ...b.book,
        avgRating: b.avgRating,
        numReviews: b.numReviews
      }))
    );
  } catch (err) {
    next(err);
  }
}