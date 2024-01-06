import express from "express";
// import cookieParser from "cookie-parser";
const router = express.Router();
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middlewares/auth.js";
import ErrorHandler from "../middlewares/error.js";

router.get("/", (req, res) => {
    res.send("Nice Working");
});
router.use(express.json());
router.get("/users/all", async (req, res) => {


})

router.post("/users/new", async (req, res,next) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    // if (user) return res.status(404).json({
    //     success: false,
    //     message: "User Already Exist"
    // })

    if(user){
        return next(new ErrorHandler("User Already Exist",404))
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);


    user = await User.create({ name, email, password: hashedPassword })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite:"none",
        secure:true,
    }).json({
        success: true,
        message: "Regestered Successfully"
    })
})
router.get("/users/me", async (req, res) => {
    await isAuthenticated(req, res, () => {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    });
})

router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // if (!user) return res.status(404).json({
    //     success: false,
    //     message: "Invalid Email or Password"
    // })
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",404))
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        // return res.status(404).json({
        //     success: false,
        //     message: "Invalid Email or Password",
        // })
        return next(new ErrorHandler("Invalid Email or Password",404))
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
   
    res.status(201).cookie("token", token, {
        httpOnly: true,         
        maxAge: 15 * 60 * 1000,  
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",      
        secure: process.env.NODE_ENV === "Development" ? false : true,          
    }).json({
        success: true,
        message: `${user.name} Logged In Successfully`
    });
    
}) 

router.get("/users/logout", (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",      
        secure: process.env.NODE_ENV==="Development"?false:true,})
        .json({
        success: true,
        user: req.user,
    });
})

export default router