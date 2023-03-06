import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import TempNode from '../core/TempNode.js';
import ExpressionNode from '../core/ExpressionNode.js';
import JoinNode from '../utils/JoinNode.js';
import SplitNode from '../utils/SplitNode.js';
import OperatorNode from './OperatorNode.js';

class MathNode extends TempNode {
  // 1 input
  // 2 inputs
  // 3 inputs
  constructor(method, aNode, bNode = null, cNode = null) {
    super();
    this.method = method;
    this.aNode = aNode;
    this.bNode = bNode;
    this.cNode = cNode;
  }

  getInputType(builder) {
    const aType = this.aNode.getNodeType(builder);
    const bType = this.bNode ? this.bNode.getNodeType(builder) : null;
    const cType = this.cNode ? this.cNode.getNodeType(builder) : null;
    const aLen = builder.getTypeLength(aType);
    const bLen = builder.getTypeLength(bType);
    const cLen = builder.getTypeLength(cType);

    if (aLen > bLen && aLen > cLen) {
      return aType;
    } else if (bLen > cLen) {
      return bType;
    } else if (cLen > aLen) {
      return cType;
    }

    return aType;
  }

  getNodeType(builder) {
    const method = this.method;

    if (method === MathNode.LENGTH || method === MathNode.DISTANCE || method === MathNode.DOT) {
      return 'float';
    } else if (method === MathNode.CROSS) {
      return 'vec3';
    } else {
      return this.getInputType(builder);
    }
  }

  generate(builder, output) {
    const method = this.method;
    const type = this.getNodeType(builder);
    const inputType = this.getInputType(builder);
    const a = this.aNode;
    const b = this.bNode;
    const c = this.cNode;
    const isWebGL = builder.renderer.isWebGLRenderer === true;

    if (isWebGL && (method === MathNode.DFDX || method === MathNode.DFDY) && output === 'vec3') {
      // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988
      return new JoinNode([new MathNode(method, new SplitNode(a, 'x')), new MathNode(method, new SplitNode(a, 'y')), new MathNode(method, new SplitNode(a, 'z'))]).build(builder);
    } else if (method === MathNode.TRANSFORM_DIRECTION) {
      // dir can be either a direction vector or a normal vector
      // upper-left 3x3 of matrix is assumed to be orthogonal
      let tA = a;
      let tB = b;

      if (builder.isMatrix(tA.getNodeType(builder))) {
        tB = new ExpressionNode(`${builder.getType('vec4')}( ${tB.build(builder, 'vec3')}, 0.0 )`, 'vec4');
      } else {
        tA = new ExpressionNode(`${builder.getType('vec4')}( ${tA.build(builder, 'vec3')}, 0.0 )`, 'vec4');
      }

      const mulNode = new SplitNode(new OperatorNode('*', tA, tB), 'xyz');
      return new MathNode(MathNode.NORMALIZE, mulNode).build(builder);
    } else if (method === MathNode.SATURATE) {
      return builder.format(`clamp( ${a.build(builder, inputType)}, 0.0, 1.0 )`, type, output);
    } else if (method === MathNode.NEGATE) {
      return builder.format('( -' + a.build(builder, inputType) + ' )', type, output);
    } else if (method === MathNode.INVERT) {
      return builder.format('( 1.0 - ' + a.build(builder, inputType) + ' )', type, output);
    } else {
      const params = [];

      if (method === MathNode.CROSS) {
        params.push(a.build(builder, type), b.build(builder, type));
      } else if (method === MathNode.STEP) {
        params.push(a.build(builder, builder.getTypeLength(a.getNodeType(builder)) === 1 ? 'float' : inputType), b.build(builder, inputType));
      } else if (isWebGL && (method === MathNode.MIN || method === MathNode.MAX) || method === MathNode.MOD) {
        params.push(a.build(builder, inputType), b.build(builder, builder.getTypeLength(b.getNodeType(builder)) === 1 ? 'float' : inputType));
      } else if (method === MathNode.REFRACT) {
        params.push(a.build(builder, inputType), b.build(builder, inputType), c.build(builder, 'float'));
      } else if (method === MathNode.MIX) {
        params.push(a.build(builder, inputType), b.build(builder, inputType), c.build(builder, builder.getTypeLength(c.getNodeType(builder)) === 1 ? 'float' : inputType));
      } else {
        params.push(a.build(builder, inputType));

        if (c !== null) {
          params.push(b.build(builder, inputType), c.build(builder, inputType));
        } else if (b !== null) {
          params.push(b.build(builder, inputType));
        }
      }

      return builder.format(`${builder.getMethod(method)}( ${params.join(', ')} )`, type, output);
    }
  }

  serialize(data) {
    super.serialize(data);
    data.method = this.method;
  }

  deserialize(data) {
    super.deserialize(data);
    this.method = data.method;
  }

}

_defineProperty(MathNode, "RAD", 'radians');

_defineProperty(MathNode, "DEG", 'degrees');

_defineProperty(MathNode, "EXP", 'exp');

_defineProperty(MathNode, "EXP2", 'exp2');

_defineProperty(MathNode, "LOG", 'log');

_defineProperty(MathNode, "LOG2", 'log2');

_defineProperty(MathNode, "SQRT", 'sqrt');

_defineProperty(MathNode, "INV_SQRT", 'inversesqrt');

_defineProperty(MathNode, "FLOOR", 'floor');

_defineProperty(MathNode, "CEIL", 'ceil');

_defineProperty(MathNode, "NORMALIZE", 'normalize');

_defineProperty(MathNode, "FRACT", 'fract');

_defineProperty(MathNode, "SIN", 'sin');

_defineProperty(MathNode, "COS", 'cos');

_defineProperty(MathNode, "TAN", 'tan');

_defineProperty(MathNode, "ASIN", 'asin');

_defineProperty(MathNode, "ACOS", 'acos');

_defineProperty(MathNode, "ATAN", 'atan');

_defineProperty(MathNode, "ABS", 'abs');

_defineProperty(MathNode, "SIGN", 'sign');

_defineProperty(MathNode, "LENGTH", 'length');

_defineProperty(MathNode, "NEGATE", 'negate');

_defineProperty(MathNode, "INVERT", 'invert');

_defineProperty(MathNode, "DFDX", 'dFdx');

_defineProperty(MathNode, "DFDY", 'dFdy');

_defineProperty(MathNode, "SATURATE", 'saturate');

_defineProperty(MathNode, "ROUND", 'round');

_defineProperty(MathNode, "MIN", 'min');

_defineProperty(MathNode, "MAX", 'max');

_defineProperty(MathNode, "MOD", 'mod');

_defineProperty(MathNode, "STEP", 'step');

_defineProperty(MathNode, "REFLECT", 'reflect');

_defineProperty(MathNode, "DISTANCE", 'distance');

_defineProperty(MathNode, "DOT", 'dot');

_defineProperty(MathNode, "CROSS", 'cross');

_defineProperty(MathNode, "POW", 'pow');

_defineProperty(MathNode, "TRANSFORM_DIRECTION", 'transformDirection');

_defineProperty(MathNode, "MIX", 'mix');

_defineProperty(MathNode, "CLAMP", 'clamp');

_defineProperty(MathNode, "REFRACT", 'refract');

_defineProperty(MathNode, "SMOOTHSTEP", 'smoothstep');

_defineProperty(MathNode, "FACEFORWARD", 'faceforward');

export default MathNode;
