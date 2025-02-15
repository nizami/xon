export interface $Type<T = Model> {
  packageName: string;
  name: string;
  type?: T;
  parent?: $Type | null | undefined;
  generics?: $Type[] | null | undefined;

  toString(): string;
  // todo remove it
  toNativeString(): string;
  nameEquals(other: $Type): boolean;
  is(other: $Type): boolean;
}

export function $NewType<T extends Model>(
  packageName: string,
  name: string,
  parent?: $Type | null | undefined,
  generics?: $Type[] | null | undefined,
): $Type<T> {
  return {
    packageName,
    name,
    parent,
    generics,

    toString(): string {
      return this.toNativeString();
    },

    toNativeString(): string {
      return `${this.packageName}.${this.name}`;
    },

    nameEquals(other: $Type): boolean {
      return this.name === other.name && this.packageName == other.packageName;
    },

    is(other: $Type): boolean {
      if (this.parent?.is(other) || other.nameEquals($Model())) {
        return true;
      }

      if (other.generics && other.generics?.length > 0) {
        if (this.generics && this.generics.length === other.generics.length) {
          // todo Covariance and contravariance ???
          return this.generics.every((x, i) => x.is(other.generics![i]));
        }

        return false;
      }

      return this.nameEquals(other);
    },
  };
}

export interface Model {
  // todo move to symbol ???
  $: $Type;

  // todo remove 'equals' ???
  equals?(other: this): boolean;
  // is?<T extends $Type>($type: T): this is Exclude<T['type'], undefined>;
}

export const $Model = () => $NewType<Model>('Typing', 'Model');

// todo remove 'is' and use 'Model.is()'
export function is<T extends $Type>(model: any, type: T): model is Exclude<T['type'], undefined> {
  return (model?.$ as $Type)?.is(type) ?? false;
}
