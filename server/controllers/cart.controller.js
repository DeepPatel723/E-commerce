import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems.map(item => item._id) } });

        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);

            return { ...product.toJSON(), quantity: item.quantity };
        });

        res.json(cartItems);
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(403).json({ message: "User not authorized" });
        }

                // Validate productId
                if (!productId) {
                    return res.status(400).json({ message: "Product ID is required" });
                }
        
                // Check if product exists in DB
                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }

        const existingItem = user.cartItems.find((item)=> item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push(productId);
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};

export const removeAllProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.find((item)=> item.id !== productId);
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item)=> item.id === productId);

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.find((item)=> item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }

            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message:"Server Error", error:message.error });
    }
};