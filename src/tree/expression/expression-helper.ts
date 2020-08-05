import {
    AddSubExpressionContext,
    ArrayExpressionContext,
    BitAndExpressionContext,
    BitNotExpressionContext,
    BitOrExpressionContext,
    BitShiftExpressionContext,
    BitXorExpressionContext,
    EqualityExpressionContext,
    ExpressionContext,
    FunctionExpressionContext,
    IdExpressionContext,
    IfExpressionContext,
    IndexExpressionContext,
    InstanceMemberExpressionContext,
    LambdaExpressionContext,
    LiteralExpressionContext,
    LogicalAndExpressionContext,
    LogicalNotExpressionContext,
    LogicalOrExpressionContext,
    LoopExpressionContext,
    MemberExpressionContext,
    MulDivModExpressionContext,
    ParenthesizedExpressionContext,
    PipeExpressionContext,
    PowExpressionContext,
    RangeExpressionContext,
    RelationalExpressionContext,
    SelectExpressionContext,
    SliceExpressionContext,
    StringFormatExpressionContext,
    UnaryMinusExpressionContext,
    UnaryPlusExpressionContext,
} from '../../grammar/xon-parser';
import { AddExpressionTree } from './add-expression/add-expression.tree';
import { ArrayExpressionTree } from './array-expression/array-expression.tree';
import { BitAndExpressionTree } from './bit-and-expression/bit-and-expression.tree';
import { BitNotExpressionTree } from './bit-not-expression/bit-not-expression.tree';
import { BitOrExpressionTree } from './bit-or-expression/bit-or-expression.tree';
import { BitShiftExpressionTree } from './bit-shift-expression/bit-shift-expression.tree';
import { BitXorExpressionTree } from './bit-xor-expression/bit-xor-expression.tree';
import { EqualityExpressionTree } from './equality-expression/equality-expression.tree';
import { ExpressionTree } from './expression.tree';
import { FunctionExpressionTree } from './function-expression/function-expression.tree';
import { IdExpressionTree } from './id-expression/id-expression.tree';
import { IfExpressionTree } from './if-expression/if-expression.tree';
import { IndexExpressionTree } from './index-expression/index-expression.tree';
import { InstanceMemberExpressionTree } from './instance-member-expression/instance-member-expression.tree';
import { LambdaExpressionTree } from './lambda-expression/lambda-expression.tree';
import { LiteralExpressionTree } from './literal-expression/literal-expression.tree';
import { LogicalAndExpressionTree } from './logical-and-expression/logical-and-expression.tree';
import { LogicalNotExpressionTree } from './logical-not-expression/logical-not-expression.tree';
import { LogicalOrExpressionTree } from './logical-or-expression/logical-or-expression.tree';
import { LoopExpressionTree } from './loop-expression/loop-expression.tree';
import { MemberExpressionTree } from './member-expression/member-expression.tree';
import { MulDivModExpressionTree } from './mul-div-mod-expression/mul-div-mod-expression.tree';
import { PipeExpressionTree } from './pipe-expression/pipe-expression.tree';
import { PowExpressionTree } from './pow-expression/pow-expression.tree';
import { RangeExpressionTree } from './range-expression/range-expression.tree';
import { RelationalExpressionTree } from './relational-expression/relational-expression.tree';
import { SelectExpressionTree } from './select-expression/select-expression.tree';
import { SliceExpressionTree } from './slice-expression/slice-expression.tree';
import { StringFormatExpressionTree } from './string-format-expression/string-format-expression.tree';
import { SubstractExpressionTree } from './substract-expression/substract-expression.tree';
import { UnaryMinusExpressionTree } from './unary-minus-expression/unary-minus-expression.tree';
import { UnaryPlusExpressionTree } from './unary-plus-expression/unary-plus-expression.tree';

export function getExpressionTree(ctx: ExpressionContext): ExpressionTree {
    if (ctx === undefined) return undefined;
    if (ctx instanceof IdExpressionContext) return new IdExpressionTree(ctx);
    else if (ctx instanceof ParenthesizedExpressionContext)
        return getExpressionTree(ctx.expression());
    else if (ctx instanceof LiteralExpressionContext) return new LiteralExpressionTree(ctx);
    else if (ctx instanceof ArrayExpressionContext) return new ArrayExpressionTree(ctx);
    else if (ctx instanceof RangeExpressionContext) return new RangeExpressionTree(ctx);
    else if (ctx instanceof SliceExpressionContext) return new SliceExpressionTree(ctx);
    else if (ctx instanceof IndexExpressionContext) return new IndexExpressionTree(ctx);
    else if (ctx instanceof MulDivModExpressionContext) return new MulDivModExpressionTree(ctx);
    else if (ctx instanceof AddSubExpressionContext) {
        if (ctx.Minus()) return new SubstractExpressionTree(ctx);
        if (ctx.Plus()) return new AddExpressionTree(ctx);
    } else if (ctx instanceof PowExpressionContext) return new PowExpressionTree(ctx);
    else if (ctx instanceof UnaryPlusExpressionContext) return new UnaryPlusExpressionTree(ctx);
    else if (ctx instanceof UnaryMinusExpressionContext) return new UnaryMinusExpressionTree(ctx);
    else if (ctx instanceof LogicalNotExpressionContext) return new LogicalNotExpressionTree(ctx);
    else if (ctx instanceof BitNotExpressionContext) return new BitNotExpressionTree(ctx);
    else if (ctx instanceof MemberExpressionContext) return new MemberExpressionTree(ctx);
    else if (ctx instanceof InstanceMemberExpressionContext)
        return new InstanceMemberExpressionTree(ctx);
    else if (ctx instanceof FunctionExpressionContext) return new FunctionExpressionTree(ctx);
    else if (ctx instanceof BitShiftExpressionContext) return new BitShiftExpressionTree(ctx);
    else if (ctx instanceof BitAndExpressionContext) return new BitAndExpressionTree(ctx);
    else if (ctx instanceof BitXorExpressionContext) return new BitXorExpressionTree(ctx);
    else if (ctx instanceof BitOrExpressionContext) return new BitOrExpressionTree(ctx);
    else if (ctx instanceof LogicalAndExpressionContext) return new LogicalAndExpressionTree(ctx);
    else if (ctx instanceof LogicalOrExpressionContext) return new LogicalOrExpressionTree(ctx);
    else if (ctx instanceof PipeExpressionContext) return new PipeExpressionTree(ctx);
    else if (ctx instanceof RelationalExpressionContext) return new RelationalExpressionTree(ctx);
    else if (ctx instanceof EqualityExpressionContext) return new EqualityExpressionTree(ctx);
    else if (ctx instanceof LambdaExpressionContext) return new LambdaExpressionTree(ctx);
    else if (ctx instanceof StringFormatExpressionContext)
        return new StringFormatExpressionTree(ctx);
    else if (ctx instanceof IfExpressionContext) return new IfExpressionTree(ctx);
    else if (ctx instanceof LoopExpressionContext) return new LoopExpressionTree(ctx);
    else if (ctx instanceof SelectExpressionContext) return new SelectExpressionTree(ctx);

    throw Error('No Expression found for ' + ctx?.constructor?.name);
}

export function getExpressionsTree(expressions: ExpressionContext[]) {
    return expressions.map(getExpressionTree);
}
``;
