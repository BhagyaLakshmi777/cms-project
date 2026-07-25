import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getServices,  addService, editService, removeService } from "../controllers/serviceController.js";

const router = express.Router();



router.get("/", getServices);

router.post("/", verifyToken, addService);

router.put("/:id", verifyToken, editService);

router.delete("/:id", verifyToken, removeService);

export default router;