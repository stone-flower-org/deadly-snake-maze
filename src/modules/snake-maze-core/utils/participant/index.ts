import { IBody } from '@/src/modules/snake-maze-core/utils/body';

export interface IParticipant<S = unknown> {
  id: number;
  getBody(): IBody;
  setBody(body: IBody): void;
  getState(): S;
  setState(state: S): void;
}
