import {
  $AnalyzerType,
  $NominalTypeDeclarationSemantic,
  $SetTypeSemantic,
  $TypeDeclarationSemantic,
  $TypeSemantic,
  AttributeValueDeclarationSemantic,
  DeclarationScope,
  isInSet,
  Node,
  NominalTypeDeclarationSemantic,
  SemanticAnalyzer,
  TypeSemantic,
} from '#analyzer';
import {ArrayData, Boolean2, Nothing} from '#common';
import {is} from '#typing';

export type ArrayTypeSemantic = TypeSemantic & {
  declaration?: NominalTypeDeclarationSemantic | Nothing;
  items: ArrayData<TypeSemantic>;
};

export const $ArrayTypeSemantic = () =>
  $AnalyzerType<ArrayTypeSemantic>('ArrayTypeSemantic', $TypeSemantic());

export function arrayTypeSemantic(
  analyzer: SemanticAnalyzer,
  nodeLink: Node,
  items: ArrayData<TypeSemantic>,
): ArrayTypeSemantic {
  return {
    $: $ArrayTypeSemantic(),
    nodeLink,
    declaration: analyzer.declarationManager.find(
      $NominalTypeDeclarationSemantic(),
      analyzer.config.literalTypeNames.arrayTypeName,
    ),
    items,

    is(other: TypeSemantic): Boolean2 {
      if (is(other, $SetTypeSemantic())) {
        return isInSet(this, other);
      }

      if (this.eq(other)) {
        return true;
      }

      if (is(other, $TypeDeclarationSemantic())) {
        return this.declaration?.equals(other) || (this.declaration?.type?.is(other) ?? false);
      }

      return false;
    },

    eq(other: TypeSemantic): Boolean2 {
      if (is(other, $ArrayTypeSemantic())) {
        return this.items === other.items;
      }

      return false;
    },

    attributes(): DeclarationScope<AttributeValueDeclarationSemantic> {
      throw new Error('Not implemented');
    },
  };
}
