let webGLAvailable, webGL2Available;
function isWebGLAvailable() {
  if (webGLAvailable !== undefined) return webGLAvailable;

  try {
    var _gl$getExtension;

    let gl;
    const canvas = document.createElement('canvas');
    webGLAvailable = !!(window.WebGLRenderingContext && (gl = canvas.getContext('webgl')));
    if (gl) (_gl$getExtension = gl.getExtension('WEBGL_lose_context')) === null || _gl$getExtension === void 0 ? void 0 : _gl$getExtension.loseContext();
    return webGLAvailable;
  } catch (e) {
    return webGLAvailable = false;
  }
}
function isWebGL2Available() {
  if (webGL2Available !== undefined) return webGL2Available;

  try {
    var _gl$getExtension2;

    let gl;
    const canvas = document.createElement('canvas');
    webGL2Available = !!(window.WebGL2RenderingContext && (gl = canvas.getContext('webgl2')));
    if (gl) (_gl$getExtension2 = gl.getExtension('WEBGL_lose_context')) === null || _gl$getExtension2 === void 0 ? void 0 : _gl$getExtension2.loseContext();
    return webGL2Available;
  } catch (e) {
    return webGL2Available = false;
  }
}
function getWebGLErrorMessage() {
  return this.getErrorMessage(1);
}
function getWebGL2ErrorMessage() {
  return this.getErrorMessage(2);
}
function getErrorMessage(version) {
  const names = {
    1: 'WebGL',
    2: 'WebGL 2'
  };
  const contexts = {
    1: window.WebGLRenderingContext,
    2: window.WebGL2RenderingContext
  };
  const element = document.createElement('div');
  element.id = 'webglmessage';
  element.style.fontFamily = 'monospace';
  element.style.fontSize = '13px';
  element.style.fontWeight = 'normal';
  element.style.textAlign = 'center';
  element.style.background = '#fff';
  element.style.color = '#000';
  element.style.padding = '1.5em';
  element.style.width = '400px';
  element.style.margin = '5em auto 0';
  let message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

  if (contexts[version]) {
    message = message.replace('$0', 'graphics card');
  } else {
    message = message.replace('$0', 'browser');
  }

  message = message.replace('$1', names[version]);
  element.innerHTML = message;
  return element;
}

export { getErrorMessage, getWebGL2ErrorMessage, getWebGLErrorMessage, isWebGL2Available, isWebGLAvailable };
