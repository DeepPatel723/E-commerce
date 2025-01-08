import { ArrowLeft, XCircle } from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";

const PurchaseCancelPage = () => {
  return (
    <div className='container'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='purchase-cancel-sec'>
            <div className="purchase-box">
                <div className="purchase-box-icon">
                    <XCircle className='icon icon-xcircle'/>
                </div>
                <h1 className='success-msg'>Purchase Cancelled</h1>

                <div className="greeting-msg">Your order has been cancelled. No charges have been made.</div>
                <div className="greeting-text">If you encountered any issues during the checkout process, please don&apos;t hesitate to
                contact our support team.</div>

                <div className="greetin-btn-sec">
                    <Link to={"/"} className='link link-text'>
                        <ArrowLeft className='icon icon-arrowLeft' size={18}/>
                        Return to Shop  
                    </Link>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default PurchaseCancelPage;
