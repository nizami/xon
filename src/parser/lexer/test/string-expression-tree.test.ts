import { NodeType } from '~/parser/lexer/node';
import { parseExpression } from '~/util/parse';

test('single line string', () => {
  const code = `'some string'`;
  const tree = parseExpression(code);

  expect(tree.nodeType).toBe(NodeType.STRING);
  expect(tree.text).toBe(code);
});

test('multiline string', () => {
  const code = `'some\nmultiline\n\t\n\t\nstring\n'`;
  const tree = parseExpression(code);

  expect(tree.nodeType).toBe(NodeType.STRING);
  expect(tree.text).toBe(code);
});

test('empty string', () => {
  const code = `''`;
  const tree = parseExpression(code);

  expect(tree.nodeType).toBe(NodeType.STRING);
  expect(tree.text).toBe(code);
});
