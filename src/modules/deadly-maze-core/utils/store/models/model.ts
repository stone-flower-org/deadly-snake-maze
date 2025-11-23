export type IValidModelState = object & {
  id: number;
};

export interface IModel<S extends IValidModelState = IValidModelState> {
  getId(): number;
  setId(id: number): void;
  isNew(): boolean;
  setIsNew(isNew: boolean): void;
  getState(): S;
}
