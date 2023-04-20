import React from "react";

// Icons
import {
  FaLinkedin,
  FaGithubSquare,
  FaTwitterSquare,
  FaExternalLinkAlt,
} from "react-icons/fa";

// Styles
import "./style.css";

const TeamCarouselItem = ({ member }) => {
  return (
    <div className="carousel">
      <img src={member.image} alt="" />
      <div className="member-details">
        <p>{member.name}</p>
        <div className="member-links">
          <a href="/">
            <FaLinkedin />
          </a>
          <a href="/">
            <FaGithubSquare />
          </a>
          <a href="/">
            <FaTwitterSquare />
          </a>
          <a href="/">
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCarouselItem;
