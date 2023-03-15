import React from "react";
import { useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { Bounds } from "@react-three/drei";

export function WorkStation() {
  const tableModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/table-wood/model.gltf"
  );
  const chairModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf"
  );
  const laptopModel = useGLTF("./models/laptop/laptop.glb");

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
  return (
    // <Bounds fit clip observe margin={0.5}>
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
              </button>
              <button
                onClick={() => handleTabClick(2)}
                className={activeTab === 2 ? "active" : ""}
              >
                Project 2
              </button>
              <button
                onClick={() => handleTabClick(3)}
                className={activeTab === 3 ? "active" : ""}
              >
                Project 3
              </button>
              <button
                onClick={() => handleTabClick(4)}
                className={activeTab === 4 ? "active" : ""}
              >
                Project 4
              </button>
            </div>
            <iframe title={`project ${activeTab}`} src={getIframeSource()} />
          </Html>
        </primitive>
      </primitive>
    // </Bounds>
  );
}
