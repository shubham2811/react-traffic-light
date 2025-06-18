import "./styles.css";
import React, { useState, useEffect } from "react";
function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}

export default function App() {
  const config = {
    red: {
      backgroundColor: "red",
      duration: 4000,
      next: "green",
    },
    yellow: {
      backgroundColor: "yellow",
      duration: 500,
      next: "red",
    },
    green: {
      backgroundColor: "green",
      duration: 3000,
      next: "yellow",
    },
  };
  const [currentColor, setCurrentColor] = useState("red");

  useEffect(() => {
    const { duration, next } = config[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
      console.log(currentColor, duration);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={["traffic-light-container"].filter((cls) => !!cls).join(" ")}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor
              ? config[currentColor].backgroundColor
              : undefined
          }
        />
      ))}
    </div>
  );
}
