import '../../../extensions';
import { ISSUE_MESSAGE } from '../../../issue/issue-message';
import { arrayNode } from '../../../parser/node/array/array-node';
import { CloseNode } from '../../../parser/node/close/close-node';
import { CommaNode } from '../../../parser/node/comma/comma-node';
import { DeclarationNode, Group } from '../../../parser/node/declaration/declaration-node';
import { objectNode } from '../../../parser/node/object/object-node';
import { OpenNode, scanOpenNode } from '../../../parser/node/open/open-node';
import { parseUntil } from '../../../parser/parser';
import { ParserContext } from '../../../parser/parser-context';
import { is } from '../../../parser/util/is';
import { clonePosition } from '../../../source/source-position';
import { rangeFromNodes } from '../../../source/source-range';
import {
  ARRAY_NODE_OPEN_CODE,
  GROUP_NODE_OPEN_CODE,
  OBJECT_NODE_OPEN_CODE,
  OPEN_CLOSE_PAIR,
} from '../../parser-config';
import { Node } from '../node';
import { NodeType } from '../node-type';

export interface GroupNode extends Node {
  $: NodeType.GROUP;
  open: OpenNode;
  close: CloseNode | null;
  items: Node[];
}

export function groupNode(context: ParserContext, open: OpenNode, close: CloseNode | null, items: Node[]): GroupNode {
  const last = items.lastOrNull();

  const node: GroupNode = {
    $: NodeType.GROUP,
    range: rangeFromNodes(open, close ?? last ?? open),
    open,
    close,
    items,
  };

  validateGroupNode(context, node);

  return node;
}

export function validateGroupNode(context: ParserContext, node: GroupNode): void {
  if (!node.close) {
    context.addErrorIssue(
      node.open,
      ISSUE_MESSAGE.expectCloseToken(
        node.open.text,
        String.fromCharCode(OPEN_CLOSE_PAIR[node.open.text.charCodeAt(0)]),
      ),
    );
  }
}

export function scanGroupNode(context: ParserContext): Group | DeclarationNode | null {
  const open = scanOpenNode(context);

  if (!is<OpenNode>(open, NodeType.OPEN)) {
    return null;
  }

  context.position.column = open.range.stop.column + 1;
  context.position.index = open.range.stop.index + 1;

  const items: Node[] = [];

  while (context.position.index < context.source.text.length) {
    const groupContext = parseUntil(
      context.source,
      context.position,
      (node) =>
        is<CommaNode>(node, NodeType.COMMA) ||
        (is<CloseNode>(node, NodeType.CLOSE) && node.text.charCodeAt(0) === OPEN_CLOSE_PAIR[open.text.charCodeAt(0)]),
    );

    context.position = clonePosition(groupContext.position);

    if (is<CommaNode>(groupContext.breakNode, NodeType.COMMA)) {
      context.hidden.push(groupContext.breakNode);

      if (groupContext.nodes.length > 0) {
        items.push(groupContext.root.children[0]);
      }

      continue;
    }

    if (is<CloseNode>(groupContext.breakNode, NodeType.CLOSE)) {
      if (groupContext.nodes.length > 0) {
        items.push(groupContext.root.children[0]);
      }

      return createGroupNode(context, open, groupContext.breakNode, items);
    }
  }

  return createGroupNode(context, open, null, items);
}

function createGroupNode(context: ParserContext, open: OpenNode, close: CloseNode | null, nodes: Node[]): Group {
  const code = open.text.charCodeAt(0);

  if (code === GROUP_NODE_OPEN_CODE) {
    return groupNode(context, open, close, nodes);
  }

  if (code === OBJECT_NODE_OPEN_CODE) {
    return objectNode(open, close, nodes);
  }

  if (code === ARRAY_NODE_OPEN_CODE) {
    return arrayNode(open, close, nodes);
  }

  throw new Error('Not implemented');
}
