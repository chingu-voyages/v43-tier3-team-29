import NodeParser from '../core/NodeParser.js';
import GLSLNodeFunction from './GLSLNodeFunction.js';
import '../core/NodeFunction.js';
import '../core/NodeFunctionInput.js';

class GLSLNodeParser extends NodeParser {
  parseFunction(source) {
    return new GLSLNodeFunction(source);
  }

}

export default GLSLNodeParser;
