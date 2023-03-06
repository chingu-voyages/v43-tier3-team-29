import Node from './Node.js';
import { getValueType, getValueFromType } from './NodeUtils.js';

class InputNode extends Node {
  constructor(value, nodeType = null) {
    super(nodeType);
    this.value = value;
  }

  getNodeType() {
    if (this.nodeType === null) {
      return getValueType(this.value);
    }

    return this.nodeType;
  }

  getInputType(builder) {
    return this.getNodeType(builder);
  }

  serialize(data) {
    var _this$value, _this$value$toArray;

    super.serialize(data);
    data.value = ((_this$value = this.value) === null || _this$value === void 0 ? void 0 : (_this$value$toArray = _this$value.toArray) === null || _this$value$toArray === void 0 ? void 0 : _this$value$toArray.call(_this$value)) || this.value;
    data.valueType = getValueType(this.value);
    data.nodeType = this.nodeType;
  }

  deserialize(data) {
    var _this$value2, _this$value2$fromArra;

    super.deserialize(data);
    this.nodeType = data.nodeType;
    this.value = getValueFromType(data.valueType);
    this.value = ((_this$value2 = this.value) === null || _this$value2 === void 0 ? void 0 : (_this$value2$fromArra = _this$value2.fromArray) === null || _this$value2$fromArra === void 0 ? void 0 : _this$value2$fromArra.call(_this$value2, data.value)) || data.value;
  }

  generate() {
    console.warn('Abstract function.');
  }

}

InputNode.prototype.isInputNode = true;

export default InputNode;
