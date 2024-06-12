import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useAuthContext } from "../context/auth-context";
import ChatItem from "../components/chat/chat-item";
import { Message } from "../types/chat-types";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { getUserChats, sendChatRequest } from "../helpers/api-communicators";
import DescriptionBox from "../components/chat/description-box";
import toast from "react-hot-toast";

const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    if (inputRef?.current) {
      const content = inputRef.current.value as string;
      inputRef.current.value = "";
      const newMessage = { role: "user", content } as Message;
      setChatMessages((prev) => [...prev, newMessage]);

      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);

    }
    if(scrollRef?.current){
        const scroll = scrollRef.current;
        scroll.scrollTop = scroll.scrollHeight;
    }

    return;
  };

  // used when we wantt o call function before rendering to ui
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);
  
  return (
    <Box
      sx={{
        display: "flex",
        padding: 5,
        paddingTop:7,
        gap: 5,
        flexDirection: 'row',
        height:'calc(100vh - 160px)',
        overflowX:'hidden'
      }}
    >
      <DescriptionBox setChatMessages={setChatMessages} />
      <Box
        sx={{
          display:'flex',
          flexDirection: "column",
          overflow:'hidden',
          flex:'1',
          justifyContent:'space-between'
        }}
      >
       <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            fontWeight: "600",
            textAlign:'center',
            paddingBottom:'10px',
            lineHeight:'1'
          }}
        >
          ASK : ANYTHING
        </Typography>
        <Box
          ref= {scrollRef}
          sx={{
            flex:'1',
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            gap: "10px",
            my: "10px"
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            height: "60px",
            borderRadius: 8,
            marginTop:'15px',
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
