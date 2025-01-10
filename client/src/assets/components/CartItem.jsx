import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react'
import { useCartStore } from '../stores/useCartStore';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className='cart-item-list'>
        <div className="item-lists">
            <div className="item-list cart-item-image card-image">
                <img src={item.image} className='media cart-item-media'/>
            </div>
            <div className="item-list cart-item-content">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-desc">{item.description}</div>
                <div className="cart-item-remove">
                    <button className='cart-remove button' onClick={()=> removeFromCart(item._id)}>
                        <Trash className='icon icon-trash'/>
                    </button>
                </div>
            </div>
            <div className="item-list cart-item-quantity">
                <div className="item-quantity">
                    <button className='cart-btn button cart-btn-minus' onClick={()=>updateQuantity(item._id, item.quantity - 1)}>
                        <Minus className='icon icon-minus'/>
                    </button>
                    <div className="cart-item-num">{item.quantity}</div>
                    <button className='cart-btn button cart-btn-plus' onClick={()=>updateQuantity(item._id, item.quantity + 1)}>
                        <Plus className='icon icon-plus'/>
                    </button>
                </div>
            </div>

            <div className="item-list cart-item-price">
                <div className="cart-price">${item.price}</div>
            </div>
        </div>

    </div>
  )
}

export default CartItem;
