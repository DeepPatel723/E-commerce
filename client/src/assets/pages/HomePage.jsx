import React from 'react'
import CategoryItem from '../components/CategoryItem';

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
]

const HomePage = () => {
  return (
    <div className='main container'>
       <div className="main-section">
        <h1 className='title'>Explore Our Categories</h1>
        <p className='content'>Discover the latest trends in eco-friendly fashion</p>

        <div className="card">
          {categories.map(category => (
            <CategoryItem category={category} key={category.name}/>
          ))}
        </div>
       </div>
    </div>
  )
}

export default HomePage;
