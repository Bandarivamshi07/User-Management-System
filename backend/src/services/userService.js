import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

// CREATE USER
export const createUserService = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

// GET ALL USERS
export const getUsersService = async () => {
  return await User.find().select("-password");
};

// GET SINGLE USER
export const getUserService = async (id) => {
  return await User.findById(id).select("-password");
};

// UPDATE USER
export const updateUserService = async (id, updates) => {
  if (updates.password) {
    updates.password = await hashPassword(updates.password);
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
  }).select("-password");

  return user;
};

// DELETE USER
export const deleteUserService = async (id) => {
  await User.findByIdAndDelete(id);
  return { message: "User deleted successfully" };
};