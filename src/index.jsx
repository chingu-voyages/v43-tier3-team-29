import React, { useState, useEffect } from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";
import { BsFillMouseFill, BsMouse } from "react-icons/bs";

function App() {
  const [isScroll, setIsScroll] = useState(false);
  const scrollTimeoutDuration = 500; // Duration after which isScroll will be set to false

  const handleScroll = (e) => {
    if (e.deltaY !== 0) {
      setIsScroll(true);
      // Clear existing timeout
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      // Set a new timeout to reset isScroll back to false
      window.scrollTimeout = setTimeout(() => {
        setIsScroll(false);
      }, scrollTimeoutDuration);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-container">
        {isScroll ? <BsFillMouseFill /> : <BsMouse />}
      </div>

      <Canvas
        shadows
        camera={{
          position: [-5, 18, -50],
          fov: 35,
        }}
      >
        <color args={["#111111"]} attach="background" />
        {/* <Perf /> */}
        <OrbitControls makeDefault target={[0, 0, 5]} />
        <ambientLight intensity={0.02} />
        <pointLight
          distance={26}
          castShadow
          shadowBias={-0.0001}
          position={[-5, 4, 1]}
        />
        <Experience />
        {/* <Effects /> */}
      </Canvas>
    </>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);
