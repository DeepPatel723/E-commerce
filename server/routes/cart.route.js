import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { addToCart, getCartProducts, removeAllProduct, updateQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllProduct);
router.put("/:id", protectRoute, updateQuantity);

export default router;