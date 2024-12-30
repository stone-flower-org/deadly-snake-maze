import { type ITick, WithEventProducer } from '@stone-flower-org/js-utils';

import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

import { ISimulation } from './simulation';

export abstract class AbstractSimulation extends WithEventProducer(Function) implements ISimulation {
  protected _ctx?: IThreejsCtx;

  static get EVENTS() {
    return {
      aftertick: 'aftertick',
      beforetick: 'beforetick',
    };
  }

  async boot(ctx: IThreejsCtx) {
    this._ctx = ctx;
  }

  update(tick: ITick) {
    this._eventBus.emit(AbstractSimulation.EVENTS.beforetick, tick);
    this.onTick(tick);
    this._eventBus.emit(AbstractSimulation.EVENTS.aftertick, tick);
  }

  delete() {
    this.removeAllListeners();
  }

  abstract onTick(tick: ITick): void;
}
