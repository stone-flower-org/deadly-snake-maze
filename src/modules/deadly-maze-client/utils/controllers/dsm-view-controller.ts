import { createContextSaver, type UnsubscribeFunc } from '@stone-flower-org/js-utils';

import { AbstractControllerCollection } from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';

export interface DSMViewControllerParams {
  app: DSMApp;
}
export class DSMViewController extends AbstractControllerCollection {
  protected _app: DSMApp;
  protected _subscribers = new Set<UnsubscribeFunc>();
  protected _binder = createContextSaver(this);

  constructor({ app }: DSMViewControllerParams) {
    super({});
    this._app = app;
  }

  protected _generateId() {
    return DSMViewController.name;
  }

  delete() {
    this._subscribers.forEach((unsubscribe) => unsubscribe());
    super.delete();
  }
}
