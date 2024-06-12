import { Avatar, Box, Button, Typography } from '@mui/material'
import { useAuthContext } from '../../context/auth-context';
import { red } from '@mui/material/colors';
import toast from 'react-hot-toast';
import { Message } from '../../types/chat-types';
import { Dispatch, SetStateAction } from 'react';
import { deleteUserChats } from '../../helpers/api-communicators';

interface Props {
    setChatMessages: Dispatch<SetStateAction<Message[]>>
}
const DescriptionBox = (props:Props) => {
    const auth = useAuthContext();
    const handleDeleteChats= async ()=>{
        try {
            toast.loading("Deleting Chats", { id: "deletechats" });
            await deleteUserChats();
            props.setChatMessages([]);
            toast.success("Deleted Chats Successfully", { id: "deletechats" });
          } catch (error) {
            console.log(error);
            toast.error("Deleting chats failed", { id: "deletechats" });
          }
    }
  return (
    <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.25,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            padding:3,
            alignItems:'center'
          }}
        >
          <Avatar
            sx={{
              marginTop: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
              marginBottom:5
            }}
          >
            {auth?.user?.name.charAt(0)}
            {auth?.user?.name.split(" ")[1] && auth?.user?.name.split(" ")[1].charAt(0)}
          </Avatar>
          <Typography sx={{fontFamily: "work sans", textAlign:'center' }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{fontFamily: "work sans", my: 4, textAlign:'center'}}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information. You can also ask about code and latest news updates.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: 5,
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
  )
}

export default DescriptionBox
