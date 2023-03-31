import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Character = ({ path, scale, position, rotation, actionName }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(path);

  // Animations
  const { actions } = useAnimations(animations, group);

  // Animate
  useEffect(() => {
    const action = actions[actionName];
    action.play();
  }, []);

  return (
    <group
      ref={group}
      scale={scale}
      position={position}
      rotation={rotation}
      dispose={null}
    >
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Character"
            geometry={nodes.Character.geometry}
            material={materials.material}
            skeleton={nodes.Character.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

export default Character;
