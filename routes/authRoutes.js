import express from "express"
import {registerUser,loginUser, getProfile} from "../controllers/authController.js"
import {protect} from "../middleware/auth.js"
import { validateBody } from "../middleware/vaildator.js"

const router = express.Router();

router.post("/register", validateBody(["name","email","password"]), registerUser);
router.post("/login", validateBody(["email","password"]), loginUser);
router.get("/profile", protect,getProfile);

export default router;