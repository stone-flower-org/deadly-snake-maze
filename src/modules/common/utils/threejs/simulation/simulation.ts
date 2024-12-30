import { type ITick, type IWithEventProducer } from '@stone-flower-org/js-utils';

import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

export interface ISimulation extends IWithEventProducer {
  boot(ctx: IThreejsCtx): Promise<void>;
  update(tick: ITick): void;
  delete(): void;
}
