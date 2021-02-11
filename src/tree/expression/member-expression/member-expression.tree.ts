import { MemberExpressionContext } from '../../../grammar/xon-parser';
import { getExpressionTree } from '../expression-helper';
import { ExpressionTree } from '../expression.tree';

export class MemberExpressionTree extends ExpressionTree {
  public name: string;

  public object: ExpressionTree;

  public constructor(public ctx: MemberExpressionContext) {
    super();
    this.name = ctx.ID().text;
    this.object = getExpressionTree(ctx.expression());
  }
}
