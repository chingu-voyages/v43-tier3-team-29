import { useGLTF } from "@react-three/drei";

const Animal = () => {
  // Fox
  const cat = useGLTF("./models/animal/fox.glb");
  return (
    <primitive
      scale={0.01}
      position={[-8, -0.63, 3.5]}
      rotation-y={0.8}
      object={cat.scene}
    />
  );
};

export default Animal;
