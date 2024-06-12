import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        //get all users
        const users = await User.find();
        return res.status(200).json({message:"success", users})
    }catch(error){
        console.log(error);
        return res.status(200).json({messge:"Eroor", reason: error.message})
    }
}

export const userSignup = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        //signup
        const {name, email, password}= req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({messge:"Error", reason: "User already exist with these email pls login"})
        }

        const hashedPassword = await hash(password, 10)
        const user = new User({name, email, password: hashedPassword});
        await user.save();

         // clear previous cookie create token and store it 
         res.clearCookie(COOKIE_NAME, {
            httpOnly:true,
            domain:'localhost',
            signed:true,
            path:"/"
        });
        const token = createToken(user.id.toString(),user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {path:"/", domain:"localhost", expires, httpOnly:true, signed:true})

        return res.status(201).json({message:"success", id:user._id.toString()})
        
    }catch(error){
        console.log(error);
        return res.status(200).json({messge:"Error", reason: error.message})
    }
}


export const userLogin = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        //login
        const {email, password}= req.body;
        const  user = await User.findOne({email});

        if(!user){
            return res.status(401).json({messge:"Error", reason: "User doesn't exist with these email pls signup"})
        }

        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect email or password")
        }

        // clear previous cookie create token and store it 
        res.clearCookie(COOKIE_NAME, {
            httpOnly:true,
            domain:'localhost',
            signed:true,
            path:"/"
        });
        const token = createToken(user.id.toString(),user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {path:"/", domain:"localhost", expires, httpOnly:true, signed:true})
        
        return res.status(200).json({message:"success", id:user._id.toString(), name:user.name, email:user.email})

    }catch(error){
        console.log(error);
        return res.status(200).json({messge:"Error", reason: error.message})
    }
}


export const verifyUser = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        //verification
        const  user = await User.findById(res.locals.jwtData.id);

        if(!user){
            return res.status(401).json({messge:"Error", reason: "User doesn't exist or token malfunction"})
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Token and Id does not match")
        }
        
        return res.status(200).json({message:"success", id:user._id.toString(), name:user.name, email:user.email})

    }catch(error){
        console.log(error);
        return res.status(200).json({messge:"Error", reason: error.message})
    }
}

export const userLogout = async(req:Request, res: Response, next: NextFunction) =>{
    try{
        const  user = await User.findById(res.locals.jwtData.id);

        if(!user){
            return res.status(401).json({messge:"Error", reason: "User doesn't exist or token malfunction"})
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Token and Id does not match")
        }
        
        res.clearCookie(COOKIE_NAME, {
            httpOnly:true,
            domain:'localhost',
            signed:true,
            path:"/"
        });

        return res.status(200).json({message:"user logout successful"})

    }catch(error){
        console.log(error);
        return res.status(200).json({messge:"Error", reason: error.message})
    }
}