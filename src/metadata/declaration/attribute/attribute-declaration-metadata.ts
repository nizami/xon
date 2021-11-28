import { AbstractAttributeTree } from '../../../tree/attribute/abstract/abstract-attribute-tree';
import { AttributeTree } from '../../../tree/attribute/attribute-tree';
import { ValueAttributeTree } from '../../../tree/attribute/value/value-attribute-tree';
import { DeclarationScope } from '../../declaration-scope';
import { getExpressionMetadata } from '../../expression/expression-metadata-helper';
import { TypeMetadata } from '../../type/type-metadata';
import { getTypeMetadata } from '../../type/type-metadata-helper';
import { DeclarationMetadata } from '../declaration-metadata';

export class AttributeDeclarationMetadata extends DeclarationMetadata {
  name: string;
  typeParameters: TypeMetadata[];

  constructor(private tree: AttributeTree, private scope: DeclarationScope) {
    super();

    this.name = tree.id.text;
  }

  type(): TypeMetadata {
    if (this.tree instanceof AbstractAttributeTree)
      return getTypeMetadata(this.tree.type, this.scope);
    // if (this.tree instanceof DefinitionAttributeTree)  return  this.scope.get(this.name);
    // if (this.tree instanceof MethodAttributeTree)
    if (this.tree instanceof ValueAttributeTree) {
      if (this.tree.type) return getTypeMetadata(this.tree.type, this.scope);
      return getExpressionMetadata(this.tree.expression, this.scope).type;
    }

    throw new Error(`Not implemented '${this.tree.constructor.name}'`);
  }

  useTypeParameters(typeParameters: TypeMetadata[]): AttributeDeclarationMetadata {
    const metadata = new AttributeDeclarationMetadata(this.tree, this.scope);
    metadata.typeParameters = typeParameters;
    return metadata;
  }
}
