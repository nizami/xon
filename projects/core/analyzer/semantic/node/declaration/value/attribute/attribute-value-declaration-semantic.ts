import {$} from '../../../../../../$';
import {Boolean2, Nothing, String2} from '../../../../../../../lib/types';
import {TextResourceRange} from '../../../../../../util/resource/text/text-resource-range';
import {TypeSemantic} from '../../../type/type-semantic';
import {DeclarationSemantic} from '../../declaration-semantic';
import {ValueDeclarationSemantic} from '../value-declaration-semantic';

// todo rename 'AttributeValueDeclarationSemantic' to 'AttributeDeclarationSemantic' ???
export type AttributeValueDeclarationSemantic = ValueDeclarationSemantic & {
  $: $.AttributeValueDeclarationSemantic;
  // todo move it to new 'OperatorDeclarationSemantic'
  alternativeName: String2;
};

export function attributeValueDeclarationSemantic(
  reference: TextResourceRange,
  documentation: String2 | Nothing,
  modifier: String2 | Nothing,
  name: String2,
  type: TypeSemantic,
): AttributeValueDeclarationSemantic {
  return {
    $: $.AttributeValueDeclarationSemantic,
    reference,
    usages: [],

    documentation,
    modifier,
    name,
    alternativeName: alternativeName(name),
    type,

    eq(other: DeclarationSemantic): Boolean2 {
      return this.reference.equals(other.reference);
    },
  };
}

// todo fix or remove it
function alternativeName(name: String2): String2 {
  if (name === '+') {
    return '__plus__';
  }

  return name;
}
