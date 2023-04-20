import React, { useState, useEffect } from "react";

// Styles
import "./style.css";

// Icons
import { HiOutlineArrowRight } from "react-icons/hi";

const CustomCursor = ({ cursorType }) => {
  const [mousePosition, setMousePosition] = useState({ x: 400, y: 400 });

  const onMouseMove = (e) => {
    const { pageX: x, pageY: y } = e;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className={`cursor ${cursorType === "custom" ? "custom" : "pointer"}`}
      style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
    >
      <HiOutlineArrowRight />
    </div>
  );
};

export default CustomCursor;
