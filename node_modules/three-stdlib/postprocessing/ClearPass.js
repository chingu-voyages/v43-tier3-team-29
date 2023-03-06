import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Pass } from './Pass.js';
import { Color } from 'three';

class ClearPass extends Pass {
  constructor(clearColor, clearAlpha) {
    super();

    _defineProperty(this, "clearColor", void 0);

    _defineProperty(this, "clearAlpha", void 0);

    _defineProperty(this, "_oldClearColor", void 0);

    this.needsSwap = false;
    this.clearColor = clearColor !== undefined ? clearColor : 0x000000;
    this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
    this._oldClearColor = new Color();
  }

  render(renderer, writeBuffer, readBuffer
  /*, deltaTime, maskActive */
  ) {
    let oldClearAlpha;

    if (this.clearColor) {
      renderer.getClearColor(this._oldClearColor);
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    renderer.clear();

    if (this.clearColor) {
      renderer.setClearColor(this._oldClearColor, oldClearAlpha);
    }
  }

}

export { ClearPass };
