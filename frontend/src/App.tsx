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
          height: "calc(100vh - 64px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {auth?.isLoggedIn && auth.user && (
            <Route path="/chat" element={<Chat />} />
          )}
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </main>
  );
}

export default App;
