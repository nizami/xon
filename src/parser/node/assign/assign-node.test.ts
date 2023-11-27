import { ModelNode } from '~/parser/node/model/model-node';
import { NodeType } from '~/parser/node/node-type';
import { parse } from '~/parser/parser';

test('a', () => {
  const text = '= 1';
  const nodes = parse(text).root.children;
  const tree = nodes[0] as ModelNode;

  expect(nodes.length).toBe(1);

  expect(tree.$).toBe(NodeType.MODEL);
  expect(tree.modifier?.text).toBe('model');
  expect(tree.id?.text).toBe('Abstract');
});
