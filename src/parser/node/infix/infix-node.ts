import { ISSUE_MESSAGE } from '../../../issue/issue-message';
import { Node, addNodeParent } from '../../../parser/node/node';
import { OperatorNode } from '../../../parser/node/operator/operator-node';
import { rangeFromNodes } from '../../../source/source-range';
import { ParserContext } from '../../parser-context';
import { NodeType } from '../node-type';

export interface InfixNode extends Node {
  readonly $: NodeType.INFIX;
  readonly operator: OperatorNode;
  readonly left: Node | null;
  readonly right: Node | null;
}

export function infixNode(
  context: ParserContext,
  operator: OperatorNode,
  left: Node | null,
  right: Node | null,
): InfixNode {
  const node: InfixNode = {
    $: NodeType.INFIX,
    range: rangeFromNodes(left ?? operator, right ?? operator),
    operator,
    left,
    right,
  };

  validateInfixNode(context, node);
  addNodeParent(node, operator, left, right);

  return node;
}

export function validateInfixNode(context: ParserContext, node: InfixNode): void {
  if (!node.left || !node.right) {
    context.addErrorIssue(node, ISSUE_MESSAGE.notImplemented());
  }
}
