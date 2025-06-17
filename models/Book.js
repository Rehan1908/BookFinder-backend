import mongoose from "mongoose";
import slugify from "slugify";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: String,
    author: {
      type: String,
      required: [true, "Please add an author"],
      trim: true,
      maxlength: [100, "Author cannot be more than 100 characters"],
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [2000, "Summary cannot be more than 2000 characters"],
    },
    genre: {
      type: String,
      trim: true,
      maxlength: [50, "Genre cannot be more than 50 characters"],
    },
    coverURL: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
bookSchema.index({ title: "text", author: "text", genre: "text" });
bookSchema.index({ genre: 1 });
bookSchema.index({ featured: 1 });

// Create slug before saving
bookSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Book = mongoose.model("Book", bookSchema);

export default Book;