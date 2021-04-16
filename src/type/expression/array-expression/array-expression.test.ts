import { parseStatement } from '../../../tree/parse';
import { ExpressionStatementTree } from '../../../tree/statement/expression-statement/expression-statement.tree';
import { fillExpressionTypes } from '../expression-type.helper';

test('all array items are integer literals', () => {
  const code = '[1, 2, 3, 4]';
  const tree = parseStatement<ExpressionStatementTree>(code);
  expect(tree).toBeInstanceOf(ExpressionStatementTree);

  fillExpressionTypes(tree.value, new Map());
  expect('Integer[]').toBe(tree.value.type.toString());
});

test('array items are float, string, integer and boolean literals', () => {
  const code = '[1, 2, true, "Hi", 2.7, 4]';
  const tree = parseStatement<ExpressionStatementTree>(code);
  expect(tree).toBeInstanceOf(ExpressionStatementTree);

  fillExpressionTypes(tree.value, new Map());
  expect('(Integer | Boolean | String | Float)[]').toBe(tree.value.type.toString());
});
