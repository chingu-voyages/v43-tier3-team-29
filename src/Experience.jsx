import React, { useState, Suspense, useEffect } from "react";
import { AudioLoader } from "three";
import { PositionalAudio } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { WorkStation } from "./components/WorkStation/WorkStation";
import { CustomText3D } from "./components/CustomText3D/CustomText3D";
import Island from "./components/Island/Island";
import Campfire from "./components/Campfire/Campfire";
import Animal from "./components/Animal/Animal";
import Character from "./components/Character/Character";
import Background from "./components/Background/Background";
import Lights from "./components/Lights/Lights";
import RandomClouds from "./components/RandomClouds/RandomClouds";
import { useControls } from "leva";
import Board from "./components/Board/Board";

export function Experience() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // without this, the PositionalAudio causes an error
    setTimeout(() => setReady(true), 2000);
  }, []);

  // Hemisphere Light Leva controls props
  const hemisphereLightProps = useControls("Hemisphere Light", {
    skyColor: { value: "#ffffff" },
    groundColor: { value: "#919191" },
    intensity: { value: 0.1, min: 0, max: 1, step: 0.05 },
  });

  return (
    <Suspense fallback={null}>
      <hemisphereLight {...hemisphereLightProps} />

      <CustomText3D text="Portfolio" />

      <group position={[0, 0, 0]}>
        <RandomClouds amount={10} />
        {ready && (
          <PositionalAudio autoplay loop url="audio/Wind.mp3" distance={1} />
        )}
      </group>

      <group position={[0, -11.9, 0]}>
        <Island />

        {ready && (
          <PositionalAudio
            autoplay
            loop
            url="audio/Crickets.mp3"
            distance={3}
          />
        )}
      </group>

      <group position={[-3, -1, 2]}>
        <Campfire />
        {ready && (
          <PositionalAudio autoplay loop url="audio/Fire.mp3" distance={0.7} />
        )}
      </group>

      <WorkStation />
      <Animal />
      {/* Character 1 / Danney */}
      <Character
        path="./models/human/character_01_final-v1-transformed.glb"
        scale={1.2}
        position={[-11, -1, 23]}
        rotation={[0, -0.3, 0]}
        actionName="Idle"
      />
      <Lights />
      <Background />
      <Board />
    </Suspense>
  );
}

// without this PositionalAudio generates an error
// need to understand why this is necessary, and it's not in the example https://codesandbox.io/s/gkfhr?file=/src/App.js
useLoader.preload(AudioLoader, "audio/Fire.mp3");
useLoader.preload(AudioLoader, "audio/Crickets.mp3");
useLoader.preload(AudioLoader, "audio/Wind.mp3");
