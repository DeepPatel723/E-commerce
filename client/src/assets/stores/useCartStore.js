import { create } from "zustand";
import axiosInsatnce from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponAppiled: false,

    getMyCoupon: async () => {
        try {
            const res = await axiosInsatnce.get("/coupons");
            set({ coupon: res.data });
        } catch (error) {
            toast.error(error.res.data.message || "Error Fetching Coupon")
        }
    },

    applyCoupon: async (code) => {
        if (!code) {
            toast.error("Please enter a coupon code");
            return;
        }
    
        try {
            const response = await axiosInsatnce.post("/coupons/validate", { code });
            set({ coupon: response.data, isCouponAppiled: true });
            get().calculateTotals();
            toast.success("Coupon Applied Successfully");
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Coupon not found");
            } else if (error.response?.status === 400) {
                toast.error("Invalid coupon");
            } else {
                toast.error(error.response?.data?.message || "Failed to apply Coupon");
            }
            console.error("Error applying coupon:", error);
        }
    },
    

    removeCoupon: async (params) => {
        set({ coupon: null, isCouponAppiled: false });
        get().calculateTotals();
        toast.success("Coupon Removed");
    },

    getCartItems: async () => {
        try {
            const res = await axiosInsatnce.get("/cart");
            set({cart: res.data});
            get().calculateTotals();
        } catch (error) {
            set({ cart: []});
            toast.error(error.response.data.message || "An Error Occured");
        }
    },

    addToCart: async (product) => {
        try {
            await axiosInsatnce.post("/cart", { productId: product._id });
            toast.success("Product added to cart");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item.id === product._id );
                const newCart = existingItem? prevState.cart.map((item) => item.id === product._id ? {...item, quantity: item.quantity + 1 }: item )
                : [...prevState.cart, {...product, quantity: 1 }];
                return({ cart: newCart });
            });

            get().calculateTotals();
        } catch (error) {
            toast.error(error.response.data.message || "An Error Occured");
        }
    },

    removeFromCart: async (productId) => {
        await axiosInsatnce.delete("/cart",{ data: {productId} });
        set((prevState)=>({ cart: prevState.cart.filter((item)=> item._id !== productId )}));
        get().calculateTotals();
    },

    updateQuantity: async (productId, quantity) => {
        if (quantity === 0) {
            get().removeFromCart(productId);
            return;
        }
        await axiosInsatnce.put(`/cart/${productId}`,{ quantity });
        set((prevState)=>({ cart: prevState.cart.map((item)=> (item._id === productId ? {...item, quantity}: item))}));
        get().calculateTotals();
    },

    calculateTotals: () => {
        const { cart, coupon } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let total = subtotal;

        if (coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100);
            total = subtotal - discount;
        };

        set({ subtotal, total }); 
    }
}));