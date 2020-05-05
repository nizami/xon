import { BaseTypes } from '../../../base-types';
import { LogicalNotExpressionContext } from '../../../grammar/xon-parser';
import { getExpressionTree } from '../expression-helper';
import { ExpressionTree } from '../expression.tree';

export class LogicalNotExpressionTree extends ExpressionTree {
    value: ExpressionTree;

    constructor(public ctx: LogicalNotExpressionContext) {
        super();
        this.value = getExpressionTree(ctx.expression());
    }

    getType() {
        return BaseTypes.Boolean;
    }

    toPlain() {
        return {
            ...super.toPlain(),
            value: this.value.toPlain(),
        };
    }
}
