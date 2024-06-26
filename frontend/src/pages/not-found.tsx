import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        my: 10,
        alignItems: "center",
      }}
    >
      <img
        src="robot1.png"
        alt="robot"
        style={{ width: "400px", margin: "auto" }}
      />
      <Typography sx={{fontSize:'30px', fontWeight:'600'}}>ERROR 404: PAGE NOT FOUND !</Typography>
    </Box>
  );
};

export default NotFound;
