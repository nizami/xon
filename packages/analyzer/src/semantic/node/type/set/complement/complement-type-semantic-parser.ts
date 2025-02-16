import {
  $InfixNode,
  BACKSLASH,
  ComplementTypeSemantic,
  complementTypeSemantic,
  Node,
  SemanticAnalyzer,
  typeSemanticParse,
} from '#analyzer';
import {Nothing, nothing} from '#common';
import {is} from '#typing';

export function complementTypeSemanticTryParse(
  analyzer: SemanticAnalyzer,
  node: Node,
): ComplementTypeSemantic | Nothing {
  if (is(node, $InfixNode()) && node.operatorNode.text.equals(BACKSLASH)) {
    const left = typeSemanticParse(analyzer, node.leftNode);
    const right = typeSemanticParse(analyzer, node.rightNode);

    if (left && right) {
      return complementTypeSemantic(node, left, right);
    }
  }

  return nothing;
}
