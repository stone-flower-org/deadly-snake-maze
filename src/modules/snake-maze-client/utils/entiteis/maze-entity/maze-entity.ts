import { AbstractBodyEntity, IAbstractBodyEntityParams } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { MazeBody } from '@/src/modules/snake-maze-core/utils/bodies';
import { ITick } from '@stone-flower-org/js-utils';
import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';
import { BodyModelSync, IBodySync } from '@/src/modules/snake-maze-client/utils/entiteis/utils';

import { BoundaryEntity } from './boundary-entity';
import { FloorEntity } from './floor-entity';
import { WallEntity } from './wall-entity';
import { ExitEntity } from './exit-entity';
import { PreySpawnEntity } from './prey-spawn-entity';
import { HunterSpawnEntity } from './hunter-spawn-entity';

export interface IMazeEntityParams extends IAbstractBodyEntityParams {
  sync: IBodySync;
}

export class MazeEntity extends AbstractBodyEntity<MazeBody> {
  protected _sync: IBodySync;

  static registerEntity(sceneRenderer: SceneRenderer) {
    sceneRenderer.getEntityMap()
      .set(MazeBody.name, this.factory(sceneRenderer))
      .set(MazeBody.ATOMS.floor.type, FloorEntity.factory(sceneRenderer))
      .set(MazeBody.ATOMS.wall.type, WallEntity.factory(sceneRenderer))
      .set(MazeBody.ATOMS.boundary.type, BoundaryEntity.factory(sceneRenderer))
      .set(MazeBody.ATOMS.exit.type, ExitEntity.factory(sceneRenderer))
      .set(MazeBody.ATOMS.hunterSpawn.type, HunterSpawnEntity.factory(sceneRenderer))
      .set(MazeBody.ATOMS.preySpawn.type, PreySpawnEntity.factory(sceneRenderer));
  }

  static factory(sceneRenderer: SceneRenderer) {
    return (body: MazeBody) => new MazeEntity({
      bodyId: body.getId(),
      sync: new BodyModelSync({ sceneRenderer }),
    })
  }

  constructor({ sync, ...rest }: IMazeEntityParams) {
    super(rest);
    this._sync = sync;
  }

  updateFromBody(tick: ITick, body: MazeBody) {
    this._sync.sync(tick, this, body);
  }
}
