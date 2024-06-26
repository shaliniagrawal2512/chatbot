import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuthContext } from "../../context/auth-context";
import { Color } from "../../colors";

function extractCodeFromString(message: string) {
  if (isCodeBlock(message)) {
    const blocks = message.split("```");
    return blocks;
  }
}


function isCodeBlock(text: string): boolean {
  const codeSymbols: string[] = ['{', '}', '(', ')', '[', ']', ';', '=>', '==', '===', '!=', '!==', '+=', '-=','|'];
  for (const symbol of codeSymbols) {
    if (text.includes(symbol)) {
      return true;
    }
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuthContext();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        flex:1,
        p: 1,
        bgcolor:  Color.surface,
        gap: 1,
        borderRadius: 2,
        my: 1
      }}
    >
      <Avatar sx={{ ml: "0", width:'23px', height:'23px', background:Color.textDarkSecondary}}>
        <img src="openai.png" alt="openai" width={"15px"} />
      </Avatar>
      <Box overflow={'auto'} sx={{scrollbarWidth:'none'}}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "15px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={materialDark} fontSize="15px" language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "15px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 1,
        gap: 1,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: Color.profileColour, color:Color.textDarkPrimary, width:'23px', height:'23px' }}>
        {auth?.user?.name.charAt(0)}
        {auth?.user?.name.split(" ")[1] &&
          auth?.user?.name.split(" ")[1].charAt(0)}
      </Avatar>
      <Box overflow={'auto'} sx={{scrollbarWidth:'none'}}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "15px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
              <Typography sx={{ fontSize: "15px" }}>{block}</Typography>

          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
