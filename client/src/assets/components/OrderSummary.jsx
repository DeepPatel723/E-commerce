import React from 'react'
import { useCartStore } from '../stores/useCartStore';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import axiosInsatnce from '../lib/axios';

const stripePromise = loadStripe("pk_test_51QeVdfJUkK5kiAMXdaoFrJe6z3QEFnwCMjAhR8UkOx75jd4x07HcTqbSIJNodiLYkBRCaQGzvlA0h9Q2UCIk6T9U00evRhNFrG");

const OrderSummary = () => {
    const { total, subtotal, cart, coupon, isCouponApplied } = useCartStore();

    const saving = subtotal - total;
    const formattedTotal = total.toFixed(2);
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedSaving = saving.toFixed(2);

    const handlePayment = async () => {
        const stripe = await stripePromise;
        console.log(JSON.stringify(cart));
        
        const res = await axiosInsatnce.post("/payments/create-checkout-session",{
            products: cart,
            couponCode: coupon ? coupon.code : null,
        });
        
        const session = res.data;
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
			console.error("Error:", result.error);
		}
    };

  return (
    <motion.div
    className='order-sec'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>       
        <div className="sec-title">Order Summary</div>
        <div className="order-count-sec">
            <div className="order-count">
                <div className="order-detail">
                    <div className="order-detail-text">Original Price</div>
                    <div className="order-detail-counter">${formattedSubtotal}</div>
                </div>
                {saving > 0 && (
                    <div className="order-detail">
                        <div className="order-detail-text">Saving</div>
                        <div className="order-detail-counter">${formattedSaving}</div>
                    </div>
                )}
                <div className="order-detail">
                    <div className="order-detail-text">Total</div>
                    <div className="order-detail-counter">${formattedTotal}</div>
                </div>
            </div>

            <motion.button
					className='button checkout-btn'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
                    onClick={handlePayment}
				>
					Proceed to Checkout
            </motion.button>

            <div className="link-div">
                <span className="text-s">or</span>
                <Link to={'/'} className='link'>Continue Shopping <MoveRight size={16}/></Link>
            </div>
        </div>
    </motion.div>
  )
}

export default OrderSummary;
