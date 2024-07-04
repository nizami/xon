import {$Node} from '../../../../$';
import {Nothing} from '../../../../../lib/types';
import {OperatorNode} from '../../../lexical/node/operator/operator-node';
import {ExpressionNode} from '../../../node';
import {SyntaxAnalyzer} from '../../syntax-analyzer';
import {SyntaxNode, syntaxNode} from '../syntax-node';

export type TypeNode = SyntaxNode<$Node.TypeNode> & {
  semantic: Nothing;
  operator: OperatorNode;
  value: ExpressionNode;
};

export function typeNode(analyzer: SyntaxAnalyzer, operator: OperatorNode, value: ExpressionNode): TypeNode {
  const node = syntaxNode($Node.TypeNode, {operator, value});

  format(analyzer, node);

  return node;
}

function format(analyzer: SyntaxAnalyzer, node: TypeNode): void {
  analyzer.formatterManager.formatChildNode(node.value, true);
}
