import { useGLTF } from "@react-three/drei";

const Human = () => {
  // Cartoon girl
  const girl = useGLTF("./models/human/cartoon_girl.glb");
  return (
    <primitive
      scale={0.9}
      position={[-2, -0.63, 1]}
      rotation-y={-2.5}
      object={girl.scene}
    />
  );
};

export default Human;
