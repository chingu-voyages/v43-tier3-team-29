import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Animal = () => {
  // Fox
  const fox = useGLTF("./models/animal/fox.glb");

  // Animations
  const animations = useAnimations(fox.animations, fox.scene);

  // Animate
  useEffect(() => {
    const action = animations.actions["Survey"];
    action.play();
  }, []);

  return (
    <primitive
      scale={0.01}
      position={[-8, -0.63, 3.5]}
      rotation-y={0.8}
      object={fox.scene}
    />
  );
};

export default Animal;
