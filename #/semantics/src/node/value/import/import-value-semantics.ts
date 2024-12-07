import {Nothing, Resource} from '#common';
import {$ValueSemantics, semanticsPackageType, TypeSemantics, ValueSemantics} from '#semantics';

export type ImportValueSemantics = ValueSemantics & {
  resource: Resource | Nothing;
};

export const $ImportValueSemantics = semanticsPackageType<ImportValueSemantics>(
  'ImportValueSemantics',
  $ValueSemantics,
);

export function newImportValueSemantics(
  resource: Resource | Nothing,
  type: TypeSemantics,
): ImportValueSemantics {
  return {
    $: $ImportValueSemantics,
    type,
    resource,

    equals(other) {
      return false;
    },
  };
}
