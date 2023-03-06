'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var postprocessing = require('postprocessing');
var _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose');
var React = require('react');
var three = require('three');
var fiber = require('@react-three/fiber');
var _extends = require('@babel/runtime/helpers/extends');
var _construct = require('@babel/runtime/helpers/construct');
var threeStdlib = require('three-stdlib');
var screenSpaceReflections = require('screen-space-reflections');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectWithoutPropertiesLoose__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutPropertiesLoose);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _construct__default = /*#__PURE__*/_interopDefaultLegacy(_construct);

var _excluded$9 = ["blendFunction", "opacity"];

var isRef = function isRef(ref) {
  return !!ref.current;
};

var resolveRef = function resolveRef(ref) {
  return isRef(ref) ? ref.current : ref;
};
var wrapEffect = function wrapEffect(effectImpl, defaultBlendMode) {
  if (defaultBlendMode === void 0) {
    defaultBlendMode = postprocessing.BlendFunction.NORMAL;
  }

  return /*#__PURE__*/React.forwardRef(function Wrap(_ref, ref) {
    var blendFunction = _ref.blendFunction,
        opacity = _ref.opacity,
        props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$9);

    var invalidate = fiber.useThree(function (state) {
      return state.invalidate;
    });
    var effect = React.useMemo(function () {
      return new effectImpl(props);
    }, [props]);
    React.useLayoutEffect(function () {
      effect.blendMode.blendFunction = !blendFunction && blendFunction !== 0 ? defaultBlendMode : blendFunction;
      if (opacity !== undefined) effect.blendMode.opacity.value = opacity;
      invalidate();
    }, [blendFunction, effect.blendMode, opacity]);
    return /*#__PURE__*/React__default["default"].createElement("primitive", {
      ref: ref,
      object: effect,
      dispose: null
    });
  });
};
var useVector2 = function useVector2(props, key) {
  var vec = props[key];
  return React.useMemo(function () {
    if (vec instanceof three.Vector2) {
      return new three.Vector2().set(vec.x, vec.y);
    } else if (Array.isArray(vec)) {
      var x = vec[0],
          y = vec[1];
      return new three.Vector2().set(x, y);
    }
  }, [vec]);
};

var Bloom = wrapEffect(postprocessing.BloomEffect, postprocessing.BlendFunction.ADD);

var BrightnessContrast = wrapEffect(postprocessing.BrightnessContrastEffect);

var ChromaticAberration = /*#__PURE__*/React.forwardRef(function ChromaticAberration(props, ref) {
  var offset = useVector2(props, 'offset');
  var effect = React.useMemo(function () {
    return new postprocessing.ChromaticAberrationEffect(_extends__default["default"]({}, props, {
      offset: offset
    }));
  }, [offset, props]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var ColorAverage = /*#__PURE__*/React.forwardRef(function ColorAverage(_ref, ref) {
  var _ref$blendFunction = _ref.blendFunction,
      blendFunction = _ref$blendFunction === void 0 ? postprocessing.BlendFunction.NORMAL : _ref$blendFunction;

  /** Because ColorAverage blendFunction is not an object but a number, we have to define a custom prop "blendFunction" */
  var effect = React.useMemo(function () {
    return new postprocessing.ColorAverageEffect(blendFunction);
  }, [blendFunction]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var ColorDepth = wrapEffect(postprocessing.ColorDepthEffect);

var Depth = wrapEffect(postprocessing.DepthEffect);

var EffectComposerContext = /*#__PURE__*/React.createContext(null);
var EffectComposer = /*#__PURE__*/React__default["default"].memo( /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      camera = _ref.camera,
      scene = _ref.scene,
      resolutionScale = _ref.resolutionScale,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$renderPriority = _ref.renderPriority,
      renderPriority = _ref$renderPriority === void 0 ? 1 : _ref$renderPriority,
      _ref$autoClear = _ref.autoClear,
      autoClear = _ref$autoClear === void 0 ? true : _ref$autoClear,
      depthBuffer = _ref.depthBuffer,
      disableNormalPass = _ref.disableNormalPass,
      stencilBuffer = _ref.stencilBuffer,
      _ref$multisampling = _ref.multisampling,
      multisampling = _ref$multisampling === void 0 ? 8 : _ref$multisampling,
      _ref$frameBufferType = _ref.frameBufferType,
      frameBufferType = _ref$frameBufferType === void 0 ? three.HalfFloatType : _ref$frameBufferType;

  var _useThree = fiber.useThree(),
      gl = _useThree.gl,
      defaultScene = _useThree.scene,
      defaultCamera = _useThree.camera,
      size = _useThree.size;

  scene = scene || defaultScene;
  camera = camera || defaultCamera;

  var _useMemo = React.useMemo(function () {
    var webGL2Available = threeStdlib.isWebGL2Available(); // Initialize composer

    // Initialize composer
    var effectComposer = new postprocessing.EffectComposer(gl, {
      depthBuffer: depthBuffer,
      stencilBuffer: stencilBuffer,
      multisampling: multisampling > 0 && webGL2Available ? multisampling : 0,
      frameBufferType: frameBufferType
    }); // Add render pass

    // Add render pass
    effectComposer.addPass(new postprocessing.RenderPass(scene, camera)); // Create normal pass

    // Create normal pass
    var downSamplingPass = null;
    var normalPass = null;

    if (!disableNormalPass) {
      normalPass = new postprocessing.NormalPass(scene, camera);
      normalPass.enabled = false;
      effectComposer.addPass(normalPass);

      if (resolutionScale !== undefined && webGL2Available) {
        downSamplingPass = new postprocessing.DepthDownsamplingPass({
          normalBuffer: normalPass.texture,
          resolutionScale: resolutionScale
        });
        downSamplingPass.enabled = false;
        effectComposer.addPass(downSamplingPass);
      }
    }

    return [effectComposer, normalPass, downSamplingPass];
  }, [camera, gl, depthBuffer, stencilBuffer, multisampling, frameBufferType, scene, disableNormalPass, resolutionScale]),
      composer = _useMemo[0],
      normalPass = _useMemo[1],
      downSamplingPass = _useMemo[2];

  React.useEffect(function () {
    return composer == null ? void 0 : composer.setSize(size.width, size.height);
  }, [composer, size]);
  fiber.useFrame(function (_, delta) {
    if (enabled) {
      gl.autoClear = autoClear;
      composer.render(delta);
    }
  }, enabled ? renderPriority : 0);
  var group = React.useRef(null);
  React.useLayoutEffect(function () {
    var effectPass;

    if (group.current && group.current.__r3f && composer) {
      effectPass = _construct__default["default"](postprocessing.EffectPass, [camera].concat(group.current.__r3f.objects));
      effectPass.renderToScreen = true;
      composer.addPass(effectPass);
      if (normalPass) normalPass.enabled = true;
      if (downSamplingPass) downSamplingPass.enabled = true;
    }

    return function () {
      if (effectPass) composer == null ? void 0 : composer.removePass(effectPass);
      if (normalPass) normalPass.enabled = false;
      if (downSamplingPass) downSamplingPass.enabled = false;
    };
  }, [composer, children, camera, normalPass, downSamplingPass]); // Memoize state, otherwise it would trigger all consumers on every render

  var state = React.useMemo(function () {
    return {
      composer: composer,
      normalPass: normalPass,
      downSamplingPass: downSamplingPass,
      resolutionScale: resolutionScale,
      camera: camera,
      scene: scene
    };
  }, [composer, normalPass, downSamplingPass, resolutionScale, camera, scene]); // Expose the composer

  React.useImperativeHandle(ref, function () {
    return composer;
  }, [composer]);
  return /*#__PURE__*/React__default["default"].createElement(EffectComposerContext.Provider, {
    value: state
  }, /*#__PURE__*/React__default["default"].createElement("group", {
    ref: group
  }, children));
}));

var _excluded$8 = ["target", "depthTexture"];
var DepthOfField = /*#__PURE__*/React.forwardRef(function DepthOfField(_ref, ref) {
  var target = _ref.target,
      depthTexture = _ref.depthTexture,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$8);

  var invalidate = fiber.useThree(function (state) {
    return state.invalidate;
  });

  var _useContext = React.useContext(EffectComposerContext),
      camera = _useContext.camera;

  var effect = React.useMemo(function () {
    return new postprocessing.DepthOfFieldEffect(camera, props);
  }, [camera, props]);
  React.useLayoutEffect(function () {
    if (target) {
      var vec = target instanceof three.Vector3 ? new three.Vector3().set(target.x, target.y, target.z) : new three.Vector3().set(target[0], target[1], target[2]);
      effect.target = vec;
    }

    if (depthTexture) effect.setDepthTexture(depthTexture.texture, depthTexture.packing);
    invalidate();
  }, [target, depthTexture, effect]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var DotScreen = wrapEffect(postprocessing.DotScreenEffect);

var _excluded$7 = ["active"];
var Glitch = /*#__PURE__*/React.forwardRef(function Glitch(_ref, ref) {
  var _ref$active = _ref.active,
      active = _ref$active === void 0 ? true : _ref$active,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$7);

  var invalidate = fiber.useThree(function (state) {
    return state.invalidate;
  });
  var delay = useVector2(props, 'delay');
  var duration = useVector2(props, 'duration');
  var strength = useVector2(props, 'strength');
  var effect = React.useMemo(function () {
    return new postprocessing.GlitchEffect(_extends__default["default"]({}, props, {
      delay: delay,
      duration: duration,
      strength: strength
    }));
  }, [delay, duration, props, strength]);
  React.useLayoutEffect(function () {
    effect.mode = active ? props.mode || postprocessing.GlitchMode.SPORADIC : postprocessing.GlitchMode.DISABLED;
    invalidate();
  }, [active, effect, props.mode]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var GodRays = /*#__PURE__*/React.forwardRef(function GodRays(props, ref) {
  var _useContext = React.useContext(EffectComposerContext),
      camera = _useContext.camera;

  var effect = React.useMemo(function () {
    return new postprocessing.GodRaysEffect(camera, props.sun, props);
  }, [camera, props]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var _excluded$6 = ["size"];
var Grid = /*#__PURE__*/React.forwardRef(function Grid(_ref, ref) {
  var size = _ref.size,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$6);

  var invalidate = fiber.useThree(function (state) {
    return state.invalidate;
  });
  var effect = React.useMemo(function () {
    return new postprocessing.GridEffect(props);
  }, [props]);
  React.useLayoutEffect(function () {
    if (size) effect.setSize(size.width, size.height);
    invalidate();
  }, [effect, size]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var HueSaturation = wrapEffect(postprocessing.HueSaturationEffect);

var Noise = wrapEffect(postprocessing.NoiseEffect, postprocessing.BlendFunction.COLOR_DODGE);

var _excluded$5 = ["enabled", "children"];
var selectionContext = /*#__PURE__*/React.createContext(null);
function Selection(_ref) {
  var children = _ref.children,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled;

  var _useState = React.useState([]),
      selected = _useState[0],
      select = _useState[1];

  var value = React.useMemo(function () {
    return {
      selected: selected,
      select: select,
      enabled: enabled
    };
  }, [selected, select, enabled]);
  return /*#__PURE__*/React__default["default"].createElement(selectionContext.Provider, {
    value: value
  }, children);
}
function Select(_ref2) {
  var _ref2$enabled = _ref2.enabled,
      enabled = _ref2$enabled === void 0 ? false : _ref2$enabled,
      children = _ref2.children,
      props = _objectWithoutPropertiesLoose__default["default"](_ref2, _excluded$5);

  var group = React.useRef(null);
  var api = React.useContext(selectionContext);
  React.useEffect(function () {
    if (api && enabled) {
      var changed = false;
      var current = [];
      group.current.traverse(function (o) {
        o.type === 'Mesh' && current.push(o);
        if (api.selected.indexOf(o) === -1) changed = true;
      });

      if (changed) {
        api.select(function (state) {
          return [].concat(state, current);
        });
        return function () {
          api.select(function (state) {
            return state.filter(function (selected) {
              return !current.includes(selected);
            });
          });
        };
      }
    }
  }, [enabled, children]);
  return /*#__PURE__*/React__default["default"].createElement("group", _extends__default["default"]({
    ref: group
  }, props), children);
}

var _excluded$4 = ["selection", "selectionLayer", "blendFunction", "patternTexture", "edgeStrength", "pulseSpeed", "visibleEdgeColor", "hiddenEdgeColor", "width", "height", "kernelSize", "blur", "xRay"];
var Outline = /*#__PURE__*/React.forwardRef(function Outline(_ref, forwardRef) {
  var _ref$selection = _ref.selection,
      selection = _ref$selection === void 0 ? [] : _ref$selection,
      _ref$selectionLayer = _ref.selectionLayer,
      selectionLayer = _ref$selectionLayer === void 0 ? 10 : _ref$selectionLayer,
      blendFunction = _ref.blendFunction,
      patternTexture = _ref.patternTexture,
      edgeStrength = _ref.edgeStrength,
      pulseSpeed = _ref.pulseSpeed,
      visibleEdgeColor = _ref.visibleEdgeColor,
      hiddenEdgeColor = _ref.hiddenEdgeColor,
      width = _ref.width,
      height = _ref.height,
      kernelSize = _ref.kernelSize,
      blur = _ref.blur,
      xRay = _ref.xRay,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$4);

  var invalidate = fiber.useThree(function (state) {
    return state.invalidate;
  });

  var _useContext = React.useContext(EffectComposerContext),
      scene = _useContext.scene,
      camera = _useContext.camera;

  var effect = React.useMemo(function () {
    return new postprocessing.OutlineEffect(scene, camera, _extends__default["default"]({
      blendFunction: blendFunction,
      patternTexture: patternTexture,
      edgeStrength: edgeStrength,
      pulseSpeed: pulseSpeed,
      visibleEdgeColor: visibleEdgeColor,
      hiddenEdgeColor: hiddenEdgeColor,
      width: width,
      height: height,
      kernelSize: kernelSize,
      blur: blur,
      xRay: xRay
    }, props));
  }, [blendFunction, blur, camera, edgeStrength, height, hiddenEdgeColor, kernelSize, patternTexture, pulseSpeed, scene, visibleEdgeColor, width, xRay]);
  var api = React.useContext(selectionContext);
  React.useEffect(function () {
    // Do not allow array selection if declarative selection is active
    // TODO: array selection should probably be deprecated altogether
    if (!api && selection) {
      effect.selection.set(Array.isArray(selection) ? selection.map(resolveRef) : [resolveRef(selection)]);
      invalidate();
      return function () {
        effect.selection.clear();
        invalidate();
      };
    }
  }, [effect, selection, api]);
  React.useEffect(function () {
    effect.selectionLayer = selectionLayer;
    invalidate();
  }, [effect, selectionLayer]);
  React.useRef();
  React.useEffect(function () {
    if (api && api.enabled) {
      var _api$selected;

      if ((_api$selected = api.selected) != null && _api$selected.length) {
        effect.selection.set(api.selected);
        invalidate();
        return function () {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: forwardRef,
    object: effect
  });
});

var Pixelation = /*#__PURE__*/React.forwardRef(function Pixelation(_ref, ref) {
  var _ref$granularity = _ref.granularity,
      granularity = _ref$granularity === void 0 ? 5 : _ref$granularity;

  /** Because GlitchEffect granularity is not an object but a number, we have to define a custom prop "granularity" */
  var effect = React.useMemo(function () {
    return new postprocessing.PixelationEffect(granularity);
  }, [granularity]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var Scanline = wrapEffect(postprocessing.ScanlineEffect, postprocessing.BlendFunction.OVERLAY);

var _excluded$3 = ["selection", "selectionLayer", "lights", "luminanceThreshold", "luminanceSmoothing", "intensity", "width", "height", "kernelSize", "mipmapBlur", "radius", "levels"];

var addLight = function addLight(light, effect) {
  return light.layers.enable(effect.selection.layer);
};

var removeLight = function removeLight(light, effect) {
  return light.layers.disable(effect.selection.layer);
};

var SelectiveBloom = /*#__PURE__*/React.forwardRef(function SelectiveBloom(_ref, forwardRef) {
  var _ref$selection = _ref.selection,
      selection = _ref$selection === void 0 ? [] : _ref$selection,
      _ref$selectionLayer = _ref.selectionLayer,
      selectionLayer = _ref$selectionLayer === void 0 ? 10 : _ref$selectionLayer,
      _ref$lights = _ref.lights,
      lights = _ref$lights === void 0 ? [] : _ref$lights,
      luminanceThreshold = _ref.luminanceThreshold,
      luminanceSmoothing = _ref.luminanceSmoothing,
      intensity = _ref.intensity,
      width = _ref.width,
      height = _ref.height,
      kernelSize = _ref.kernelSize,
      mipmapBlur = _ref.mipmapBlur,
      radius = _ref.radius,
      levels = _ref.levels,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$3);

  if (lights.length === 0) {
    console.warn('SelectiveBloom requires lights to work.');
  }

  var invalidate = fiber.useThree(function (state) {
    return state.invalidate;
  });

  var _useContext = React.useContext(EffectComposerContext),
      scene = _useContext.scene,
      camera = _useContext.camera;

  var effect = React.useMemo(function () {
    return new postprocessing.SelectiveBloomEffect(scene, camera, _extends__default["default"]({
      blendFunction: postprocessing.BlendFunction.ADD,
      luminanceThreshold: luminanceThreshold,
      luminanceSmoothing: luminanceSmoothing,
      intensity: intensity,
      width: width,
      height: height,
      kernelSize: kernelSize,
      mipmapBlur: mipmapBlur,
      radius: radius,
      levels: levels
    }, props));
  }, [camera, height, intensity, kernelSize, luminanceSmoothing, luminanceThreshold, scene, width, height, mipmapBlur, radius, levels]);
  var api = React.useContext(selectionContext);
  React.useEffect(function () {
    // Do not allow array selection if declarative selection is active
    // TODO: array selection should probably be deprecated altogether
    if (!api && selection) {
      effect.selection.set(Array.isArray(selection) ? selection.map(resolveRef) : [resolveRef(selection)]);
      invalidate();
      return function () {
        effect.selection.clear();
        invalidate();
      };
    }
  }, [effect, selection, api]);
  React.useEffect(function () {
    effect.selection.layer = selectionLayer;
    invalidate();
  }, [effect, selectionLayer]);
  React.useEffect(function () {
    if (lights && lights.length > 0) {
      lights.forEach(function (light) {
        return addLight(resolveRef(light), effect);
      });
      invalidate();
      return function () {
        lights.forEach(function (light) {
          return removeLight(resolveRef(light), effect);
        });
        invalidate();
      };
    }
  }, [effect, lights, selectionLayer]);
  React.useRef();
  React.useEffect(function () {
    if (api && api.enabled) {
      var _api$selected;

      if ((_api$selected = api.selected) != null && _api$selected.length) {
        effect.selection.set(api.selected);
        invalidate();
        return function () {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: forwardRef,
    object: effect,
    dispose: null
  });
});

var Sepia = wrapEffect(postprocessing.SepiaEffect);

var SSAO = /*#__PURE__*/React.forwardRef(function SSAO(props, ref) {
  var _useContext = React.useContext(EffectComposerContext),
      camera = _useContext.camera,
      normalPass = _useContext.normalPass,
      downSamplingPass = _useContext.downSamplingPass,
      resolutionScale = _useContext.resolutionScale;

  var effect = React.useMemo(function () {
    if (normalPass === null && downSamplingPass === null) {
      console.error('Please enable the NormalPass in the EffectComposer in order to use SSAO.');
      return null;
    }

    return new postprocessing.SSAOEffect(camera, normalPass && !downSamplingPass ? normalPass.texture : null, _extends__default["default"]({
      blendFunction: postprocessing.BlendFunction.MULTIPLY,
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
      depthAwareUpsampling: true
    }, props));
  }, [camera, normalPass, props]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var SMAA = /*#__PURE__*/React.forwardRef(function SMAA(_ref, ref) {
  var _ref$preset = _ref.preset,
      preset = _ref$preset === void 0 ? postprocessing.SMAAPreset.HIGH : _ref$preset,
      _ref$edgeDetectionMod = _ref.edgeDetectionMode,
      edgeDetectionMode = _ref$edgeDetectionMod === void 0 ? postprocessing.EdgeDetectionMode.COLOR : _ref$edgeDetectionMod;
  var smaaProps = fiber.useLoader(postprocessing.SMAAImageLoader, '');
  var effect = React.useMemo(function () {
    return _construct__default["default"](postprocessing.SMAAEffect, smaaProps.concat([preset, edgeDetectionMode]));
  }, [smaaProps, preset, edgeDetectionMode]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var _excluded$2 = ["textureSrc", "texture"];
var Texture = /*#__PURE__*/React.forwardRef(function Texture(_ref, ref) {
  var textureSrc = _ref.textureSrc,
      texture = _ref.texture,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$2);

  var t = fiber.useLoader(three.TextureLoader, textureSrc);
  React.useLayoutEffect(function () {
    t.encoding = three.sRGBEncoding;
    t.wrapS = t.wrapT = three.RepeatWrapping;
  }, [t]);
  var effect = React.useMemo(function () {
    return new postprocessing.TextureEffect(_extends__default["default"]({}, props, {
      texture: t || texture
    }));
  }, [props, t, texture]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var ToneMapping = wrapEffect(postprocessing.ToneMappingEffect);

var Vignette = wrapEffect(postprocessing.VignetteEffect);

var ShockWave = wrapEffect(postprocessing.ShockWaveEffect);

var _excluded$1 = ["lut", "tetrahedralInterpolation"];
var LUT = /*#__PURE__*/React.forwardRef(function LUT(_ref, ref) {
  var lut = _ref.lut,
      tetrahedralInterpolation = _ref.tetrahedralInterpolation,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded$1);

  var invalidate = fiber.useThree(function (state) {
    return state.invalidate;
  });
  var effect = React.useMemo(function () {
    return new postprocessing.LUTEffect(lut, props);
  }, [lut, props]);
  React.useLayoutEffect(function () {
    if (lut) effect.setLUT(lut);
    if (tetrahedralInterpolation) effect.setTetrahedralInterpolationEnabled(tetrahedralInterpolation);
    invalidate();
  }, [effect, lut, tetrahedralInterpolation]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect,
    dispose: null
  });
});

var TiltShift = wrapEffect(postprocessing.TiltShiftEffect, postprocessing.BlendFunction.ADD);

var _excluded = ["ENABLE_BLUR", "USE_MRT"];

var SSR = /*#__PURE__*/React.forwardRef(function SSR(_ref, ref) {
  var _ref$ENABLE_BLUR = _ref.ENABLE_BLUR,
      ENABLE_BLUR = _ref$ENABLE_BLUR === void 0 ? true : _ref$ENABLE_BLUR,
      _ref$USE_MRT = _ref.USE_MRT,
      USE_MRT = _ref$USE_MRT === void 0 ? true : _ref$USE_MRT,
      props = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded);

  var _useThree = fiber.useThree(),
      invalidate = _useThree.invalidate;

  var _useContext = React.useContext(EffectComposerContext),
      scene = _useContext.scene,
      camera = _useContext.camera;

  var effect = React.useMemo(function () {
    return new screenSpaceReflections.SSREffect(scene, camera, _extends__default["default"]({
      ENABLE_BLUR: ENABLE_BLUR,
      USE_MRT: USE_MRT
    }, props));
  }, [screenSpaceReflections.SSREffect, scene, camera, ENABLE_BLUR, USE_MRT]);
  React.useLayoutEffect(function () {
    Object.keys(props).forEach(function (key) {
      return effect[key] = props[key];
    });
    invalidate();
  }, [props]);
  var api = React.useContext(selectionContext);
  React.useEffect(function () {
    if (api && api.enabled) {
      var _api$selected;

      if ((_api$selected = api.selected) != null && _api$selected.length) {
        effect.selection.set(api.selected);
        invalidate();
        return function () {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /*#__PURE__*/React__default["default"].createElement("primitive", {
    ref: ref,
    object: effect
  });
});

exports.Bloom = Bloom;
exports.BrightnessContrast = BrightnessContrast;
exports.ChromaticAberration = ChromaticAberration;
exports.ColorAverage = ColorAverage;
exports.ColorDepth = ColorDepth;
exports.Depth = Depth;
exports.DepthOfField = DepthOfField;
exports.DotScreen = DotScreen;
exports.EffectComposer = EffectComposer;
exports.EffectComposerContext = EffectComposerContext;
exports.Glitch = Glitch;
exports.GodRays = GodRays;
exports.Grid = Grid;
exports.HueSaturation = HueSaturation;
exports.LUT = LUT;
exports.Noise = Noise;
exports.Outline = Outline;
exports.Pixelation = Pixelation;
exports.SMAA = SMAA;
exports.SSAO = SSAO;
exports.SSR = SSR;
exports.Scanline = Scanline;
exports.Select = Select;
exports.Selection = Selection;
exports.SelectiveBloom = SelectiveBloom;
exports.Sepia = Sepia;
exports.ShockWave = ShockWave;
exports.Texture = Texture;
exports.TiltShift = TiltShift;
exports.ToneMapping = ToneMapping;
exports.Vignette = Vignette;
exports.selectionContext = selectionContext;
