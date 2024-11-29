import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';
import { Screen } from '@/src/modules/common/utils/threejs/screen';

export interface IRendererControllerOptions {
  globalState: IGlobalState;
}

export class RendererController extends AbstractController {
  private _globalState: IGlobalState;
  private _binder = createContextSaver(this);

  constructor({ globalState }: IRendererControllerOptions) {
    super();
    this._globalState = globalState;
  }

  async init() {
    await super.init();
    this._globalState.screen.on(Screen.EVENTS.resize, this._binder.useFunc(this.onResize));
    this.onResize();
  }

  onResize() {
    const [screenWidth, screenHeight] = this._globalState.screen.getSize();
    this._globalState.renderer.getEngine().setSize(screenWidth, screenHeight);
    this._globalState.renderer.getEngine().setPixelRatio(this._globalState.screen.getPixelRatio());
  }

  delete() {
    super.delete();
    this._globalState.screen.off(Screen.EVENTS.resize, this._binder.useFunc(this.onResize));
  }
}
