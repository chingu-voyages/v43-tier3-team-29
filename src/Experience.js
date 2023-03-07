import React, { Suspense } from "react";
import { WorkStation } from "./components/WorkStation/WorkStation";

export function Experience() {
  return (
    <Suspense fallback={null}>
      <WorkStation />
    </Suspense>
  );
}
