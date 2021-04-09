import { evalExpression } from '../../../eval';
import { parseExpression } from '../../../parse';
import { OperatorExpressionTree } from '../operator-expression/operator-expression.tree';
import { ParenthesizedExpressionTree } from './parenthesized-expression.tree';

test('one parenthesized expression', () => {
  const code = '(1+1)';
  const tree = parseExpression(code);
  expect(tree).toBeInstanceOf(ParenthesizedExpressionTree);

  expect((tree as ParenthesizedExpressionTree).value).toBeInstanceOf(OperatorExpressionTree);
});

test('several parenthesized expression', () => {
  const code = '(((123)))';
  const tree = parseExpression(code);
  expect(tree).toBeInstanceOf(ParenthesizedExpressionTree);

  expect(evalExpression(tree)).toBe(123);
});
