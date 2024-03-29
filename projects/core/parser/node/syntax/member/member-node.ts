import {formatAfterHiddenNodes, formatBetweenHiddenNodes} from '../../../../formatter/formatter';
import {ISSUE_MESSAGE} from '../../../../issue/issue-message';
import {Nothing} from '../../../../lib/core';
import {SyntaxContext} from '../../../syntax-context';
import {$Node, Node} from '../../node';
import {IdNode} from '../../token/id/id-node';
import {OperatorNode} from '../../token/operator/operator-node';
import {SyntaxNode, syntaxNode} from '../syntax-node';

export interface MemberNode extends SyntaxNode {
  readonly $: $Node.MEMBER;
  readonly instance: Node;
  readonly operator: OperatorNode;
  readonly id: IdNode | Nothing;
}

export function memberNode(
  context: SyntaxContext,
  operator: OperatorNode,
  instance: Node,
  id: IdNode | Nothing,
): MemberNode {
  const node = syntaxNode($Node.MEMBER, {instance, operator, id});
  validate(context, node);
  format(context, node);

  return node;
}

function validate(context: SyntaxContext, node: MemberNode): Nothing {
  if (!node.id) {
    context.issueManager.addError(node.operator.range, ISSUE_MESSAGE.shouldBeMemberName());
  }
}

function format(context: SyntaxContext, node: MemberNode): Nothing {
  formatBetweenHiddenNodes(context, node.instance, false);

  if (node.id) {
    formatAfterHiddenNodes(context, node.operator, false);
  }
}
