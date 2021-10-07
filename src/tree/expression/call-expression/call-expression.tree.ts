import { CallExpressionContext } from '../../../grammar/xon-parser';
import { getArgumentsTrees } from '../../argument/argument-tree.helper';
import { ArgumentTree } from '../../argument/argument.tree';
import { getTypesTrees } from '../../type/type-tree.helper';
import { TypeTree } from '../../type/type.tree';
import { getExpressionTree } from '../expression-tree.helper';
import { ExpressionTree } from '../expression.tree';

export class CallExpressionTree extends ExpressionTree {
  public genericArguments: TypeTree[];

  public instance: ExpressionTree;

  public arguments: ArgumentTree[];

  public constructor(public ctx?: CallExpressionContext) {
    super();
    if (!ctx) return;

    this.genericArguments = getTypesTrees(ctx.genericArguments()?.type());
    this.instance = getExpressionTree(ctx.expression());
    this.arguments = getArgumentsTrees(ctx.arguments());
  }

  public toString(): string {
    const generics = this.genericArguments.length ? `<${this.genericArguments.join(', ')}>` : '';
    const instance = this.instance.toString();
    const args = this.arguments.length ? `(${this.arguments.join(', ')})` : '';
    return `${generics}${instance}${args}`;
  }
}
