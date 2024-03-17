import React from "react";

function Specialty(props) {
  const { text } = props;
  return (
    <>
      <div className="specialty"><p>{text}</p></div>
    </>
  );
}

export default Specialty;
