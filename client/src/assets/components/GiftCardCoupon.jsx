import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useCartStore } from '../stores/useCartStore';

const GiftCardCoupon = () => {
	const [ userInputCode, setUserInputCode ] = useState("");
	const { coupon, isCouponAppiled, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(()=>{
		getMyCoupon();
	},[getMyCoupon]);

	useEffect(()=>{
		if (coupon) setUserInputCode(coupon.code);
	},[coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) {
			return;
		}
		applyCoupon(userInputCode);
	};
	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	}
  return (
    <motion.div
			className='gift-container'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
            <div className="gift-sec">
				<div className="field gift-coupon-sec">
					<label htmlFor="voucher" className="field_label">Do you have a voucher or gift card?</label>
					<input className="field_input" id="voucher" type="text" placeholder="Enter Your Code" value={userInputCode} onChange={(e) => setUserInputCode(e.target.value )} required />
				</div>

				<motion.button
					className='button apply-coupon-btn'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					type='button'
					onClick={handleApplyCoupon}>
						Apply Coupon
				</motion.button>
			</div>
			{isCouponAppiled && coupon && (
				<div className="remove-coupon-sec">
					<h3 className='divison-title'>Applied Coupon</h3>
					<p className='text-light'>{coupon.code} - {coupon.discountPercentage}% off</p>

					<motion.button
						className='button remove-coupon-btn'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='button'
						onClick={handleRemoveCoupon}>
							Remove Coupon
					</motion.button>
				</div>
			)}

			{coupon && (
				<div className="remove-coupon-sec">
					<h3 className='divison-title'>Your Available Coupon:</h3>
					<p className='text-light'>{coupon.code} - {coupon.discountPercentage}% off</p>
				</div>
			)}
    </motion.div>
  )
}

export default GiftCardCoupon;
