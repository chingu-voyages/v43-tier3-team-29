import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cameraMovementSheet } from "../../../animation/theatre";

// Styles
import "./style.css";

// Icons
import { HiOutlineArrowRight } from "react-icons/hi";

// Components
import TeamCarousel from "../TeamCarousel";

// Animation variants
const overlayContainer = {
  hidden: {
    x: -48,
    opacity: 0,
  },
  show: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: {
    x: -48,
    opacity: 0,
    transition: { duration: 0.5, delay: 0.5 },
  },
};

const textContainer = {
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

const btnsContainer = {
  hidden: {
    y: 24,
    opacity: 0,
  },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  exit: {
    y: 24,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const SectionDetails = () => {
  // Section details visibility toggler
  const [sectionIsOpen, setSectionIsOpen] = useState(false);

  // Section details content toggler
  const [isTeamSection, setIsTeamSection] = useState(false);

  // Theatre.js
  const obj = cameraMovementSheet.object("Section Overlay", {
    visible: false,
  });

  useEffect(() => {
    return obj.onValuesChange((obj) => {
      if (obj.visible == true) {
        setSectionIsOpen(true);
      } else {
        setSectionIsOpen(false);
      }
    });
  }, [obj]);

  return (
    <AnimatePresence mode="wait">
      {sectionIsOpen && (
        <motion.div
          variants={overlayContainer}
          initial="hidden"
          animate="show"
          exit="exit"
          key={isTeamSection ? "team-section" : "about-section"}
          className="section-overlay"
        >
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="section-text"
          >
            <h1>{isTeamSection ? "Our team" : "About us"}</h1>
            {isTeamSection ? (
              <TeamCarousel />
            ) : (
              <p>
                The app was build during the wonderful Voyage which was
                organized by Jim Medlock and his awesome team. Thanks to this
                opportunity we gained confidence and levelled up soft and
                technical skills to face any future challenges.
              </p>
            )}
          </motion.div>
          <motion.div
            variants={btnsContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="section-btns"
          >
            {isTeamSection ? (
              <button
                onClick={() => setIsTeamSection(false)}
                className="section-btn"
              >
                About <HiOutlineArrowRight />
              </button>
            ) : (
              <button
                onClick={() => setIsTeamSection(true)}
                className="section-btn"
              >
                Our team <HiOutlineArrowRight />
              </button>
            )}
            <a className="section-btn" href="/">
              github repo <HiOutlineArrowRight />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionDetails;
