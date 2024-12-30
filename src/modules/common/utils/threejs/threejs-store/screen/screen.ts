export interface IScreen {
  width: number;
  height: number;
  aspectRatio: number;
  pixelRatio: number;
}

export class Screen {
  static createFromDOM(window: Window, canvas: HTMLElement) {
    const canvasRect = canvas.getBoundingClientRect();
    const screen = {
      width: canvasRect.width,
      height: canvasRect.height,
      pixelRatio: window.devicePixelRatio,
      aspectRatio: 0,
    };
    this.resetAspectRatio(screen);
    return screen;
  }

  static resetAspectRatio(screen: IScreen) {
    screen.aspectRatio = screen.width === 0 || screen.height === 0 ? 1 : screen.width / screen.height;
  }
}
