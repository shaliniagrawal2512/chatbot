import { TypeAnimation } from "react-type-animation";
import { Color } from "../colors";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Bridging human interaction and AI with seamless precision",
        1000,
        "Your intelligent assistant, powered by neural networks. 🤖",
        2000,
        "Your Own Customized Neuro--Sphere 💻",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: '3vw',
        color: "white",
        display: "inline-block",
        textShadow: `1px 1px 20px ${Color.textLight}`
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
