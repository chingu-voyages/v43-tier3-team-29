import React, { useState, useRef, useEffect } from "react";

import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import {getProject, val} from '@theatre/core'
import {editable as e, SheetProvider} from '@theatre/r3f'

import { Model as CampfireModel } from "./CampfireModel" 
import animationState from "./Chingu29.theatre-project-state.json"

// use this first line if you don't have a saved json yet
// const campFireSheet = getProject('Chingu29').sheet('Campfire');

const campFireSheet = getProject("Chingu29", {state: animationState}).sheet("Campfire");

// add another sheet to animate something else
// const generalSheet = getProject("Demo Project", {state: animationState}).sheet("General Sheet"); 

if (process.env.NODE_ENV === 'development') {
  studio.initialize()
  // the extension is loaded so we can work with r3f. Commented because it causes issues with hot reload
  //studio.extend(extension)
  studio.ui.hide();
}

export default function Campfire() {

  useEffect(() => {    
    campFireSheet.project.ready.then(() => campFireSheet.sequence.play({ rate: 1, iterationCount: Infinity, range: [0, 3.31]}))    
  }, [])

  return (
    <>
      <SheetProvider sheet={campFireSheet}>
        <e.pointLight
          theatreKey="campFireLight"
          distance={20}
          castShadow
          shadow-bias={-0.0001}
          position={[-0.5, 0.7, -0.5]}
          color={0xff7700}
          intensity={1.5}
        />
      </SheetProvider> 
      <CampfireModel />
    </>    
  );
}