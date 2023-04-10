import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

const Frog = () => {
  const frogRef = useRef();
  const frog = useGLTF('./models/frog/Frog.glb');
  const { actions, names, mixer } = useAnimations(frog.animations, frogRef);
  // Get time from
  const { clock, scene } = useThree();
  const timing = useRef();

  useEffect(() => {
    // store time
    actions[names[3]].setDuration(1.2);

    // Play the action
    actions[names[3]].reset().fadeIn(0.5).play();

    // Store time of the finished jump animation
    mixer.addEventListener('loop', () => {
      timing.current = clock.elapsedTime;
      // Rotate the frog from the array of moves
      frogRef.current.rotation.y += 0.5;

      console.log(frogRef);
    });
  }, []);

  useFrame(({ clock, raycaster }) => {
    if (
      actions[names[3]].isRunning() &&
      // Wait a little bit for when the frog is up in the air
      clock.elapsedTime - timing.current > 0.35 &&
      // Don't move when it hits the ground
      clock.elapsedTime - timing.current < 1
    ) {
      raycaster.ray.direction.set(0, -1, 0);
      const intersections = raycaster.intersectObjects(scene.children, true);
      console.log(intersections);
      if (intersections.length > 0) {
        // Check if the distance to the nearest intersection is less than or equal to the frog's scale (radius)
        if (intersections[0].distance <= frogRef.current.scale.y) {
          // The frog is touching the surface below it
          console.log('Frog is on the ground');
        }
      }

      const direction = new Vector3();
      frogRef.current.getWorldDirection(direction);
      direction.normalize();
      // rotate the frog randomly

      // move the frog in the right direction, according to the rotation

      // stagger the animation, so frog moves when it actually is in the
      frogRef.current.position.add(
        direction.multiplyScalar(4 * clock.getDelta())
      );
    }
  });

  return (
    <primitive
      ref={frogRef}
      position={[-9.7, -1.2, -7.2]}
      rotation-y={2}
      scale={0.2}
      object={frog.scene}
    ></primitive>
  );
};

export default Frog;

const frogRotations = [];
