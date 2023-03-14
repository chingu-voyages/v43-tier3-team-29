import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Foo from "./components/Foo";

const Scene = () => {
  return (
    <>
      <Foo />
      <OrbitControls makeDefault />
    </>
  );
};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Scene />
      {/* <Perf /> */}
    </Canvas>
  );
}
