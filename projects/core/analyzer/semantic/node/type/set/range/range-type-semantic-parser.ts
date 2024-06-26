import {Nothing, nothing} from '../../../../../../../lib/types';
import {DIAGNOSTIC_MESSAGE} from '../../../../../../diagnostic/analyzer-diagnostic-message';
import {RANGE} from '../../../../../lexical/lexical-analyzer-config';
import {$Node, Node, is} from '../../../../../node';
import {InfixNode} from '../../../../../syntax/node/infix/infix-node';
import {DeclarationKind} from '../../../../declaration-manager';
import {SemanticAnalyzerContext} from '../../../../semantic-analyzer-context';
import {isTypeDeclarationSemantic} from '../../../declaration/declaration-semantic';
import {$Semantic, semanticIs} from '../../../semantic-node';
import {IntegerTypeSemantic} from '../../integer/integer-type-semantic';
import {typeSemanticParse} from '../../type-semantic-parser';
import {RangeTypeSemantic, rangeTypeSemantic} from './range-type-semantic';

export function rangeTypeSemanticTryParse(
  context: SemanticAnalyzerContext,
  node: Node,
): RangeTypeSemantic | Nothing {
  if (!is<InfixNode>(node, $Node.INFIX) || node.operator.text !== RANGE) {
    return nothing;
  }

  const declaration = context.declarationManager.single(
    DeclarationKind.TYPE,
    context.config.literalTypeNames.integerTypeName,
    nothing,
    nothing,
  );

  if (!declaration || !isTypeDeclarationSemantic(declaration)) {
    context.issueManager.addError(
      node.range,
      DIAGNOSTIC_MESSAGE.declarationNotFound(context.config.literalTypeNames.integerTypeName),
    );

    return nothing;
  }

  const reference = context.createReference(node);
  const from = typeSemanticParse(context, node.left);
  const to = typeSemanticParse(context, node.right);
  // todo add step
  const step = nothing;

  if (!from || !to) {
    context.issueManager.addError(node.range, DIAGNOSTIC_MESSAGE.notImplemented());

    return nothing;
  }

  if (!semanticIs<IntegerTypeSemantic>(from, $Semantic.INTEGER_TYPE)) {
    context.issueManager.addError(node.left.range, DIAGNOSTIC_MESSAGE.notImplemented());
  }

  if (!semanticIs<IntegerTypeSemantic>(to, $Semantic.INTEGER_TYPE)) {
    context.issueManager.addError(node.right.range, DIAGNOSTIC_MESSAGE.notImplemented());
  }

  const semantic = rangeTypeSemantic(reference, declaration, from, to, step);

  return semantic;
}
