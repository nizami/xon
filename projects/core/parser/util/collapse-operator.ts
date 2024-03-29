import {Array2, Integer, Nothing, String2, nothing} from '../../lib/core';
import {$Node, Node, is} from '../node/node';
import {importNode} from '../node/syntax/import/import-node';
import {infixNode} from '../node/syntax/infix/infix-node';
import {memberNode} from '../node/syntax/member/member-node';
import {postfixNode} from '../node/syntax/postfix/postfix-node';
import {prefixNode} from '../node/syntax/prefix/prefix-node';
import {rangeNode} from '../node/syntax/range/range-node';
import {SyntaxNode} from '../node/syntax/syntax-node';
import {IdNode} from '../node/token/id/id-node';
import {OperatorNode} from '../node/token/operator/operator-node';
import {StringNode} from '../node/token/string/string-node';
import {OperatorType, RecursiveType} from '../parser-config';
import {SyntaxContext} from '../syntax-context';

type CollapseFn = (
  context: SyntaxContext,
  index: Integer,
  left: Node | Nothing,
  operator: OperatorNode,
  right: Node | Nothing,
) => {spliceIndex: Integer; node: SyntaxNode} | Nothing;

const COLLAPSE_FUNCTIONS: Record<Integer, CollapseFn | Nothing> = {
  [OperatorType.IMPORT]: importCollapse,
  [OperatorType.MEMBER]: memberCollapse,
};

export function collapseOperator(
  context: SyntaxContext,
  operators: Array2<String2>,
  operatorType: OperatorType,
  recursiveType: RecursiveType,
  startIndex = 0,
): Nothing {
  for (let i = startIndex; i < context.nodes.length; i++) {
    const lastIndex = context.nodes.length - 1;
    const index = recursiveType === RecursiveType.LEFT ? i : lastIndex - i;
    const operator = context.nodes[index];

    if (!is<OperatorNode>(operator, $Node.OPERATOR) || !operators.includes(operator.text)) {
      continue;
    }

    const left: Node | Nothing = context.nodes[index - 1];
    const right: Node | Nothing = context.nodes[index + 1];

    const collapse = COLLAPSE_FUNCTIONS[operatorType];

    if (collapse) {
      const result = collapse(context, index, left, operator, right);
      if (result) {
        context.nodes.splice(result.spliceIndex, result.node.children.length, result.node);
        collapseOperator(context, operators, operatorType, recursiveType, i);
      }

      return;
    }

    // if (operatorType === OperatorType.TYPE) {
    //   if (collapseType(context, index, left, operator, right)) {
    //     collapseOperator(context, operators, operatorType, recursiveType, i);
    //   }

    //   return;
    // }

    if (operatorType === OperatorType.RANGE) {
      if (left && right && !is<OperatorNode>(left, $Node.OPERATOR) && !is<OperatorNode>(right, $Node.OPERATOR)) {
        const node = rangeNode(context, left, operator, right);
        context.nodes.splice(index - 1, node.children.length, node);

        collapseOperator(context, operators, operatorType, recursiveType, i);
      }

      return;
    }

    if (operatorType === OperatorType.INFIX) {
      if (left && right && !is<OperatorNode>(left, $Node.OPERATOR) && !is<OperatorNode>(right, $Node.OPERATOR)) {
        const node = infixNode(context, left, operator, right);
        context.nodes.splice(index - 1, 3, node);

        collapseOperator(context, operators, operatorType, recursiveType, i);
      }

      return;
    }

    if (operatorType === OperatorType.PREFIX) {
      if (
        right &&
        !is<OperatorNode>(right, $Node.OPERATOR) &&
        (index === 0 || is<OperatorNode>(left, $Node.OPERATOR))
      ) {
        const node = prefixNode(context, operator, right);
        context.nodes.splice(index, 2, node);

        collapseOperator(context, operators, operatorType, recursiveType, i);
      }

      return;
    }

    if (operatorType === OperatorType.POSTFIX) {
      if (
        left &&
        !is<OperatorNode>(left, $Node.OPERATOR) &&
        (index === lastIndex || is<OperatorNode>(right, $Node.OPERATOR))
      ) {
        const node = postfixNode(context, left, operator);
        context.nodes.splice(index - 1, 2, node);

        collapseOperator(context, operators, operatorType, recursiveType, i);
      }

      return;
    }
  }
}

function importCollapse(
  context: SyntaxContext,
  index: Integer,
  left: Node | Nothing,
  operator: OperatorNode,
  right: Node | Nothing,
): {spliceIndex: Integer; node: SyntaxNode} | Nothing {
  if (is<StringNode>(right, $Node.STRING) && (index === 0 || is<OperatorNode>(left, $Node.OPERATOR))) {
    const node = importNode(context, operator, right);

    return {spliceIndex: index, node};
  }

  return nothing;
}

function memberCollapse(
  context: SyntaxContext,
  index: Integer,
  left: Node | Nothing,
  operator: OperatorNode,
  right: Node | Nothing,
): {spliceIndex: Integer; node: SyntaxNode} | Nothing {
  if (!left || is<OperatorNode>(left, $Node.OPERATOR)) {
    return nothing;
  }

  const id = is<IdNode>(right, $Node.ID) ? right : nothing;
  const node = memberNode(context, operator, left, id);

  return {spliceIndex: index - 1, node};
}

// function collapseType(
//   context: SyntaxContext,
//   index: Integer,
//   left: Node | Nothing,
//   operator: OperatorNode,
//   right: Node | Nothing,
// ): Boolean2 {
//   if (is<DeclarationNode>(left, $Node.DECLARATION) ) {
//     const value = is<OperatorNode>(right, $Node.OPERATOR)?no
//     const type = typeNode(context, operator,  )
//     const id = is<IdNode>(right, $Node.ID) ? right : nothing;
//     const node = memberNode(context, operator, left, id);
//     context.nodes.splice(index - 1, node.children.length, node);
//   }

//   return true;
// }
