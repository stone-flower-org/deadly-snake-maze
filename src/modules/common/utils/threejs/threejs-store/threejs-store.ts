import { WithEventProducer, type IEventProducer } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { IRenderableScene } from '@/src/modules/common/utils/threejs/scene';
import { ICursor } from '@/src/modules/common/utils/threejs/threejs-store/cursor';
import { IScreen, Screen } from '@/src/modules/common/utils/threejs/threejs-store/screen';

export interface IThreejsStore extends IEventProducer {
  getScene(): IRenderableScene | undefined;
  setScene(scene?: IRenderableScene): void;

  getCursor(): void;
  setCursorPosition({ x, y }: THREE.Vector2Like): void;
  setCursorMousedown(mousedown: boolean): void;

  getScreen(): IScreen;
  setScreenSize(width: number, height: number): void;
  setScreenPixelRatio(pixelRatio: number): void;

  delete(): void;
}

export interface ISceneStoreOptions {
  cursor?: ICursor;
  screen?: IScreen;
  scene?: IRenderableScene;
}

export class ThreejsStore extends WithEventProducer(Function) implements IThreejsStore {
  protected _cursor: ICursor;
  protected _screen: IScreen;
  protected _scene?: IRenderableScene;

  static get EVENTS() {
    return {
      scenechange: 'scenechange',
      mousemove: 'mousemove',
      mousedown: 'mousedown',
      mouseup: 'mouseup',
      screenresize: 'screenresize',
      screenpixelratiochange: 'screenpixelratiochange',
    };
  }

  static create(options: ISceneStoreOptions = {}) {
    return new this(options);
  }

  constructor({ cursor, screen, scene }: ISceneStoreOptions = {}) {
    super();
    this._cursor = cursor ?? {
      position: { x: 0, y: 0 },
      mousedown: false,
    };
    this._scene = scene;
    this._screen = screen ?? { width: 0, height: 0, aspectRatio: 0, pixelRatio: 1 };
  }

  getScene() {
    return this._scene;
  }

  setScene(scene?: IRenderableScene) {
    this._scene = scene;
    this._eventBus.emit(ThreejsStore.EVENTS.scenechange, scene);
  }

  getCursor() {
    return this._cursor;
  }

  setCursorPosition({ x, y }: THREE.Vector2Like) {
    this._cursor.position = { x, y };
    this._eventBus.emit(ThreejsStore.EVENTS.mousemove, this._cursor);
  }

  setCursorMousedown(mousedown: boolean) {
    this._cursor.mousedown = mousedown;
    this._eventBus.emit(mousedown ? ThreejsStore.EVENTS.mousedown : ThreejsStore.EVENTS.mouseup, this._cursor);
  }

  getScreen() {
    return this._screen;
  }

  setScreenSize(width: number, height: number) {
    this._screen.width = width;
    this._screen.height = height;
    Screen.resetAspectRatio(this._screen);
    this._eventBus.emit(ThreejsStore.EVENTS.screenresize, this._screen);
  }

  setScreenPixelRatio(pixelRatio: number) {
    this._screen.pixelRatio = Math.min(2, Math.max(1, pixelRatio));
    this._eventBus.emit(ThreejsStore.EVENTS.screenpixelratiochange, this._screen);
  }

  delete(): void {
    this._scene?.delete();
  }
}
