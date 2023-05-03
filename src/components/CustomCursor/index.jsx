import React, { useState, useEffect } from "react";

// Styles
import "./style.css";

// Icons
import { RiArrowRightLine } from "react-icons/ri";

// Store
import { useStore } from "../../store/store";

const CustomCursor = () => {
  const cursorType = useStore((store) => store.cursorType);
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
      className={`cursor ${
        cursorType === "custom"
          ? "custom"
          : cursorType === "hover"
          ? "hover"
          : "pointer"
      }`}
      style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
    >
      <RiArrowRightLine />
    </div>
  );
};

export default CustomCursor;
