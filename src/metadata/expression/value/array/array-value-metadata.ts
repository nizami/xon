import { None } from '../../../../lib/core';
import { ArrayExpressionTree } from '../../../../tree/expression/array/array-expression-tree';
import { ParameterMetadata } from '../../../declaration/parameter/parameter-metadata';
import { DeclarationScope } from '../../../declaration/scope/declaration-scope';
import { ArrayTypeMetadata } from '../../type/array/array-type-metadata';
import { ObjectTypeMetadata } from '../../type/object/object-type-metadata';
import { TypeMetadata } from '../../type/type-metadata';
import { UnionTypeMetadata } from '../../type/union/union-type-metadata';
import { ValueMetadata } from '../value-metadata';
import { getValueMetadata } from '../value-metadata-helper';

export class ArrayValueMetadata extends ValueMetadata {
  constructor(private tree: ArrayExpressionTree, private scope: DeclarationScope) {
    super();
    tree.arguments.forEach((x) => (x.value.metadata = getValueMetadata(x.value, scope)));
  }

  // todo use generics
  type(): TypeMetadata | None {
    const items = this.tree.arguments.map((x) => ({
      tree: x,
      sourceRange: x.sourceRange,
      name: x.name?.text,
      type: (x.value.metadata as ValueMetadata).type(),
      value: x.value.metadata as ValueMetadata,
    }));

    if (this.tree.ctx.arguments().open().OPEN_BRACE()) {
      const objectScope = new DeclarationScope();
      items.forEach((x) => {
        const metadata = new ParameterMetadata(x.tree.name, this.scope);
        metadata.type = x.type;
        metadata.value = x.value;
        objectScope.add(metadata);
      });
      return new ObjectTypeMetadata(objectScope);
    }
    let commonType: TypeMetadata = this.scope.core.any.type;
    if (items.length === 1) {
      commonType = items[0].type;
    } else if (items.length > 1) {
      commonType = UnionTypeMetadata.fromTypes(items.map((x) => x.type));
    }
    return new ArrayTypeMetadata(
      commonType,
      items.map((x) => x.type),
    );
  }

  eval() {
    throw new Error('Method not implemented.');
  }
}
