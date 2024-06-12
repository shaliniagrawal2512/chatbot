import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          color="white"
          height={"30px"}
          className="image-inverted"
        />
      </Link>{" "}
      <Typography
        sx={{
          fontWeight: "800",
          display:{xs:'none', sm:'flex'},
          textShadow: "2px 2px 20px #000",
          alignItems: 'baseline'
        }}
      >
        <span style={{ fontSize: "20px" }}>CHAT</span>--GPT
      </Typography>
    </div>
  );
};

export default Logo;
