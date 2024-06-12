import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import qs from "qs";
import axios, { AxiosRequestConfig } from "axios";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered permission denied" });
    }
    // take all chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ role: "user", content: message });
    user.chats.push({ content: message, role: "user" });
    const data: { [key: string]: {role:string, content:string}} = {};
    chats.forEach((message, index) => {
      data[String(index)] = {
        content: message.content,
        role: message.role==='assistant' ? 'system' : message.role,
      }
    });
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": process.env.API_KEY_CHAT,
        "x-rapidapi-host": "chatgpt-api8.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: data
    };
    const chatResponse = await axios.default.request(options);
    user.chats.push({
      role: "assistant",
      content: chatResponse.data.text,
    });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "something went wrong try again !" });
  }
};

export const getAllChatsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered permission denied" });
    }
    return res.status(200).json({ message: "success", chats: user.chats });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "something went wrong try again !" });
  }
};

export const deleteAllChatsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered permission denied" });
    }
    // @ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "something went wrong try deleting again !" });
  }
};
