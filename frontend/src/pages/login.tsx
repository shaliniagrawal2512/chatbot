import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedInput from "../components/shared/customized-input";
import { useAuthContext } from "../context/auth-context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { Color } from '../colors'
const Login = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Box width={"100%"} display="flex" flex={1}>
      {/* ,   */}
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot3.png" alt="Robot" width={"600px"} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        m={2}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: `10px 10px 20px ${Color.primary}`,
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
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <button
              type="submit"
              className="primary"
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
                Login
              </text>
            </button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
