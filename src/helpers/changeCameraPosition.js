import { cameraMovementSheet } from "../animation/theatre";

const changeCameraPosition = (position) => {
  cameraMovementSheet.sequence.play({
    range: [position - 0.3, position],
    rate: 0.3,
  });
};

export default changeCameraPosition;
