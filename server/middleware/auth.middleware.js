import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
        
        if (!accessToken) {
            console.log("Access Token Missing");
            return res.status(401).json({ message: "Unauthorized: No access token provided" });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            
            if (!user) {
                console.log("User Not Found");
                return res.status(401).json({ message: "User Not Found" });
            }

            console.log("User Authorized:", user);
            req.user = user;
            next();
        } catch (error) {
            console.log("Token Verification Error:", error.message);
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized: Access Token Expired" });
            }
            return res.status(401).json({ message: "Unauthorized: Invalid Access Token" });
        }
    } catch (error) {
        console.log("Unexpected Error in protectRoute:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid Access Token" });
    }
};


export const adminRoute = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({message: "Access Denied - Admin Only" });
    }
}
