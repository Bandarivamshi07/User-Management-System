import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ First user creation WITHOUT auth
router.post("/", createUser);

// ✅ Protected routes
router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getUsers);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getUser);
router.put("/:id", authMiddleware, roleMiddleware("admin", "user"), updateUser);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

export default router;