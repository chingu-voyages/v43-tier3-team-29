import NodeParser from '../core/NodeParser.js';
import WGSLNodeFunction from './WGSLNodeFunction.js';
import '../core/NodeFunction.js';
import '../core/NodeFunctionInput.js';

class WGSLNodeParser extends NodeParser {
  parseFunction(source) {
    return new WGSLNodeFunction(source);
  }

}

export default WGSLNodeParser;
