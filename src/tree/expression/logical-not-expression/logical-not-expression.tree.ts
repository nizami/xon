import { LogicalNotExpressionContext } from '../../../grammar/xon-parser';
import { getExpressionTree } from '../expression-helper';
import { ExpressionTree } from '../expression.tree';

export class LogicalNotExpressionTree extends ExpressionTree {
  public value: ExpressionTree;

  public constructor(public ctx: LogicalNotExpressionContext) {
    super();
    this.value = getExpressionTree(ctx.expression());
  }
}
