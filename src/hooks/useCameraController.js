import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function useCameraController(
  targetRef,
  focused,
  setFocused,
  setHtmlVisible
) {
  const { camera } = useThree();
  const initialCameraPosition = useRef(null);

  useEffect(() => {
    // Create an invisible box that surrounds an object and use to detect if an object is within the camera's view.
    const boundingBox = new THREE.Box3().setFromObject(targetRef.current);
    targetRef.current.boundingBox = boundingBox;

    // Handle click events on the window
    const handleClick = (event) => {
      // Calculate normalized mouse coordinates
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      // Create a new raycaster and set its origin from the camera and mouse coordinates
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with the target object
      const intersects = raycaster.intersectObject(targetRef.current, true);
      if (intersects.length === 0 && focused) {
        setFocused(false);
        setHtmlVisible(false);
      }
    };

    // Listen for event click and clean up when the component is unmounted
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [focused, setFocused, setHtmlVisible, targetRef, camera]);

  // Update camera position and lookAt depending on the focused state
  useFrame(() => {
    // Store the initial camera position when available
    if (!initialCameraPosition.current) {
      initialCameraPosition.current = camera.position.clone();
    }

    // If the workstation is focused, move the camera closer and look at the laptop screen
    if (focused && targetRef.current) {
      const screenPosition = new THREE.Vector3(0.3, 0.95, 0);
      targetRef.current.localToWorld(screenPosition);
      const offset = new THREE.Vector3(-0.2, 0.05, -1);
      const targetPosition = screenPosition.clone().add(offset);
      camera.position.lerp(targetPosition, 0.02);
      camera.lookAt(screenPosition);
      // If not focused, move the camera back to the initial position
    } else {
      camera.position.lerp(initialCameraPosition.current, 0.03);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });
}
