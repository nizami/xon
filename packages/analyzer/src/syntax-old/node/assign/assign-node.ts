import {
  $SyntaxNode,
  analyzerPackageType,
  Node,
  OperatorNode,
  SyntaxAnalyzer,
  SyntaxNode,
  syntaxNode,
} from '#analyzer';
import {Nothing, nothing} from '#common';

export type AssignNode = SyntaxNode & {
  semantic: Nothing;
  operator: OperatorNode;
  value: Node;
};

export const $AssignNode = analyzerPackageType<AssignNode>('AssignNode', $SyntaxNode);

export function assignNode(analyzer: SyntaxAnalyzer, operator: OperatorNode, value: Node): AssignNode {
  const node = syntaxNode(analyzer, {$: $AssignNode, operator, value, semantic: nothing});

  format(analyzer, node);

  return node;
}

function format(analyzer: SyntaxAnalyzer, node: AssignNode): void {
  analyzer.formatterManager.formatChildNode(node.value, true);
}
