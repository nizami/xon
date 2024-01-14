import { ISSUE_MESSAGE } from '../../../issue/issue-message';
import { Node, addNodeParent } from '../../../parser/node/node';
import { OperatorNode } from '../../../parser/node/operator/operator-node';
import { rangeFromNodes } from '../../../source/source-range';
import { ParserContext } from '../../parser-context';
import { NodeType } from '../node-type';

export interface PrefixNode extends Node {
  readonly $: NodeType.PREFIX;
  readonly operator: OperatorNode;
  readonly value: Node | null;
}

export function prefixNode(context: ParserContext, operator: OperatorNode, value: Node | null): PrefixNode {
  const node: PrefixNode = {
    $: NodeType.PREFIX,
    range: rangeFromNodes(operator, value),
    operator,
    value,
  };

  validatePrefixNode(context, node);
  addNodeParent(node, operator, value);

  return node;
}

export function validatePrefixNode(context: ParserContext, node: PrefixNode): void {
  if (!node.value) {
    context.addErrorIssue(node, ISSUE_MESSAGE.notImplemented());
  }
}
