import { Avatar, Box, Button } from "@mui/material";
import { useAuthContext } from "../../context/auth-context";
import { red } from "@mui/material/colors";
import toast from "react-hot-toast";
import { Message } from "../../types/chat-types";
import { Dispatch, SetStateAction } from "react";
import { deleteUserChats } from "../../helpers/api-communicators";
import { DescriptionCard } from "./description-card";
import { Color } from "../../colors";

interface Props {
  setChatMessages: Dispatch<SetStateAction<Message[]>>;
}

const labels: string[] = [
  "Write code for Specoific Task including edge cases",
  "Provide question for me to prepare for an interview",
  "Help me finding a music video whose lyrics include 'shape of u'",
  "How to start my career as a Freelancer",
  "Write a Poem for LKG kid"
];
const DescriptionBox = (props: Props) => {
  const auth = useAuthContext();
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      props.setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  return (
    <Box
      sx={{
        display: { md: "flex", xs: "none", sm: "none" },
        flex: 0.2,
        flexDirection: "column",
        alignItems: "center",
        gap:'15px',
        scrollbarWidth:'none',
        overflowY:'auto'
      }}
    >
         <Avatar
          sx={{
            bgcolor: Color.profileColour,
            color: Color.textDarkPrimary,
            fontWeight: 700,
          }}
        >
          {auth?.user?.name.charAt(0)}
          {auth?.user?.name.split(" ")[1] &&
            auth?.user?.name.split(" ")[1].charAt(0)}
        </Avatar>
        {labels.map((label) => (
          <DescriptionCard key={label} label={label} /> // Use unique key for each component
        ))}
        <Button
          onClick={handleDeleteChats}
          sx={{
            width: "200px",
            my: 3,
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            bgcolor: Color.error,
            ":hover": {
              bgcolor: red["500"],
            },
          }}
        >
          Clear Chat
        </Button>
      </Box>
  );
};

export default DescriptionBox;
