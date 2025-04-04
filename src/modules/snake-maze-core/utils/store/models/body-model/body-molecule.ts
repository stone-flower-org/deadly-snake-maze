import { forEachColliderFromRigidBody, getCollidersFromRigidBody } from "@/src/modules/common/utils/rapier";
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';

import { BodyAtom } from "./body-atom";

export type IAtomUserData<T extends object = object> = T & {
  type?: string;
}

export type IRigidBodyUserData<T extends object = object> = T & {
  atoms: Record<number, IAtomUserData>;
  type?: string;
};

export interface IBodyMoleculeParams {
  rigidBody: PhysicsEngine.RigidBody;
  type?: string;
}

export class BodyMolecule {
  protected _rigidBody: PhysicsEngine.RigidBody;
  protected _atoms: Record<number, BodyAtom>;

  constructor(params: IBodyMoleculeParams) {
    this._rigidBody = params.rigidBody;
    this._rigidBody.userData = this._rigidBody.userData ?? this._createUserData(params);

    this._atoms = {};
    forEachColliderFromRigidBody(params.rigidBody, (collider) => {
      const atom = new BodyAtom({ collider, molecule: this });
      this._atoms[atom.getId()] = atom;
    });
  }

  getId() {
    return this._rigidBody.handle;
  }

  getType() {
    return this.getUserData().type;
  }

  setType(type: string) {
    this.getUserData().type = type;
  }

  getBody() {
    return this._rigidBody;
  }

  getPosition() {
    return this._rigidBody.translation();
  }

  getRotation() {
    return this._rigidBody.rotation();
  }

  getUserData() {
    return this._rigidBody.userData as ReturnType<typeof this._createUserData>;
  }

  getAtoms() {
    return Object.values(this._atoms);
  }

  findAtomById(id: number) {
    return this._atoms[id] as BodyAtom | undefined;
  }

  findAtomByType(type: string) {
    return this.getAtoms().find((atom) => atom.getType() === type);
  }

  getAtomsByType(type: string) {
    return this.getAtoms().filter((atom) => atom.getType() === type);
  }

  addAtom(collider: PhysicsEngine.Collider, type: string) {
    const atom = new BodyAtom({ collider, molecule: this });

    this.getUserData().atoms[atom.getId()] = { type };

    this._atoms[atom.getId()] = atom;
  }

  removeAtom(atom: PhysicsEngine.Collider) {
    delete this.getUserData().atoms[atom.handle];
    delete this._atoms[atom.handle];
  }

  protected _createUserData({ type }: IBodyMoleculeParams) {
      return {
        atoms: {},
        type,
      } as IRigidBodyUserData;
    }
}
