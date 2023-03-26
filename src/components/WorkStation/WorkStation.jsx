import React, { useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { MdOutlineOpenInNew } from "react-icons/md";

export function WorkStation() {
  const [htmlVisible, setHtmlVisible] = useState(true);

  // Render the Html element
  const renderHtml = (visible) => {
    return (
      <Html
        transform
        wrapperClass="browser"
        distanceFactor={0.97}
        position={[0.025, 0.85, -0.65]}
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
    );
  };

  // Import the 3D models for the table, chair, and laptop
  const tableModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/table-wood/model.gltf"
  );
  const chairModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf"
  );
  const laptopModel = useGLTF("./models/laptop/laptop.glb");

  // Function to handle tab clicks and update the activeTab state
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // Function to get the iframe source URL based on the active tab
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
    <group position={[1, -0.7, 2]} rotation={[0, -Math.PI + 0.8, 0]}>
      <primitive object={tableModel.scene} />
      <primitive
        object={chairModel.scene}
        position={[-0.2, 0, 1.2]}
        scale={"0.7"}
      />
      <primitive
        object={laptopModel.scene}
        position={[0, 0.75, 0.3]}
        scale={0.3}
      >
        {renderHtml(htmlVisible)}
      </primitive>
    </group>
  );
}