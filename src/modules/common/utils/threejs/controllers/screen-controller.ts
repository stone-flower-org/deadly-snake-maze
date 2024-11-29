import { createContextSaver } from '@stone-flower-org/js-utils';
import { debounce } from 'lodash';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';

export interface IScreenControllerOptions {
  globalState: IGlobalState;
}

export class ScreenController extends AbstractController {
  private _globalState: IGlobalState;
  private _binder = createContextSaver(this);
  private _observer: ResizeObserver;

  constructor({ globalState }: IScreenControllerOptions) {
    super();
    this._globalState = globalState;
    this._observer = new ResizeObserver(debounce(this._binder.useFunc(this.onResize), 50));
  }

  async init() {
    await super.init();
    this._globalState.canvas.parentElement && this._observer.observe(this._globalState.canvas.parentElement);
  }

  onResize() {
    const rect = this._globalState.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    this._globalState.screen.setSize(rect.width, rect.height);
    this._globalState.screen.setPixelRatio(this._globalState.window.devicePixelRatio);
  }

  delete() {
    super.delete();
    this._observer.disconnect();
  }
}
