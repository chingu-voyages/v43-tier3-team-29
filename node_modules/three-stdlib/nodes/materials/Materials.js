import LineBasicNodeMaterial from './LineBasicNodeMaterial.js';
export { default as LineBasicNodeMaterial } from './LineBasicNodeMaterial.js';
import MeshBasicNodeMaterial from './MeshBasicNodeMaterial.js';
export { default as MeshBasicNodeMaterial } from './MeshBasicNodeMaterial.js';
import MeshStandardNodeMaterial from './MeshStandardNodeMaterial.js';
export { default as MeshStandardNodeMaterial } from './MeshStandardNodeMaterial.js';
import PointsNodeMaterial from './PointsNodeMaterial.js';
export { default as PointsNodeMaterial } from './PointsNodeMaterial.js';
import { Material } from 'three';
import './NodeMaterial.js';
import '../core/NodeUtils.js';

const materialLib = {
  LineBasicNodeMaterial,
  MeshBasicNodeMaterial,
  MeshStandardNodeMaterial,
  PointsNodeMaterial
};
const fromTypeFunction = Material.fromType;

Material.fromType = function (type) {
  if (materialLib[type] !== undefined) {
    return new materialLib[type]();
  }

  return fromTypeFunction.call(this, type);
};
