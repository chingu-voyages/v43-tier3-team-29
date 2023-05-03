import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { getProject } from "@theatre/core";

import animationState from "./May03_TheatreState.json";

export function initTheatreStudio() {
  if (process.env.NODE_ENV === "development") {
    studio.initialize();
    studio.extend(extension);
    studio.ui.hide();
  }
}

export const campFireSheet = getProject("Chingu29", {
  state: animationState,
}).sheet("Campfire");

export const cameraMovementSheet = getProject("Chingu29", {
  state: animationState,
}).sheet("CameraMovement");
