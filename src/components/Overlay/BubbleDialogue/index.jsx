import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cameraMovementSheet } from "../../../animation/theatre";

// Styles
import "./style.css";

// Animation variants
const bubbleContainer = {
  hidden: {
    y: 48,
    opacity: 0,
  },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: {
    y: 48,
    opacity: 0,
    transition: { duration: 0.5, delay: 0.5 },
  },
};

// Dialogue text
const dialogueOptions = [
  {
    id: 0,
    name: "Danney",
    text: "Hello! We are happy to see you on our island.",
    position: 2.9,
  },
  {
    id: 1,
    name: "Sean",
    text: "We are members of Chingu Voyage 43 and this is a project we built during 6 weeks sprint.",
    position: 3.7,
  },
  {
    id: 2,
    name: "Jane",
    text: "You can navigate on our island by clicking buttons in our navigation on the left",
    position: 4.7,
  },
  {
    id: 3,
    name: "Szymon",
    text: "Or just use your mouse or trackpad to scroll",
    position: 5.3,
  },
  {
    id: 4,
    name: "Zoran",
    text: "Enjoy!",
    position: 6.7,
  },
];

const BubbleDialogue = () => {
  // Dialogue Index State
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueIsOpen, setDialogueIsOpen] = useState(false);

  // "Next" button handler
  const clickHandler = (position) => {
    // if (dialogueIndex < 4) {
    //   setDialogueIndex(dialogueIndex + 1);
    // } else {
    //   setDialogueIndex(0);
    // }

    cameraMovementSheet.sequence.play({
      range: [cameraMovementSheet.sequence.position, position],
      rate: 0.3,
    });
  };

  // Theatre.js
  const obj = cameraMovementSheet.object("Bubble Dialogue", {
    index: "0",
    visible: false,
  });

  useEffect(() => {
    return obj.onValuesChange((obj) => {
      setDialogueIndex(obj.index);
      if (obj.visible == true) {
        setDialogueIsOpen(true);
      } else {
        setDialogueIsOpen(false);
      }
    });
  }, [obj]);

  return (
    <>
      <AnimatePresence>
        {dialogueIsOpen && (
          <motion.div
            variants={bubbleContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            key={`${dialogueIndex}-dialogue`}
            className={`bubble-container bubble-container_${dialogueIndex}`}
          >
            <p>
              <span>{dialogueOptions[dialogueIndex].name}: </span>
              {dialogueOptions[dialogueIndex].text}
            </p>
            <button
              onClick={() =>
                clickHandler(dialogueOptions[dialogueIndex].position)
              }
            >
              Next
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BubbleDialogue;
