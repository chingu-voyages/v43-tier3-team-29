import React, { useEffect, useState } from "react";
import { BsFillMouseFill, BsMouse } from "react-icons/bs";

export const ScrollingIcon = ({ scrollTimeoutValue }) => {
  const [isScroll, setIsScroll] = useState(false);
  const scrollTimeoutDuration = scrollTimeoutValue; // Duration after which isScroll will be set to false

  const handleScroll = (e) => {
    if (e.deltaY !== 0) {
      setIsScroll(true);
      // Clear existing timeout
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      // Set a new timeout to reset isScroll back to false
      window.scrollTimeout = setTimeout(() => {
        setIsScroll(false);
      }, scrollTimeoutDuration);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-container">
      {isScroll ? <BsFillMouseFill /> : <BsMouse />}
    </div>
  );
};
