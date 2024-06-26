import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Logo from "./shared/logo";
import NavigationLink from "./shared/navigation-link";
import { useAuthContext } from "../context/auth-context";

const Header = () => {
  const auth = useAuthContext();
  return (
    <div style={{ height: "64px", marginLeft: "30px", marginRight: "30px" }}>
      <AppBar sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <Toolbar
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Logo />
          <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 1, justifyContent:'center' }}>
            <Typography
              sx={{
                fontSize: "30px",
                color: "white",
                fontWeight: "600",
              }}
            >
              Have Doubts? Try me
            </Typography>
          </Box>
            <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  to="/chat"
                  type="primary"
                  text="Go To Chat"
                />
                <NavigationLink
                  to="/"
                  type="secondary"
                  text="logout"
                  onClick={auth?.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  to="/login"
                  type="primary"
                  text="Login"
                />
                <NavigationLink
                  text="Signup"
                  type="secondary"
                  to="/signup"
                />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
