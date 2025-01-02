import React from 'react';
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from '../stores/useProductStore';

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div className="container">
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th className='table-head-title' scope='col'>Product</th>
            <th className='table-head-title' scope='col'>Price</th>
            <th className='table-head-title' scope='col'>Category</th>
            <th className='table-head-title' scope='col'>Featured</th>
            <th className='table-head-title' scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {products?.map((product) => (
            <tr key={product._id} className='table-row'>
              <td className='table-data'>
                <div className="pdp-img-sec">
                  <div className="pdp-img">
                    <img src={product.image} alt={product.name} className='pdp-image'/>
                  </div>
                  <div className="pdp-name">
                    <div className="pdp-title">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className='table-data'>
                <div className="pdp-price">${product.price.toFixed(2)}</div>
              </td>
              <td className='table-data'>
                <div className="pdp-category">${product.category}</div>
              </td>
              <td className='table-data'>
                <button className={`pdp-featured ${product.isFeatured ? "active" : "non-active"}`} onClick={() => toggleFeaturedProduct(product._id)}><Star className='icon icon-star'/></button>
              </td>
              <td className='table-data'>
                <button className="pdp-delete" onClick={() => deleteProduct(product._id)}><Trash className='icon icon-trash'/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default ProductsList;
