import { IntegerLiteralExpressionContext } from '../../../grammar/xon-parser';
import { BaseTree } from '../../base.tree';
import { ExpressionTree } from '../expression.tree';
import { getExpressionTree } from '../expression-helper';

export class IntegerLiteralExpressionTree extends ExpressionTree {
    value: string;

    constructor(public ctx: IntegerLiteralExpressionContext) {
        super();
        this.value = ctx.DecimalLiteral().text.replace(/_/g, '');
    }

    toPlain() {
        return {
            ...super.toPlain(),
            value: this.value,
        };
    }
}
