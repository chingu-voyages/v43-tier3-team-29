import React from "react";
import "./style.css";
import { createRoot } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";

function App() {
  return (
    <Canvas>
      <color args={["#1E1E1E"]} attach="background" />
      <Perf />
      <OrbitControls makeDefault />
      <ambientLight intensity={0.1} />
      <directionalLight />
      <Experience />
    </Canvas>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);
