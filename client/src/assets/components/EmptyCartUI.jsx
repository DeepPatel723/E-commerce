import React from 'react'
import { motion } from "framer-motion";
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCartUI = () => {
  return (
    <motion.div
        className='container'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
      <ShoppingCart className='icon icon-cart'/>
      <h3 className='title cart-title'>Your cart is empty!</h3>
      <div className="text cart-text">Looks like you {"haven't"} added anything to your cart yet.</div>
      <Link to={"/"} className='link cart-link'>
       Start Shopping
      </Link>
    </motion.div>
  )
}

export default EmptyCartUI;
