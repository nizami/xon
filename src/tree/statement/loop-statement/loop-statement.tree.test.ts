import { evalExpression } from '../../eval';
import { parseStatement } from '../../parse';
import { ExpressionStatementTree } from '../expression-statement/expression-statement.tree';
import { LoopStatementTree } from './loop-statement.tree';

test('has boolean value', () => {
  const code = 'loop:\n    12+(45/5)';
  const tree = parseStatement<LoopStatementTree>(code);
  expect(tree).toBeInstanceOf(LoopStatementTree);

  expect(tree.body.length).toBe(1);
  const statement = tree.body[0] as ExpressionStatementTree;
  expect(evalExpression(statement.value)).toBe(12 + 45 / 5);
});
