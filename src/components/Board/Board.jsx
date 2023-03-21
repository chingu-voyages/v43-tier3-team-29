import { useGLTF } from '@react-three/drei';

function Board(props) {
  const boardModel = useGLTF('/models/board/board.glb');

  console.log(boardModel);

  return (
    <>
      <primitive
        {...props}
        object={boardModel.scene}
        scale={7}
        position={[-6, 0.2, 4]}
      />
    </>
  );
}

export default Board;
