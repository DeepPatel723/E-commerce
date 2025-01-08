import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Confetti from "react-confetti";
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import axiosInsatnce from '../lib/axios';

const PurchaseSuccessPage = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart } = useCartStore();
    const [error, setError] = useState(null);

    useEffect(()=>{
        const handleCheckoutSucess = async (sessionId) => {
            try {
                await axiosInsatnce.post("/payments/checkout-success",{
                    sessionId,
                })
                clearCart();
            } catch (error) {
                console.log(error);
            } finally {
                setIsProcessing(false);
            }
        }

        const sessionId = new URLSearchParams(window.location.search).get("sesssion_id");
        if (sessionId) {
            handleCheckoutSucess();
        } else {
            setIsProcessing(false);
            setError("No session ID found in the URL");
        }
    },[clearCart]);

    if (isProcessing) {
        return "Processing...";
    }

    if (error){
        return `Error: ${error}`;
    } 
        
  return (
    <div className='container checkout-main-container'>
        <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
        />

        <div className="purchase-process-msg-sec">
            <div className="purchase-box">
                <div className="purchase-box-icon">
                    <CheckCircle className='icon icon-check'/>
                </div>
                <h1 className='success-msg'>Purchase Successful!</h1>

                <div className="greeting-msg">Thank you for your order. {"We're"} processing it now.</div>
                <div className="greeting-text">Check your email for order details and updates.</div>

                <div className="success-order-details">
                    <div className="order-info">
                        <span className="order-title">Order Number</span>
                        <span className="order-value">#1234</span>
                    </div>
                    <div className="order-info">
                        <span className="order-title">Estimated delivery</span>
                        <span className="order-value">3-5 business days</span>
                    </div>
                </div>
                <div className="greetin-btn-sec">
                    <button className='button success-btn'>
                        <HandHeart className='icon icon-handheart' size={18}/>
                        Thanks For Trusting Us! 
                    </button>
                    <Link to={"/"} className='link link-text'>
                        Countinue Shopping
                        <ArrowRight className='icon icon-arrowRight' size={18}/>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PurchaseSuccessPage;
