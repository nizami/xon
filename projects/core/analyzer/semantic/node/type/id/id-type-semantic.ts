import {Array2, Boolean2, Nothing, String2} from '../../../../../../lib/types';
import {TextResourceRange} from '../../../../../util/resource/text/text-resource-range';
import {SemanticAnalyzer} from '../../../semantic-analyzer';
import {DeclarationSemantic, isTypeDeclarationSemantic} from '../../declaration/declaration-semantic';
import {$Semantic, semanticIs} from '../../semantic-node';
import {isInSet, isSetOperatorTypeSemantic} from '../set/set';
import {TypeSemantic} from '../type-semantic';

export interface IdTypeSemantic extends TypeSemantic {
  $: $Semantic.ID_TYPE;
  declaration: DeclarationSemantic;
  generics: Array2<TypeSemantic | Nothing> | Nothing;
}

export function idTypeSemantic(
  analyzer: SemanticAnalyzer,
  reference: TextResourceRange,
  declaration: DeclarationSemantic,
  generics: Array2<TypeSemantic | Nothing> | Nothing,
): IdTypeSemantic {
  const semantic: IdTypeSemantic = {
    $: $Semantic.ID_TYPE,
    reference,
    declaration,
    generics,

    is(other: TypeSemantic): Boolean2 {
      if (isSetOperatorTypeSemantic(other)) {
        return isInSet(this, other);
      }

      if (this.eq(other)) {
        return true;
      }

      if (isTypeDeclarationSemantic(this.declaration)) {
        return this.declaration.type?.is(other) ?? false;
      }

      return false;
    },

    eq(other: TypeSemantic): Boolean2 {
      if (
        isTypeDeclarationSemantic(this.declaration) &&
        semanticIs<IdTypeSemantic>(other, $Semantic.ID_TYPE)
      ) {
        return this.declaration.eq(other.declaration);
      }

      return false;
    },

    attributes(): Record<String2, Array2<TypeSemantic>> {
      return getDeclarationAttributes(analyzer, declaration);
    },
  };

  declaration.usages.push(reference);

  return semantic;
}

export function getDeclarationAttributes(
  analyzer: SemanticAnalyzer,
  declaration: DeclarationSemantic,
): Record<String2, Array2<TypeSemantic>> {
  const attributes: Record<String2, Array2<TypeSemantic>> = {};

  if (isTypeDeclarationSemantic(declaration)) {
    for (const [name, declarations] of Object.entries(declaration?.attributes ?? {})) {
      const types = declarations.map((x) => x.type).filter((x) => !!x);
      attributes[name] = types;
    }
  }

  return attributes;
}
