import React from "react";
import Character from "./Character";

const Characters = () => {
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
    </>
  );
};

export default Characters;
