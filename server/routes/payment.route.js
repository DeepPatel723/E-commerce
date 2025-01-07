import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-chechout-session", protectRoute, createCheckoutSession);
router.post("/chechout-success", protectRoute, checkoutSuccess);

export default router;