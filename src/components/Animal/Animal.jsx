import { useGLTF } from "@react-three/drei";

const Animal = () => {
  // White cat
  const cat = useGLTF("./models/animal/whiteCat.glb");
  return (
    <primitive
      scale={0.15}
      position={[2, -0.87, 3.5]}
      rotation-y={0.3}
      object={cat.scene}
    />
  );
};

export default Animal;
