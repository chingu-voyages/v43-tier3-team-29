import React, { useState, useEffect } from "react";

// Theatre.js & Framer motion
import { AnimatePresence, motion } from "framer-motion";
import { cameraMovementSheet } from "../../../animation/theatre";

// Styles
import "./style.css";

// Icons
import { HiOutlineArrowRight } from "react-icons/hi";

// Animation variants
import { overlayContainer, textContainer, btnsContainer } from "./animations";

// Section content Data
import sectionsContentData from "./sectionContentData";

const SectionDetails = () => {
  // Section details content toggler: about, team, credits
  const [section, setSection] = useState("about");

  // Section details overlay visibility toggler
  const [sectionIsOpen, setSectionIsOpen] = useState(false);

  // Sequence stops: team1, team2, team3, team4, team5, stack
  const stops = [2.1, 3.1, 3.8, 4.7, 5.3, 6.7, 11];

  // Instructions click handler
  const clickHandler = () => {
    cameraMovementSheet.sequence.play({
      range: [
        cameraMovementSheet.sequence.position,
        stops.find((stop) => stop > cameraMovementSheet.sequence.position),
      ],
      rate: 0.3,
    });
  };

  // Theatre.js
  const obj = cameraMovementSheet.object("Section Overlay", {
    visible: false,
    section: "about",
  });

  useEffect(() => {
    return obj.onValuesChange((obj) => {
      if (obj.visible == true) {
        setSectionIsOpen(true);
      } else {
        setSectionIsOpen(false);
      }

      if (obj.section === "about") {
        setSection("about");
      } else if (obj.section === "team") {
        setSection("team");
      } else {
        setSection("credits");
      }
    });
  }, [obj]);

  return (
    <AnimatePresence mode="wait">
      {sectionIsOpen &&
        sectionsContentData.map((content) => {
          if (content.key === section) {
            return (
              <motion.div
                variants={overlayContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                key={content.key}
                className="section-overlay"
              >
                <motion.div
                  variants={textContainer}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="section-text"
                >
                  {/* Title */}
                  <h1>{content.title}</h1>

                  {/* Content */}
                  {content.content}
                </motion.div>
                {/* Buttons/Links */}
                <motion.div
                  variants={btnsContainer}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="section-btns"
                >
                  <button className="section-btn" onClick={clickHandler}>
                    Next <HiOutlineArrowRight />
                  </button>
                  <a className="section-btn" href="/">
                    github repo <HiOutlineArrowRight />
                  </a>
                </motion.div>
              </motion.div>
            );
          }
        })}
    </AnimatePresence>
  );
};

export default SectionDetails;
