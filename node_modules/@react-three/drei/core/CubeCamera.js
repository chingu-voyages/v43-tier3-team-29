import { WebGLCubeRenderTarget, HalfFloatType } from 'three';
import * as React from 'react';
import { useThree, useFrame } from '@react-three/fiber';

function CubeCamera({
  children,
  fog,
  frames = Infinity,
  resolution = 256,
  near = 0.1,
  far = 1000,
  envMap,
  ...props
}) {
  const ref = React.useRef();
  const [camera, setCamera] = React.useState(null);
  const scene = useThree(({
    scene
  }) => scene);
  const gl = useThree(({
    gl
  }) => gl);
  const fbo = React.useMemo(() => {
    const fbo = new WebGLCubeRenderTarget(resolution);
    fbo.texture.encoding = gl.outputEncoding;
    fbo.texture.type = HalfFloatType;
    return fbo;
  }, [resolution]);
  let count = 0;
  let originalFog;
  let originalBackground;
  useFrame(() => {
    if (camera && ref.current && (frames === Infinity || count < frames)) {
      ref.current.visible = false;
      originalFog = scene.fog;
      originalBackground = scene.background;
      scene.background = envMap || originalBackground;
      scene.fog = fog || originalFog;
      camera.update(gl, scene);
      scene.fog = originalFog;
      scene.background = originalBackground;
      ref.current.visible = true;
      count++;
    }
  });
  return /*#__PURE__*/React.createElement("group", props, /*#__PURE__*/React.createElement("cubeCamera", {
    ref: setCamera,
    args: [near, far, fbo]
  }), /*#__PURE__*/React.createElement("group", {
    ref: ref
  }, children(fbo.texture)));
}

export { CubeCamera };
