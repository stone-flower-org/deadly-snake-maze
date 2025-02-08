import { AbstractEvent } from './abstract-event';

// export interface IMoveCommandPayload {} // TOOD: write me

// export class MoveCommand extends AbstractCommand<IMoveCommandPayload> {}

export interface IPhysicUpdateEventPayload {}

export class Body extends AbstractEvent<IPhysicUpdateEventPayload> {}
