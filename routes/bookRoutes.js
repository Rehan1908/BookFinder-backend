import express from "express"
import {
  getBookById,
  getBooks,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js"
import {protect, requireAdmin} from "../middleware/auth.js"
import {validateBody} from "../middleware/vaildator.js"
import reviewRoutes from "./reviewRoutes.js"


const router = express.Router()

// Nested route for reviews
router.use("/:bookId/reviews", reviewRoutes)

router.route("/")
  .get(getBooks)
  .post(protect, requireAdmin, validateBody(["title", "author"]), createBook)

router.route("/:id")
  .get(getBookById)
  .patch(protect, requireAdmin, updateBook)
  .delete(protect, requireAdmin, deleteBook)

export default router