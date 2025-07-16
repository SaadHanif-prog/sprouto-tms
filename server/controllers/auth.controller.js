import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Helper
const isProduction = process.env.NODE_ENV === "production";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Reusable cookie setter
const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = createToken(newUser._id);
    setAuthCookie(res, token);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user._id);
    setAuthCookie(res, token);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
      });
      return res
        .status(401)
        .json({ message: "Invalid token - user not found" });
    }

    res.json({
      isAuthenticated: true,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(401).json({ message: "Invalid token" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.json({ message: "Logout successful" });
};

export default {
  signup,
  login,
  checkAuth,
  logout,
};
