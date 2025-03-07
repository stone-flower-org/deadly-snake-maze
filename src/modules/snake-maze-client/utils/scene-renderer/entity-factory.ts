import { MazeEntity, UnknownBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis';
import { MazeBody } from '@/src/modules/snake-maze-core/utils/bodies';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

const FACTORY_BY_BODY_TYPE = {
  [MazeBody.name]: MazeEntity.createFromBodyModel.bind(MazeEntity),
  unknown: UnknownBodyEntity.createFromBodyModel.bind(UnknownBodyEntity),
};

export class EntityFactory {
  createEntiryFromBodyModel(body: BodyModel) {
    const create = FACTORY_BY_BODY_TYPE[body.getState().type] ?? FACTORY_BY_BODY_TYPE.unknown;
    return create(body);
  }
}
