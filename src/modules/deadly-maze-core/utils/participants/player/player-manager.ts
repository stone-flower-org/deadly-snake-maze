import { AbstractParticipanManager } from '@/src/modules/deadly-maze-core/utils/participants/participant';
import { PhysicsEngine } from '@/src/modules/deadly-maze-core/utils/physics-engine';
import { SpaceModel } from '@/src/modules/deadly-maze-core/utils/store';

import { Player } from './player';

export interface ICreatePlayerManagerParams {
  space: SpaceModel;
  position?: PhysicsEngine.Vector3;
  rotation?: PhysicsEngine.Rotation;
}

export class PlayerManager extends AbstractParticipanManager<Player> {
  create(params: ICreatePlayerManagerParams) {
    const snakeBody = this._app.getService('snakeBodyManager').create(params);

    const player = new Player({
      state: {
        id: Player.generateId(),
        type: Player.generateType(),
        bodyId: snakeBody.getId(),
        data: {},
      },
    });

    this.save([player]);

    return player;
  }
}
