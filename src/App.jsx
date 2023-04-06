import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";
import { ScrollingIcon } from "./components/ScrollingIcon/ScrollingIcon";

// Overlay
import Navbar from "./components/Overlay/Navbar";
import MobileNav from "./components/Overlay/MobileNav";

export default function App() {
  return (
    <>
      <ScrollingIcon scrollTimeoutValue={300} />
      <Canvas
        shadows
        camera={{
          position: [-5, 20, -110],
          fov: 35,
        }}
      >
        <color args={["#111111"]} attach="background" />
        <OrbitControls makeDefault target={[0, 0, 5]} zoomSpeed={0.25} />
        <Perf position="top-left" />
        <ambientLight color={0x217dc4} intensity={0.05} />
        {/* <Experience /> */}
        {/* <Effects /> */}
      </Canvas>
      <Navbar />
    </>
  );
}
