import { TypeDefinitionContext } from '../../../grammar/xon-parser';
import { AttributeTree } from '../../attribute/attribute-tree';
import { getAttributesTrees } from '../../attribute/attribute-tree.helper';
import { IdToken } from '../../id-token';
import { getTypeParametersTrees } from '../../type-parameter/type-parameter-tree.helper';
import { TypeParameterTree } from '../../type-parameter/type-parameter.tree';
import { getTypesTrees } from '../../type/type-tree.helper';
import { TypeTree } from '../../type/type.tree';
import { DefinitionTree } from '../definition-tree';

export class InterfaceDefinitionTree extends DefinitionTree {
  id: IdToken;
  typeParameters: TypeParameterTree[] = [];
  ancestors: TypeTree[] = [];
  attributes: AttributeTree[] = [];

  constructor(public ctx: TypeDefinitionContext) {
    super();

    const header = ctx.definitionHeader();
    this.id = IdToken.fromContext(header.id());
    if (this.id.text[0] !== this.id.text[0].toUpperCase())
      throw new Error(`Definition name '${this.id.text}' must start with upper letter`);
    this.typeParameters = getTypeParametersTrees(header.typeParameters());

    if (header.lambdaParameters()) throw new Error('Interface must not have a constructor');

    this.ancestors = getTypesTrees(header.definitionAncestors()?.type());
    this.attributes = getAttributesTrees(ctx.definitionBody()?.attribute());
  }

  toString(): string {
    const typeParameters = this.typeParameters.length
      ? '<' + this.typeParameters.join(', ') + '>'
      : '';
    const ancestors = this.ancestors.length ? ' is ' + this.ancestors.join(', ') : '';
    const attributes = this.attributes.join('\n\n').replace(/(^[^\n])/gm, '  $1');
    return `${this.id}${typeParameters}${ancestors}\n${attributes}`;
  }
}
