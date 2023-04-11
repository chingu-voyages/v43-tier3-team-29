import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Animal = () => {
  // Fox
  const fox = useGLTF("./models/animal/fox_sitting.glb");

  // Animations
  // const animations = useAnimations(fox.animations, fox.scene);

  // Animate
  // useEffect(() => {
  //   const action = animations.actions["Survey"];
  //   action.play();
  // }, []);

  return (
    <primitive
      scale={0.3}
      position={[16.4, 10.7, 13]}
      rotation-y={-2}
      object={fox.scene}
    />
  );
};

export default Animal;
