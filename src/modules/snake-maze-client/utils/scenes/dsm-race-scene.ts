import { AbstractDSMScene, IDSMSceneOptions } from './abstract-dsm-scene';

export class DSMRaceScene extends AbstractDSMScene {
  static async create(options: IDSMSceneOptions) {
    return new this(options);
  }

  constructor(options: IDSMSceneOptions) {
    super(options);
  }
}
