import React, { Suspense } from 'react';
import { WorkStation } from './components/WorkStation/WorkStation';
import { Model as Island } from './components/Island/Scene';
import Animal from './components/Animal/Animal';
import { CustomText3D } from './components/CustomText3D/CustomText3D';

export function Experience() {
  return (
    <Suspense fallback={null}>
      <CustomText3D text='Welcome to the developer island' />
      <Island />
      <WorkStation />
      <Animal />
    </Suspense>
  );
}
