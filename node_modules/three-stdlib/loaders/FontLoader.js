import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Loader, FileLoader, ShapePath } from 'three';

class FontLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, response => {
      if (typeof response !== 'string') throw new Error('unsupported data type');
      const json = JSON.parse(response);
      const font = this.parse(json);
      if (onLoad) onLoad(font);
    }, onProgress, onError);
  }

  parse(json) {
    return new Font(json);
  }

}
class Font {
  constructor(data) {
    _defineProperty(this, "data", void 0);

    this.data = data;
  }

  generateShapes(text, size = 100, _options) {
    const shapes = [];
    const options = {
      letterSpacing: 0,
      lineHeight: 1,
      ..._options
    };
    const paths = createPaths(text, size, this.data, options);

    for (let p = 0, pl = paths.length; p < pl; p++) {
      Array.prototype.push.apply(shapes, paths[p].toShapes(false));
    }

    return shapes;
  }

}

_defineProperty(Font, "isFont", void 0);

_defineProperty(Font, "type", void 0);

function createPaths(text, size, data, options) {
  const chars = Array.from(text);
  const scale = size / data.resolution;
  const line_height = (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) * scale;
  const paths = [];
  let offsetX = 0,
      offsetY = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === '\n') {
      offsetX = 0;
      offsetY -= line_height * options.lineHeight;
    } else {
      const ret = createPath(char, scale, offsetX, offsetY, data);

      if (ret) {
        offsetX += ret.offsetX + options.letterSpacing;
        paths.push(ret.path);
      }
    }
  }

  return paths;
}

function createPath(char, scale, offsetX, offsetY, data) {
  const glyph = data.glyphs[char] || data.glyphs['?'];

  if (!glyph) {
    console.error('THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.');
    return;
  }

  const path = new ShapePath();
  let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

  if (glyph.o) {
    const outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(' '));

    for (let i = 0, l = outline.length; i < l;) {
      const action = outline[i++];

      switch (action) {
        case 'm':
          // moveTo
          x = parseInt(outline[i++]) * scale + offsetX;
          y = parseInt(outline[i++]) * scale + offsetY;
          path.moveTo(x, y);
          break;

        case 'l':
          // lineTo
          x = parseInt(outline[i++]) * scale + offsetX;
          y = parseInt(outline[i++]) * scale + offsetY;
          path.lineTo(x, y);
          break;

        case 'q':
          // quadraticCurveTo
          cpx = parseInt(outline[i++]) * scale + offsetX;
          cpy = parseInt(outline[i++]) * scale + offsetY;
          cpx1 = parseInt(outline[i++]) * scale + offsetX;
          cpy1 = parseInt(outline[i++]) * scale + offsetY;
          path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);
          break;

        case 'b':
          // bezierCurveTo
          cpx = parseInt(outline[i++]) * scale + offsetX;
          cpy = parseInt(outline[i++]) * scale + offsetY;
          cpx1 = parseInt(outline[i++]) * scale + offsetX;
          cpy1 = parseInt(outline[i++]) * scale + offsetY;
          cpx2 = parseInt(outline[i++]) * scale + offsetX;
          cpy2 = parseInt(outline[i++]) * scale + offsetY;
          path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);
          break;
      }
    }
  }

  return {
    offsetX: glyph.ha * scale,
    path
  };
}

export { Font, FontLoader };
