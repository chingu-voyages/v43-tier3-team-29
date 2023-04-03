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
      position={[-7.5, -0.63,4]}
      rotation-y={4}
      object={fox.scene}
    />
  );
};

export default Animal;
