import React from 'react'
import { Link } from 'react-router-dom';

const CategoryItem = ({category}) => {
  return (
    <div className='card-item'>
        <Link to={'/category' + category.href}>
            <div className="card-inner">
                <div className="card-image">
                <img src={category.imageUrl} alt={category.name} loading='lazy' className='media'/>
                </div>
                <div className="card-information">
                    <h3 className='card-title'>{category.name}</h3>
                    <p className='card-text'>Explore {category.name}</p>
                </div>
            </div> 
        </Link>
    </div>
  )
}

export default CategoryItem;
