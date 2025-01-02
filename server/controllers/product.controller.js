import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) =>{
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};

export const getFeaturedProducts = async (req, res) =>{
    try {
        let featuredProducts = await redis.get("featuredProducts");

        if(featuredProducts){
            return res.json(JSON.parse(featuredProducts));
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if(!featuredProducts){
            return res.status(404).json({ message:"No Featured Products Found"});
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message:"Server Error", error:message.error });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({
                message: "Validation Error",
                error: "All fields (name, description, price, image, category) are required."
            });
        };

        console.log(req.body);  
        let cloudinaryResponse = null;

        if (image && image.startsWith('data:image')) {
            const base64Data = image.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
        
            try {
                cloudinaryResponse = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "products",
                            use_filename: true,
                            unique_filename: true,
                            resource_type: "image"
                        },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary Upload Error:", error);
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(buffer);  // Send the buffer to Cloudinary
                });
            } catch (cloudinaryError) {
                console.log("Cloudinary upload error:", cloudinaryError);
                return res.status(500).json({ message: "Image upload failed", error: cloudinaryError.message });
            }
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url || "",
            category,
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message:"Server Error", error:error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product Not Found"});
        }

        if (product.image) {
            try {
                const publicId = product.image.split("/").pop().split(".")[0]; // Extract Public ID
                const cloudinaryResponse = await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Cloudinary Response:", cloudinaryResponse);
        
                if (cloudinaryResponse.result !== "ok") {
                    console.log("Image not found or already deleted on Cloudinary");
                } else {
                    console.log("Image Deleted Successfully");
                }
            } catch (error) {
                console.log("Error Deleting Image from Cloudinary", error);
            }
        }
        
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });      
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project:{
                    _id: 1,
                    name: 1,
                    image: 1,
                    price: 1,
                }
            }
        ]);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });

        res.json({products});
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message:"Server Error", error:error.message });
    }
};

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updatedFeaturedProductCache();
            res.json(updatedProduct);
        } else{
            res.status(404).json({ message: "Product Not Found"});
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};

async function updatedFeaturedProductCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("error in update cache function");
    }
}