import { Scanner } from '~/compiler/lexical/lexical';
import { parseExpression } from '~/compiler/parser/parser';
import { NodeType } from '~/node/node';
import { StringNode } from '~/node/string/string-node';
import { Source } from '~/source/source';

test('string', () => {
  const text = "'abc   def'";
  const source = Source.fromText(text, null);
  const lexer = new Scanner(source.text);
  const tokens = lexer.nodes();

  expect(tokens.length).toBe(1);
  expect(tokens[0].text).toBe("'abc   def'");
  expect(tokens[0].type).toBe(NodeType.STRING);
});

test('single line string', () => {
  const code = `'some string'`;
  const source = Source.fromText(code);
  const tree = parseExpression(source) as StringNode;

  expect(tree.type).toBe(NodeType.STRING);
  expect(tree.text).toBe(code);
});

test('multiline string', () => {
  const code = `'some\nmultiline\n\t\n\t\nstring\n'`;
  const source = Source.fromText(code);
  const tree = parseExpression(source) as StringNode;

  expect(tree.type).toBe(NodeType.STRING);
  expect(tree.text).toBe(code);
});

test('empty string', () => {
  const code = `''`;
  const source = Source.fromText(code);
  const tree = parseExpression(source) as StringNode;

  expect(tree.type).toBe(NodeType.STRING);
  expect(tree.text).toBe(code);
});
