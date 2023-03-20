import React from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";

function App() {
  return (
    <Canvas shadows camera={{ position: [-2, 3, -6], fov: 65 }}>
      <color args={["#111111"]} attach="background" />
      <Perf />
      <OrbitControls makeDefault target={[0, 0, 5]} />
      <ambientLight intensity={0.02} />
      <pointLight
        distance={26}
        castShadow
        shadow-bias={-0.0001}
        position={[-5, 4, 1]}
      />
      <Experience />
      {/* <Effects /> */}
    </Canvas>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);
