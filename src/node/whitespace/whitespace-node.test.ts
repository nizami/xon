import { Scanner } from '~/compiler/lexical/lexical';
import { NodeType } from '~/node/node';
import { Source } from '~/source/source';

test('whitespace', () => {
  const text = '    ';
  const source = Source.fromText(text, null);
  const lexer = new Scanner(source.text);
  const tokens = lexer.nodes();

  expect(tokens.length).toBe(1);
  expect(tokens[0].text).toBe('    ');
  expect(tokens[0].type).toBe(NodeType.WHITESPACE);
});
