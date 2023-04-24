import React from "react";

// Styles
import "./style.css";

const index = ({ soundLevel, setSoundLevel }) => {
  return (
    <div className="control">
      <input
        type="range"
        min="0"
        max="10"
        value={soundLevel}
        step="1"
        onChange={(e) => setSoundLevel(e.target.value)}
      />
    </div>
  );
};

export default index;
