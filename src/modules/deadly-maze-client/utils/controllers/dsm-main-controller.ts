import { type UnsubscribeFunc } from '@stone-flower-org/js-utils';

import {
  AbstractControllerCollection,
  CameraController,
  IController,
  IThreejsApp,
  RendererController,
  ScreenController,
} from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';
import { DSMView, IDSMSimulationState } from '@/src/modules/deadly-maze-client/utils/store';

import { DSMDebugController } from './dsm-debug-controller';
import { DSMMazeController } from './dsm-maze-controller';
import { DSMViewController } from './dsm-view-controller';

export interface DSMMainControllerOptions {
  app: DSMApp;
}

export class DSMMainController extends AbstractControllerCollection {
  protected _app: DSMApp;
  protected _subscriptions = new Set<UnsubscribeFunc>();

  constructor({ app }: DSMMainControllerOptions) {
    super({
      controllers: [
        new CameraController({ app: app as IThreejsApp }),
        new RendererController({ app: app as IThreejsApp }),
        new ScreenController({ app: app as IThreejsApp }),
      ],
    });
    this._app = app;
  }

  async init() {
    await super.init();
    this._subscriptions.add(
      this._app.getService('simulation').getStore().subscribe(this._binder.useFunc(this.onSimulationStoreChange)),
    );
    this.onSimulationStoreChange(this._app.getService('simulation').getStore().getState());
  }

  onSimulationStoreChange(state: IDSMSimulationState) {
    this.onViewChange(state.view);
  }

  onViewChange(control: DSMView) {
    const [prevController] = this.getControllers([DSMViewController.name]) as (IController | undefined)[];
    let newController: DSMViewController | undefined;

    if (control === DSMView.maze && !(prevController instanceof DSMMazeController)) {
      newController = new DSMMazeController({ app: this._app });
    }

    if (control === DSMView.debug && !(prevController instanceof DSMDebugController)) {
      newController = new DSMDebugController({ app: this._app });
    }

    if (newController) {
      prevController?.delete();
      newController.init();
      this.addControllers([newController]);
    }
  }

  delete() {
    super.delete();
    this._subscriptions.forEach((unsubscribe) => unsubscribe());
  }

  protected _registerViewController(controller: DSMViewController) {
    this.addControllers([controller]);
  }
}
