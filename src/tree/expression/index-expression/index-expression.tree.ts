import { IndexExpressionContext } from '../../../grammar/xon-parser';
import { getExpressionTree } from '../expression-tree.helper';
import { ExpressionTree } from '../expression.tree';

export class IndexExpressionTree extends ExpressionTree {
  public object: ExpressionTree;

  public index: ExpressionTree;

  public constructor(public ctx: IndexExpressionContext) {
    super();
    if (!ctx) return;

    this.object = getExpressionTree(ctx.expression(0));
    this.index = getExpressionTree(ctx.expression(1));
  }

  public toString(): string {
    return `${this.object.toString()}[${this.index.toString()}]`;
  }
}
