import { AbstractBodyManager } from '@/src/modules/deadly-maze-core/utils/bodies/body';
import { SpaceModel } from '@/src/modules/deadly-maze-core/utils/store';

import { ChickenBody } from './chicken-body';

export interface CreateChickenParams {
  space: SpaceModel;
}

export class ChickenBodyManager extends AbstractBodyManager<ChickenBody> {
  create({ space }: CreateChickenParams) {
    const rigidBody = this.createRigidBody();

    const model = new ChickenBody({
      molecules: [rigidBody],
      state: {
        id: ChickenBody.generateId(),
        type: ChickenBody.generateType(),
        rootMoleculeId: rigidBody.getId(),
        moleculeIds: [rigidBody.getId()],
        spaceId: space.getId(),
      },
    });

    this.save([model]);
  }

  // biome-ignore lint/suspicious/noExplicitAny: TODO: delete me
  createRigidBody(): any {
    // TODO: write me
    return {};
  }
}
