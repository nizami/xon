import {
  $ImportStatementNode,
  $StringNode,
  ImportStatementNode,
  newAnalyzerContext,
  newCharacterStreamFromText,
  nonHiddenNodeGenerator,
  parseImportStatementNode,
  StringNode,
} from '#analyzer';
import {newArrayData, newText, Text} from '#common';
import {is} from '#typing';
import {expect, test} from 'vitest';

test('Import statement with errors', () => {
  const text = newText('import 7 17 37');
  const node = getImportStatementNode(text);

  expect(node.errorNodes?.count()).toBe(3);
});

test('Import statement without errors', () => {
  const text = newText('import "@xon/core"');
  const node = getImportStatementNode(text);

  expect(node.errorNodes?.count()).toBe(0);
  expect(is(node.expressionNode, $StringNode())).toBe(true);
  expect((node.expressionNode as StringNode).contentNode?.text.toNativeString()).toBe('@xon/core');
});

function getImportStatementNode(text: Text): ImportStatementNode {
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const nodes = newArrayData(nonHiddenNodeGenerator(context));
  const node = parseImportStatementNode(0, nodes) as ImportStatementNode;

  expect(node).toBeTruthy();
  expect(is(node, $ImportStatementNode())).toBe(true);

  return node;
}
