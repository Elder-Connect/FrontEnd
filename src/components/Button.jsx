import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

function Button(props) {
  const { text, filled, primaryColor, path, padding, fontSize } = props;

  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const ButtonStyle = {
    backgroundColor: filled ? "var(--primary)" : "transparent",
    color: primaryColor ? "var(--primary)" : filled ? "var(--white)" : "var(--black)",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 600,
    fontSize: fontSize ? fontSize : "1em",
    display: "inline-block",
    padding: padding ? padding : "1em 2em",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "0.2s",
  };

  const ButtonHoverStyle = {
    ...ButtonStyle,
    backgroundColor: filled ? "var(--primary-hover)" : "none",
    color: filled ? "var(--white)" : "var(--primary-hover)",
  };

  return (
    <button
      onClick={() => navigate(path)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isHover ? ButtonHoverStyle : ButtonStyle}
    >
      {text}
    </button>
  );
}

export default Button;
