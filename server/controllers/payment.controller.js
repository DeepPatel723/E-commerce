import { stripe } from "../lib/stripe";
import Coupon from "../models/coupon.model";

export const createCheckoutSession = async (req, res) => { 
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid oe empty products array"});
        }

        let totalAmount = null;

        const lineItem = products.map((product) => {
            const amount = Math.round(product.price * 619.83);
            totalAmount = amount * product.quantity;

            return{
                price_data:{
                    currency:"INR",
                    product_data:{
                        name: product.name,
                        image: [product.image],
                    },
                    unit_amount: amount,
                },
                quantity: product.quantity || 1,
            }
        });

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, isActive: true, userId: req.user._id });
            if (coupon) {
                totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items: lineItem,
            mode:"payment",
            success_url:`${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon
            ? [
                {
                    coupon: await createStripeCoupon(coupon.discountPercentage),
                },
            ] : [],
            metadata:{
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                products:JSON.stringify(
                    products.map((p)=>({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price,
                    }))
                )
            }
        });

        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id);
        }

        res.status(200).json({id: session.id, totalAmount: totalAmount / 619.83 });
    } catch (error) {
        console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
    }
};

export const checkoutSuccess = async (req, res) => {
    
}

async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });

    return coupon.id;
};

async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({userId});

    const newCoupon = new Coupon({
        code:"GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: userId,
    });

    await newCoupon.save();

    return newCoupon;
};
