import { NextFunction, Response, Request } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[])=>{
    return async(req:Request, res:Response, next: NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()) break;
        }
        const errors= validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
       return res.status(422).json({errors : errors.array()})
    }
}

export const signupVallidator=[
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min :8}).withMessage("minimum 8 characters equired").isStrongPassword().withMessage("Password is too weak")
]

export const loginVallidator=[
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").trim().notEmpty().withMessage("Password is required")
]

export const chatVallidator=[
    body("message").trim().notEmpty().withMessage("Message is Required")
]