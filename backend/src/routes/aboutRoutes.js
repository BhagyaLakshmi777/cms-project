import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
    getAbout,
    addAbout,
    editAbout,
    removeAbout,
} from "../controllers/aboutController.js";

const router = express.Router();


router.get("/", getAbout);

router.post("/", verifyToken, addAbout);

router.put("/:id", verifyToken, editAbout);

router.delete("/:id", verifyToken, removeAbout);

export default router;