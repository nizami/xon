import {Boolean2, Nothing, Text} from '#common';
import {
  $ValueDeclarationSemantic,
  corePackageType,
  DeclarationNode,
  DeclarationSemantic,
  SemanticAnalyzer,
  unknownTypeSemantic,
  ValueDeclarationSemantic,
} from '#core';

export type ParameterValueDeclarationSemantic = ValueDeclarationSemantic & {__branding?: null};

export const $ParameterValueDeclarationSemantic = corePackageType<ParameterValueDeclarationSemantic>(
  'ParameterValueDeclarationSemantic',
  $ValueDeclarationSemantic,
);

export function parameterValueDeclarationSemantic(
  analyzer: SemanticAnalyzer,
  nodeLink: DeclarationNode,
  documentation: Text | Nothing,
  modifier: Text | Nothing,
  name: Text,
): ParameterValueDeclarationSemantic {
  return {
    $: $ParameterValueDeclarationSemantic,
    nodeLink,
    usages: [],
    documentation,
    modifier,
    name,
    type: unknownTypeSemantic(analyzer, nodeLink),

    eq(other: DeclarationSemantic): Boolean2 {
      // todo recheck 'eq' conditions
      if (this.nodeLink && other.nodeLink) {
        return this.nodeLink.reference.equals(other.nodeLink.reference);
      }

      return false;
    },
  };
}
