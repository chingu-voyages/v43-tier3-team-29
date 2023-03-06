import { ShaderNode, max, abs, dFdx, normalGeometry, dFdy, add, min } from '../ShaderNode.js';
import '../core/PropertyNode.js';
import '../core/Node.js';
import '../core/constants.js';
import '../core/NodeUtils.js';
import 'three';
import '../core/VarNode.js';
import '../core/AttributeNode.js';
import '../core/VaryNode.js';
import '../core/ConstNode.js';
import '../core/InputNode.js';
import '../core/UniformNode.js';
import '../accessors/BufferNode.js';
import '../accessors/PositionNode.js';
import '@babel/runtime/helpers/esm/defineProperty';
import '../accessors/ModelNode.js';
import '../accessors/Object3DNode.js';
import '../math/MathNode.js';
import '../core/TempNode.js';
import '../core/ExpressionNode.js';
import '../utils/JoinNode.js';
import '../utils/SplitNode.js';
import '../core/NodeBuilder.js';
import '../core/NodeUniform.js';
import '../core/NodeAttribute.js';
import '../core/NodeVary.js';
import '../core/NodeVar.js';
import '../core/NodeCode.js';
import '../core/NodeKeywords.js';
import '../math/OperatorNode.js';
import '../accessors/NormalNode.js';
import '../accessors/CameraNode.js';
import '../accessors/TextureNode.js';
import '../accessors/UVNode.js';
import '../math/CondNode.js';
import '../core/ContextNode.js';
import '../utils/ArrayElementNode.js';
import '../utils/ConvertNode.js';

const getGeometryRoughness = new ShaderNode(() => {
  const dxy = max(abs(dFdx(normalGeometry)), abs(dFdy(normalGeometry)));
  const geometryRoughness = max(max(dxy.x, dxy.y), dxy.z);
  return geometryRoughness;
});
const getRoughness = new ShaderNode(inputs => {
  const {
    roughness
  } = inputs;
  const geometryRoughness = getGeometryRoughness();
  let roughnessFactor = max(roughness, 0.0525); // 0.0525 corresponds to the base mip of a 256 cubemap.

  roughnessFactor = add(roughnessFactor, geometryRoughness);
  roughnessFactor = min(roughnessFactor, 1.0);
  return roughnessFactor;
});

export { getGeometryRoughness, getRoughness };
