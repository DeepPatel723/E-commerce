import React from 'react'
import { motion } from "framer-motion";

const GiftCardCoupon = () => {
  return (
    <motion.div
			className='gift-container'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
            
    </motion.div>
  )
}

export default GiftCardCoupon;
