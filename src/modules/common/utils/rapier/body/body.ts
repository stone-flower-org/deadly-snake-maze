import * as RAPIER from '@dimforge/rapier3d';

export interface IBody<B extends RAPIER.Collider = RAPIER.Collider> {
  readonly id: number;
  init(): Promise<void>;
  getBody(): B;
  delete(): void;
}
