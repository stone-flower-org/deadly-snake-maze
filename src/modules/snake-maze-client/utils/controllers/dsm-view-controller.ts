import { createContextSaver, type UnsubscribeFunc } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';

export interface DSMViewControllerParams {
  app: DSMApp;
}
export class DSMViewController extends AbstractController {
  protected _app: DSMApp;
  protected _subscribers = new Set<UnsubscribeFunc>();
  protected _binder = createContextSaver(this);

  constructor({ app }: DSMViewControllerParams) {
    super();
    this._app = app;
  }

  protected _generateId() {
    return DSMViewController.name;
  }

  delete() {
    this._subscribers.forEach((unsubscribe) => unsubscribe());
  }
}
