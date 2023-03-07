import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <OrbitControls />
    </>
  );
};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Scene />
    </Canvas>
  );
}
