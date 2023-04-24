import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Character = ({ path, scale, position, rotation, actionName }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(path);

  // Animations
  const { actions } = useAnimations(animations, group);

  // Animate
  useEffect(() => {
    const action = actions[actionName];
    if (actionName === "Waving") {
      action.reset().fadeIn(0.5).play();
    } else {
      action.reset().fadeIn(0.5).play();
    }

    return () => {
      action.fadeOut(0.5);
    };
  }, [actionName]);

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
            frustumCulled={false}
          />
        </group>
      </group>
    </group>
  );
};

export default Character;
