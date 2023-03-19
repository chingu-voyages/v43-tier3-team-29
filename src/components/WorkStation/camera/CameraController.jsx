import React from "react";
import { useCameraController } from "../../../hooks/useCameraController";

export function CameraController({
  targetRef,
  children,
  focused,
  setHtmlVisible,
  setFocused,
}) {
  useCameraController(targetRef, focused, setFocused, setHtmlVisible);

  return (
    // Create a group element and set its ref to targetRef
    <group ref={targetRef}>
      {React.cloneElement(children, {
        onClick: (e) => {
          e.stopPropagation();
          setFocused(!focused);
          setHtmlVisible((prevHtmlVisible) => !prevHtmlVisible);
        },
      })}
    </group>
  );
}
