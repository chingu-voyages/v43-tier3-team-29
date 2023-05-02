import React, { useEffect } from "react";

import { editable as e, SheetProvider } from "@theatre/r3f";
import { campFireSheet } from "../../animation/theatre";

import { Model as CampfireModel } from "./CampfireModel";
import InstancedParticles from "./InstancedParticles/InstancedParticles";
import Sparks from "./Sparks/Sparks";

export default function Campfire() {
  const props = {
    range: 250,
  };

  useEffect(() => {
    campFireSheet.project.ready.then(() =>
      campFireSheet.sequence.play({
        rate: 1,
        iterationCount: Infinity,
        range: [0, 3.31],
      })
    );
  }, []);

  return (
    <>
      <SheetProvider sheet={campFireSheet}>
        <e.pointLight
          theatreKey="campFireBlueLight"
          distance={20}
          position={[-0.5, 5.7, -0.5]}
          color={0x217dc4}
          intensity={1.5}
        />
        <e.pointLight
          theatreKey="campFireLight"
          distance={20}
          castShadow
          shadow-bias={-0.0001}
          position={[-0.5, 0.7, -0.5]}
          color={0xff7700}
          intensity={1.5}
        />
        <e.group theatreKey="particles" position={[-0.5, 2.5, -0.5]}>
          <InstancedParticles {...props} />
        </e.group>
        <e.group theatreKey="particlesSparks" position={[-0.5, 0.5, -0.5]}>
          <Sparks
            count={10}
            colors={["#edad2d", "#fdc555", "#e9bf6b", "#ebd4a7"]}
          />
        </e.group>
      </SheetProvider>
      <CampfireModel />
    </>
  );
}
