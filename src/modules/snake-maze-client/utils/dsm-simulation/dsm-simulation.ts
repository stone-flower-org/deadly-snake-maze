import { type ITick } from '@stone-flower-org/js-utils';

import { AbstractSimulation, IThreejsCtx } from '@/src/modules/common/utils/threejs';
import { DSMClientInitCommand } from '@/src/modules/snake-maze-client/utils/commands';
import { IDSMGameClient } from '@/src/modules/snake-maze-client/utils/game';

import { DSMSimulationStore } from './dsm-simulation-store';

export interface DSMSimulationOptions {
  gameClient: IDSMGameClient;
  store: DSMSimulationStore;
}

export class DSMSimulation extends AbstractSimulation {
  protected _gameClient: IDSMGameClient;
  protected _store: DSMSimulationStore;

  constructor({ gameClient, store }: DSMSimulationOptions) {
    super();
    this._gameClient = gameClient;
    this._store = store;
  }

  async boot(ctx: IThreejsCtx) {
    super.boot(ctx);

    await this._gameClient.boot();

    await this._gameClient.getCommandManager().exec(DSMClientInitCommand.name, DSMClientInitCommand.create(undefined));
  }

  onTick(tick: ITick): void {
    this._gameClient.update(tick);
    this._ctx?.store.getScene()?.update(tick);
  }
}
