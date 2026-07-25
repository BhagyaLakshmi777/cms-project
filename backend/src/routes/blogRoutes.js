import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
    getBlogs,
    addBlog,
    editBlog,
    removeBlog,
} from "../controllers/blogController.js";

const router = express.Router();


router.get("/", getBlogs);

router.post("/", verifyToken, addBlog);

router.put("/:id", verifyToken, editBlog);

router.delete("/:id", verifyToken, removeBlog);

export default router;
