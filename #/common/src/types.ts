import {$CommonPackage} from '#common';

export type Anything = Something | Nothing;
export type Something = boolean | number | string | object;
export type Nothing = null | undefined;

export type Number2 = number;
export type Integer = number;
export type Float = number;

export type Char = string;
export type String2 = string;

export type Boolean2 = boolean;

export type Range2<FROM, TO> = {from: FROM; to: TO};

export const nothing = null;

export interface $Package {
  name: String2;
}

export interface $Type<T = Model_V2> {
  pkg: $Package;
  name: String2;
  type?: T;
  parent?: $Type | Nothing;
  generics?: $Type[] | Nothing;
}

export interface Model_V2 {
  $: $Type;
}

export const $Model_V2: $Type<Model_V2> = {
  pkg: $CommonPackage,
  name: 'Model',
};

export function isType<T extends $Type>($: $Type | Nothing, type: T): $ is T {
  if (!$) {
    return false;
  }

  if (isType($.parent, type)) {
    return true;
  }

  if (type.generics && type.generics?.length > 0) {
    if ($.generics && $.generics.length === type.generics.length) {
      return $.generics.every((x, i) => isType(x, type.generics![i]));
    }

    return false;
  }

  return $.name === type.name && $.pkg == type.pkg;
}

export function is_v2<T extends $Type>(
  object: Model_V2 | Nothing,
  type: T,
): object is Exclude<T['type'], undefined> {
  return isType(object?.$, type);
}
