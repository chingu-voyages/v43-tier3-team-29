import React, { useState, useCallback, Suspense } from 'react';
import { WorkStation } from './components/WorkStation/WorkStation';
import { Model as Island } from './components/Island/Island';
import Animal from './components/Animal/Animal';
import Human from './components/Human/Human';
import Background from './components/Background/Background';
import { CustomText3D } from './components/CustomText3D/CustomText3D';
import Board from './components/Board/Board';

export function Experience() {
  return (
    <Suspense fallback={null}>
      <CustomText3D text='3JS Portfolio' />
      <Island />
      <WorkStation />
      <Animal />
      <Human />
      <Background />
    </Suspense>
  );
}
