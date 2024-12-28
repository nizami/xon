import {Boolean2} from '#common';
import {
  $SetTypeSemantic,
  AttributeValueDeclarationSemantic,
  corePackageType,
  DeclarationScope,
  Node,
  SetTypeSemantic,
  TypeSemantic,
} from '#core';

export type NotTypeSemantic = SetTypeSemantic & {
  value: TypeSemantic;
};

export const $NotTypeSemantic = corePackageType<NotTypeSemantic>('NotTypeSemantic', $SetTypeSemantic);

export function notTypeSemantic(nodeLink: Node, value: TypeSemantic): NotTypeSemantic {
  const semantic: NotTypeSemantic = {
    $: $NotTypeSemantic,
    nodeLink,
    value,

    is(other: TypeSemantic): Boolean2 {
      return this.eq(other);
    },

    eq(_other: TypeSemantic): Boolean2 {
      return false;
    },

    attributes(): DeclarationScope<AttributeValueDeclarationSemantic> {
      // todo investigate
      throw new Error('Not implemented');
    },
  };

  return semantic;
}
