import * as THREE from "three";
import React,{useEffect} from "react";
import { useState, useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { Bounds } from "@react-three/drei";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useThree, useFrame } from "@react-three/fiber";

function CameraController({ targetRef, children }) {
  const { camera } = useThree();
  const [focused, setFocused] = useState(false);

  useFrame(() => {
    if (focused && targetRef.current) {
      const screenPosition = new THREE.Vector3(0.225, 0.95, -0.25);
      targetRef.current.localToWorld(screenPosition);
      const offset = new THREE.Vector3(0, 0, -1); // Adjust the offset values to set the camera distance from the screen
      const targetPosition = screenPosition.clone().add(offset);
      camera.position.lerp(targetPosition, 0.020);
      camera.lookAt(screenPosition);
    }
  });

  return (
    <group>
      {React.cloneElement(children, {
        ref: targetRef,
        onClick: () => setFocused(!focused),
      })}
    </group>
  );
}

export function WorkStation() {
  const tableModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/table-wood/model.gltf"
  );
  const chairModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf"
  );
  const laptopModel = useGLTF("./models/laptop/laptop.glb");

  // Change browser tabs
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const getIframeSource = () => {
    switch (activeTab) {
      case 1:
        return "https://danneytrieu.design/";
      case 2:
        return "https://nam-cung.com/";
      case 3:
        return "https://www.vrarlesfestival.com/";
      case 4:
        return "https://bloquo.cc/";
      default:
        return "https://danneytrieu.design/";
    }
  };

  const laptopRef = useRef();
  

  return (
    // <Bounds fit clip observe margin={0.5}>
    <CameraController targetRef={laptopRef}>
      <primitive
        position={[4.3, -0.7, 7.4]}
        rotation={[0, -Math.PI + 0.6, 0]}
        object={tableModel.scene}
      >
        <primitive
          object={chairModel.scene}
          position={[-0.3, 0, 1.2]}
          scale={"0.7"}
        />
        <primitive
          object={laptopModel.scene}
          position={[0, 0.75, 0.2]}
          scale={0.3}
        >
          <Html
            transform
            wrapperClass="browser"
            distanceFactor={0.97}
            position={[0.025, 0.85, -0.65]}
            rotation-x={0}
            occlude={true}
          >
            <div className="browser-tab">
              <button
                onClick={() => handleTabClick(1)}
                className={activeTab === 1 ? "active" : ""}
              >
                Project 1
                <a target="_blank" href="https://danneytrieu.design/">
                  <MdOutlineOpenInNew />
                </a>
              </button>
              <button
                onClick={() => handleTabClick(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                Project 2
                <a target="_blank" href="https://nam-cung.com/">
                  <MdOutlineOpenInNew />
                </a>
              </button>
              <button
                onClick={() => handleTabClick(3)}
                className={activeTab === 3 ? "active" : ""}
              >
                Project 3
                <a target="_blank" href="https://www.vrarlesfestival.com/">
                  <MdOutlineOpenInNew />
                </a>
              </button>
              <button
                onClick={() => handleTabClick(4)}
                className={activeTab === 4 ? "active" : ""}
              >
                Project 4
                <a target="_blank" href="https://bloquo.cc/">
                  <MdOutlineOpenInNew />
                </a>
              </button>
            </div>
            <iframe title={`project ${activeTab}`} src={getIframeSource()} />
          </Html>
        </primitive>
      </primitive>
    </CameraController>

    // </Bounds>
  );
}
