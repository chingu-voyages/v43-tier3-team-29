import React, { useState } from "react";

// Icons
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

// Styles
import "./style.css";
import TeamCarouselItem from "../TeamCarouselItem";
import { AnimatePresence } from "framer-motion";

// Team data
const teamData = [
  { name: "Danney", image: "/images/danney-min.jpg" },
  { name: "Sean", image: "/images/sean-min.jpg" },
  { name: "Jane", image: "/images/jane-min.jpg" },
  { name: "Szymon", image: "/images/szymon-min.jpg" },
  { name: "Zoran", image: "/images/zoran-min.jpg" },
];

const TeamCarousel = () => {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((oldActive) => {
      let active = oldActive + 1;
      if (active > teamData.length - 1) {
        active = 0;
      }
      return active;
    });
  };

  const prevSlide = () => {
    setActive((oldActive) => {
      let active = oldActive - 1;
      if (active < 0) {
        active = teamData.length - 1;
      }
      return active;
    });
  };

  return (
    <div className="carousel-wrapper">
      <AnimatePresence mode="wait">
        {teamData.map((member, index) => {
          if (active === index) {
            return (
              <TeamCarouselItem
                key={`${index}-${member.name}`}
                member={member}
              />
            );
          } else {
            return null;
          }
        })}
      </AnimatePresence>
      <div className="carousel-btns">
        <button onClick={nextSlide} aria-label="next team member">
          <FaArrowCircleRight />
        </button>
        <button onClick={prevSlide} aria-label="previous team member">
          <FaArrowCircleLeft />
        </button>
      </div>
    </div>
  );
};

export default TeamCarousel;
