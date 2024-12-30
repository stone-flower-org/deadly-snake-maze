import { AbstractWorld } from './abstract-world';

export class BlankWorld extends AbstractWorld {
  static create() {
    return new this();
  }

  constructor() {
    super();
  }
}
