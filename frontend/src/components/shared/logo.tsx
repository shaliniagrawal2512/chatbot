import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Color } from "../../colors";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
      <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "30px", margin: "auto" }}
          />
      </Link>{" "}
      <Typography
        sx={{
          fontWeight: "800",
          display:{xs:'none', sm:'flex'},
          textShadow: `2px 2px 20px ${Color.textLight}`,
          alignItems: 'baseline'
        }}
      >
        <span style={{ fontSize: "20px" }}>NEURO</span>--SPHERE </Typography>
    </div>
  );
};

export default Logo;
