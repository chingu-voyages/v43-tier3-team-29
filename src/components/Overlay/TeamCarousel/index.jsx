import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cameraMovementSheet } from "../../../animation/theatre";

// Styles
import "./style.css";
import TeamCarouselItem from "../TeamCarouselItem";

// Team data
import teamData from "./teamData";

const TeamCarousel = () => {
  const [active, setActive] = useState(0);

  // Theatre.js
  const obj = cameraMovementSheet.object("Team Carousel", {
    teamMemberIndex: "0",
  });

  useEffect(() => {
    return obj.onValuesChange((obj) => {
      setActive(obj.teamMemberIndex);
    });
  }, [obj]);

  return (
    <motion.div className="carousel-wrapper">
      <TeamCarouselItem key={`member-${active}`} member={teamData[active]} />
    </motion.div>
  );
};

export default TeamCarousel;
