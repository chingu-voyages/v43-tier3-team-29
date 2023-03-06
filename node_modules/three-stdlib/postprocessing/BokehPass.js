import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Pass, FullScreenQuad } from './Pass.js';
import { WebGLRenderTarget, NearestFilter, MeshDepthMaterial, RGBADepthPacking, NoBlending, UniformsUtils, ShaderMaterial, Color } from 'three';
import { BokehShader } from '../shaders/BokehShader.js';

class BokehPass extends Pass {
  constructor(scene, camera, params) {
    super();

    _defineProperty(this, "scene", void 0);

    _defineProperty(this, "camera", void 0);

    _defineProperty(this, "renderTargetDepth", void 0);

    _defineProperty(this, "materialDepth", void 0);

    _defineProperty(this, "materialBokeh", void 0);

    _defineProperty(this, "fsQuad", void 0);

    _defineProperty(this, "_oldClearColor", void 0);

    _defineProperty(this, "uniforms", void 0);

    this.scene = scene;
    this.camera = camera;
    const focus = params.focus !== undefined ? params.focus : 1.0;
    const aspect = params.aspect !== undefined ? params.aspect : camera.aspect;
    const aperture = params.aperture !== undefined ? params.aperture : 0.025;
    const maxblur = params.maxblur !== undefined ? params.maxblur : 1.0; // render targets

    const width = params.width || window.innerWidth || 1;
    const height = params.height || window.innerHeight || 1;
    this.renderTargetDepth = new WebGLRenderTarget(width, height, {
      minFilter: NearestFilter,
      magFilter: NearestFilter
    });
    this.renderTargetDepth.texture.name = 'BokehPass.depth'; // depth material

    this.materialDepth = new MeshDepthMaterial();
    this.materialDepth.depthPacking = RGBADepthPacking;
    this.materialDepth.blending = NoBlending; // bokeh material

    if (BokehShader === undefined) {
      console.error('BokehPass relies on BokehShader');
    }

    const bokehShader = BokehShader;
    const bokehUniforms = UniformsUtils.clone(bokehShader.uniforms);
    bokehUniforms['tDepth'].value = this.renderTargetDepth.texture;
    bokehUniforms['focus'].value = focus;
    bokehUniforms['aspect'].value = aspect;
    bokehUniforms['aperture'].value = aperture;
    bokehUniforms['maxblur'].value = maxblur;
    bokehUniforms['nearClip'].value = camera.near;
    bokehUniforms['farClip'].value = camera.far;
    this.materialBokeh = new ShaderMaterial({
      defines: Object.assign({}, bokehShader.defines),
      uniforms: bokehUniforms,
      vertexShader: bokehShader.vertexShader,
      fragmentShader: bokehShader.fragmentShader
    });
    this.uniforms = bokehUniforms;
    this.needsSwap = false;
    this.fsQuad = new FullScreenQuad(this.materialBokeh);
    this._oldClearColor = new Color();
  }

  render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    // Render depth into texture
    this.scene.overrideMaterial = this.materialDepth;
    renderer.getClearColor(this._oldClearColor);
    const oldClearAlpha = renderer.getClearAlpha();
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setClearColor(0xffffff);
    renderer.setClearAlpha(1.0);
    renderer.setRenderTarget(this.renderTargetDepth);
    renderer.clear();
    renderer.render(this.scene, this.camera); // Render bokeh composite

    this.uniforms['tColor'].value = readBuffer.texture;
    this.uniforms['nearClip'].value = this.camera.near;
    this.uniforms['farClip'].value = this.camera.far;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      renderer.clear();
      this.fsQuad.render(renderer);
    }

    this.scene.overrideMaterial = null;
    renderer.setClearColor(this._oldClearColor);
    renderer.setClearAlpha(oldClearAlpha);
    renderer.autoClear = oldAutoClear;
  }

}

export { BokehPass };
