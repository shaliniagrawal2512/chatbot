import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Signup from "./pages/signup";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import { useAuthContext } from "./context/auth-context";
import { Box } from "@mui/material";

function App() {
  const auth = useAuthContext();
  return (
    <main style={{ height: "100vh" }}>
       <Header/>
      <Box
        sx={{
          display: "flex",
          flex:1,
          width:'100%',
          height: "calc(100vh - 64px)",
          marginBottom:'20px'
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          {auth?.isLoggedIn && auth.user && (
            <Route path="/chat" element={<Chat />} />
          )}
        </Routes>
      </Box>
    </main>
  );
}

export default App;
