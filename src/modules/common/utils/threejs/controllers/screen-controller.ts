import { createContextSaver } from '@stone-flower-org/js-utils';
import { debounce } from 'lodash';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';

export interface IScreenControllerOptions {
  app: IThreejsApp;
}

export class ScreenController extends AbstractController {
  private _app: IThreejsApp;
  private _binder = createContextSaver(this);
  private _observer: ResizeObserver;

  constructor({ app }: IScreenControllerOptions) {
    super();
    this._app = app;
    this._observer = new ResizeObserver(debounce(this._binder.useFunc(this.onResize), 50));
  }

  async init() {
    await super.init();
    const parentElement = this._app.getService('canvas').parentElement;
    parentElement && this._observer.observe(parentElement);
  }

  onResize() {
    const rect = this._app.getService('canvas').parentElement?.getBoundingClientRect();
    if (!rect) return;

    this._app.getService('store').setScreenSize(rect.width, rect.height);
    this._app.getService('store').setScreenPixelRatio(this._app.getService('window').devicePixelRatio);
  }

  delete() {
    super.delete();
    this._observer.disconnect();
  }
}
