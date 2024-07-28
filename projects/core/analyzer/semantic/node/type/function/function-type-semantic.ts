import {$, isSetOperatorTypeSemantic} from '../../../../../$';
import {Array2, Boolean2, Nothing} from '../../../../../../lib/types';
import {TextResourceRange} from '../../../../../util/resource/text/text-resource-range';
import {DeclarationManager} from '../../../declaration-manager';
import {DeclarationSemantic} from '../../declaration/declaration-semantic';
import {ValueDeclarationSemantic} from '../../declaration/value/value-declaration-semantic';
import {isInSet} from '../set/set';
import {TypeSemantic} from '../type-semantic';

export interface FunctionTypeSemantic extends TypeSemantic {
  $: $.FunctionTypeSemantic;
  generics: Array2<TypeSemantic> | Nothing;
  parameters: Array2<DeclarationSemantic>;
  result: TypeSemantic;
}

export function functionTypeSemantic(
  reference: TextResourceRange,
  generics: Array2<TypeSemantic> | Nothing,
  parameters: Array2<DeclarationSemantic>,
  result: TypeSemantic,
): FunctionTypeSemantic {
  return {
    $: $.FunctionTypeSemantic,
    reference,
    generics,
    parameters,
    result,

    is(other: TypeSemantic): Boolean2 {
      if (isSetOperatorTypeSemantic(other)) {
        return isInSet(this, other);
      }

      if (this.eq(other)) {
        return true;
      }

      return false;
    },

    eq(_other: TypeSemantic): Boolean2 {
      return false;
    },

    attributes(): DeclarationManager<ValueDeclarationSemantic> {
      throw new Error('Not implemented');
    },
  };
}
