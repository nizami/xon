import { String2, Unknown2 } from '~/lib/core';
import { ArrayNode } from '~/node/array/array-expression-tree';
import { is } from '~/node/expression-tree-helper';
import { InfixNode } from '~/node/infix/infix-expression-tree';
import { Node, NodeType } from '~/node/node';
import { PrefixNode } from '~/node/prefix/prefix-expression-tree';

export function escapeToString<T>(value: T): String2 {
  return (typeof value === 'string' && `\`${value}\``) || String(value);
}

export function evaluate(tree: Node | null, argsMap = {}): Unknown2 {
  if (!tree) {
    return null;
  }
  if (is<ArrayNode>(tree, NodeType.ARRAY)) {
    return tree.parameters.map((x) => evaluate(x ?? null));
  }
  if (tree.nodeType === NodeType.INTEGER) {
    return +tree.text;
  }
  if (tree.nodeType === NodeType.STRING) {
    return tree.text.slice(1, -1);
  }
  if (is<InfixNode>(tree, NodeType.INFIX)) {
    const a = evaluate(tree.left, argsMap);
    const b = evaluate(tree.right, argsMap);
    const operator = (tree.operator.text === '^' && '**') || tree.operator.text;

    // eslint-disable-next-line no-eval
    return eval(`${escapeToString(a)} ${operator} ${escapeToString(b)}`);
  }
  if (is<PrefixNode>(tree, NodeType.PREFIX)) {
    const a = evaluate(tree.expression, argsMap);

    // eslint-disable-next-line no-eval
    return eval(`${tree.operator.text}${escapeToString(a)}`);
  }
  if (tree.nodeType === NodeType.ID) {
    if (argsMap[tree.text]) {
      return argsMap[tree.text];
    }
    throw new Error('Not implemented');

    // Issue.errorFromTree(tree, `Undefined key '${tree.text}'`);
  }
  throw new Error('Not implemented');
  // Issue.errorFromTree(tree, `Unsupported operation of '${tree.constructor.name}' for '${tree.sourceSpan.getText()}'`);
}
