import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInsatnce from "../lib/axios";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: false,

    signup: async({name, email, password, confirmPassword }) => {
        set({loading: true});

        if(password != confirmPassword){
            set({loading: false});
            return toast.error("Password do not match");
        }

        try {
            const res = await axiosInsatnce.post("/auth/signup", {name, email, password });
            set({user: res.data, loading: false});
        } catch (error) {
            set({loading: false});
            toast.error( error.reponse.data.message || "An errror occurred ");
        }
    },

    login: async({email, password}) => {
        set({ loading: true});
        
        try {
            const res = await axiosInsatnce.post("/auth/login", { email, password });    
            // console.log("user is here", res.data );
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error( error.response.data.message || "An errror occurred" );
        }
    },

    logout: async() => {
        try {
            await axiosInsatnce.post("auth/logout");
            set({user: null });
        } catch (error) {
            toast.error(error.reponse?.data?.message || "An error occurred during logout")  
        } 
    },

    checkAuth: async () => {
        set({checkingAuth: true});
        try {
            const response = await axiosInsatnce.get("/auth/profile");
            set({ user: response.data, checkingAuth: false});
        } catch (error) {
            set({ checkingAuth: false, user: null });
        }
    }
}))