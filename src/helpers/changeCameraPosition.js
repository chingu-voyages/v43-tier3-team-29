import { cameraMovementSheet } from "../animation/theatre";

const changeCameraPosition = (position) => {
  if (cameraMovementSheet.sequence.position === 11) {
    cameraMovementSheet.sequence.play({
      range: [0, position],
      rate: 0.3,
    });
  } else if (position < cameraMovementSheet.sequence.position) {
    cameraMovementSheet.sequence.play({
      range: [position, cameraMovementSheet.sequence.position],
      rate: 0.3,
      direction: "reverse",
    });
  } else {
    cameraMovementSheet.sequence.play({
      range: [cameraMovementSheet.sequence.position, position],
      rate: 0.3,
    });
  }
};

export default changeCameraPosition;
