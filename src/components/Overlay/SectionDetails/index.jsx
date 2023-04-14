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
  // Section details content toggler
  const [section, setSection] = useState("about");

  // Section details visibility toggler
  const [sectionIsOpen, setSectionIsOpen] = useState(false);

  // Instructions click handler
  const clickHandler = () => {
    cameraMovementSheet.sequence.play({
      range: [cameraMovementSheet.sequence.position, 2.1],
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
      {sectionIsOpen && (
        <motion.div
          variants={overlayContainer}
          initial="hidden"
          animate="show"
          exit="exit"
          key={
            section === "team"
              ? "team-section"
              : section === "about"
              ? "about-section"
              : "credits-section"
          }
          className="section-overlay"
        >
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="section-text"
          >
            <h1>
              {section === "team"
                ? "Our team"
                : section === "about"
                ? "About us"
                : "credits"}
            </h1>
            {section === "team" ? (
              <TeamCarousel />
            ) : section === "about" ? (
              <p>
                The app was build during the wonderful Voyage which was
                organized by Jim Medlock and his awesome team. Thanks to this
                opportunity we gained confidence and levelled up soft and
                technical skills to face any future challenges.
              </p>
            ) : (
              <p>Credits</p>
            )}
          </motion.div>
          <motion.div
            variants={btnsContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="section-btns"
          >
            {section === "credits" && (
              <button className="section-btn" onClick={clickHandler}>
                Instructions <HiOutlineArrowRight />
              </button>
            )}
            {section === "team" ? (
              <button
                onClick={() => setSection("about")}
                className="section-btn"
              >
                About <HiOutlineArrowRight />
              </button>
            ) : section === "about" ? (
              <button
                onClick={() => setSection("team")}
                className="section-btn"
              >
                Our team <HiOutlineArrowRight />
              </button>
            ) : null}
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
