import { Loader, PlusCircle, Upload } from 'lucide-react';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useProductStore } from '../stores/useProductStore';

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
    const [ newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""   
    });

    const { createProduct, loading } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            console.log(newProduct);
            setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
        } catch (error) {
            console.log("error creating a product");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                setNewProduct({...newProduct, image: reader.result });
            }
            
            reader.readAsDataURL(file);
        }
    }
  return (
    <motion.div
        className='container'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h2 className='title'>Create New Product</h2>

        <form className='form-sec' onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="name" className="field_label">Product Name</label>
                <input className="field_input" id="name" name="name" type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name:e.target.value})} required />
            </div>

            <div className="field">
                <label htmlFor="description" className="field_label">Description</label>
                <textarea className="field_input" id="description" name="description" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description:e.target.value})} required />
            </div>

            <div className="field">
                <label htmlFor="price" className="field_label">Price</label>
                <input className="field_input" id="price" name="price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price:e.target.value})} required />
            </div>

            <div className="field">
                <label htmlFor="category" className="field_label">Category</label>
                <select className="field_input" id="category" name="category" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category:e.target.value})} required>
                    <option value={''}>Select a category</option>
                    {categories.map((category)=>(
                        <option value={category} key={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <input type='file' id='image' className='field_input' accept='iamge/*' onChange={handleImageChange}/>
                <label htmlFor="image" className="field_label"><Upload className='icon icon-upload'/>Upload Image</label>
            </div>

            <button type='submit' className="btn" disabled={loading}>
                {loading ? (
                    <>
                        <Loader aria-hidden='true' className="icon icon-loader"/> Loading...
                    </>
                ):(
                    <>
                        <PlusCircle className='icon icon-pdp'/> Create Product
                    </>
                )}
            </button>
        </form>
    </motion.div>
  )
}

export default CreateProductForm;
