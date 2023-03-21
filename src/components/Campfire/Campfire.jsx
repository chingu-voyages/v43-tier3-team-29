import React, { useState, useRef } from "react";
import { Model as CampfireModel } from "./CampfireModel" 

export default function Campfire() {
  return (
    <>
      <pointLight
        distance={16}        
        position={[10, 5, 4]}
        color={0xfbb741}
        intensity={0.2}
      />
      <pointLight
        distance={16}        
        position={[-15, 5, 4]}
        color={0xfbb741}
        intensity={0.2}
      />      
      <pointLight
        distance={16}        
        position={[5, 5, 14]}
        color={0xfbb741}
        intensity={0.2}
      />
      <pointLight
        distance={16}        
        position={[-10, 5, 14]}
        color={0xfbb741}
        intensity={0.2}
      />
      <group position={[-3, -1, 2]}>
        <pointLight
          distance={20}
          castShadow
          shadow-bias={-0.0001}
          position={[0, 1.3, 0]}
          color={0xff7700}
          intensity={2}
        />
        <CampfireModel />
      </group>
    </>
  );
}