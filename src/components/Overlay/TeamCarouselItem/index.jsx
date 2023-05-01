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

// Store
import { useStore } from "../../../store/store";

const TeamCarouselItem = ({ member }) => {
  const updateCursorType = useStore((store) => store.updateCursorType);

  return (
    <div className="carousel">
      <img src={member.image} alt="" />
      <div className="member-details">
        <p>{member.name}</p>
        <div className="member-links">
          <a
            aria-label="linkedin"
            onMouseEnter={() => updateCursorType("hover")}
            onMouseLeave={() => updateCursorType("pointer")}
            target="_blank"
            href={member.links[0].link}
          >
            <FaLinkedin />
          </a>
          <a
            aria-label="github"
            onMouseEnter={() => updateCursorType("hover")}
            onMouseLeave={() => updateCursorType("pointer")}
            target="_blank"
            href={member.links[1].link}
          >
            <FaGithubSquare />
          </a>
          <a
            aria-label="twitter"
            onMouseEnter={() => updateCursorType("hover")}
            onMouseLeave={() => updateCursorType("pointer")}
            target="_blank"
            href={member.links[2].link}
          >
            <FaTwitterSquare />
          </a>
          <a
            aria-label="portfolio"
            onMouseEnter={() => updateCursorType("hover")}
            onMouseLeave={() => updateCursorType("pointer")}
            target="_blank"
            href={member.links[3].link}
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCarouselItem;
