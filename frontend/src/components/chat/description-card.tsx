import { Box, Typography } from "@mui/material";
import { Color } from "../../colors";

export const DescriptionCard = ({ label }: { label: string }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      m={1}
    >
      <Box
        style={{
          padding: "10px",
          boxShadow: `2px 2px 10px ${Color.primary}`,
          borderRadius: "10px",
          border: "none",
        }}
        sx={{ background: Color.surface }}
      >
        <Typography sx={{ fontFamily: "work sans", textAlign: "center" }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};
