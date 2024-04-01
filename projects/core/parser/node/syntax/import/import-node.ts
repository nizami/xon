import {formatBetweenHiddenNodes} from '../../../../formatter/formatter';
import {Integer, Nothing} from '../../../../lib/core';
import {IMPORT} from '../../../parser-config';
import {SyntaxContext} from '../../../syntax-context';
import {$Node, findNode, is} from '../../node';
import {OperatorNode} from '../../token/operator/operator-node';
import {StringNode} from '../../token/string/string-node';
import {SyntaxNode, SyntaxParseResult, syntaxNode} from '../syntax-node';

export interface ImportNode extends SyntaxNode {
  $: $Node.IMPORT;
  operator: OperatorNode;
  location: StringNode;
}

export function importNode(context: SyntaxContext, operator: OperatorNode, location: StringNode): ImportNode {
  const node = syntaxNode($Node.IMPORT, {operator, location});

  format(context, node);

  return node;
}

function format(context: SyntaxContext, node: ImportNode): Nothing {
  formatBetweenHiddenNodes(context, node.operator, true);
}

export function importSyntaxParse(context: SyntaxContext, startIndex: Integer = 0): SyntaxParseResult {
  const found = findNode(
    context.nodes,
    startIndex,
    true,
    (x): x is OperatorNode => is<OperatorNode>(x, $Node.OPERATOR) && x.text === IMPORT,
  );

  if (!found) {
    return;
  }

  const left = context.nodes[found.index - 1];
  const right = context.nodes[found.index + 1];

  if (is<StringNode>(right, $Node.STRING) && (found.index === 0 || is<OperatorNode>(left, $Node.OPERATOR))) {
    const node = importNode(context, found.node, right);

    return {node, spliceIndex: found.index};
  }
}
