import React from "react";

// Animation
import { motion } from "framer-motion";

export const control = {
  hidden: {
    y: -24,
    opacity: 0,
  },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  exit: {
    y: -24,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

// Styles
import "./style.css";

const index = ({ soundLevel, setSoundLevel, setCursorType }) => {
  return (
    <motion.div
      variants={control}
      key="control"
      initial="hidden"
      animate="show"
      exit="exit"
      className="control"
      onMouseEnter={() => setCursorType("hover")}
      onMouseLeave={() => setCursorType("pointer")}
    >
      <input
        type="range"
        min="0"
        max="10"
        value={soundLevel}
        step="1"
        onChange={(e) => setSoundLevel(e.target.value)}
      />
    </motion.div>
  );
};

export default index;
