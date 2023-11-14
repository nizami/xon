import { Parser } from '~/parser/parser';
import { Source } from '~/source/source';
import { TokenNode } from '../token-node';

test('unknown 1', () => {
  const text = '123 §•∞•456';
  const source = Source.fromText(text, null);
  const parser = new Parser(source.text);
  const nodes = parser.parse() as TokenNode[];

  expect(nodes.length).toBe(1);
  // expect(nodes[1].text).toBe('§');
  // expect(nodes[1].hidden.length).toBe(1);
  // expect(nodes[1].hidden[0].text).toBe(' ');
});

test('unknown 2', () => {
  // todo make all join unknown nodes
  const text = 'ºª¶';
  const source = Source.fromText(text, null);
  const parser = new Parser(source.text);
  const nodes = parser.parse() as TokenNode[];

  expect(nodes.length).toBe(1);
  expect(nodes.map((x) => x.text).join('')).toBe('º');
});
