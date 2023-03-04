import { PrefixExpressionContext } from '~/grammar/xon-parser';
import { SourceSpan } from '~/source/source-span';
import { ExpressionTree } from '~/tree/expression/expression-tree';
import { getExpressionTree } from '~/tree/expression/expression-tree-helper';
import { Token } from '~/tree/token';

export class PrefixExpressionTree extends ExpressionTree {
  ctx: PrefixExpressionContext;
  sourceSpan: SourceSpan;
  operator: Token;
  expression: ExpressionTree;

  constructor(ctx: PrefixExpressionContext) {
    super();
    this.ctx = ctx;
    this.sourceSpan = SourceSpan.fromContext(ctx);
    this.operator = Token.from(ctx.OPERATOR());
    this.expression = getExpressionTree(ctx.expression());
    this.addChildren(this.operator, this.expression);
  }
}
