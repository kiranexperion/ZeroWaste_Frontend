import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Go Green Breathe Clean ",
          "Zero Waste,Save Earth",
          "Use.Recycle.Reuse",
          "Think Before You Trash It",
          
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;

