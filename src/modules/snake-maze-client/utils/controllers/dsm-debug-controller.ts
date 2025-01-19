import { clamp, round, type ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { DSMApp, DSMSimulation } from '@/src/modules/snake-maze-client/utils/dsm-app';

import { DSMViewController } from './dsm-view-controller';

export interface DSMDebugControllerParams {
  app: DSMApp;
}

enum MOVE_STATE_MODE {
  rotate = 'rotate',
  move = 'move',
}

const defaultControlState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
  rotatex: 0,
  rotatey: 0,
};

const MOVE_SPEED = 1; // meter/sec

const ROTATE_SPEED = Math.PI / 4;

export type IControlState = typeof defaultControlState;

export class DSMDebugController extends DSMViewController {
  protected _controlState: IControlState;

  constructor(params: DSMDebugControllerParams) {
    super(params);
    this._controlState = { ...defaultControlState };
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
    // FIXME: make scrolling non infinite
    console.log('---- onWheel', e); // TODO: delete me
    this._controlState.rotatex = clamp(e.deltaX, -100, 100) / 100;
    this._controlState.rotatey = clamp(e.deltaY, -100, 100) / 100;
    return false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'w') {
      this._controlState.forward = true;
    }

    if (event.key === 'a') {
      this._controlState.left = true;
    }

    if (event.key === 's') {
      this._controlState.backward = true;
    }

    if (event.key === 'd') {
      this._controlState.right = true;
    }

    if (event.key === 'q') {
      this._controlState.down = true;
    }

    if (event.key === 'e') {
      this._controlState.up = true;
    }

    return false;
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'w') {
      this._controlState.forward = false;
    }

    if (event.key === 'a') {
      this._controlState.left = false;
    }

    if (event.key === 's') {
      this._controlState.backward = false;
    }

    if (event.key === 'd') {
      this._controlState.right = false;
    }

    if (event.key === 'q') {
      this._controlState.down = false;
    }

    if (event.key === 'e') {
      this._controlState.up = false;
    }

    return false;
  }

  onCameraMove(tick: ITick) {
    const camera = this._app.getService('store').getScene()?.getCamera()?.getView();
    if (!camera) return;

    const moveSpeed = MOVE_SPEED / tick.deltaTime;
    const lookAt = new THREE.Vector3();
    camera.getWorldDirection(lookAt);

    const yAxisV3 = new THREE.Vector3(0, 1, 0);
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

    const rotateX = -this._controlState.rotatex;
    const rotateY = this._controlState.rotatey;

    const rotationSpeed = ROTATE_SPEED / tick.deltaTime;

    const quantarionY = new THREE.Quaternion();
    quantarionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed * rotateX);

    const quantarionX = new THREE.Quaternion();
    quantarionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotationSpeed * rotateY);

    camera.quaternion.multiply(quantarionY.multiply(quantarionX));
  }

  onTick(tick: ITick) {
    this.onCameraRotate(tick);
    this.onCameraMove(tick);
  }

  delete() {
    this.deleteKeyboard();
    this.deleteMouse();
    this._app.getService('simulation').off(DSMSimulation.EVENTS.beforetick, this._binder.useFunc(this.onTick));
    super.delete();
  }
}
