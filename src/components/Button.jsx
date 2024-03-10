import { React, useState } from "react";

function Button(props) {
  const { href, text, filled } = props;

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const ButtonStyle = {
    backgroundColor: filled ? "var(--primary)" : "transparent",
    color: filled ? "var(--white)" : "var(--primary)",
    border: "none",
    display: "inline-block",
    padding: "1em 1.5em",
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
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isHover ? ButtonHoverStyle : ButtonStyle}
    >
      {text}
    </a>
  );
}

export default Button;
