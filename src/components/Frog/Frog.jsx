import { useGLTF } from '@react-three/drei';

const Frog = () => {
  const frog = useGLTF('./models/frog/Frog.glb');

  return <primitive scale={0.2} object={frog.scene}></primitive>;
};

export default Frog;
