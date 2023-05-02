import { Html, useGLTF } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";

function Board(props) {
  const boardModel = useGLTF("/models/board/board.glb");

  return (
    <e.group theatreKey="board">
      <primitive
        object={boardModel.scene}
        position={[-12.5, -0.05, -8.2]}
        scale={7}
        rotation={[0, 0.95, 0]}
      >
        <Html
          transform
          distanceFactor={0.1}
          position-x={-0.002}
          position-y={0.01}
          position-z={-0.028}
          rotation-y={Math.PI}
        >
          <div className="board">
            <p className="board-title">Our Stacks:</p>
            <ul className="board-list">
              <li>React</li>
              <li>React-fiber</li>
              <li>Fiber-drei</li>
              <li>Threatre</li>
              <li>Framer-motion</li>
              <li>Zustand</li>
              <li>Leva</li>
              <li>Vite</li>
            </ul>
          </div>
        </Html>
      </primitive>
    </e.group>
  );
}

export default Board;
