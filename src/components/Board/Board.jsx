import { Html, useGLTF } from '@react-three/drei';
import BoardLink from './BoardLink';

function Board(props) {
  const boardModel = useGLTF('/models/board/board.glb');

  return (
    <>
      <group position={[-6, 0.2, 4]} scale={7}>
        <primitive {...props} object={boardModel.scene} />
        <Html
          center
          as='div'
          wrapperClass='board-links-container'
          distanceFactor={1}
        >
          <BoardLink text='link no.1' href='google.com' />
        </Html>
      </group>
    </>
  );
}

export default Board;
