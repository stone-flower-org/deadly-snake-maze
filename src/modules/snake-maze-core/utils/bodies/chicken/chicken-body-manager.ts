import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { ChickenBody } from './chicken-body';

export interface CreateChickenParams {
  space: SpaceModel;
}

export class ChickenBodyManager extends AbstractBodyManager<ChickenBody> {
  create({ space }: CreateChickenParams) {
    const rigidBody = this.createRigidBody();

    const model = new ChickenBody({
      rigidBody,
      state: {
        id: ChickenBody.generateId(),
        type: ChickenBody.generateType(),
        rigidBodyId: rigidBody.handle,
        spaceId: space.getId(),
      },
    });

    this.save([model]);
  }

  createRigidBody(): any {
    // TODO: write me
  }
}
