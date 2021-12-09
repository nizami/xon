import { AttributeTree } from '../../../tree/attribute/attribute-tree';
import { DefinitionTree } from '../../../tree/definition/definition-tree';
import { DeclarationScope } from '../../declaration-scope';
import { IdTypeMetadata } from '../../type/id/id-type-metadata';
import { LambdaTypeMetadata } from '../../type/lambda/lambda-type-metadata';
import { TypeMetadata } from '../../type/type-metadata';
import { AttributeMetadata } from '../attribute/attribute-metadata';
import { DeclarationMetadata } from '../declaration-metadata';

export abstract class DefinitionMetadata extends DeclarationMetadata{
  abstract attributes: AttributeTree[];
  abstract get ancestor(): IdTypeMetadata;
  
  protected abstract scope: DeclarationScope;
  protected abstract tree: DefinitionTree;

  attribute(
    name: string,
    typeArguments: TypeMetadata[],
    expressionArguments: TypeMetadata[],
    resultType: TypeMetadata,
  ): AttributeMetadata {
    const byName = this.attributes.filter((x) => x.id.text === name);
    if (!byName.length && this.ancestor)
      return this.ancestor.declaration.attribute(
        name,
        typeArguments,
        expressionArguments,
        resultType,
      );
    if (!byName.length)
      throw new Error(`'${name}' attribute not found in '${this.name}' declaration`);

    const byTypeArguments = byName.filter((x) => x.typeParameters.length === typeArguments.length);
    if (!byTypeArguments.length && this.ancestor)
      return this.ancestor.declaration.attribute(
        name,
        typeArguments,
        expressionArguments,
        resultType,
      );
    if (!byTypeArguments.length)
      throw new Error(
        `'${name}' attribute not found in '${this.name}' declaration with ${typeArguments.length} type parameters`,
      );

    const bySignature = byTypeArguments.filter((x) => {
      const metadata = new AttributeMetadata(x, this.scope);
      const type = metadata.type(typeArguments);
      if (type instanceof LambdaTypeMetadata) {
        return (
          expressionArguments.length === type.parameters.length &&
          expressionArguments.every((x, i) => x.is(type.parameters[i].type)) &&
          (!resultType || resultType.is(type))
        );
      }
      return !expressionArguments.length && (!resultType || resultType.is(type));
    });
    if (!bySignature.length && this.ancestor)
      return this.ancestor.declaration.attribute(
        name,
        typeArguments,
        expressionArguments,
        resultType,
      );
    if (!bySignature.length)
      throw new Error(
        `'${name}' attribute not found in '${this.name}' declaration with the signature ...`,
      );

    if (bySignature.length > 1)
      throw new Error(`Too many '${name}' attributes in '${this.name}' declaration`);

    return new AttributeMetadata(bySignature[0], this.scope);
  }
}
