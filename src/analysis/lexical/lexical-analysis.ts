import { is } from '~/analysis/is';
import { BodyNode, bodyNode } from '~/analysis/lexical/node/body/body-node';
import { scanCloseNode } from '~/analysis/lexical/node/close/close-node';
import { scanCommaNode } from '~/analysis/lexical/node/comma/comma-node';
import { scanGroupNode } from '~/analysis/lexical/node/group/group-node';
import { scanIdNode } from '~/analysis/lexical/node/id/id-node';
import { scanIntegerNode } from '~/analysis/lexical/node/integer/integer-node';
import { scanJoiningNode } from '~/analysis/lexical/node/joining/joining-node';
import { scanNlNode } from '~/analysis/lexical/node/nl/nl-node';
import { scanOperatorNode } from '~/analysis/lexical/node/operator/operator-node';
import { StatementNode, statementNode } from '~/analysis/lexical/node/statement/statement-node';
import { scanStringNode } from '~/analysis/lexical/node/string/string-node';
import { scanUnknownNode } from '~/analysis/lexical/node/unknown/unknown-node';
import { scanWhitespaceNode } from '~/analysis/lexical/node/whitespace/whitespace-node';
import { Node, NodeType } from '~/analysis/node';
import { Boolean2, Integer, String2 } from '~/lib/core';

type NodeScanFunction = (analysis: LexicalAnalysis) => Node | null;

const nodeScanFunctions: NodeScanFunction[] = [
  scanNlNode,
  // scanBodyNode

  scanIntegerNode,
  scanStringNode,
  scanGroupNode,
  // scanOpenNode, this handle group
  // this can handle group if possible
  scanCloseNode,
  scanCommaNode,
  scanJoiningNode,
  scanWhitespaceNode,
  scanOperatorNode,
  scanIdNode,
  scanUnknownNode,
];

export class LexicalAnalysis {
  public index = 0;

  public constructor(public text: String2) {}

  public body(breakFn: ((node: Node) => Boolean2) | null = null): BodyNode {
    const indentBody: { indent: Integer | null; body: BodyNode }[] = [];
    let nodes: Node[] = [];
    let hiddenNodes: Node[] = [];

    while (this.index < this.text.length) {
      const node = this.nextNode();

      if ([NodeType.NL, NodeType.WHITESPACE, NodeType.COMMENT_LINE, NodeType.COMMENT_BLOCK].some((x) => is(node, x))) {
        hiddenNodes.push(node);
      } else {
        node.beforeHiddenNodes = hiddenNodes;
        hiddenNodes = [];
        nodes.push(node);
      }

      if (breakFn && breakFn(node)) {
        break;
      }

      if (is(node, NodeType.NL)) {
        this.putStatement(indentBody, statementNode(nodes, hiddenNodes));
        nodes = [];
        continue;
      }
    }

    if (nodes.length > 0) {
      this.putStatement(indentBody, statementNode(nodes, hiddenNodes));
    }

    if (indentBody.length > 0) {
      return indentBody[0].body;
    }

    return bodyNode([statementNode(nodes, hiddenNodes)]);
  }

  public nextNode(): Node {
    for (const nodeScan of nodeScanFunctions) {
      const node = nodeScan(this);
      if (node) {
        this.index = node.stop + 1;

        return node;
      }
    }

    throw new Error('Not implemented');
  }

  public putStatement(indentBody: { indent: Integer | null; body: BodyNode }[], statement: StatementNode): void {
    const indent = getStatementIndent(statement);

    // if first statement
    if (indentBody.length === 0) {
      indentBody.push({ indent, body: bodyNode([statement]) });

      return;
    }

    const lastIndentBody = indentBody.last();

    // if hidden nodes
    if (indent === null) {
      lastIndentBody.body.statements.push(statement);

      return;
    }

    // if first statement is NL
    // if (
    //   indentBody.length === 1 &&
    //   lastIndentBody.body.statements.length === 1 &&
    //   lastIndentBody.body.statements[0].nodes.length === 1 &&
    //   is(lastIndentBody.body.statements[0].nodes[0], NodeType.NL)
    // ) {
    //   lastIndentBody.indent = indent;
    //   lastIndentBody.body.statements.push(statement);

    //   return;
    // }

    // new body
    if (lastIndentBody.indent !== null && indent > lastIndentBody.indent) {
      const body = bodyNode([statement]);
      indentBody.push({ indent, body });

      // add the body as the last statement
      lastIndentBody.body.statements.last().nodes.push(body);

      return;
    }

    // if should be added to existing body

    const foundIndentBodyIndex = indentBody.findLastIndex((x) => x.indent && x.indent <= indent);

    if (foundIndentBodyIndex < 0) {
      throw new Error('Not implemented');
    }

    // remove between current and parent bodies cuz we switch to existing body and never return to previous
    indentBody.splice(foundIndentBodyIndex + 1);
    const foundIndentBody = indentBody[foundIndentBodyIndex];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    foundIndentBody.indent = Math.min(foundIndentBody.indent!, indent);
    foundIndentBody.body.statements.push(statement);
  }
}

// function isEmptyStatement(statement: StatementNode) {
//   return statement.nodes.every((x) => is(x, NodeType.NL) || is(x, NodeType.WHITESPACE));
// }

function getStatementIndent(statement: StatementNode): Integer | null {
  if (statement.nodes.length === 0) {
    return null;
  }

  const whitespaceLength = statement.nodes[0].beforeHiddenNodes?.filter((x) => is(x, NodeType.WHITESPACE));

  return whitespaceLength?.sum((x) => x.stop - x.start) ?? 0;
}

// function hasStatementIndent(statement: StatementNode): Boolean2 {
//   if (statement.nodes.length === 1 && is(statement.nodes[0], NodeType.NL)) {
//     return false;
//   }

//   return true;
// }

// function collapseLineNodes(nodes: Node[]): void {
//   if (nodes.length > 1 && is<ModifierNode>(nodes[0], NodeType.MODIFIER)) {
//     if (is<IdNode>(nodes[1], NodeType.ID) || is<OperatorNode>(nodes[1], NodeType.OPERATOR))
//       nodes.splice(0, 2, modifierIdNode(nodes[0], nodes[1]));
//   }

//   for (const operatorsOrder of operatorsOrders) {
//     if (operatorsOrder.operatorType === OperatorType.INVOKE) {
//       collapseInvoke(nodes);
//     }
//     for (const operators of operatorsOrder.operators) {
//       const operatorIndex = findOperatorIndex(
//         nodes,
//         operators,
//         operatorsOrder.operatorType,
//         operatorsOrder.recursiveType,
//       );
//       if (operatorIndex >= 0) {
//         collapseOperators(nodes, operatorsOrder.operatorType, operatorIndex);
//         collapseLineNodes(nodes);
//       }
//     }
//   }
// }

// function collapseInvoke(nodes: Node[]): void {
//   for (let i = 0; i < nodes.length; i++) {
//     const element = nodes[i];
//     if (is<GroupNode>(element, NodeType.ARRAY) && i > 0) {
//       const prev = nodes[i - 1];
//       if (!is(prev, NodeType.OPERATOR)) {
//         nodes[i] = invokeNode(prev, element);
//         nodes.splice(i - 1, 1);
//         collapseInvoke(nodes);

//         return;
//       }
//     }
//   }
// }

// function findOperatorIndex(
//   nodes: Node[],
//   operators: String2[],
//   operatorType: OperatorType,
//   recursiveType: RecursiveType,
// ): Integer {
//   for (let i = 0; i < nodes.length; i++) {
//     const index = recursiveType === RecursiveType.LEFT ? i : nodes.length - i - 1;

//     const operator = nodes[index];

//     if (is<OperatorNode>(operator, NodeType.OPERATOR) && operators.includes(operator.text)) {
//       const left = nodes[index - 1];
//       const right = nodes[index + 1];

//       if (operatorType === OperatorType.PREFIX) {
//         if (!is(right, NodeType.OPERATOR) && (index === 0 || is(left, NodeType.OPERATOR))) {
//           return index;
//         }
//       } else if (operatorType === OperatorType.POSTFIX) {
//         if (!is(left, NodeType.OPERATOR) && (index === nodes.length - 1 || is(right, NodeType.OPERATOR))) {
//           return index;
//         }
//       } else if (operatorType === OperatorType.INFIX) {
//         if (!is(left, NodeType.OPERATOR) && !is(right, NodeType.OPERATOR)) {
//           return index;
//         }
//       }
//     }
//   }

//   return -1;
// }

// function collapseOperators(nodes: Node[], operatorType: OperatorType, operatorIndex: Integer): void {
//   if (operatorIndex < 0) return;
//   const operator = nodes[operatorIndex];
//   if (!is<OperatorNode>(operator, NodeType.OPERATOR)) {
//     return;
//   }

//   if (operatorType === OperatorType.PREFIX) {
//     const right = nodes[operatorIndex + 1];

//     if (!right) {
//       throw new Error('Not implemented');
//     }

//     const prefix = prefixNode(operator, right);
//     nodes[operatorIndex] = prefix;
//     nodes.splice(operatorIndex + 1, 1);

//     return;
//   }

//   if (operatorType === OperatorType.POSTFIX) {
//     const left = nodes[operatorIndex - 1];

//     if (!left) {
//       throw new Error('Not implemented');
//     }

//     const postfix = postfixNode(operator, left);
//     nodes[operatorIndex] = postfix;
//     nodes.splice(operatorIndex - 1, 1);

//     return;
//   }

//   if (operatorType === OperatorType.INFIX) {
//     const left = nodes[operatorIndex - 1] as Node;
//     const right = nodes[operatorIndex + 1] as Node;

//     if (!left || !right) {
//       throw new Error('Not implemented');
//     }

//     const infix = handleInfix(operator, left, right);
//     nodes[operatorIndex] = infix;
//     nodes.splice(operatorIndex - 1, 1);
//     nodes.splice(operatorIndex, 1);
//   }
// }
