import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/customized-input";
import { IoIosLogIn } from 'react-icons/io'
import toast from "react-hot-toast";
import { useAuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { Color } from '../colors'
const Signup = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async(event : React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password= formData.get("password") as string;
    try {
      toast.loading("Creating User Account", { id: "signup" });
      await auth?.signup(name,email, password);
      toast.success("Account successfully created", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account try again !", { id: "signup" });
    }
  }

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);
  
  return (
    <Box width={"100%"}  display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot3.png" alt="Robot" style={{ width: "600px",  filter:'hue-rotate(15deg)'}}/>
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: `10px 10px 20px ${Color.secondary}`,
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <button
              type="submit"
              className="secondary"
              style={{
                width: "100%",
                borderRadius: 5,
                border: "none",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              <text
                className="nav-link"
                style={{
                  lineHeight: "20px",
                  gap: "5px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {" "}
                <IoIosLogIn style={{ strokeWidth: "15px" }} size={"22px"} />
                Signup
              </text>
            </button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
