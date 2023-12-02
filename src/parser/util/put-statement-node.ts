import { Integer } from '~/lib/core';
import { Node } from '~/parser/node/node';
import { NodeType } from '~/parser/node/node-type';
import { RootNode } from '~/parser/node/root/root-node';
import { getSyntacticNode } from '~/parser/util/get-syntactic-node';
import { is } from '~/parser/util/is';
import { ParserContext } from '../parser-context';

export function putStatementNode(context: ParserContext): void {
  const parent = getParent(context);
  handleStatement(context, parent);
}

function getParent(context: ParserContext): Node {
  const { nodes, lastStatement, root } = context;
  const indent = nodes[0].range.start.column;

  if (!lastStatement) {
    return root;
  }

  if (indent > lastStatement.range.start.column) {
    return lastStatement;
  }

  return findParentWithLessIndent(lastStatement, indent);
}

// todo make it more clear and simple
function handleStatement(context: ParserContext, parent: Node): Node {
  context.parent = parent;
  const statement = getSyntacticNode(context);
  statement.parent = parent;

  if (parent === context.root) {
    context.root.children.push(statement);
  }

  context.lastStatement = statement;

  return statement;
}

function findParentWithLessIndent(node: Node, indent: Integer): Node {
  if (!node.parent) {
    throw new Error('Not implemented');
  }

  if (is<RootNode>(node.parent, NodeType.ROOT)) {
    return node.parent;
  }

  if (node.parent.range.start.column < indent) {
    return node.parent!;
  }

  return findParentWithLessIndent(node.parent!, indent);
}
