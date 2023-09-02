import { LexicalAnalysis } from '~/analysis/lexical/lexical-analysis';
import { PrefixNode } from '~/analysis/lexical/node/prefix/prefix-node';
import { NodeType } from '~/analysis/node';
import { Source } from '~/source/source';
import { evaluate } from '~/util/evaluate';

test('negative integer', () => {
  const text = '-1';
  const source = Source.fromText(text);
  const lexer = new LexicalAnalysis(source.text);
  const nodes = lexer.body().statements[0].nodes;
  const node = nodes[0] as PrefixNode;

  expect(node.$).toBe(NodeType.PREFIX);
  expect(node.operator.text).toBe('-');
  expect(evaluate(node)).toBe(-1);
});
