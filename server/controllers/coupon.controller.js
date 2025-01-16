import Coupon from "../models/coupon.model.js"

export const getCoupon = async (req, res) =>{
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
        res.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        // Validate input
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        // Find coupon in the database
        const coupon = await Coupon.findOne({ 
            code: code.trim(), 
            userId: req.user._id, 
            isActive: true 
        });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon Not Found" });
        }

        // Check if the coupon is expired
        if (coupon.expirationDate && coupon.expirationDate < new Date()) {
            coupon.isActive = false; // Mark coupon as inactive
            await coupon.save();
            return res.status(400).json({ message: "Coupon has expired" });
        }

        // Return success response
        return res.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage,
        });
    } catch (error) {
        console.error("Error in validateCoupon controller:", error);
        return res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};
