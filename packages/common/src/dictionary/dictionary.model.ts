import {$ArrayData, $KeyValue, ArrayData, Boolean2, KeyValue, Nothing, commonPackageType} from '#common';
import {$Model, $Type, Model} from '#typing';

// @ts-ignore
export interface Dictionary<K extends Model = Model, V = Anything> extends ArrayData<KeyValue<K, V>> {
  _base: ArrayData<KeyValue<K, V>>;

  keys(): ArrayData<K>;
  values(): ArrayData<V>;
  get(key: K): V | Nothing;
  get2(key: K): V;
  has(key: K): Boolean2;
  set(key: K, value: V): void;
}

export const $Dictionary = <T extends Model, V extends Model>($T: $Type = $Model, $V: $Type = $Model) =>
  commonPackageType<Dictionary<T, V>>('Dictionary', $ArrayData($KeyValue($T, $V)), [$T, $V]);
