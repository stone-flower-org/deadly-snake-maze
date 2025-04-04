import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis';

export type IEntityFactory<B> = (body: B) => AbstractBodyEntity;

export class EntityMap {
  protected map = new Map<string, IEntityFactory<any>>;

  set<B>(type: string, factory: IEntityFactory<B>) {
    this.map.set(type, factory);
    return this;
  }

  remove(type: string) {
    this.map.delete(type);
    return this;
  }

  resolve<B>(type: string) {
    return this.map.get(type) as IEntityFactory<B> | undefined;
  }

  resolveOrUse<B>(type: string, backup: string) {
    const factory = this.resolve<B>(type) ?? this.resolve<B>(backup);
    if (!factory) throw new Error(`Couldn't find backup type ${backup}`);
    return factory;
  }

  clear() {
    this.map.clear();
    return this;
  }
}
