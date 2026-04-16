import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";


// 🔥 REGISTER USER
export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user", // default role
    status: "active",
  });

  return {
    token: generateToken(user),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


// 🔥 LOGIN USER
export const loginUser = async (email, password) => {
  // ✅ Validate input
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email });

  // ✅ User not found
  if (!user) {
    throw new Error("User not found");
  }

  // ✅ Check status
  if (user.status === "inactive") {
    throw new Error("User inactive");
  }

  // ✅ Compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // ✅ Generate token
  const token = generateToken(user);

  // ✅ Return safe user data
  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};