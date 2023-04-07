import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -24, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="carousel"
    >
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
    </motion.div>
  );
};

export default TeamCarouselItem;
