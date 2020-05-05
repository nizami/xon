import { BaseTypes } from '../../../base-types';
import { IndexExpressionContext } from '../../../grammar/xon-parser';
import { ArrayExpressionTree } from '../array-expression/array-expression.tree';
import { getExpressionTree } from '../expression-helper';
import { ExpressionTree } from '../expression.tree';

export class IndexExpressionTree extends ExpressionTree {
    value: ExpressionTree;
    index: ExpressionTree;

    constructor(public ctx: IndexExpressionContext) {
        super();
        this.value = getExpressionTree(ctx._value);
        this.index = getExpressionTree(ctx._index);
    }

    getType() {
        if (this.value instanceof ArrayExpressionTree) {
            return this.value.getType().baseType;
        }
        return BaseTypes.Undefined;
    }

    toPlain() {
        return {
            ...super.toPlain(),
            value: this.value.toPlain(),
            index: this.index.toPlain(),
        };
    }
}
