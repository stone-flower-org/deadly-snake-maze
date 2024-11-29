import * as THREE from 'three';

import { IWithEventProducer, WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';

export interface ICursor extends IWithEventProducer {
  getPosition(): THREE.Vector2;
  getMousedown(): boolean;
  setPosition({ x, y }: THREE.Vector2Like): void;
  setMousedown(mousedown: boolean): void;
  delete(): void;
}

export interface ICursorOptions {
  position?: THREE.Vector2;
  mousedown?: boolean;
}

export class Cursor extends WithEventProducer(Function) implements ICursor {
  private _position: THREE.Vector2;
  private _mousedown: boolean;

  static get EVENTS() {
    return {
      move: 'move',
      up: 'up',
      down: 'down',
    };
  }

  public static create(options: ICursorOptions = {}) {
    return new this(options);
  }

  protected constructor({ position, mousedown = false }: ICursorOptions = {}) {
    super();
    this._position = new THREE.Vector2().copy(
      position ?? {
        x: 0,
        y: 0,
      },
    );
    this._mousedown = mousedown;
  }

  getPosition() {
    return this._position;
  }

  getMousedown() {
    return this._mousedown;
  }

  setPosition({ x, y }: THREE.Vector2Like) {
    this._position.set(x, y);
    this.emit(Cursor.EVENTS.move, this);
  }

  setMousedown(mousedown: boolean) {
    this._mousedown = mousedown;
    this.emit(mousedown ? Cursor.EVENTS.down : Cursor.EVENTS.up, this);
  }

  delete() {
    this.removeAllListeners();
  }
}
