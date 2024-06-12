import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginVallidator, signupVallidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", validate(signupVallidator) ,userSignup)
userRoutes.post("/login", validate(loginVallidator) ,userLogin)
userRoutes.get("/auth-status",verifyToken ,verifyUser);
userRoutes.get("/logout",verifyToken ,userLogout);

export default userRoutes;