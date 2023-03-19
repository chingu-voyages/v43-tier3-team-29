import { GradientTexture } from "@react-three/drei";

export default function Background() {
  return (
    <mesh>
      <icosahedronGeometry args={[40, 5]} />
      <meshBasicMaterial side={1}>
        <GradientTexture
          stops={[0, 0.25, 0.4, 0.5, 1]}
          colors={["#0F1B33", "#263B5E", "#1E2C4F", "#0D0D2A", "#0D0D2A"]}
        />
      </meshBasicMaterial>
    </mesh>
  );
}
