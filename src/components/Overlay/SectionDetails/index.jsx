import React from "react";

// Styles
import "./style.css";

// Icons
import { HiOutlineArrowRight } from "react-icons/hi";

const SectionDetails = () => {
  return (
    <div className="section-overlay">
      <div className="section-text">
        <h1>About us</h1>
        <p>
          The app was build during the wonderful Voyage which was organized by
          Jim Medlock and his awesome team. Thanks to this opportunity we gained
          confidence and levelled up soft and technical skills to face any
          future challenges.
        </p>
      </div>
      <div className="section-btns">
        <button className="section-btn">
          Meet our team <HiOutlineArrowRight />
        </button>
        <a className="section-btn" href="/">
          github repo <HiOutlineArrowRight />
        </a>
      </div>
    </div>
  );
};

export default SectionDetails;
