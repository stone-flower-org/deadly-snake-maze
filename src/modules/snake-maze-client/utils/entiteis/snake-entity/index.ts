import { SnakeBody } from '@/src/modules/snake-maze-core/utils/bodies';
import { UnknownEntity } from '@/src/modules/snake-maze-client/utils/entiteis/unknown-entity';
import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';

export class SnakeEntity {
  static registerEntity(sceneRenderer: SceneRenderer) {
    // TODO: write me
  }

  static create(body: SnakeBody) {
    // TODO: write me
    return UnknownEntity.createFromBodyModel(body);
  }
}
