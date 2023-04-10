import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";
import { ScrollingIcon } from "./components/ScrollingIcon/ScrollingIcon";

import { editable as e, SheetProvider } from "@theatre/r3f";
import { cameraMovementSheet } from "./animation/theatre";

// Overlay
import Navbar from "./components/Overlay/Navbar";
import SectionDetails from "./components/Overlay/SectionDetails";
import BubbleDialogue from "./components/Overlay/BubbleDialogue";

export default function App() {
  return (
    <>
      <ScrollingIcon scrollTimeoutValue={300} />
      <Canvas
        shadows
        // camera={{
        //   position: [-5, 20, -110],
        //   fov: 35,
        // }}
      >
        <color args={["#111111"]} attach="background" />
        {/* <OrbitControls makeDefault target={[0, 0, 5]} zoomSpeed={0.25} /> */}
        <Perf position="top-left" />
        {/* <ambientLight color={0x217dc4} intensity={0.05} /> */}
        <SheetProvider sheet={cameraMovementSheet}>
          <ScrollControls
            infinite
            pages={4}
            distance={2}
            maxSpeed={0.3}
            damping={0.35}
          >
            <Experience />
          </ScrollControls>
        </SheetProvider>
        <Effects />
      </Canvas>

      {/* Overlay */}
      <Navbar />
      <SectionDetails />
      <BubbleDialogue />
    </>
  );
}
