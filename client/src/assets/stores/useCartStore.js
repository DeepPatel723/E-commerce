import { create } from "zustand";
import axiosInsatnce from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponAppiled: false,

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