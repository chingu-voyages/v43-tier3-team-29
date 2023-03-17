import React, { Suspense } from "react";
import { WorkStation } from "./components/WorkStation/WorkStation";
import { Model as Island } from "./components/Island/Island";
import Animal from "./components/Animal/Animal";

export function Experience() {
  return (
    <Suspense fallback={null}>
      <Island />
      <WorkStation />
      <Animal />
    </Suspense>
  );
}
