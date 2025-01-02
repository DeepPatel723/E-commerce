import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../stores/useProductStore';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

const CategoryPage = () => {
    const { fetchProductByCategory, products } = useProductStore();

    const { category } = useParams();

    useEffect(()=>{
        fetchProductByCategory(category)
    }, [fetchProductByCategory, category]);
  return (
    <div className='categoryPage-section'>
        <div className="container">
            <motion.h1
                className='text title'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.h1>

            <motion.div
                className='category-grid-container'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}>
                    {products?.length === 0 && (
                        <h2 className='subheading'>No Product Found</h2>
                    )}

                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
            </motion.div>
        </div>
    </div>
  )
}

export default CategoryPage;
