import React, { Suspense } from "react";
import { WorkStation } from "./components/WorkStation/WorkStation";
import { Model as Island } from "./components/Island/Scene";
import Animal from "./components/Animal/Animal";
import Human from "./components/Human/Human";

export function Experience() {
  return (
    <Suspense fallback={null}>
      <Island />
      <WorkStation />
      <Animal />
      <Human />
    </Suspense>
  );
}
