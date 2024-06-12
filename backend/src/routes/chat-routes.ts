import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatVallidator, validate } from "../utils/validators.js";
import { deleteAllChatsUser, generateChatCompletion, getAllChatsUser } from "../controllers/chat-controller.js";

// protected api
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatVallidator), verifyToken, generateChatCompletion)
chatRoutes.get("/all-chats", verifyToken, getAllChatsUser)
chatRoutes.delete("/delete", verifyToken, deleteAllChatsUser)
export default chatRoutes;