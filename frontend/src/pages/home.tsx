import { Box,  useMediaQuery, useTheme } from '@mui/material';
import Footer from '../components/footer/Footer';
import TypingAnim from '../components/type-animation';
import NavigationLink from '../components/shared/navigation-link';
import { useAuthContext } from '../context/auth-context';
import { Color } from '../colors';

const Home = () => {
  const theme = useTheme();
  const auth = useAuthContext();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"} overflow='auto'>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box sx={{ display: "flex", mx: "auto",alignItems:'center', gap:'50px', mt:8 }}>
           <img
            src="robot2.png"
            alt="robot"
            style={{ width: "300px", margin: "auto" }}
          />
          <div style={{display:'flex', flexDirection:'column',gap:'20px'}}>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  type='primary'
                  width='200px'
                  to="/chat"
                  text="Go To Chat"
                />
                <NavigationLink
                  type='secondary'
                  width='200px'
                  to="/"
                  text="logout"
                  onClick={auth?.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  type='primary'
                  width='200px'
                  to="/login"
                  text="Login"
                />
                <NavigationLink
                  type='secondary'
                  to="/signup"
                   width='200px'
                  text="Signup"
                />
              </>
            )}
          </div>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 8
          }}
        >
            <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: `-5px -5px 105px ${Color.primary}`,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
        
      </Box>
      <Footer />
    </Box>
  )
}

export default Home;