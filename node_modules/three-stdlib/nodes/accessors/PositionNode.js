import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import Node from '../core/Node.js';
import AttributeNode from '../core/AttributeNode.js';
import VaryNode from '../core/VaryNode.js';
import ModelNode from './ModelNode.js';
import MathNode from '../math/MathNode.js';
import OperatorNode from '../math/OperatorNode.js';

class PositionNode extends Node {
  constructor(scope = PositionNode.LOCAL) {
    super('vec3');
    this.scope = scope;
  }

  getHash() {
    return `position-${this.scope}`;
  }

  generate(builder) {
    const scope = this.scope;
    let outputNode = null;

    if (scope === PositionNode.GEOMETRY) {
      outputNode = new AttributeNode('position', 'vec3');
    } else if (scope === PositionNode.LOCAL) {
      outputNode = new VaryNode(new PositionNode(PositionNode.GEOMETRY));
    } else if (scope === PositionNode.WORLD) {
      const vertexPositionNode = new MathNode(MathNode.TRANSFORM_DIRECTION, new ModelNode(ModelNode.WORLD_MATRIX), new PositionNode(PositionNode.LOCAL));
      outputNode = new VaryNode(vertexPositionNode);
    } else if (scope === PositionNode.VIEW) {
      const vertexPositionNode = new OperatorNode('*', new ModelNode(ModelNode.VIEW_MATRIX), new PositionNode(PositionNode.LOCAL));
      outputNode = new VaryNode(vertexPositionNode);
    } else if (scope === PositionNode.VIEW_DIRECTION) {
      const vertexPositionNode = new MathNode(MathNode.NEGATE, new PositionNode(PositionNode.VIEW));
      outputNode = new MathNode(MathNode.NORMALIZE, new VaryNode(vertexPositionNode));
    }

    return outputNode.build(builder, this.getNodeType(builder));
  }

  serialize(data) {
    super.serialize(data);
    data.scope = this.scope;
  }

  deserialize(data) {
    super.deserialize(data);
    this.scope = data.scope;
  }

}

_defineProperty(PositionNode, "GEOMETRY", 'geometry');

_defineProperty(PositionNode, "LOCAL", 'local');

_defineProperty(PositionNode, "WORLD", 'world');

_defineProperty(PositionNode, "VIEW", 'view');

_defineProperty(PositionNode, "VIEW_DIRECTION", 'viewDirection');

export default PositionNode;
