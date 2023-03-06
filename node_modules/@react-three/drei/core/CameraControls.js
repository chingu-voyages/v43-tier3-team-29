import _extends from '@babel/runtime/helpers/esm/extends';
import * as THREE from 'three';
import * as React from 'react';
import { forwardRef, useMemo, useEffect } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import CameraControlsImpl from 'camera-controls';

const CameraControls = /*#__PURE__*/forwardRef((props, ref) => {
  useMemo(() => {
    CameraControlsImpl.install({
      THREE
    });
    extend({
      CameraControlsImpl
    });
  }, []);
  const {
    camera,
    domElement,
    makeDefault,
    onStart,
    onEnd,
    onChange,
    regress,
    ...restProps
  } = props;
  const defaultCamera = useThree(state => state.camera);
  const gl = useThree(state => state.gl);
  const invalidate = useThree(state => state.invalidate);
  const events = useThree(state => state.events);
  const setEvents = useThree(state => state.setEvents);
  const set = useThree(state => state.set);
  const get = useThree(state => state.get);
  const performance = useThree(state => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = useMemo(() => new CameraControlsImpl(explCamera), [explCamera]);
  useFrame((state, delta) => {
    if (controls.enabled) controls.update(delta);
  }, -1);
  useEffect(() => {
    controls.connect(explDomElement);
    return () => void controls.disconnect();
  }, [explDomElement, controls]);
  React.useEffect(() => {
    const callback = e => {
      invalidate();
      if (regress) performance.regress();
      if (onChange) onChange(e);
    };

    const onStartCb = e => {
      if (onStart) onStart(e);
    };

    const onEndCb = e => {
      if (onEnd) onEnd(e);
    };

    controls.addEventListener('update', callback);
    controls.addEventListener('controlstart', onStartCb);
    controls.addEventListener('controlend', onEndCb);
    return () => {
      controls.removeEventListener('update', callback);
      controls.removeEventListener('controlstart', onStartCb);
      controls.removeEventListener('controlend', onEndCb);
    };
  }, [controls, onStart, onEnd, invalidate, setEvents, regress, onChange]);
  useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls: controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return /*#__PURE__*/React.createElement("primitive", _extends({
    ref: ref,
    object: controls
  }, restProps));
});

export { CameraControls };
