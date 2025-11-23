import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { AbstractModel, IModelParams } from '@/src/modules/deadly-maze-core/utils/store/models/abstract-model';

import { BodyMolecule } from './body-molecule';

export interface IBodyState {
  id: number;
  type: string;
  rootMoleculeId?: number;
  moleculeIds: number[];
  spaceId: number;
}

export type IBodyModelParams = IModelParams<IBodyState> & {
  molecules: BodyMolecule[];
};

export class BodyModel extends AbstractModel<IBodyState> {
  static idGenerator = createAutoincrementIdGenerator();

  static generateId() {
    return BodyModel.idGenerator();
  }

  static generateType() {
    return this.name;
  }

  protected _molecules: Record<number, BodyMolecule>;

  constructor(params: IBodyModelParams) {
    super(params);
    this._molecules = Object.fromEntries(params.molecules.map((molecule) => [molecule.getId(), molecule]));
  }

  getType() {
    return this.getState().type;
  }

  getRootMolecule() {
    return this._molecules[this.getState().rootMoleculeId ?? -1] as BodyMolecule | undefined;
  }

  setRootBodyPart(rootBodyPart: BodyMolecule | undefined) {
    this._state.rootMoleculeId = rootBodyPart?.getId();
  }

  getMolecules() {
    return Object.values(this._molecules);
  }

  findMoleculeById(id: number) {
    return this._molecules[id] as BodyMolecule | undefined;
  }

  findMoleculeByType(type: string) {
    return this.getMolecules().find((molecule) => molecule.getType() === type);
  }

  getMoleculesByType(type: string) {
    return this.getMolecules().filter((molecule) => molecule.getType() === type);
  }

  addMolecule(molecule: BodyMolecule) {
    this._molecules[molecule.getId()] = molecule;
    this._state.moleculeIds.push(molecule.getId());
  }

  removeMolecule(molecule: BodyMolecule) {
    if (this._state.rootMoleculeId === molecule.getId()) this._state.rootMoleculeId = undefined;
    delete this._molecules[molecule.getId()];
    this._state.moleculeIds = this._state.moleculeIds.filter((id) => id !== molecule.getId());
  }
}
