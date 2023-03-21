import React from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import * as THREE from 'three'
import { render, events, extend } from '@react-three/fiber'
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";
import Intro from './Intro'

export default function App() {
  return (
    <>
      <color args={["#111111"]} attach="background" />
      <Perf />
      <OrbitControls makeDefault target={[0, 0, 5]} />
      <ambientLight intensity={0.02} />
      <Experience/>
      {/* <Effects /> */}
    </>
  );
}
