import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Euler, Vector3, EventDispatcher } from 'three';

const _euler = new Euler(0, 0, 0, 'YXZ');

const _vector = new Vector3();

const _changeEvent = {
  type: 'change'
};
const _lockEvent = {
  type: 'lock'
};
const _unlockEvent = {
  type: 'unlock'
};

const _PI_2 = Math.PI / 2;

class PointerLockControls extends EventDispatcher {
  constructor(camera, _domElement) {
    super();

    _defineProperty(this, "camera", void 0);

    _defineProperty(this, "domElement", void 0);

    _defineProperty(this, "isLocked", void 0);

    _defineProperty(this, "minPolarAngle", void 0);

    _defineProperty(this, "maxPolarAngle", void 0);

    _defineProperty(this, "pointerSpeed", void 0);

    _defineProperty(this, "onMouseMove", event => {
      if (!this.domElement || this.isLocked === false) return;
      const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      _euler.setFromQuaternion(this.camera.quaternion);

      _euler.y -= movementX * 0.002 * this.pointerSpeed;
      _euler.x -= movementY * 0.002 * this.pointerSpeed;
      _euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
      this.camera.quaternion.setFromEuler(_euler);
      this.dispatchEvent(_changeEvent);
    });

    _defineProperty(this, "onPointerlockChange", () => {
      if (!this.domElement) return;

      if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
        this.dispatchEvent(_lockEvent);
        this.isLocked = true;
      } else {
        this.dispatchEvent(_unlockEvent);
        this.isLocked = false;
      }
    });

    _defineProperty(this, "onPointerlockError", () => {
      console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
    });

    _defineProperty(this, "connect", domElement => {
      this.domElement = domElement || this.domElement;
      if (!this.domElement) return;
      this.domElement.ownerDocument.addEventListener('mousemove', this.onMouseMove);
      this.domElement.ownerDocument.addEventListener('pointerlockchange', this.onPointerlockChange);
      this.domElement.ownerDocument.addEventListener('pointerlockerror', this.onPointerlockError);
    });

    _defineProperty(this, "disconnect", () => {
      if (!this.domElement) return;
      this.domElement.ownerDocument.removeEventListener('mousemove', this.onMouseMove);
      this.domElement.ownerDocument.removeEventListener('pointerlockchange', this.onPointerlockChange);
      this.domElement.ownerDocument.removeEventListener('pointerlockerror', this.onPointerlockError);
    });

    _defineProperty(this, "dispose", () => {
      this.disconnect();
    });

    _defineProperty(this, "getObject", () => {
      // retaining this method for backward compatibility
      return this.camera;
    });

    _defineProperty(this, "direction", new Vector3(0, 0, -1));

    _defineProperty(this, "getDirection", v => {
      return v.copy(this.direction).applyQuaternion(this.camera.quaternion);
    });

    _defineProperty(this, "moveForward", distance => {
      // move forward parallel to the xz-plane
      // assumes camera.up is y-up
      _vector.setFromMatrixColumn(this.camera.matrix, 0);

      _vector.crossVectors(this.camera.up, _vector);

      this.camera.position.addScaledVector(_vector, distance);
    });

    _defineProperty(this, "moveRight", distance => {
      _vector.setFromMatrixColumn(this.camera.matrix, 0);

      this.camera.position.addScaledVector(_vector, distance);
    });

    _defineProperty(this, "lock", () => {
      if (this.domElement) this.domElement.requestPointerLock();
    });

    _defineProperty(this, "unlock", () => {
      if (this.domElement) this.domElement.ownerDocument.exitPointerLock();
    });

    this.camera = camera;
    this.domElement = _domElement;
    this.isLocked = false; // Set to constrain the pitch of the camera
    // Range is 0 to Math.PI radians

    this.minPolarAngle = 0; // radians

    this.maxPolarAngle = Math.PI; // radians

    this.pointerSpeed = 1.0;
    if (_domElement) this.connect(_domElement);
  }

}

export { PointerLockControls };
