import React from "react";
import { Html } from "@react-three/drei";
import { useState } from "react";

// Dialogue text
const dialogueOptions = [
  {
    id: 0,
    name: "Danney",
    text: "Hello! We are happy to see you on our island.",
    position: [-10.5, 2.4, 23],
  },
  {
    id: 1,
    name: "Sean",
    text: "We are members of Chingu Voyage 43 and this is a project we built during 6 weeks sprint.",
    position: [-9.5, 2, 24.5],
  },
  {
    id: 2,
    name: "Jane",
    text: "You can navigate on our island by clicking buttons in our navigation on the left",
    position: [-14.3, 2.1, 22],
  },
  {
    id: 3,
    name: "Szymon",
    text: "Or just use your mouse or trackpad to scroll",
    position: [-13.1, 1.9, 21.7],
  },
  {
    id: 4,
    name: "Zoran",
    text: "Enjoy!",
    position: [-11.8, -1, 24.6],
  },
];

const BubbleDialogue = () => {
  const [dialogue, setDialogue] = useState(dialogueOptions[0]);

  // "Next" button handler
  const clickHandler = () => {
    if (dialogue.id < 4) {
      setDialogue(dialogueOptions[dialogue.id + 1]);
    }
  };

  return (
    <Html
      wrapperClass={`bubbleContainer bubbleContainer_${dialogue.id}`}
      position={dialogue.position}
      distanceFactor={6}
    >
      <p>
        <span>{dialogue.name}: </span>
        {dialogue.text}
      </p>
      <button onClick={clickHandler}>Next</button>
    </Html>
  );
};

export default BubbleDialogue;
