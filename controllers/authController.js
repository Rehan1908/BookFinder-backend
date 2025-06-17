import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

export async function registerUser (req,res,next) {
try {
  const {name, email, password} = req.body;
  const existing = await User.findOne({email});
  if (existing) {
    res.status (400);
    throw new Error ("Email is Already Registered")
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashed,
  })
const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
res.status(201).json({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  token,
});

} catch (error) {
  next(error)
}
}

export async function loginUser (req,res,next) {
try {
  const {email, password} = req.body;
 const user = await User.findOne({email}).select("+password");
 if (!user) {
  res.status(401);
  throw new Error ("Invalid Credentials")
 }
 const match = await bcrypt.compare(password, user.password);
 if (!match) {
  res.status(401);
  throw new Error ("Invalid Credentials")
 }

const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
res.status(201).json({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  token,
});

} catch (error) {
  next(error)
}
}

export function getProfile(req,res) {
  res.json ({id:
    req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  })
}