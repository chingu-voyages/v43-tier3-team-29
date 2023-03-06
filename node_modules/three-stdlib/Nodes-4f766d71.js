import ArrayUniformNode from './nodes/core/ArrayUniformNode.js';
import AttributeNode from './nodes/core/AttributeNode.js';
import BypassNode from './nodes/core/BypassNode.js';
import CodeNode from './nodes/core/CodeNode.js';
import ConstNode from './nodes/core/ConstNode.js';
import ContextNode from './nodes/core/ContextNode.js';
import ExpressionNode from './nodes/core/ExpressionNode.js';
import FunctionCallNode from './nodes/core/FunctionCallNode.js';
import FunctionNode from './nodes/core/FunctionNode.js';
import Node from './nodes/core/Node.js';
import NodeAttribute from './nodes/core/NodeAttribute.js';
import NodeBuilder from './nodes/core/NodeBuilder.js';
import NodeCode from './nodes/core/NodeCode.js';
import NodeFrame from './nodes/core/NodeFrame.js';
import NodeFunctionInput from './nodes/core/NodeFunctionInput.js';
import NodeKeywords from './nodes/core/NodeKeywords.js';
import NodeUniform from './nodes/core/NodeUniform.js';
import NodeVar from './nodes/core/NodeVar.js';
import NodeVary from './nodes/core/NodeVary.js';
import PropertyNode from './nodes/core/PropertyNode.js';
import TempNode from './nodes/core/TempNode.js';
import UniformNode from './nodes/core/UniformNode.js';
import VarNode from './nodes/core/VarNode.js';
import VaryNode from './nodes/core/VaryNode.js';
import BufferNode from './nodes/accessors/BufferNode.js';
import CameraNode from './nodes/accessors/CameraNode.js';
import CubeTextureNode from './nodes/accessors/CubeTextureNode.js';
import MaterialNode from './nodes/accessors/MaterialNode.js';
import MaterialReferenceNode from './nodes/accessors/MaterialReferenceNode.js';
import ModelNode from './nodes/accessors/ModelNode.js';
import ModelViewProjectionNode from './nodes/accessors/ModelViewProjectionNode.js';
import NormalNode from './nodes/accessors/NormalNode.js';
import Object3DNode from './nodes/accessors/Object3DNode.js';
import PointUVNode from './nodes/accessors/PointUVNode.js';
import PositionNode from './nodes/accessors/PositionNode.js';
import ReferenceNode from './nodes/accessors/ReferenceNode.js';
import ReflectNode from './nodes/accessors/ReflectNode.js';
import SkinningNode from './nodes/accessors/SkinningNode.js';
import TextureNode from './nodes/accessors/TextureNode.js';
import UVNode from './nodes/accessors/UVNode.js';
import ColorSpaceNode from './nodes/display/ColorSpaceNode.js';
import NormalMapNode from './nodes/display/NormalMapNode.js';
import MathNode from './nodes/math/MathNode.js';
import OperatorNode from './nodes/math/OperatorNode.js';
import CondNode from './nodes/math/CondNode.js';
import LightContextNode from './nodes/lights/LightContextNode.js';
import LightNode from './nodes/lights/LightNode.js';
import LightsNode from './nodes/lights/LightsNode.js';
import ArrayElementNode from './nodes/utils/ArrayElementNode.js';
import ConvertNode from './nodes/utils/ConvertNode.js';
import JoinNode from './nodes/utils/JoinNode.js';
import SplitNode from './nodes/utils/SplitNode.js';
import SpriteSheetUVNode from './nodes/utils/SpriteSheetUVNode.js';
import MatcapUVNode from './nodes/utils/MatcapUVNode.js';
import OscNode from './nodes/utils/OscNode.js';
import TimerNode from './nodes/utils/TimerNode.js';
import NodeMaterialLoader from './nodes/loaders/NodeMaterialLoader.js';
import { Loader, ObjectLoader } from 'three';
import CheckerNode from './nodes/procedural/CheckerNode.js';
import FogNode from './nodes/fog/FogNode.js';
import FogRangeNode from './nodes/fog/FogRangeNode.js';
import { NodeShaderStage, NodeUpdateType, NodeType } from './nodes/core/constants.js';
import { F_Schlick, BRDF_Lambert, getDistanceAttenuation, V_GGX_SmithCorrelated, D_GGX, BRDF_GGX, RE_Direct_Physical, PhysicalLightingModel } from './nodes/functions/BSDFs.js';
import { ShaderNode, nodeObject, uniform, label, temp, color, float, int, uint, bool, vec2, ivec2, uvec2, bvec2, vec3, ivec3, uvec3, bvec3, vec4, ivec4, uvec4, bvec4, mat3, imat3, umat3, bmat3, mat4, imat4, umat4, bmat4, join, uv, attribute, buffer, texture, sampler, cond, addTo, add, sub, mul, div, remainder, equal, assign, lessThan, greaterThan, lessThanEqual, greaterThanEqual, and, or, xor, bitAnd, bitOr, bitXor, shiftLeft, shiftRight, element, normalGeometry, normalLocal, normalWorld, normalView, transformedNormalView, positionLocal, positionWorld, positionView, positionViewDirection, viewMatrix, cameraPosition, diffuseColor, roughness, metalness, alphaTest, specularColor, abs, acos, asin, atan, ceil, clamp, cos, cross, degrees, dFdx, dFdy, distance, dot, exp, exp2, faceforward, floor, fract, invert, inversesqrt, length, log, log2, max, min, mix, mod, negate, normalize, pow, pow2, pow3, pow4, radians, reflect, refract, round, saturate, sign, sin, smoothstep, sqrt, step, tan, transformDirection, EPSILON, INFINITY } from './nodes/ShaderNode.js';
import LineBasicNodeMaterial from './nodes/materials/LineBasicNodeMaterial.js';
import MeshBasicNodeMaterial from './nodes/materials/MeshBasicNodeMaterial.js';
import MeshStandardNodeMaterial from './nodes/materials/MeshStandardNodeMaterial.js';
import PointsNodeMaterial from './nodes/materials/PointsNodeMaterial.js';

class NodeLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.textures = {};
  }

  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, text => {
      try {
        onLoad(this.parse(JSON.parse(text)));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }

        this.manager.itemError(url);
      }
    }, onProgress, onError);
  }

  parseNodes(json) {
    const nodes = {};

    if (json !== undefined) {
      for (const nodeJSON of json) {
        const {
          uuid,
          type
        } = nodeJSON;
        nodes[uuid] = fromType(type);
        nodes[uuid].uuid = uuid;
      }

      const meta = {
        nodes,
        textures: this.textures
      };

      for (const nodeJSON of json) {
        nodeJSON.meta = meta;
        const node = nodes[nodeJSON.uuid];
        node.deserialize(nodeJSON);
        delete nodeJSON.meta;
      }
    }

    return nodes;
  }

  parse(json) {
    const node = fromType(type);
    node.uuid = json.uuid;
    const nodes = this.parseNodes(json.inputNodes);
    const meta = {
      nodes,
      textures: this.textures
    };
    json.meta = meta;
    node.deserialize(json);
    delete json.meta;
    return node;
  }

  setTextures(value) {
    this.textures = value;
    return this;
  }

}

class NodeObjectLoader extends ObjectLoader {
  constructor(manager) {
    super(manager);
    this._nodesJSON = null;
  }

  parse(json, onLoad) {
    this._nodesJSON = json.nodes;
    const data = super.parse(json, onLoad);
    this._nodesJSON = null; // dispose

    return data;
  }

  parseNodes(json, textures) {
    if (json !== undefined) {
      const loader = new NodeLoader();
      loader.setTextures(textures);
      return loader.parseNodes(json);
    }

    return {};
  }

  parseMaterials(json, textures) {
    const materials = {};

    if (json !== undefined) {
      const nodes = this.parseNodes(this._nodesJSON, textures);
      const loader = new NodeMaterialLoader();
      loader.setTextures(textures);
      loader.setNodes(nodes);

      for (let i = 0, l = json.length; i < l; i++) {
        const data = json[i];
        materials[data.uuid] = loader.parse(data);
      }
    }

    return materials;
  }

}

// core
const nodeLib = {
  // core
  ArrayUniformNode,
  AttributeNode,
  BypassNode,
  CodeNode,
  ContextNode,
  ConstNode,
  ExpressionNode,
  FunctionCallNode,
  FunctionNode,
  Node,
  NodeAttribute,
  NodeBuilder,
  NodeCode,
  NodeFrame,
  NodeFunctionInput,
  NodeKeywords,
  NodeUniform,
  NodeVar,
  NodeVary,
  PropertyNode,
  TempNode,
  UniformNode,
  VarNode,
  VaryNode,
  // accessors
  BufferNode,
  CameraNode,
  CubeTextureNode,
  MaterialNode,
  MaterialReferenceNode,
  ModelNode,
  ModelViewProjectionNode,
  NormalNode,
  Object3DNode,
  PointUVNode,
  PositionNode,
  ReferenceNode,
  ReflectNode,
  SkinningNode,
  TextureNode,
  UVNode,
  // display
  ColorSpaceNode,
  NormalMapNode,
  // math
  MathNode,
  OperatorNode,
  CondNode,
  // lights
  LightContextNode,
  LightNode,
  LightsNode,
  // utils
  ArrayElementNode,
  ConvertNode,
  JoinNode,
  SplitNode,
  SpriteSheetUVNode,
  MatcapUVNode,
  OscNode,
  TimerNode,
  // procedural
  CheckerNode,
  // fog
  FogNode,
  FogRangeNode,
  // loaders
  NodeLoader,
  NodeObjectLoader,
  NodeMaterialLoader
};
const fromType = type => {
  return new nodeLib[type]();
};

var Nodes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  fromType: fromType,
  ArrayUniformNode: ArrayUniformNode,
  AttributeNode: AttributeNode,
  BypassNode: BypassNode,
  CodeNode: CodeNode,
  ContextNode: ContextNode,
  ConstNode: ConstNode,
  ExpressionNode: ExpressionNode,
  FunctionCallNode: FunctionCallNode,
  FunctionNode: FunctionNode,
  Node: Node,
  NodeAttribute: NodeAttribute,
  NodeBuilder: NodeBuilder,
  NodeCode: NodeCode,
  NodeFrame: NodeFrame,
  NodeFunctionInput: NodeFunctionInput,
  NodeKeywords: NodeKeywords,
  NodeUniform: NodeUniform,
  NodeVar: NodeVar,
  NodeVary: NodeVary,
  PropertyNode: PropertyNode,
  TempNode: TempNode,
  UniformNode: UniformNode,
  VarNode: VarNode,
  VaryNode: VaryNode,
  BufferNode: BufferNode,
  CameraNode: CameraNode,
  CubeTextureNode: CubeTextureNode,
  MaterialNode: MaterialNode,
  MaterialReferenceNode: MaterialReferenceNode,
  ModelNode: ModelNode,
  ModelViewProjectionNode: ModelViewProjectionNode,
  NormalNode: NormalNode,
  Object3DNode: Object3DNode,
  PointUVNode: PointUVNode,
  PositionNode: PositionNode,
  ReferenceNode: ReferenceNode,
  ReflectNode: ReflectNode,
  SkinningNode: SkinningNode,
  TextureNode: TextureNode,
  UVNode: UVNode,
  ColorSpaceNode: ColorSpaceNode,
  NormalMapNode: NormalMapNode,
  MathNode: MathNode,
  OperatorNode: OperatorNode,
  CondNode: CondNode,
  LightContextNode: LightContextNode,
  LightNode: LightNode,
  LightsNode: LightsNode,
  ArrayElementNode: ArrayElementNode,
  ConvertNode: ConvertNode,
  JoinNode: JoinNode,
  SplitNode: SplitNode,
  SpriteSheetUVNode: SpriteSheetUVNode,
  MatcapUVNode: MatcapUVNode,
  OscNode: OscNode,
  TimerNode: TimerNode,
  CheckerNode: CheckerNode,
  FogNode: FogNode,
  FogRangeNode: FogRangeNode,
  NodeLoader: NodeLoader,
  NodeObjectLoader: NodeObjectLoader,
  NodeMaterialLoader: NodeMaterialLoader,
  NodeShaderStage: NodeShaderStage,
  NodeUpdateType: NodeUpdateType,
  NodeType: NodeType,
  F_Schlick: F_Schlick,
  BRDF_Lambert: BRDF_Lambert,
  getDistanceAttenuation: getDistanceAttenuation,
  V_GGX_SmithCorrelated: V_GGX_SmithCorrelated,
  D_GGX: D_GGX,
  BRDF_GGX: BRDF_GGX,
  RE_Direct_Physical: RE_Direct_Physical,
  PhysicalLightingModel: PhysicalLightingModel,
  LineBasicNodeMaterial: LineBasicNodeMaterial,
  MeshBasicNodeMaterial: MeshBasicNodeMaterial,
  MeshStandardNodeMaterial: MeshStandardNodeMaterial,
  PointsNodeMaterial: PointsNodeMaterial,
  ShaderNode: ShaderNode,
  nodeObject: nodeObject,
  uniform: uniform,
  label: label,
  temp: temp,
  color: color,
  float: float,
  int: int,
  uint: uint,
  bool: bool,
  vec2: vec2,
  ivec2: ivec2,
  uvec2: uvec2,
  bvec2: bvec2,
  vec3: vec3,
  ivec3: ivec3,
  uvec3: uvec3,
  bvec3: bvec3,
  vec4: vec4,
  ivec4: ivec4,
  uvec4: uvec4,
  bvec4: bvec4,
  mat3: mat3,
  imat3: imat3,
  umat3: umat3,
  bmat3: bmat3,
  mat4: mat4,
  imat4: imat4,
  umat4: umat4,
  bmat4: bmat4,
  join: join,
  uv: uv,
  attribute: attribute,
  buffer: buffer,
  texture: texture,
  sampler: sampler,
  cond: cond,
  addTo: addTo,
  add: add,
  sub: sub,
  mul: mul,
  div: div,
  remainder: remainder,
  equal: equal,
  assign: assign,
  lessThan: lessThan,
  greaterThan: greaterThan,
  lessThanEqual: lessThanEqual,
  greaterThanEqual: greaterThanEqual,
  and: and,
  or: or,
  xor: xor,
  bitAnd: bitAnd,
  bitOr: bitOr,
  bitXor: bitXor,
  shiftLeft: shiftLeft,
  shiftRight: shiftRight,
  element: element,
  normalGeometry: normalGeometry,
  normalLocal: normalLocal,
  normalWorld: normalWorld,
  normalView: normalView,
  transformedNormalView: transformedNormalView,
  positionLocal: positionLocal,
  positionWorld: positionWorld,
  positionView: positionView,
  positionViewDirection: positionViewDirection,
  viewMatrix: viewMatrix,
  cameraPosition: cameraPosition,
  diffuseColor: diffuseColor,
  roughness: roughness,
  metalness: metalness,
  alphaTest: alphaTest,
  specularColor: specularColor,
  abs: abs,
  acos: acos,
  asin: asin,
  atan: atan,
  ceil: ceil,
  clamp: clamp,
  cos: cos,
  cross: cross,
  degrees: degrees,
  dFdx: dFdx,
  dFdy: dFdy,
  distance: distance,
  dot: dot,
  exp: exp,
  exp2: exp2,
  faceforward: faceforward,
  floor: floor,
  fract: fract,
  invert: invert,
  inversesqrt: inversesqrt,
  length: length,
  log: log,
  log2: log2,
  max: max,
  min: min,
  mix: mix,
  mod: mod,
  negate: negate,
  normalize: normalize,
  pow: pow,
  pow2: pow2,
  pow3: pow3,
  pow4: pow4,
  radians: radians,
  reflect: reflect,
  refract: refract,
  round: round,
  saturate: saturate,
  sign: sign,
  sin: sin,
  smoothstep: smoothstep,
  sqrt: sqrt,
  step: step,
  tan: tan,
  transformDirection: transformDirection,
  EPSILON: EPSILON,
  INFINITY: INFINITY
});

export { NodeLoader as N, NodeObjectLoader as a, Nodes as b, fromType as f };
