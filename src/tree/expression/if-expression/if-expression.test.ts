import { evalExpression } from '../../../eval';
import { parseExpression } from '../../../parse';
import { ExpressionStatementTree } from '../../statement/expression-statement/expression-statement.tree';
import { MoreThanExpressionTree } from '../more-than-expression/more-than-expression.tree';
import { IfExpressionTree } from './if-expression.tree';

test('else only', () => {
    const code = 'if 12+45/9:\n    12+45/5\nelse if 2+2:\n    2 * 4';
    const tree = parseExpression<IfExpressionTree>(code);

    expect(evalExpression(tree.ifCondition)).toBe(12 + 45 / 9);
    expect(tree.ifStatements.length).toBe(1);
    const ifStatement = tree.ifStatements[0] as ExpressionStatementTree;
    expect(evalExpression(ifStatement.value)).toBe(12 + 45 / 5);

    expect(evalExpression(tree.elseCondition)).toBe(2 + 2);
    expect(tree.elseStatements.length).toBe(1);
    const elseStatement = tree.elseStatements[0] as ExpressionStatementTree;
    expect(evalExpression(elseStatement.value)).toBe(2 * 4);
});

test('else if', () => {
    const code = 'if 12+45/9:\n    12+45/5\nelse:    2   *   4   ';
    const tree = parseExpression<IfExpressionTree>(code);

    expect(evalExpression(tree.ifCondition)).toBe(12 + 45 / 9);
    expect(tree.ifStatements.length).toBe(1);
    const ifStatement = tree.ifStatements[0] as ExpressionStatementTree;
    expect(evalExpression(ifStatement.value)).toBe(12 + 45 / 5);

    expect(tree.elseCondition).toBeUndefined();
    expect(tree.elseStatements.length).toBe(1);
    const elseStatement = tree.elseStatements[0] as ExpressionStatementTree;
    expect(evalExpression(elseStatement.value)).toBe(2 * 4);
});

test('if', () => {
    const code = 'if 12+45/9: 12+45/5';
    const tree = parseExpression<IfExpressionTree>(code);

    expect(evalExpression(tree.ifCondition)).toBe(12 + 45 / 9);
    expect(tree.ifStatements.length).toBe(1);
    const ifStatement = tree.ifStatements[0] as ExpressionStatementTree;
    expect(evalExpression(ifStatement.value)).toBe(12 + 45 / 5);

    expect(tree.elseCondition).toBeUndefined();
    expect(tree.elseStatements).toBeUndefined();
});

test('if relational', () => {
    const code = 'if 6 > 4:\n    12+45/  5';
    const tree = parseExpression<IfExpressionTree>(code);

    expect(tree.ifCondition).toBeInstanceOf(MoreThanExpressionTree);
    expect(evalExpression(tree.ifCondition)).toBe(true);
    expect(tree.ifStatements.length).toBe(1);
    const ifStatement = tree.ifStatements[0] as ExpressionStatementTree;
    expect(evalExpression(ifStatement.value)).toBe(12 + 45 / 5);
    expect(tree.elseCondition).toBeUndefined();
    expect(tree.elseStatements).toBeUndefined();
});
