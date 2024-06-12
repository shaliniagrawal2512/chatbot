import mongoose from "mongoose"
import chatSchema from "./Chat.js"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    chats:[chatSchema]
})

export default mongoose.model("User", userSchema);

// if u wnt some validations for the mongoose like if in futue application creates  multiple instances of the mongoose model so u can pro the validation like u can use
// but node js won't create multiple instances so that won't be an issue
// export default  mongoose.model['User']