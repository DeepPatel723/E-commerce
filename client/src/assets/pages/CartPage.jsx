import React from 'react'
import { useCartStore } from '../stores/useCartStore';
import EmptyCartUI from '../components/EmptyCartUI';
import CartItem from '../components/CartItem';
import { motion } from "framer-motion";
import OrderSummary from '../components/OrderSummary';
import GiftCardCoupon from '../components/GiftCardCoupon';
import PeopleAlsoBought from '../components/PeopleAlsoBought';

const CartPage = () => {
    const { cart } = useCartStore();

  return (
    <div className='cartpage-section'>
        <div className="container">
            <div className="cart-items">
                <motion.div
                    className='cart-items_sec'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                        {cart.length === 0 ? (
                            <EmptyCartUI/>
                        ) : (
                            <div className="cart_items">
                                {cart.map((item) => (
                                  <CartItem key={item._id} item={item}/>  
                                ))}
                            </div>
                        )}
                        {cart.length > 0 && (<PeopleAlsoBought/>)}
                </motion.div>
                {cart.length > 0 && (
                    <motion.div
                    className='right_side_container third_container'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <OrderSummary/>
                    <GiftCardCoupon/>
                </motion.div>
                )}
            </div>
        </div>
    </div>
  )
}

export default CartPage;
