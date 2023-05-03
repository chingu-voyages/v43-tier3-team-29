import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";

// Performance
import { Perf } from "r3f-perf";

// Post precessing
import { Effects } from "./components/PostProcessing/Effects";

// Theatre js
import { editable as e, SheetProvider } from "@theatre/r3f";
import { cameraMovementSheet } from "./animation/theatre";

// Overlay
import Navbar from "./components/Overlay/Navbar";
import SectionDetails from "./components/Overlay/SectionDetails";

// Custom cursor
import CustomCursor from "./components/CustomCursor";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "./store/store";

export default function App({ ready }) {
  const [soundLevel, cursorType, updateCursorType, updateActiveNav] = useStore(
    (store) => [
      store.soundLevel,
      store.cursorType,
      store.updateCursorType,
      store.updateActiveNav,
    ],
    shallow
  );

  const handleClick = () => {
    // Sequence stops: team1, team2, team3, team4, team5, stack
    const stops = [0.6, 2.1, 3.1, 3.8, 4.7, 5.3, 6.1, 6.7, 7.8, 9, 11];

    if (cursorType === "custom") {
      const nextStop = stops.find(
        (stop) => stop > cameraMovementSheet.sequence.position
      );

      if (nextStop < 2.1 || !nextStop) {
        updateActiveNav("about");
      } else if (nextStop < 6.7) {
        updateActiveNav("team");
      } else if (nextStop < 7.8) {
        updateActiveNav("stack");
      } else if (nextStop < 9) {
        updateActiveNav("portfolio");
      } else {
        updateActiveNav("credits");
      }

      if (cameraMovementSheet.sequence.position < stops[stops.length - 1]) {
        cameraMovementSheet.sequence.play({
          range: [cameraMovementSheet.sequence.position, nextStop],
          rate: 0.3,
        });
      } else {
        cameraMovementSheet.sequence.play({
          range: [0, stops[0]],
          rate: 0.3,
        });
      }
    }
  };

  return (
    <>
      {/* Canvas */}
      <Canvas
        shadows
        onMouseEnter={() => updateCursorType("custom")}
        onMouseLeave={() => updateCursorType("pointer")}
        onClick={handleClick}
      >
        <color args={["#111111"]} attach="background" />
        {/* <Perf position="top-left" /> */}
        <SheetProvider sheet={cameraMovementSheet}>
          <Experience ready={ready} soundLevel={soundLevel} />
        </SheetProvider>
        <Effects />
      </Canvas>

      {/* Overlay */}
      <Navbar />
      <SectionDetails />

      {/* Custom cursor */}
      <CustomCursor />
    </>
  );
}
