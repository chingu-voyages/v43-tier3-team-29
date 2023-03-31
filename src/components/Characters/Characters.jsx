import React from "react";
import Character from "./Character";

// Temp
import { useGLTF } from "@react-three/drei";

const Characters = () => {
  // Temp Props
  const chair = useGLTF("./models/tempProps/chair-v1-transformed.glb");
  const cooler = useGLTF("./models/tempProps/cooler-v1-transformed.glb");

  return (
    <>
      {/* Character 1 / Danney */}
      <Character
        path="./models/characters/character_01_final-v1-transformed.glb"
        scale={1.2}
        position={[-11, -1, 23]}
        rotation={[0, -0.3, 0]}
        actionName="Idle"
      />
      {/* Character 2 / Sean */}
      <Character
        path="./models/characters/character_02_final-v1-transformed.glb"
        scale={1.2}
        position={[-9.5, -0.62, 24.5]}
        rotation={[1.6, 0, 1]}
        actionName="Sitting"
      />
      {/* Character 3 / Szymon */}
      <Character
        path="./models/characters/character_03_final-v1-transformed.glb"
        scale={1.2}
        position={[-13.2, -1.1, 21.7]}
        rotation={[1.6, 0, 0]}
        actionName="SittingRelaxed"
      />
      {/* Character 4 / Jane */}
      <Character
        path="./models/characters/character_04_final-v1-transformed.glb"
        scale={1.2}
        position={[-12, -1.03, 22]}
        rotation={[1.6, 0, 0.75]}
        actionName="SittingTalking"
      />

      {/* Chairs */}
      <mesh
        geometry={chair.nodes.SM_Prop_Deckchair_01_1.geometry}
        material={chair.materials.PolygonTown_01_A}
        scale={1.1}
        position={[-13.2, -1.1, 21.6]}
      />
      <mesh
        geometry={chair.nodes.SM_Prop_Deckchair_01_1.geometry}
        material={chair.materials.PolygonTown_01_A}
        scale={1.1}
        position={[-12, -1, 22]}
        rotation-y={-0.3}
      />

      {/* Cooler */}
      <mesh
        geometry={cooler.nodes.SM_Prop_Cooler_01_1.geometry}
        material={cooler.materials.PolygonTown_01_A}
        scale={1}
        position={[-12.5, -1.12, 21.5]}
        rotation-y={-0.3}
      />
    </>
  );
};

export default Characters;