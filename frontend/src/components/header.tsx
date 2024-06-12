import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/logo";
import NavigationLink from "./shared/navigation-link";
import { useAuthContext } from "../context/auth-context";

const Header = () => {
  const auth = useAuthContext();
  return (
    <div style={{height:'64px'}}>
      <AppBar
        sx={{ bgcolor: "transparent",boxShadow: "none"}}
      >
        <Toolbar sx={{ display: "flex", justifyContent:'space-between'}}>
          <Logo />
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/chat"
                  text="Go To Chat"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  textColor="white"
                  to="/"
                  text="logout"
                  onClick={auth?.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/login"
                  text="Login"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  textColor="white"
                  to="/signup"
                  text="Signup"
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
