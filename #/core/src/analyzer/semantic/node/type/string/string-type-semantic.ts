import {Boolean2, Nothing, String2} from '#common';
import {
  $IdTypeSemantic,
  $NominalTypeDeclarationSemantic,
  $SetTypeSemantic,
  $TypeSemantic,
  AttributeValueDeclarationSemantic,
  DeclarationScope,
  Node,
  NominalTypeDeclarationSemantic,
  SemanticAnalyzer,
  TypeSemantic,
  corePackageType,
  isInSet,
  newDeclarationScope,
} from '#core';
import {is} from '#typing';

export type StringTypeSemantic = TypeSemantic & {
  declaration?: NominalTypeDeclarationSemantic | Nothing;
  value: String2;
};

export const $StringTypeSemantic = corePackageType<StringTypeSemantic>('StringTypeSemantic', $TypeSemantic);

export function stringTypeSemantic(
  analyzer: SemanticAnalyzer,
  nodeLink: Node,
  value: String2,
): StringTypeSemantic {
  return {
    $: $StringTypeSemantic,
    nodeLink,
    declaration: analyzer.declarationManager.find(
      $NominalTypeDeclarationSemantic,
      analyzer.config.literalTypeNames.stringTypeName,
    ),
    value,

    is(other: TypeSemantic): Boolean2 {
      if (is(other, $SetTypeSemantic)) {
        return isInSet(this, other);
      }

      if (this.eq(other)) {
        return true;
      }

      if (is(other, $IdTypeSemantic) && other.declaration) {
        return this.declaration?.eq(other.declaration) || (this.declaration?.type?.is(other) ?? false);
      }

      return false;
    },

    eq(other: TypeSemantic): Boolean2 {
      if (is(other, $StringTypeSemantic)) {
        return this.value === other.value;
      }

      return false;
    },

    attributes(): DeclarationScope<AttributeValueDeclarationSemantic> {
      return this.declaration?.attributes?.clone() ?? newDeclarationScope();
    },
  };
}
