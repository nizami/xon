import { IdNode } from '~/node/id/id-node';
import { Node, NodeType } from '~/node/node';
import { OperatorNode } from '~/node/operator/operator-node';

export interface MemberNode extends Node {
  type: NodeType.MEMBER;
  operator: OperatorNode;
  instance: Node;
  id: IdNode;
}

export function memberNode(operator: OperatorNode, instance: Node, id: IdNode): MemberNode {
  return {
    type: NodeType.MEMBER,
    operator,
    instance,
    id,
  };
}
