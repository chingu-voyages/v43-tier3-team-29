import React, { useState, useCallback, Suspense } from "react";
import { WorkStation } from "./components/WorkStation/WorkStation";
import { Model as Island } from "./components/Island/Island";
import Animal from "./components/Animal/Animal";
import Human from "./components/Human/Human";
import Background from "./components/Background/Background";

export function Experience() {
  return (
    <Suspense fallback={null}>
      <Island />
      <WorkStation />
      <Animal />
      <Human />
      <Background />
    </Suspense>
  );
}
