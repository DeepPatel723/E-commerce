import React, { useEffect, useState } from 'react'
import { useCartStore } from '../stores/useCartStore';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const FeaturedProducts = ({featuredProducts}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const { addToCart } = useCartStore();

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else if (window.innerWidth < 1280) {
                setItemsPerPage(3);
            } else {
                setItemsPerPage(4);
            };
        };
        handleSize();
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize); 
    },[]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    };

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className='featuredpdp-sec'>
      <div className="container">
        <h2 className='title sec-title'>Featured</h2>
        <div className="featured-slider">
            <div className="featured-slider-sec">
                <div className="featured-item" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`}}>
                    {featuredProducts?.map((product)=>(
                        <div className='card featured-pdp-card' key={product._id} >
                            <div className="card-inner">
                              <div className="card-media card-image">
                                  <img src={product.image} alt="product Image" className='img media' />
                              </div>
                              <div className="card-content">
                                  <div className="card-information">
                                      <div className="card-title">{product.name}</div>
                                      <div className="card-price price">${product.price.toFixed(2)}</div>
                                      <button className='button card-button' onClick={() => addToCart(product)}><ShoppingCart className='icon icon-cart' size={22}/>Add To Cart</button>
                                  </div>
                              </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className='slider-btn slider-btn-left' onClick={prevSlide} disabled={isStartDisabled}><ChevronLeft className="icon icon-arrow"/></button>
            <button className='slider-btn slider-btn-right' onClick={nextSlide} disabled={isEndDisabled}><ChevronRight className="icon icon-arrow"/></button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts;
