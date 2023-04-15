import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";

import { editable as e, SheetProvider } from "@theatre/r3f";
import { cameraMovementSheet } from "./animation/theatre";

// Overlay
import Navbar from "./components/Overlay/Navbar";
import SectionDetails from "./components/Overlay/SectionDetails";

export default function App() {
  return (
    <>
      <Canvas shadows>
        <color args={["#111111"]} attach="background" />
        <Perf position="top-left" />
        <SheetProvider sheet={cameraMovementSheet}>
          <Experience />
        </SheetProvider>
        <Effects />
      </Canvas>

      {/* Overlay */}
      <Navbar />
      <SectionDetails />
    </>
  );
}
