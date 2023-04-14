import { Html, useGLTF } from '@react-three/drei';
import { editable as e } from '@theatre/r3f';

function Board(props) {
  const boardModel = useGLTF('/models/board/board.glb');

  return (
    <e.group theatreKey='board'>
      <primitive
        object={boardModel.scene}
        position={[-12.5, -0.05, -8.2]}
        scale={7}
        rotation={[0, 0.95, 0]}
      >
        <Html
          transform
          distanceFactor={0.1}
          // rotation
          rotation-x={0.19}
          rotation-y={0.085}
          // position
          position-x={-0.002}
          position-y={0.01}
          position-z={-0.028}
          wrapperClass='board-frame'
          // Now it won't show through the board
          occlude={true}
        >
          <iframe frameBorder='0' src='' />
        </Html>

        <Html
          transform
          distanceFactor={0.1}
          // rotation
          rotation-x={-0.19}
          rotation-y={0.085}
          rotation-z={0.025}
          // position
          position-x={0.002}
          position-y={0.01}
          position-z={0.028}
          wrapperClass='board-frame'
          // Now it won't show through the board
          occlude={true}
        >
          <iframe frameBorder='0' />
        </Html>
      </primitive>
    </e.group>
  );
}

export default Board;
