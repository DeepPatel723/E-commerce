import { create } from "zustand";
import axiosInsatnce from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({products}),
    createProduct: async (productData) => {
        set({ loading: true });
        // console.log("as",productData);
        try {
            const res = await axiosInsatnce.post("/products", productData);
            set((prevState) => ({
                products:[...prevState.products, res.data],
                loading: false
            }));
        } catch (error) {
            toast.error(error.response.data.error);
            set({loading: false});
        }
    },

    fetchAllProducts: async () => {
        set({loading: true});
        try {
            const response = await axiosInsatnce.get("/products");
            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({error:"Failed To fetched products", loading: false });
            toast.error(error.response.data.error || "Failed To fetched products");
        }
    },

    fetchProductByCategory: async (category) => {
        console.log(`${category}`);
        set({loading: true});
        try {
            const response = await axiosInsatnce.get(`/products/category/${category}`);
            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({error:"Failed To fetched products", loading: false });
            toast.error(error.response.data.error || "Failed To fetched products");
        }
    },

    deleteProduct: async (productId) => {
        set({loading: true});
        console.log(productId);
        try {
            const response = await axiosInsatnce.delete(`/products/${productId}`);  
            console.log(response.data)
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false,
            }));
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.error || "Failed To delete product");
        }
    },

    toggleFeaturedProduct: async (productId) => {
        set({loading: true});
        try {
            const response = await axiosInsatnce.patch(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.map((product) => product._id === productId ? {...product, isFeatured: response.data.isFeatured } : product ),
                loading: false,
            }));
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.error || "Failed To update product");
        }
    },

    fetchFeaturedProduct: async (productId) => {
        set({loading: true});
        try {
            const response = await axiosInsatnce.get(`/products/featured`);
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
        }
    }
}));