import {
  $ExpressionStatementNode,
  $IntegerNode,
  ExpressionStatementNode,
  IntegerNode,
  newAnalyzerContext,
  newCharacterStreamFromText,
  parseStatements,
} from '#analyzer';
import {newText, Text} from '#common';
import {is} from '#typing';
import {expect, test} from 'vitest';

test('Expression statement with errors', () => {
  const text = newText('7 17 37');
  const node = parseExpressionStatementNode(text);

  expect(node.errorNodes?.count()).toBe(2);
  expect(is(node.expression, $IntegerNode)).toBeTruthy();
  expect((node.expression as IntegerNode).contentNode.text.toNativeString()).toBe('7');
});

test('Expression statement without errors', () => {
  const text = newText('7');
  const node = parseExpressionStatementNode(text);

  expect(node.errorNodes?.count()).toBe(0);
  expect(is(node.expression, $IntegerNode)).toBeTruthy();
  expect((node.expression as IntegerNode).contentNode.text.toNativeString()).toBe('7');
});

function parseExpressionStatementNode(text: Text): ExpressionStatementNode {
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const statements = parseStatements(context).statements;
  const node = statements.first() as ExpressionStatementNode;

  expect(node).toBeTruthy();
  expect(is(node, $ExpressionStatementNode)).toBe(true);

  return node;
}
