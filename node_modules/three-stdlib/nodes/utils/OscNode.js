import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import Node from '../core/Node.js';
import TimerNode from './TimerNode.js';
import { add, mul, sin, round, fract, abs, sub } from '../ShaderNode.js';

class OscNode extends Node {
  constructor(method = OscNode.SINE, timeNode = new TimerNode()) {
    super();
    this.method = method;
    this.timeNode = timeNode;
  }

  getNodeType(builder) {
    return this.timeNode.getNodeType(builder);
  }

  generate(builder) {
    const method = this.method;
    const timeNode = this.timeNode;
    let outputNode = null;

    if (method === OscNode.SINE) {
      outputNode = add(mul(sin(mul(add(timeNode, 0.75), Math.PI * 2)), 0.5), 0.5);
    } else if (method === OscNode.SQUARE) {
      outputNode = round(fract(timeNode));
    } else if (method === OscNode.TRIANGLE) {
      outputNode = abs(sub(1, mul(fract(add(timeNode, 0.5)), 2)));
    } else if (method === OscNode.SAWTOOTH) {
      outputNode = fract(timeNode);
    }

    return outputNode.build(builder);
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

_defineProperty(OscNode, "SINE", 'sine');

_defineProperty(OscNode, "SQUARE", 'square');

_defineProperty(OscNode, "TRIANGLE", 'triangle');

_defineProperty(OscNode, "SAWTOOTH", 'sawtooth');

export default OscNode;
