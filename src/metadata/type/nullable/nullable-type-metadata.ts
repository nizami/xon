import { NullableTypeTree } from '../../../tree/type/nullable-type/nullable-type.tree';
import { DeclarationScope } from '../../declaration-scope';
import { ClassDefinitionDeclarationMetadata } from '../../declaration/definition/class-definition-declaration-metadata';
import { TypeMetadata } from '../type-metadata';
import { getTypeMetadata } from '../type-metadata-helper';
import { UnionTypeMetadata } from '../union/union-type-metadata';

export class NullableTypeMetadata extends TypeMetadata {
  public declaration: ClassDefinitionDeclarationMetadata;

  constructor(public type: TypeMetadata, public scope: DeclarationScope) {
    super();
    this.declaration = type.declaration;
  }

  is(other: TypeMetadata): boolean {
    if (other instanceof UnionTypeMetadata) return other.has(this);
    if (!(other instanceof NullableTypeMetadata)) return false;
    return this.type.is(other);
  }

  static fromTree(tree: NullableTypeTree, scope: DeclarationScope) {
    const type = getTypeMetadata(tree.baseType, scope);
    const metadata = new NullableTypeMetadata(type, scope);
    return metadata;
  }
}
