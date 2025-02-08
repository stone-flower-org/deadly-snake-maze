import { BodyModel, ParticipantModel, SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

export interface PlayerModelParams {
  body: BodyModel;
  data: ParticipantModel;
  space: SpaceModel;
}

export class PlayerModel {
  protected _body: BodyModel;
  protected _data: ParticipantModel;
  protected _space: SpaceModel;

  constructor({ body, data, space }: PlayerModelParams) {
    this._body = body;
    this._data = data;
    this._space = space;
  }

  getBody() {
    return this._body;
  }

  getData() {
    return this._data;
  }

  getSpace() {
    return this._space;
  }
}
