import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { useUserStore } from '../stores/useUserStore'
import toast from 'react-hot-toast';
import { useCartStore } from '../stores/useCartStore';

const ProductCard = ({product}) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please Login to add product to cart", { id: "login" });
            return;
        } else {
          console.log(product);
            addToCart(product);
        }
    }

  return (
    <div className='card product-card'>
      <div className="card-inner">
        <div className="card-media">
            <img src={product.image} alt="product Image" />
        </div>
        <div className="card-content">
            <div className="card-information">
                <div className="card-title">{product.name}</div>
                <div className="card-price price">${product.price}</div>
                <button className='button card-button' onClick={handleAddToCart}><ShoppingCart className='icon icon-cart' size={22}/>Add To Cart</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
