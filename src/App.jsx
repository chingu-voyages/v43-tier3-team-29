import { Canvas } from '@react-three/fiber'
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Experience } from "./Experience";
import { Effects } from "./components/PostProcessing/Effects";

export default function App() {
  return (
    <Canvas
      shadows
      camera={{
        position: [-5, 18, -50],
        fov: 35,
      }}
    >
      <color args={["#111111"]} attach="background" />
      <Perf />
      <OrbitControls makeDefault target={[0, 0, 5]} />
      <ambientLight color={0x217dc4} intensity={0.05} />
      <Experience/>
      {/* <Effects /> */}
    </Canvas>
  );
}
