import { PhysicsEngine } from '@/src/modules/deadly-maze-core/utils/physics-engine';

import { BodyMolecule } from './body-molecule';

export interface IBodyAtomParams {
  collider: PhysicsEngine.Collider;
  molecule: BodyMolecule;
}

export class BodyAtom {
  protected _molecule: BodyMolecule;
  protected _collider: PhysicsEngine.Collider;

  constructor({ collider, molecule }: IBodyAtomParams) {
    this._molecule = molecule;
    this._collider = collider;
  }

  getId() {
    return this.getCollider().handle;
  }

  getMolecule() {
    return this._molecule;
  }

  getType() {
    return this.getMolecule().getUserData().atoms[this.getId()].type;
  }

  setType(type: string) {
    const data = this.getMolecule().getUserData().atoms[this.getId()];
    if (data) data.type = type;
  }

  getCollider() {
    return this._collider;
  }

  getPosition() {
    return this.getCollider().translation();
  }

  getRotation() {
    return this.getCollider().rotation();
  }
}
