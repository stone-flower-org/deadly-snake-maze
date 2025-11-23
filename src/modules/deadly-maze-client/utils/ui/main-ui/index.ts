import { type ITick } from '@stone-flower-org/js-utils';

import { DSMMainScene } from '@/src/modules/deadly-maze-client/utils/scenes';
import { AbstractUI } from '@/src/modules/deadly-maze-client/utils/ui/abstract-ui';
import { DebugUI } from '@/src/modules/deadly-maze-client/utils/ui/debug-ui';

export interface IMainUIParams {
  scene: DSMMainScene;
}

export class MainUI extends AbstractUI {
  protected _scene: DSMMainScene;
  protected _debug?: DebugUI;

  static create(params: IMainUIParams) {
    return new this(params);
  }

  constructor({ scene }: IMainUIParams) {
    super();
    this._scene = scene;
  }

  getScene() {
    return this._scene;
  }

  update(tick: ITick): void {
    super.update(tick);

    const cameraView = this._scene.getCamera().getView();
    const uiView = this.getView();

    uiView.position.set(cameraView.position.x, cameraView.position.y, cameraView.position.z);
    uiView.rotation.set(cameraView.rotation.x, cameraView.rotation.y, cameraView.rotation.z);
  }

  showDebug(show = true) {
    if (show) {
      this._debug = DebugUI.create();
      this._entities.addEntities([this._debug]);
      return;
    }

    this._debug?.delete();
  }
}
