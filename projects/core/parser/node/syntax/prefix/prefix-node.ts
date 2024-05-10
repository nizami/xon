import {formatBetweenHiddenNodes} from '../../../../formatter/formatter';
import {Nothing} from '../../../../lib/core';
import {ASSIGN, TYPE} from '../../../parser-config';
import {SyntaxContext} from '../../../syntax-context';
import {$Node, ExpressionNode} from '../../node';
import {OperatorNode} from '../../token/operator/operator-node';
import {SyntaxNode, syntaxNode} from '../syntax-node';

export interface PrefixNode extends SyntaxNode {
  $: $Node.PREFIX;
  operator: OperatorNode;
  value: ExpressionNode;
}

export function prefixNode(context: SyntaxContext, operator: OperatorNode, value: ExpressionNode): PrefixNode {
  const node = syntaxNode($Node.PREFIX, {operator, value});

  format(context, node);

  return node;
}

function format(context: SyntaxContext, node: PrefixNode): Nothing {
  const keepSingleWhitespace = node.operator.text.some((x) => x.isLetterOrDigit(0) || x === TYPE || x === ASSIGN);
  formatBetweenHiddenNodes(context, node.operator, keepSingleWhitespace);
}
