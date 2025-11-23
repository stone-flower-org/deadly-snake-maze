import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { AbstractModel, IModelParams } from './abstract-model';
import { IBodyState } from './body-model';

export type IValidParticipantData = object;

export interface IParticipantState<D extends IValidParticipantData = IValidParticipantData> {
  id: number;
  type: string;
  bodyId: IBodyState['id'];
  data: D;
}

export type IParticipantModelParams<D extends IValidParticipantData = IValidParticipantData> = IModelParams<
  IParticipantState<D>
>;

export class ParticipantModel<D extends IValidParticipantData = IValidParticipantData> extends AbstractModel<
  IParticipantState<D>
> {
  static idGenerator = createAutoincrementIdGenerator();

  static generateId() {
    return ParticipantModel.idGenerator();
  }

  static generateType() {
    return this.name;
  }

  constructor(params: IParticipantModelParams<D>) {
    super(params);
  }
}
