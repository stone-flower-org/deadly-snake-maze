import { Store } from '@stone-flower-org/js-utils';

import { DSMError, DSMStoreError } from '@/src/modules/snake-maze-core/utils/errors';

import { BodyModel, BodyMolecule, IBodyState, IParticipantState, ISpaceState, ParticipantModel, SpaceModel } from './models';

export enum DSMGameStatus {
  pending = 'pending',
  pause = 'pause',
  run = 'run',
  finished = 'finished',
  canceled = 'canceled',
}

export enum IQueryFuncResult {
  excludeNExit = -2,
  exclude = -1,
  include = 1,
  includeNExit = 2,
}

export type IQueryFunc<M> = (model: M) => IQueryFuncResult;

export interface DSMGameState {
  bodies: Record<IBodyState['id'], IBodyState>;
  bodyIds: Set<IBodyState['id']>;
  bodiesBySpaceId: Record<ISpaceState['id'], Set<IBodyState['id']>>;

  participants: Record<IParticipantState['id'], IParticipantState>;
  participantIds: Set<IParticipantState['id']>;
  winnerIds: Set<IParticipantState['id']>;

  spaces: Record<ISpaceState['id'], ISpaceState>;
  spaceIds: Set<ISpaceState['id']>;

  status: DSMGameStatus;
}

export const initialDSMState: DSMGameState = {
  bodies: {},
  bodyIds: new Set(),
  bodiesBySpaceId: {},

  participants: {},
  participantIds: new Set(),
  winnerIds: new Set(),

  spaces: {},
  spaceIds: new Set(),

  status: DSMGameStatus.pending,
};

export class DSMGameStore extends Store<DSMGameState> {
  queryBodies(query: IQueryFunc<BodyModel>) {
    const values = this.getState().bodyIds.values();

    const models: BodyModel[] = [];

    for (const id of values) {
      const [model] = this.getBodies([id]);

      if (!this._runQuery(query, model, models)) break;
    }

    return models;
  }

  getAllBodies() {
    return this.queryBodies(() => IQueryFuncResult.include);
  }

  getBodies(ids: IBodyState['id'][]) {
    return ids.map((id) => {
      const state = this.getState().bodies[id];
      if (!state) throw new DSMError(`Couldn't find body ${id}`);

      const molecules = this.getSpaceRegidBodies(state.spaceId, state.moleculeIds).map((rigidBody) => new BodyMolecule({ rigidBody }));

      return new BodyModel({
        molecules,
        isNew: false,
        state,
      });
    });
  }

  getBodySpaces(bodyIds: IBodyState['id'][]): SpaceModel[] {
    return bodyIds.map((bodyId) => {
      const [body] = this.getBodies([bodyId]);

      const [space] = this.getSpaces([body.getState().spaceId]);

      return space;
    });
  }

  saveBodies(entities: BodyModel[]) {
    this.setState((state) => {
      entities.forEach((entity) => {
        entity.setIsNew(false);
        state.bodies[entity.getId()] = entity.getState();
        state.bodyIds.add(entity.getId());
        
        if (!state.bodiesBySpaceId[entity.getState().spaceId]) state.bodiesBySpaceId[entity.getState().spaceId] = new Set();
        state.bodiesBySpaceId[entity.getState().spaceId].add(entity.getId());
      });
      return state;
    });
  }

  removeBodies(ids: IBodyState['id'][]) {
    this.setState((state) => {
      ids.forEach((id) => {
        const [body] = this.getBodies([id]);
        const [space] = this.getSpaces([body.getState().spaceId]);

        body.getMolecules().forEach((molecule) => space.getWorld().removeRigidBody(molecule.getBody()));
        state.bodyIds.delete(body.getId());
        delete state.bodies[body.getId()];
        state.bodiesBySpaceId[space.getId()]?.delete(id);
      });
      return state;
    });
  }

  queryParticipants(query: IQueryFunc<ParticipantModel>) {
    const values = this.getState().bodyIds.values();

    const models: ParticipantModel[] = [];

    for (const id of values) {
      const [model] = this.getParticipants([id]);

      if (!this._runQuery(query, model, models)) break;
    }

    return models;
  }

  getAllParticipants() {
    return this.queryParticipants(() => IQueryFuncResult.include);
  }

  getParticipants(ids: IParticipantState['id'][]) {
    return ids.map((id) => {
      const state = this.getState().participants[id];
      if (!state) throw new DSMError(`Couldn't find participant ${id}`);
      return new ParticipantModel({
        state,
        isNew: false,
      });
    });
  }

  saveParticipants(entities: ParticipantModel[]) {
    this.setState((state) => {
      entities.forEach((entity) => {
        entity.setIsNew(false);
        state.participants[entity.getId()] = entity.getState();
        state.participantIds.add(entity.getId());
      });
      return state;
    });
  }

  removeParticipants(ids: IParticipantState['id'][]) {
    this.setState((state) => {
      ids.forEach((id) => {
        state.winnerIds.delete(id);
        state.participantIds.delete(id);
        delete state.participants[id];
      });
      return state;
    });
  }

  querySpaces(query: IQueryFunc<SpaceModel>) {
    const values = this.getState().bodyIds.values();

    const models: SpaceModel[] = [];

    for (const id of values) {
      const [model] = this.getSpaces([id]);

      if (!this._runQuery(query, model, models)) break;
    }

    return models;
  }

  getAllSpaces() {
    return this.querySpaces(() => IQueryFuncResult.include);
  }

  getSpaces(ids: ISpaceState['id'][]) {
    return ids.map((id) => {
      const spaceState = this.getState().spaces[id];

      if (!spaceState) throw new DSMStoreError(`Couldnn't find space ${id}`);

      return new SpaceModel({
        isNew: false,
        state: spaceState,
      });
    });
  }

  getSpaceRegidBodies(id: ISpaceState['id'], rigidBodyIds: number[]) {
    const [space] = this.getSpaces([id]);

    return rigidBodyIds.map((id) => {
      const rigidBody = space.getWorld().getRigidBody(id);

      if (!rigidBody) throw new DSMError(`Couldn't find rigid body ${id}`);

      return rigidBody;
    });
  }

  getAllSpaceBodies(id: ISpaceState['id']) {
    return this.queryBodies((body) =>
      body.getState().spaceId === id ? IQueryFuncResult.include : IQueryFuncResult.exclude,
    );
  }

  saveSpaces(entities: SpaceModel[]) {
    this.setState((state) => {
      entities.forEach((entity) => {
        entity.setIsNew(false);
        state.spaces[entity.getId()] = entity.getState();
        state.spaceIds.add(entity.getId());
        
        if (!state.bodiesBySpaceId[entity.getId()]) state.bodiesBySpaceId[entity.getId()] = new Set();
      });
      return state;
    });
  }

  removeSpaces(ids: ISpaceState['id'][]) {
    this.setState((state) => {
      ids.forEach((id) => {
        state.bodiesBySpaceId[id]?.forEach((bodyId) => {
          this.removeBodies([bodyId]);
        });

        state.spaces[id]?.world?.free();

        state.spaceIds.delete(id);
        delete state.spaces[id];
      });
      return state;
    });
  }

  getStatus() {
    return this.getState().status;
  }

  setStatus(status: DSMGameStatus) {
    this.setState((state) => {
      state.status = status;
      return state;
    });
  }

  getAllWinners() {
    const winnerIds = this.getState().winnerIds;
    return this.queryParticipants((model) =>
      winnerIds.has(model.getId()) ? IQueryFuncResult.include : IQueryFuncResult.exclude,
    );
  }

  saveWinners(entities: ParticipantModel[]) {
    this.setState((state) => {
      entities.forEach((entity) => {
        state.winnerIds.add(entity.getId());
      });
      return state;
    });
  }

  removeWinners(participantIds: IParticipantState['id'][]) {
    this.setState((state) => {
      participantIds.forEach((id) => {
        state.winnerIds.delete(id);
      });
      return state;
    });
  }

  clear() {
    this.getAllSpaces().forEach((space) => {
      space.getWorld().free();
    });
    this.setState(() => initialDSMState);
  }

  delete(): void {
    this.clear();
    super.delete();
  }

  _runQuery<M>(query: IQueryFunc<M>, model: M, outModels: M[]) {
    const result = query(model);

    if (result > 0) outModels.push(model);

    if (Math.abs(result) === 2) return false;

    return true;
  }
}
