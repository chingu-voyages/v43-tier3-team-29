import React, { useState, useRef, useEffect } from "react";
import { useControls } from 'leva'

import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import {getProject, val} from '@theatre/core'
import {editable as e, SheetProvider} from '@theatre/r3f'

import { Model as CampfireModel } from "./CampfireModel" 
import InstancedParticles from './InstancedParticles/InstancedParticles'
import Sparks from './Sparks/Sparks' 
import animationState from "./Chingu29.theatre-project-state.json"

// use this first line if you don't have a saved json yet
// const campFireSheet = getProject('Chingu29').sheet('Campfire');

const campFireSheet = getProject("Chingu29", {state: animationState}).sheet("Campfire");

// add another sheet to animate something else
// const generalSheet = getProject("Demo Project", {state: animationState}).sheet("General Sheet"); 

if (process.env.NODE_ENV === 'development') {
  studio.initialize()
  // the extension is loaded so we can work with r3f. Commented because it causes issues with hot reload
  studio.extend(extension)
  studio.ui.hide();
}

export default function Campfire() {
/*   const props = useControls({
    focus: { value: 5.1, min: 3, max: 7, step: 0.01 },
    speed: { value: 2, min: 0.1, max: 100, step: 0.1 },
    aperture: { value: 1.8, min: 1, max: 5.6, step: 0.1 },
    fov: { value: 50, min: 0, max: 200 },
    curl: { value: 0.25, min: 0.01, max: 0.5, step: 0.01 }
  }) */
  const props = useControls({ 
    range: { value: 250, min: 0, max: 300, step: 10 } 
  })

  useEffect(() => {    
    campFireSheet.project.ready.then(() => campFireSheet.sequence.play({ rate: 1, iterationCount: Infinity, range: [0, 3.31]}))    
  }, [])

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
          <Sparks count={20} colors={['#edad2d', '#fdc555', '#e9bf6b', '#ebd4a7']} />
        </e.group>
      </SheetProvider> 
      <CampfireModel />
    </>    
  );
}