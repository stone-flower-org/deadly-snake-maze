import { clamp, createContextSaver, type ITick, type TimeoutId } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { AbstractController, IThreejsApp } from '@/src/modules/common/utils/threejs';
import { DSMSimulation } from '@/src/modules/deadly-maze-client/utils/dsm-app';

export interface FlyingControllerConfigs {
  speed: number;
  rotationSpeed: number;
}

export interface FlyingControllerParams {
  app: IThreejsApp;
  configs?: Partial<FlyingControllerConfigs>;
}

export enum FlyingControllerMode {
  move = 'move',
  rotate = 'rotate',
}

const defaultControlState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
  shift: false,
  rotatex: 0,
  rotatey: 0,
  rotatez: 0,
  mode: FlyingControllerMode.move,
};

export const DEFAULT_CONFIG = {
  speed: 0.5,
  rotationSpeed: Math.PI / 16,
};

export type IControlState = typeof defaultControlState;

export class FlyingController extends AbstractController {
  protected _configs: FlyingControllerConfigs;
  protected _controlState: IControlState;
  protected _app: IThreejsApp;
  protected _binder = createContextSaver(this);
  protected _wheelTimeoutId?: TimeoutId;

  constructor({ app, configs }: FlyingControllerParams) {
    super();
    this._app = app;
    this._controlState = { ...defaultControlState };
    this._configs = {
      ...configs,
      ...DEFAULT_CONFIG,
    };
  }

  async init() {
    await super.init();
    this.initKeyboard();
    this.initMouse();
    this._app.getService('simulation').on(DSMSimulation.EVENTS.beforetick, this._binder.useFunc(this.onTick));
  }

  initKeyboard() {
    this._app.getService('window').addEventListener('keydown', this._binder.useFunc(this.onKeydown));
    this._app.getService('window').addEventListener('keyup', this._binder.useFunc(this.onKeyup));
  }

  deleteKeyboard() {
    this._app.getService('window').removeEventListener('keydown', this._binder.useFunc(this.onKeydown));
    this._app.getService('window').removeEventListener('keyup', this._binder.useFunc(this.onKeyup));
  }

  initMouse() {
    this._app.getService('window').addEventListener('wheel', this._binder.useFunc(this.onWheel));
  }

  deleteMouse() {
    this._app.getService('window').removeEventListener('wheel', this._binder.useFunc(this.onWheel));
  }

  onWheel(e: WheelEvent) {
    this._controlState.rotatex = clamp(e.deltaX, -100, 100) / 100;
    this._controlState.rotatey = clamp(e.deltaY, -100, 100) / 100;

    if (this._wheelTimeoutId) {
      clearTimeout(this._wheelTimeoutId);
    }

    this._wheelTimeoutId = setTimeout(() => {
      this._controlState.rotatex = 0;
      this._controlState.rotatey = 0;
    }, 100);

    return false;
  }

  onKeydown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (key === 'r') {
      this._controlState.mode = FlyingControllerMode.rotate;
    }

    if (key === 'shift') {
      this._controlState.shift = true;
    }

    if (this._controlState.mode === FlyingControllerMode.move) {
      if (key === 'w') {
        this._controlState.forward = true;
      }

      if (key === 'a') {
        this._controlState.left = true;
      }

      if (key === 's') {
        this._controlState.backward = true;
      }

      if (key === 'd') {
        this._controlState.right = true;
      }

      if (key === 'q') {
        this._controlState.down = true;
      }

      if (key === 'e') {
        this._controlState.up = true;
      }
    }

    if (this._controlState.mode === FlyingControllerMode.rotate) {
      if (key === 'w') {
        this._controlState.rotatey = 1;
      }

      if (key === 'a') {
        this._controlState.rotatex = 1;
      }

      if (key === 's') {
        this._controlState.rotatey = -1;
      }

      if (key === 'd') {
        this._controlState.rotatex = -1;
      }

      if (key === 'q') {
        this._controlState.rotatez = 1;
      }

      if (key === 'e') {
        this._controlState.rotatez = -1;
      }
    }

    return false;
  }

  onKeyup(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (this._controlState.mode === FlyingControllerMode.move) {
      if (key === 'w') {
        this._controlState.forward = false;
      }

      if (key === 'a') {
        this._controlState.left = false;
      }

      if (key === 's') {
        this._controlState.backward = false;
      }

      if (key === 'd') {
        this._controlState.right = false;
      }

      if (key === 'q') {
        this._controlState.down = false;
      }

      if (key === 'e') {
        this._controlState.up = false;
      }
    }

    if (this._controlState.mode === FlyingControllerMode.rotate) {
      if (key === 'w') {
        this._controlState.rotatey = 0;
      }

      if (key === 'a') {
        this._controlState.rotatex = 0;
      }

      if (key === 's') {
        this._controlState.rotatey = 0;
      }

      if (key === 'd') {
        this._controlState.rotatex = 0;
      }

      if (key === 'q') {
        this._controlState.rotatez = 0;
      }

      if (key === 'e') {
        this._controlState.rotatez = 0;
      }
    }

    if (key === 'r') {
      this._controlState.mode = FlyingControllerMode.move;
      this._controlState.rotatex = 0;
      this._controlState.rotatey = 0;
      this._controlState.rotatez = 0;
    }

    if (key === 'shift') {
      this._controlState.shift = false;
    }

    return false;
  }

  onCameraMove(tick: ITick) {
    const camera = this._app.getService('store').getScene()?.getCamera()?.getView();
    if (!camera) return;

    const moveSpeed = tick.deltaTime ? this._getMovementSpeed() / tick.deltaTime : 0;
    const lookAt = new THREE.Vector3();
    camera.getWorldDirection(lookAt);

    const yAxisV3 = new THREE.Vector3(0, 1, 0);
    yAxisV3.applyQuaternion(camera.quaternion);
    const forwardV3 = lookAt.clone().normalize();
    const rightV3 = new THREE.Vector3().crossVectors(forwardV3, yAxisV3).normalize();
    const downV3 = new THREE.Vector3().crossVectors(forwardV3, rightV3).normalize();

    const moveForwardV3 = forwardV3.clone().multiplyScalar(moveSpeed);
    const moveRightV3 = rightV3.clone().multiplyScalar(moveSpeed);
    const moveDownV3 = downV3.clone().multiplyScalar(moveSpeed);

    if (this._controlState.forward && !this._controlState.backward) {
      camera.position.add(moveForwardV3);
    }

    if (this._controlState.backward && !this._controlState.forward) {
      camera.position.add(moveForwardV3.clone().multiplyScalar(-1));
    }

    if (this._controlState.right && !this._controlState.left) {
      camera.position.add(moveRightV3);
    }

    if (this._controlState.left && !this._controlState.right) {
      camera.position.add(moveRightV3.clone().multiplyScalar(-1));
    }

    if (this._controlState.up && !this._controlState.down) {
      camera.position.add(moveDownV3.clone().multiplyScalar(-1));
    }

    if (this._controlState.down && !this._controlState.up) {
      camera.position.add(moveDownV3);
    }
  }

  onCameraRotate(tick: ITick) {
    const camera = this._app.getService('store').getScene()?.getCamera()?.getView();
    if (!camera) return;

    const rotationSpeed = tick.deltaTime ? this._getRotationSpeed() / tick.deltaTime : 0;

    const quantarionY = new THREE.Quaternion();
    quantarionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed * this._controlState.rotatex);

    const quantarionX = new THREE.Quaternion();
    quantarionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotationSpeed * this._controlState.rotatey);

    const quantarionZ = new THREE.Quaternion();
    quantarionZ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rotationSpeed * this._controlState.rotatez);

    camera.quaternion.multiply(quantarionZ.multiply(quantarionY.multiply(quantarionX)));
  }

  onTick(tick: ITick) {
    this.onCameraRotate(tick);
    this.onCameraMove(tick);
    this._app.getService('store').getScene()?.getCamera()?.getView()?.updateMatrixWorld();
  }

  getControlState() {
    return this._controlState;
  }

  delete() {
    this._wheelTimeoutId && clearTimeout(this._wheelTimeoutId);
    this.deleteKeyboard();
    this.deleteMouse();
    this._app.getService('simulation').off(DSMSimulation.EVENTS.beforetick, this._binder.useFunc(this.onTick));
    super.delete();
  }

  protected _getMovementSpeed() {
    return this._configs.speed * (this._controlState.shift ? 2 : 1);
  }

  protected _getRotationSpeed() {
    return this._configs.rotationSpeed * (this._controlState.shift ? 2 : 1);
  }
}
