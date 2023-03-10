import React, { Suspense } from "react";
import { WorkStation } from "./components/WorkStation/WorkStation";
import { Model as Island } from "./components/Island/Scene";

export function Experience() {
  return (
    <Suspense fallback={null}>
      <Island />
      <WorkStation />
    </Suspense>
  );
}
