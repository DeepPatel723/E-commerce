import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required: true,
        minlength:[6,"Password must be at least 6 characters long"]
    },
    cartItems:[
        {
            quantity:{
                type: Number,
                default:1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
        },
    ],
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    }  
},{
    timestamps:true,
}
)



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password); // Compare hashed password
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}


const User = mongoose.model("User",userSchema);

export default User;