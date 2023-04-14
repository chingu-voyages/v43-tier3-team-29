import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';

const Frog = () => {
  const frogRef = useRef();
  const frog = useGLTF('./models/frog/Frog.glb');
  const { actions, names } = useAnimations(frog.animations, frogRef);
  // Get time from

  useEffect(() => {
    // Play the action
    actions[names[2]].reset().play();
  }, []);

  return (
    <primitive
      ref={frogRef}
      position={[-14, -1.2, -6]}
      rotation-y={4.2}
      scale={0.2}
      object={frog.scene}
    ></primitive>
  );
};

export default Frog;
