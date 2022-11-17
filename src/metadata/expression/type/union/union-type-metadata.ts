import { Boolean2 } from '~/lib/core';
import { DeclarationScope } from '~/metadata/declaration/scope/declaration-scope';
import { TypeMetadata } from '~/metadata/expression/type/type-metadata';

export class UnionTypeMetadata extends TypeMetadata {
  private _attributesScope: DeclarationScope | null = null;

  constructor(public left: TypeMetadata, public right: TypeMetadata) {
    super();
  }

  attributesScope(): DeclarationScope | null {
    if (this._attributesScope) return this._attributesScope;

    const rightScope = this.right.attributesScope();
    if (!rightScope) return null;
    this._attributesScope = this.left.attributesScope()?.union(rightScope) ?? null;

    return this._attributesScope;
  }

  is(): Boolean2 {
    throw new Error('Not implemented');
  }

  equals(other: TypeMetadata): Boolean2 {
    if (other instanceof UnionTypeMetadata) {
      return this.left.equals(other.left) && this.right.equals(other.right);
    }

    return false;
  }

  static fromTypes(types: TypeMetadata[]): UnionTypeMetadata {
    if (types.length < 2) throw new Error('Types count should be at least 2 types');

    const type = new UnionTypeMetadata(types[0], types[1]);
    if (types.length > 2) {
      return UnionTypeMetadata.fromTypes([type, types[2]]);
    }

    return type;
  }
}
