import { BlendFunction, BloomEffect, BrightnessContrastEffect, ChromaticAberrationEffect, ColorAverageEffect, ColorDepthEffect, DepthEffect, EffectComposer as EffectComposer$1, RenderPass, NormalPass, DepthDownsamplingPass, EffectPass, DepthOfFieldEffect, DotScreenEffect, GlitchEffect, GlitchMode, GodRaysEffect, GridEffect, HueSaturationEffect, NoiseEffect, OutlineEffect, PixelationEffect, ScanlineEffect, SelectiveBloomEffect, SepiaEffect, SSAOEffect, SMAAPreset, EdgeDetectionMode, SMAAImageLoader, SMAAEffect, TextureEffect, ToneMappingEffect, VignetteEffect, ShockWaveEffect, LUTEffect, TiltShiftEffect } from 'postprocessing';
import React, { forwardRef, useMemo, useLayoutEffect, createContext, useEffect, useRef, useImperativeHandle, useContext, useState } from 'react';
import { Vector2, HalfFloatType, Vector3, TextureLoader, sRGBEncoding, RepeatWrapping } from 'three';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import { isWebGL2Available } from 'three-stdlib';
import _extends from '@babel/runtime/helpers/esm/extends';
import { SSREffect } from 'screen-space-reflections';

const isRef = ref => !!ref.current;

const resolveRef = ref => isRef(ref) ? ref.current : ref;
const wrapEffect = function (effectImpl, defaultBlendMode) {
  if (defaultBlendMode === void 0) {
    defaultBlendMode = BlendFunction.NORMAL;
  }

  return /*#__PURE__*/forwardRef(function Wrap(_ref, ref) {
    let {
      blendFunction,
      opacity,
      ...props
    } = _ref;
    const invalidate = useThree(state => state.invalidate);
    const effect = useMemo(() => new effectImpl(props), [props]);
    useLayoutEffect(() => {
      effect.blendMode.blendFunction = !blendFunction && blendFunction !== 0 ? defaultBlendMode : blendFunction;
      if (opacity !== undefined) effect.blendMode.opacity.value = opacity;
      invalidate();
    }, [blendFunction, effect.blendMode, opacity]);
    return /*#__PURE__*/React.createElement("primitive", {
      ref: ref,
      object: effect,
      dispose: null
    });
  });
};
const useVector2 = (props, key) => {
  const vec = props[key];
  return useMemo(() => {
    if (vec instanceof Vector2) {
      return new Vector2().set(vec.x, vec.y);
    } else if (Array.isArray(vec)) {
      const [x, y] = vec;
      return new Vector2().set(x, y);
    }
  }, [vec]);
};

const Bloom = wrapEffect(BloomEffect, BlendFunction.ADD);

const BrightnessContrast = wrapEffect(BrightnessContrastEffect);

const ChromaticAberration = /*#__PURE__*/forwardRef(function ChromaticAberration(props, ref) {
  const offset = useVector2(props, 'offset');
  const effect = useMemo(() => new ChromaticAberrationEffect({ ...props,
    offset
  }), [offset, props]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const ColorAverage = /*#__PURE__*/forwardRef(function ColorAverage(_ref, ref) {
  let {
    blendFunction = BlendFunction.NORMAL
  } = _ref;

  /** Because ColorAverage blendFunction is not an object but a number, we have to define a custom prop "blendFunction" */
  const effect = useMemo(() => new ColorAverageEffect(blendFunction), [blendFunction]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const ColorDepth = wrapEffect(ColorDepthEffect);

const Depth = wrapEffect(DepthEffect);

const EffectComposerContext = /*#__PURE__*/createContext(null);
const EffectComposer = /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    children,
    camera,
    scene,
    resolutionScale,
    enabled = true,
    renderPriority = 1,
    autoClear = true,
    depthBuffer,
    disableNormalPass,
    stencilBuffer,
    multisampling = 8,
    frameBufferType = HalfFloatType
  } = _ref;
  const {
    gl,
    scene: defaultScene,
    camera: defaultCamera,
    size
  } = useThree();
  scene = scene || defaultScene;
  camera = camera || defaultCamera;
  const [composer, normalPass, downSamplingPass] = useMemo(() => {
    const webGL2Available = isWebGL2Available(); // Initialize composer

    const effectComposer = new EffectComposer$1(gl, {
      depthBuffer,
      stencilBuffer,
      multisampling: multisampling > 0 && webGL2Available ? multisampling : 0,
      frameBufferType
    }); // Add render pass

    effectComposer.addPass(new RenderPass(scene, camera)); // Create normal pass

    let downSamplingPass = null;
    let normalPass = null;

    if (!disableNormalPass) {
      normalPass = new NormalPass(scene, camera);
      normalPass.enabled = false;
      effectComposer.addPass(normalPass);

      if (resolutionScale !== undefined && webGL2Available) {
        downSamplingPass = new DepthDownsamplingPass({
          normalBuffer: normalPass.texture,
          resolutionScale
        });
        downSamplingPass.enabled = false;
        effectComposer.addPass(downSamplingPass);
      }
    }

    return [effectComposer, normalPass, downSamplingPass];
  }, [camera, gl, depthBuffer, stencilBuffer, multisampling, frameBufferType, scene, disableNormalPass, resolutionScale]);
  useEffect(() => composer == null ? void 0 : composer.setSize(size.width, size.height), [composer, size]);
  useFrame((_, delta) => {
    if (enabled) {
      gl.autoClear = autoClear;
      composer.render(delta);
    }
  }, enabled ? renderPriority : 0);
  const group = useRef(null);
  useLayoutEffect(() => {
    let effectPass;

    if (group.current && group.current.__r3f && composer) {
      effectPass = new EffectPass(camera, ...group.current.__r3f.objects);
      effectPass.renderToScreen = true;
      composer.addPass(effectPass);
      if (normalPass) normalPass.enabled = true;
      if (downSamplingPass) downSamplingPass.enabled = true;
    }

    return () => {
      if (effectPass) composer == null ? void 0 : composer.removePass(effectPass);
      if (normalPass) normalPass.enabled = false;
      if (downSamplingPass) downSamplingPass.enabled = false;
    };
  }, [composer, children, camera, normalPass, downSamplingPass]); // Memoize state, otherwise it would trigger all consumers on every render

  const state = useMemo(() => ({
    composer,
    normalPass,
    downSamplingPass,
    resolutionScale,
    camera,
    scene
  }), [composer, normalPass, downSamplingPass, resolutionScale, camera, scene]); // Expose the composer

  useImperativeHandle(ref, () => composer, [composer]);
  return /*#__PURE__*/React.createElement(EffectComposerContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement("group", {
    ref: group
  }, children));
}));

const DepthOfField = /*#__PURE__*/forwardRef(function DepthOfField(_ref, ref) {
  let {
    target,
    depthTexture,
    ...props
  } = _ref;
  const invalidate = useThree(state => state.invalidate);
  const {
    camera
  } = useContext(EffectComposerContext);
  const effect = useMemo(() => new DepthOfFieldEffect(camera, props), [camera, props]);
  useLayoutEffect(() => {
    if (target) {
      const vec = target instanceof Vector3 ? new Vector3().set(target.x, target.y, target.z) : new Vector3().set(target[0], target[1], target[2]);
      effect.target = vec;
    }

    if (depthTexture) effect.setDepthTexture(depthTexture.texture, depthTexture.packing);
    invalidate();
  }, [target, depthTexture, effect]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const DotScreen = wrapEffect(DotScreenEffect);

const Glitch = /*#__PURE__*/forwardRef(function Glitch(_ref, ref) {
  let {
    active = true,
    ...props
  } = _ref;
  const invalidate = useThree(state => state.invalidate);
  const delay = useVector2(props, 'delay');
  const duration = useVector2(props, 'duration');
  const strength = useVector2(props, 'strength');
  const effect = useMemo(() => new GlitchEffect({ ...props,
    delay,
    duration,
    strength
  }), [delay, duration, props, strength]);
  useLayoutEffect(() => {
    effect.mode = active ? props.mode || GlitchMode.SPORADIC : GlitchMode.DISABLED;
    invalidate();
  }, [active, effect, props.mode]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const GodRays = /*#__PURE__*/forwardRef(function GodRays(props, ref) {
  const {
    camera
  } = useContext(EffectComposerContext);
  const effect = useMemo(() => new GodRaysEffect(camera, props.sun, props), [camera, props]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const Grid = /*#__PURE__*/forwardRef(function Grid(_ref, ref) {
  let {
    size,
    ...props
  } = _ref;
  const invalidate = useThree(state => state.invalidate);
  const effect = useMemo(() => new GridEffect(props), [props]);
  useLayoutEffect(() => {
    if (size) effect.setSize(size.width, size.height);
    invalidate();
  }, [effect, size]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const HueSaturation = wrapEffect(HueSaturationEffect);

const Noise = wrapEffect(NoiseEffect, BlendFunction.COLOR_DODGE);

const selectionContext = /*#__PURE__*/createContext(null);
function Selection(_ref) {
  let {
    children,
    enabled = true
  } = _ref;
  const [selected, select] = useState([]);
  const value = useMemo(() => ({
    selected,
    select,
    enabled
  }), [selected, select, enabled]);
  return /*#__PURE__*/React.createElement(selectionContext.Provider, {
    value: value
  }, children);
}
function Select(_ref2) {
  let {
    enabled = false,
    children,
    ...props
  } = _ref2;
  const group = useRef(null);
  const api = useContext(selectionContext);
  useEffect(() => {
    if (api && enabled) {
      let changed = false;
      const current = [];
      group.current.traverse(o => {
        o.type === 'Mesh' && current.push(o);
        if (api.selected.indexOf(o) === -1) changed = true;
      });

      if (changed) {
        api.select(state => [...state, ...current]);
        return () => {
          api.select(state => state.filter(selected => !current.includes(selected)));
        };
      }
    }
  }, [enabled, children]);
  return /*#__PURE__*/React.createElement("group", _extends({
    ref: group
  }, props), children);
}

const Outline = /*#__PURE__*/forwardRef(function Outline(_ref, forwardRef) {
  let {
    selection = [],
    selectionLayer = 10,
    blendFunction,
    patternTexture,
    edgeStrength,
    pulseSpeed,
    visibleEdgeColor,
    hiddenEdgeColor,
    width,
    height,
    kernelSize,
    blur,
    xRay,
    ...props
  } = _ref;
  const invalidate = useThree(state => state.invalidate);
  const {
    scene,
    camera
  } = useContext(EffectComposerContext);
  const effect = useMemo(() => new OutlineEffect(scene, camera, {
    blendFunction,
    patternTexture,
    edgeStrength,
    pulseSpeed,
    visibleEdgeColor,
    hiddenEdgeColor,
    width,
    height,
    kernelSize,
    blur,
    xRay,
    ...props
  }), [blendFunction, blur, camera, edgeStrength, height, hiddenEdgeColor, kernelSize, patternTexture, pulseSpeed, scene, visibleEdgeColor, width, xRay]);
  const api = useContext(selectionContext);
  useEffect(() => {
    // Do not allow array selection if declarative selection is active
    // TODO: array selection should probably be deprecated altogether
    if (!api && selection) {
      effect.selection.set(Array.isArray(selection) ? selection.map(resolveRef) : [resolveRef(selection)]);
      invalidate();
      return () => {
        effect.selection.clear();
        invalidate();
      };
    }
  }, [effect, selection, api]);
  useEffect(() => {
    effect.selectionLayer = selectionLayer;
    invalidate();
  }, [effect, selectionLayer]);
  useRef();
  useEffect(() => {
    if (api && api.enabled) {
      var _api$selected;

      if ((_api$selected = api.selected) != null && _api$selected.length) {
        effect.selection.set(api.selected);
        invalidate();
        return () => {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: forwardRef,
    object: effect
  });
});

const Pixelation = /*#__PURE__*/forwardRef(function Pixelation(_ref, ref) {
  let {
    granularity = 5
  } = _ref;

  /** Because GlitchEffect granularity is not an object but a number, we have to define a custom prop "granularity" */
  const effect = useMemo(() => new PixelationEffect(granularity), [granularity]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const Scanline = wrapEffect(ScanlineEffect, BlendFunction.OVERLAY);

const addLight = (light, effect) => light.layers.enable(effect.selection.layer);

const removeLight = (light, effect) => light.layers.disable(effect.selection.layer);

const SelectiveBloom = /*#__PURE__*/forwardRef(function SelectiveBloom(_ref, forwardRef) {
  let {
    selection = [],
    selectionLayer = 10,
    lights = [],
    luminanceThreshold,
    luminanceSmoothing,
    intensity,
    width,
    height,
    kernelSize,
    mipmapBlur,
    radius,
    levels,
    ...props
  } = _ref;

  if (lights.length === 0) {
    console.warn('SelectiveBloom requires lights to work.');
  }

  const invalidate = useThree(state => state.invalidate);
  const {
    scene,
    camera
  } = useContext(EffectComposerContext);
  const effect = useMemo(() => new SelectiveBloomEffect(scene, camera, {
    blendFunction: BlendFunction.ADD,
    luminanceThreshold,
    luminanceSmoothing,
    intensity,
    width,
    height,
    kernelSize,
    mipmapBlur,
    radius,
    levels,
    ...props
  }), [camera, height, intensity, kernelSize, luminanceSmoothing, luminanceThreshold, scene, width, height, mipmapBlur, radius, levels]);
  const api = useContext(selectionContext);
  useEffect(() => {
    // Do not allow array selection if declarative selection is active
    // TODO: array selection should probably be deprecated altogether
    if (!api && selection) {
      effect.selection.set(Array.isArray(selection) ? selection.map(resolveRef) : [resolveRef(selection)]);
      invalidate();
      return () => {
        effect.selection.clear();
        invalidate();
      };
    }
  }, [effect, selection, api]);
  useEffect(() => {
    effect.selection.layer = selectionLayer;
    invalidate();
  }, [effect, selectionLayer]);
  useEffect(() => {
    if (lights && lights.length > 0) {
      lights.forEach(light => addLight(resolveRef(light), effect));
      invalidate();
      return () => {
        lights.forEach(light => removeLight(resolveRef(light), effect));
        invalidate();
      };
    }
  }, [effect, lights, selectionLayer]);
  useRef();
  useEffect(() => {
    if (api && api.enabled) {
      var _api$selected;

      if ((_api$selected = api.selected) != null && _api$selected.length) {
        effect.selection.set(api.selected);
        invalidate();
        return () => {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: forwardRef,
    object: effect,
    dispose: null
  });
});

const Sepia = wrapEffect(SepiaEffect);

const SSAO = /*#__PURE__*/forwardRef(function SSAO(props, ref) {
  const {
    camera,
    normalPass,
    downSamplingPass,
    resolutionScale
  } = useContext(EffectComposerContext);
  const effect = useMemo(() => {
    if (normalPass === null && downSamplingPass === null) {
      console.error('Please enable the NormalPass in the EffectComposer in order to use SSAO.');
      return null;
    }

    return new SSAOEffect(camera, normalPass && !downSamplingPass ? normalPass.texture : null, {
      blendFunction: BlendFunction.MULTIPLY,
      samples: 30,
      rings: 4,
      distanceThreshold: 1.0,
      distanceFalloff: 0.0,
      rangeThreshold: 0.5,
      rangeFalloff: 0.1,
      luminanceInfluence: 0.9,
      radius: 20,
      scale: 0.5,
      bias: 0.5,
      intensity: 1.0,
      color: null,
      // @ts-ignore
      normalDepthBuffer: downSamplingPass ? downSamplingPass.texture : null,
      resolutionScale: resolutionScale != null ? resolutionScale : 1,
      depthAwareUpsampling: true,
      ...props
    });
  }, [camera, normalPass, props]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const SMAA = /*#__PURE__*/forwardRef(function SMAA(_ref, ref) {
  let {
    preset = SMAAPreset.HIGH,
    edgeDetectionMode = EdgeDetectionMode.COLOR
  } = _ref;
  const smaaProps = useLoader(SMAAImageLoader, '');
  const effect = useMemo(() => new SMAAEffect(...smaaProps, preset, edgeDetectionMode), [smaaProps, preset, edgeDetectionMode]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const Texture = /*#__PURE__*/forwardRef(function Texture(_ref, ref) {
  let {
    textureSrc,
    texture,
    ...props
  } = _ref;
  const t = useLoader(TextureLoader, textureSrc);
  useLayoutEffect(() => {
    t.encoding = sRGBEncoding;
    t.wrapS = t.wrapT = RepeatWrapping;
  }, [t]);
  const effect = useMemo(() => new TextureEffect({ ...props,
    texture: t || texture
  }), [props, t, texture]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const ToneMapping = wrapEffect(ToneMappingEffect);

const Vignette = wrapEffect(VignetteEffect);

const ShockWave = wrapEffect(ShockWaveEffect);

const LUT = /*#__PURE__*/forwardRef(function LUT(_ref, ref) {
  let {
    lut,
    tetrahedralInterpolation,
    ...props
  } = _ref;
  const invalidate = useThree(state => state.invalidate);
  const effect = useMemo(() => new LUTEffect(lut, props), [lut, props]);
  useLayoutEffect(() => {
    if (lut) effect.setLUT(lut);
    if (tetrahedralInterpolation) effect.setTetrahedralInterpolationEnabled(tetrahedralInterpolation);
    invalidate();
  }, [effect, lut, tetrahedralInterpolation]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

const TiltShift = wrapEffect(TiltShiftEffect, BlendFunction.ADD);

const SSR = /*#__PURE__*/forwardRef(function SSR(_ref, ref) {
  let {
    ENABLE_BLUR = true,
    USE_MRT = true,
    ...props
  } = _ref;
  const {
    invalidate
  } = useThree();
  const {
    scene,
    camera
  } = useContext(EffectComposerContext);
  const effect = useMemo(() => new SSREffect(scene, camera, {
    ENABLE_BLUR,
    USE_MRT,
    ...props
  }), [SSREffect, scene, camera, ENABLE_BLUR, USE_MRT]);
  useLayoutEffect(() => {
    Object.keys(props).forEach(key => effect[key] = props[key]);
    invalidate();
  }, [props]);
  const api = useContext(selectionContext);
  useEffect(() => {
    if (api && api.enabled) {
      var _api$selected;

      if ((_api$selected = api.selected) != null && _api$selected.length) {
        effect.selection.set(api.selected);
        invalidate();
        return () => {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /*#__PURE__*/React.createElement("primitive", {
    ref: ref,
    object: effect
  });
});

export { Bloom, BrightnessContrast, ChromaticAberration, ColorAverage, ColorDepth, Depth, DepthOfField, DotScreen, EffectComposer, EffectComposerContext, Glitch, GodRays, Grid, HueSaturation, LUT, Noise, Outline, Pixelation, SMAA, SSAO, SSR, Scanline, Select, Selection, SelectiveBloom, Sepia, ShockWave, Texture, TiltShift, ToneMapping, Vignette, selectionContext };
