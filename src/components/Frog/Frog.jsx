import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Frog = () => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "./models/frog/Frog-v1-transformed.glb"
  );
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play the action
    actions[names[2]].reset().play();
  }, []);

  return (
    <group ref={group} position={[-14, -1.2, -6]} rotation-y={4.2} scale={0.2}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="FrogArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.root} />
          </group>
          <group
            name="Frog"
            position={[-0.01, 0.05, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Frog_1"
              geometry={nodes.Frog_1.geometry}
              material={materials.Green}
              skeleton={nodes.Frog_1.skeleton}
            />
            <skinnedMesh
              name="Frog_2"
              geometry={nodes.Frog_2.geometry}
              material={materials.Yellow}
              skeleton={nodes.Frog_2.skeleton}
            />
            <skinnedMesh
              name="Frog_3"
              geometry={nodes.Frog_3.geometry}
              material={materials.Red}
              skeleton={nodes.Frog_3.skeleton}
            />
            <skinnedMesh
              name="Frog_4"
              geometry={nodes.Frog_4.geometry}
              material={materials.Black}
              skeleton={nodes.Frog_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default Frog;
