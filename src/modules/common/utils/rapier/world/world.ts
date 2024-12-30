import * as RAPIER from '@dimforge/rapier3d';

export interface IWorld {
  readonly id: number;
  init(): Promise<void>;
  getBody(): RAPIER.World;
  clear(): void;
  delete(): void;
}

export interface IWorldOptions {
  body: RAPIER.World;
}
