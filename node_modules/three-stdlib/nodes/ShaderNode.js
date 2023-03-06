import PropertyNode from './core/PropertyNode.js';
import VarNode from './core/VarNode.js';
import AttributeNode from './core/AttributeNode.js';
import ConstNode from './core/ConstNode.js';
import UniformNode from './core/UniformNode.js';
import BufferNode from './accessors/BufferNode.js';
import PositionNode from './accessors/PositionNode.js';
import NormalNode from './accessors/NormalNode.js';
import CameraNode from './accessors/CameraNode.js';
import ModelNode from './accessors/ModelNode.js';
import TextureNode from './accessors/TextureNode.js';
import UVNode from './accessors/UVNode.js';
import OperatorNode from './math/OperatorNode.js';
import CondNode from './math/CondNode.js';
import MathNode from './math/MathNode.js';
import ArrayElementNode from './utils/ArrayElementNode.js';
import ConvertNode from './utils/ConvertNode.js';
import JoinNode from './utils/JoinNode.js';
import SplitNode from './utils/SplitNode.js';
import { getValueFromType } from './core/NodeUtils.js';

// core nodes
const NodeHandler = {
  construct(NodeClosure, params) {
    const inputs = params.shift();
    return NodeClosure(new ShaderNodeObjects(inputs), ...params);
  },

  get: function (node, prop) {
    if (typeof prop === 'string' && node[prop] === undefined) {
      if (/^[xyzwrgbastpq]{1,4}$/.test(prop) === true) {
        // accessing properties ( swizzle )
        prop = prop.replace(/r|s/g, 'x').replace(/g|t/g, 'y').replace(/b|p/g, 'z').replace(/a|q/g, 'w');
        return new ShaderNodeObject(new SplitNode(node, prop));
      } else if (/^\d+$/.test(prop) === true) {
        // accessing array
        return new ShaderNodeObject(new ArrayElementNode(node, uint(Number(prop))));
      }
    }

    return node[prop];
  }
};
const nodeObjects = new WeakMap();

const ShaderNodeObject = function (obj) {
  const type = typeof obj;

  if (type === 'number' || type === 'boolean') {
    return new ShaderNodeObject(getAutoTypedConstNode(obj));
  } else if (type === 'object') {
    if (obj.isNode === true) {
      let nodeObject = nodeObjects.get(obj);

      if (nodeObject === undefined) {
        nodeObject = new Proxy(obj, NodeHandler);
        nodeObjects.set(obj, nodeObject);
        nodeObjects.set(nodeObject, nodeObject);
      }

      return nodeObject;
    }
  }

  return obj;
};

const ShaderNodeObjects = function (objects) {
  for (const name in objects) {
    objects[name] = new ShaderNodeObject(objects[name]);
  }

  return objects;
};

const getShaderNodeArray = array => {
  const len = array.length;

  for (let i = 0; i < len; i++) {
    array[i] = new ShaderNodeObject(array[i]);
  }

  return array;
};

const ShaderNodeProxy = function (NodeClass, scope = null, factor = null) {
  if (scope === null) {
    return (...params) => {
      return new ShaderNodeObject(new NodeClass(...getShaderNodeArray(params)));
    };
  } else if (factor === null) {
    return (...params) => {
      return new ShaderNodeObject(new NodeClass(scope, ...getShaderNodeArray(params)));
    };
  } else {
    factor = new ShaderNodeObject(factor);
    return (...params) => {
      return new ShaderNodeObject(new NodeClass(scope, ...getShaderNodeArray(params), factor));
    };
  }
};

const ShaderNodeScript = function (jsFunc) {
  return (inputs, builder) => {
    new ShaderNodeObjects(inputs);
    return new ShaderNodeObject(jsFunc(inputs, builder));
  };
};

const bools = [false, true];
const uints = [0, 1, 2, 3];
const ints = [-1, -2];
const floats = [0.5, 1.5, 1 / 3, 1e-6, 1e6, Math.PI, Math.PI * 2, 1 / Math.PI, 2 / Math.PI, 1 / (Math.PI * 2), Math.PI / 2];
const boolsCacheMap = new Map();

for (let bool of bools) boolsCacheMap.set(bool, new ConstNode(bool));

const uintsCacheMap = new Map();

for (let uint of uints) uintsCacheMap.set(uint, new ConstNode(uint, 'uint'));

const intsCacheMap = new Map([...uintsCacheMap].map(el => new ConstNode(el.value, 'int')));

for (let int of ints) intsCacheMap.set(int, new ConstNode(int, 'int'));

const floatsCacheMap = new Map([...intsCacheMap].map(el => new ConstNode(el.value)));

for (let float of floats) floatsCacheMap.set(float, new ConstNode(float));

for (let float of floats) floatsCacheMap.set(-float, new ConstNode(-float));

const constNodesCacheMap = new Map([...boolsCacheMap, ...floatsCacheMap]);

const getAutoTypedConstNode = value => {
  if (constNodesCacheMap.has(value)) {
    return constNodesCacheMap.get(value);
  } else if (value.isNode === true) {
    return value;
  } else {
    return new ConstNode(value);
  }
};

const ConvertType = function (type, cacheMap = null) {
  return (...params) => {
    if (params.length === 0) {
      return nodeObject(new ConstNode(getValueFromType(type), type));
    } else {
      if (type === 'color' && params[0].isNode !== true) {
        params = [getValueFromType(type, ...params)];
      }

      if (params.length === 1 && cacheMap !== null && cacheMap.has(params[0])) {
        return cacheMap.get(params[0]);
      }

      const nodes = params.map(getAutoTypedConstNode);
      return nodeObject(new ConvertNode(nodes.length === 1 ? nodes[0] : new JoinNode(nodes), type));
    }
  };
}; //
// Node Material Shader Syntax
//


const ShaderNode = new Proxy(ShaderNodeScript, NodeHandler);
const nodeObject = val => {
  return new ShaderNodeObject(val);
};
const uniform = value => {
  var _value$node;

  // TODO: get ConstNode from .traverse() in the future
  value = value.isNode === true ? ((_value$node = value.node) === null || _value$node === void 0 ? void 0 : _value$node.value) || value.value : value;
  return nodeObject(new UniformNode(value, value.nodeType));
};
const label = (node, name) => {
  node = nodeObject(node);

  if (node.isVarNode === true) {
    node.name = name;
    return node;
  }

  return nodeObject(new VarNode(node, name));
};
const temp = node => nodeObject(new VarNode(nodeObject(node)));
const color = new ConvertType('color');
const float = new ConvertType('float', floatsCacheMap);
const int = new ConvertType('int', intsCacheMap);
const uint = new ConvertType('uint', uintsCacheMap);
const bool = new ConvertType('bool', boolsCacheMap);
const vec2 = new ConvertType('vec2');
const ivec2 = new ConvertType('ivec2');
const uvec2 = new ConvertType('uvec2');
const bvec2 = new ConvertType('bvec2');
const vec3 = new ConvertType('vec3');
const ivec3 = new ConvertType('ivec3');
const uvec3 = new ConvertType('uvec3');
const bvec3 = new ConvertType('bvec3');
const vec4 = new ConvertType('vec4');
const ivec4 = new ConvertType('ivec4');
const uvec4 = new ConvertType('uvec4');
const bvec4 = new ConvertType('bvec4');
const mat3 = new ConvertType('mat3');
const imat3 = new ConvertType('imat3');
const umat3 = new ConvertType('umat3');
const bmat3 = new ConvertType('bmat3');
const mat4 = new ConvertType('mat4');
const imat4 = new ConvertType('imat4');
const umat4 = new ConvertType('umat4');
const bmat4 = new ConvertType('bmat4');
const join = (...params) => nodeObject(new JoinNode(getShaderNodeArray(params)));
const uv = (...params) => nodeObject(new UVNode(...params));
const attribute = (...params) => nodeObject(new AttributeNode(...params));
const buffer = (...params) => nodeObject(new BufferNode(...params));
const texture = (...params) => nodeObject(new TextureNode(...params));
const sampler = texture => nodeObject(new ConvertNode(texture.isNode === true ? texture : new TextureNode(texture), 'sampler'));
const cond = (...params) => nodeObject(new CondNode(...getShaderNodeArray(params)));
const addTo = (varNode, ...params) => {
  varNode.node = add(varNode.node, ...getShaderNodeArray(params));
  return nodeObject(varNode);
};
const add = new ShaderNodeProxy(OperatorNode, '+');
const sub = new ShaderNodeProxy(OperatorNode, '-');
const mul = new ShaderNodeProxy(OperatorNode, '*');
const div = new ShaderNodeProxy(OperatorNode, '/');
const remainder = new ShaderNodeProxy(OperatorNode, '%');
const equal = new ShaderNodeProxy(OperatorNode, '==');
const assign = new ShaderNodeProxy(OperatorNode, '=');
const lessThan = new ShaderNodeProxy(OperatorNode, '<');
const greaterThan = new ShaderNodeProxy(OperatorNode, '>');
const lessThanEqual = new ShaderNodeProxy(OperatorNode, '<=');
const greaterThanEqual = new ShaderNodeProxy(OperatorNode, '>=');
const and = new ShaderNodeProxy(OperatorNode, '&&');
const or = new ShaderNodeProxy(OperatorNode, '||');
const xor = new ShaderNodeProxy(OperatorNode, '^^');
const bitAnd = new ShaderNodeProxy(OperatorNode, '&');
const bitOr = new ShaderNodeProxy(OperatorNode, '|');
const bitXor = new ShaderNodeProxy(OperatorNode, '^');
const shiftLeft = new ShaderNodeProxy(OperatorNode, '<<');
const shiftRight = new ShaderNodeProxy(OperatorNode, '>>');
const element = new ShaderNodeProxy(ArrayElementNode);
const normalGeometry = new ShaderNodeObject(new NormalNode(NormalNode.GEOMETRY));
const normalLocal = new ShaderNodeObject(new NormalNode(NormalNode.LOCAL));
const normalWorld = new ShaderNodeObject(new NormalNode(NormalNode.WORLD));
const normalView = new ShaderNodeObject(new NormalNode(NormalNode.VIEW));
const transformedNormalView = new ShaderNodeObject(new VarNode(new NormalNode(NormalNode.VIEW), 'TransformedNormalView', 'vec3'));
const positionLocal = new ShaderNodeObject(new PositionNode(PositionNode.LOCAL));
const positionWorld = new ShaderNodeObject(new PositionNode(PositionNode.WORLD));
const positionView = new ShaderNodeObject(new PositionNode(PositionNode.VIEW));
const positionViewDirection = new ShaderNodeObject(new PositionNode(PositionNode.VIEW_DIRECTION));
const viewMatrix = new ShaderNodeObject(new ModelNode(ModelNode.VIEW_MATRIX));
const cameraPosition = new ShaderNodeObject(new CameraNode(CameraNode.POSITION));
const diffuseColor = new ShaderNodeObject(new PropertyNode('DiffuseColor', 'vec4'));
const roughness = new ShaderNodeObject(new PropertyNode('Roughness', 'float'));
const metalness = new ShaderNodeObject(new PropertyNode('Metalness', 'float'));
const alphaTest = new ShaderNodeObject(new PropertyNode('AlphaTest', 'float'));
const specularColor = new ShaderNodeObject(new PropertyNode('SpecularColor', 'color'));
const abs = new ShaderNodeProxy(MathNode, 'abs');
const acos = new ShaderNodeProxy(MathNode, 'acos');
const asin = new ShaderNodeProxy(MathNode, 'asin');
const atan = new ShaderNodeProxy(MathNode, 'atan');
const ceil = new ShaderNodeProxy(MathNode, 'ceil');
const clamp = new ShaderNodeProxy(MathNode, 'clamp');
const cos = new ShaderNodeProxy(MathNode, 'cos');
const cross = new ShaderNodeProxy(MathNode, 'cross');
const degrees = new ShaderNodeProxy(MathNode, 'degrees');
const dFdx = new ShaderNodeProxy(MathNode, 'dFdx');
const dFdy = new ShaderNodeProxy(MathNode, 'dFdy');
const distance = new ShaderNodeProxy(MathNode, 'distance');
const dot = new ShaderNodeProxy(MathNode, 'dot');
const exp = new ShaderNodeProxy(MathNode, 'exp');
const exp2 = new ShaderNodeProxy(MathNode, 'exp2');
const faceforward = new ShaderNodeProxy(MathNode, 'faceforward');
const floor = new ShaderNodeProxy(MathNode, 'floor');
const fract = new ShaderNodeProxy(MathNode, 'fract');
const invert = new ShaderNodeProxy(MathNode, 'invert');
const inversesqrt = new ShaderNodeProxy(MathNode, 'inversesqrt');
const length = new ShaderNodeProxy(MathNode, 'length');
const log = new ShaderNodeProxy(MathNode, 'log');
const log2 = new ShaderNodeProxy(MathNode, 'log2');
const max = new ShaderNodeProxy(MathNode, 'max');
const min = new ShaderNodeProxy(MathNode, 'min');
const mix = new ShaderNodeProxy(MathNode, 'mix');
const mod = new ShaderNodeProxy(MathNode, 'mod');
const negate = new ShaderNodeProxy(MathNode, 'negate');
const normalize = new ShaderNodeProxy(MathNode, 'normalize');
const pow = new ShaderNodeProxy(MathNode, 'pow');
const pow2 = new ShaderNodeProxy(MathNode, 'pow', 2);
const pow3 = new ShaderNodeProxy(MathNode, 'pow', 3);
const pow4 = new ShaderNodeProxy(MathNode, 'pow', 4);
const radians = new ShaderNodeProxy(MathNode, 'radians');
const reflect = new ShaderNodeProxy(MathNode, 'reflect');
const refract = new ShaderNodeProxy(MathNode, 'refract');
const round = new ShaderNodeProxy(MathNode, 'round');
const saturate = new ShaderNodeProxy(MathNode, 'saturate');
const sign = new ShaderNodeProxy(MathNode, 'sign');
const sin = new ShaderNodeProxy(MathNode, 'sin');
const smoothstep = new ShaderNodeProxy(MathNode, 'smoothstep');
const sqrt = new ShaderNodeProxy(MathNode, 'sqrt');
const step = new ShaderNodeProxy(MathNode, 'step');
const tan = new ShaderNodeProxy(MathNode, 'tan');
const transformDirection = new ShaderNodeProxy(MathNode, 'transformDirection');
const EPSILON = float(1e-6);
const INFINITY = float(1e6);

export { EPSILON, INFINITY, ShaderNode, abs, acos, add, addTo, alphaTest, and, asin, assign, atan, attribute, bitAnd, bitOr, bitXor, bmat3, bmat4, bool, buffer, bvec2, bvec3, bvec4, cameraPosition, ceil, clamp, color, cond, cos, cross, dFdx, dFdy, degrees, diffuseColor, distance, div, dot, element, equal, exp, exp2, faceforward, float, floor, fract, greaterThan, greaterThanEqual, imat3, imat4, int, inversesqrt, invert, ivec2, ivec3, ivec4, join, label, length, lessThan, lessThanEqual, log, log2, mat3, mat4, max, metalness, min, mix, mod, mul, negate, nodeObject, normalGeometry, normalLocal, normalView, normalWorld, normalize, or, positionLocal, positionView, positionViewDirection, positionWorld, pow, pow2, pow3, pow4, radians, reflect, refract, remainder, roughness, round, sampler, saturate, shiftLeft, shiftRight, sign, sin, smoothstep, specularColor, sqrt, step, sub, tan, temp, texture, transformDirection, transformedNormalView, uint, umat3, umat4, uniform, uv, uvec2, uvec3, uvec4, vec2, vec3, vec4, viewMatrix, xor };
