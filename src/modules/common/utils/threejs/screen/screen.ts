import { IWithEventProducer, WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';

export interface IScreen extends IWithEventProducer {
  getSize(): [number, number];
  getAspectRatio(): number;
  getPixelRatio(): number;
  setSize(width: number, heihgt: number): void;
  setPixelRatio(pixelRatio: number): void;
  delete(): void;
}

export interface IScreenOptions {
  width?: number;
  height?: number;
  pixelRatio?: number;
}

export class Screen extends WithEventProducer(Function) implements IScreen {
  private _width: number;
  private _height: number;
  private _aspectRatio: number;
  private _pixelRatio: number;

  static get EVENTS() {
    return {
      resize: 'resize',
      pixelratiochange: 'pixelratiochange',
    };
  }

  static createFromDOM(window: Window, canvas: HTMLElement) {
    const canvasRect = canvas.getBoundingClientRect();
    return this.create({
      width: canvasRect.width,
      height: canvasRect.height,
      pixelRatio: window.devicePixelRatio,
    });
  }

  static create(options: IScreenOptions) {
    return new this(options);
  }

  protected constructor({ width = 0, height = 0, pixelRatio = 1 }: IScreenOptions) {
    super();
    this._aspectRatio = 0;
    this._pixelRatio = 0;
    this._width = width;
    this._height = height;
    this.setPixelRatio(pixelRatio);
    this._resetAspectRatio();
  }

  getSize() {
    return [this._width, this._height] as [number, number];
  }

  getAspectRatio() {
    return this._aspectRatio;
  }

  getPixelRatio() {
    return this._pixelRatio;
  }

  setSize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._resetAspectRatio();
    this.emit(Screen.EVENTS.resize, this);
  }

  setPixelRatio(pixelRatio: number) {
    this._pixelRatio = Math.min(2, Math.max(1, pixelRatio));
    this.emit(Screen.EVENTS.pixelratiochange, this);
  }

  private _resetAspectRatio() {
    this._aspectRatio = this._width === 0 || this._height === 0 ? 0 : this._width / this._height;
  }

  delete() {
    this.removeAllListeners();
  }
}
