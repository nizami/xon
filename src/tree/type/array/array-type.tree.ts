import { ArrayTypeContext } from '../../../grammar/xon-parser';
import { TypeMetadata } from '../../../metadata/type/type-metadata';
import { LambdaTypeTree } from '../lambda/lambda-type.tree';
import { getTypeTree } from '../type-tree.helper';
import { TypeTree } from '../type.tree';
import { UnionTypeTree } from '../union/union-type.tree';

export class ArrayTypeTree extends TypeTree {
  metadata: TypeMetadata;
  itemType: TypeTree;

  constructor(public ctx: ArrayTypeContext) {
    super();

    this.itemType = getTypeTree(ctx.type());
  }

  toString(): string {
    if (this.itemType instanceof LambdaTypeTree || this.itemType instanceof UnionTypeTree) {
      return `(${this.itemType})[]`;
    }
    return `${this.itemType}[]`;
  }
}
