import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Vector3, EventDispatcher, Spherical, MathUtils } from 'three';

const targetPosition = new Vector3();
class FirstPersonControls extends EventDispatcher {
  // internals
  constructor(object, _domElement) {
    super();

    _defineProperty(this, "object", void 0);

    _defineProperty(this, "domElement", void 0);

    _defineProperty(this, "enabled", true);

    _defineProperty(this, "movementSpeed", 1.0);

    _defineProperty(this, "lookSpeed", 0.005);

    _defineProperty(this, "lookVertical", true);

    _defineProperty(this, "autoForward", false);

    _defineProperty(this, "activeLook", true);

    _defineProperty(this, "heightSpeed", false);

    _defineProperty(this, "heightCoef", 1.0);

    _defineProperty(this, "heightMin", 0.0);

    _defineProperty(this, "heightMax", 1.0);

    _defineProperty(this, "constrainVertical", false);

    _defineProperty(this, "verticalMin", 0);

    _defineProperty(this, "verticalMax", Math.PI);

    _defineProperty(this, "mouseDragOn", false);

    _defineProperty(this, "autoSpeedFactor", 0.0);

    _defineProperty(this, "mouseX", 0);

    _defineProperty(this, "mouseY", 0);

    _defineProperty(this, "moveForward", false);

    _defineProperty(this, "moveBackward", false);

    _defineProperty(this, "moveLeft", false);

    _defineProperty(this, "moveRight", false);

    _defineProperty(this, "moveUp", false);

    _defineProperty(this, "moveDown", false);

    _defineProperty(this, "viewHalfX", 0);

    _defineProperty(this, "viewHalfY", 0);

    _defineProperty(this, "lat", 0);

    _defineProperty(this, "lon", 0);

    _defineProperty(this, "lookDirection", new Vector3());

    _defineProperty(this, "spherical", new Spherical());

    _defineProperty(this, "target", new Vector3());

    _defineProperty(this, "connect", domElement => {
      domElement.setAttribute('tabindex', '-1');
      domElement.style.touchAction = 'none';
      domElement.addEventListener('contextmenu', this.contextmenu);
      domElement.addEventListener('mousemove', this.onMouseMove);
      domElement.addEventListener('mousedown', this.onMouseDown);
      domElement.addEventListener('mouseup', this.onMouseUp);
      this.domElement = domElement;
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
      this.handleResize();
    });

    _defineProperty(this, "dispose", () => {
      var _this$domElement, _this$domElement2, _this$domElement3, _this$domElement4;

      (_this$domElement = this.domElement) === null || _this$domElement === void 0 ? void 0 : _this$domElement.removeEventListener('contextmenu', this.contextmenu);
      (_this$domElement2 = this.domElement) === null || _this$domElement2 === void 0 ? void 0 : _this$domElement2.removeEventListener('mousedown', this.onMouseDown);
      (_this$domElement3 = this.domElement) === null || _this$domElement3 === void 0 ? void 0 : _this$domElement3.removeEventListener('mousemove', this.onMouseMove);
      (_this$domElement4 = this.domElement) === null || _this$domElement4 === void 0 ? void 0 : _this$domElement4.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
    });

    _defineProperty(this, "handleResize", () => {
      if (this.domElement) {
        this.viewHalfX = this.domElement.offsetWidth / 2;
        this.viewHalfY = this.domElement.offsetHeight / 2;
      }
    });

    _defineProperty(this, "onMouseDown", event => {
      var _this$domElement5;

      (_this$domElement5 = this.domElement) === null || _this$domElement5 === void 0 ? void 0 : _this$domElement5.focus();

      if (this.activeLook) {
        switch (event.button) {
          case 0:
            this.moveForward = true;
            break;

          case 2:
            this.moveBackward = true;
            break;
        }
      }

      this.mouseDragOn = true;
    });

    _defineProperty(this, "onMouseUp", event => {
      if (this.activeLook) {
        switch (event.button) {
          case 0:
            this.moveForward = false;
            break;

          case 2:
            this.moveBackward = false;
            break;
        }
      }

      this.mouseDragOn = false;
    });

    _defineProperty(this, "onMouseMove", event => {
      if (this.domElement) {
        this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
        this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
      }
    });

    _defineProperty(this, "onKeyDown", event => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = true;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = true;
          break;

        case 'KeyR':
          this.moveUp = true;
          break;

        case 'KeyF':
          this.moveDown = true;
          break;
      }
    });

    _defineProperty(this, "onKeyUp", event => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = false;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = false;
          break;

        case 'KeyR':
          this.moveUp = false;
          break;

        case 'KeyF':
          this.moveDown = false;
          break;
      }
    });

    _defineProperty(this, "lookAt", (x, y, z) => {
      if (x instanceof Vector3) {
        this.target.copy(x);
      } else if (y && z) {
        this.target.set(x, y, z);
      }

      this.object.lookAt(this.target);
      this.setOrientation();
      return this;
    });

    _defineProperty(this, "update", delta => {
      if (!this.enabled) return;

      if (this.heightSpeed) {
        const y = MathUtils.clamp(this.object.position.y, this.heightMin, this.heightMax);
        const heightDelta = y - this.heightMin;
        this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
      } else {
        this.autoSpeedFactor = 0.0;
      }

      const actualMoveSpeed = delta * this.movementSpeed;

      if (this.moveForward || this.autoForward && !this.moveBackward) {
        this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
      }

      if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
      if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
      if (this.moveRight) this.object.translateX(actualMoveSpeed);
      if (this.moveUp) this.object.translateY(actualMoveSpeed);
      if (this.moveDown) this.object.translateY(-actualMoveSpeed);
      let actualLookSpeed = delta * this.lookSpeed;

      if (!this.activeLook) {
        actualLookSpeed = 0;
      }

      let verticalLookRatio = 1;

      if (this.constrainVertical) {
        verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
      }

      this.lon -= this.mouseX * actualLookSpeed;
      if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
      this.lat = Math.max(-85, Math.min(85, this.lat));
      let phi = MathUtils.degToRad(90 - this.lat);
      const theta = MathUtils.degToRad(this.lon);

      if (this.constrainVertical) {
        phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
      }

      const position = this.object.position;
      targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
      this.object.lookAt(targetPosition);
    });

    _defineProperty(this, "contextmenu", event => event.preventDefault());

    _defineProperty(this, "setOrientation", () => {
      this.lookDirection.set(0, 0, -1).applyQuaternion(this.object.quaternion);
      this.spherical.setFromVector3(this.lookDirection);
      this.lat = 90 - MathUtils.radToDeg(this.spherical.phi);
      this.lon = MathUtils.radToDeg(this.spherical.theta);
    });

    this.object = object;
    this.domElement = _domElement;
    this.setOrientation();
    if (_domElement) this.connect(_domElement);
  }

}

export { FirstPersonControls };
