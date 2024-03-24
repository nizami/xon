import {ISSUE_MESSAGE} from '../../../issue/issue-message';
import {Nothing, nothing} from '../../../lib/core';
import {$Node, is} from '../../../parser/node/node';
import {RangeNode} from '../../../parser/node/syntax/range/range-node';
import {IntegerNode} from '../../../parser/node/token/integer/integer-node';
import {DeclarationKind} from '../../declaration-manager';
import {TypeDeclarationSemantic} from '../../declaration/type/type-declaration-semantic';
import {$Semantic, semanticIs} from '../../semantic';
import {SemanticContext} from '../../semantic-context';
import {declarationTypeSemantic} from '../../type/declaration/declaration-type-semantic';
import {integerLiteralSemanticParse} from '../integer/integer-literal-semantic-parser';
import {RangeLiteralSemantic, rangeLiteralSemantic} from './range-literal-semantic';

export function rangeLiteralSemanticParse(context: SemanticContext, node: RangeNode): RangeLiteralSemantic | Nothing {
  if (!is<IntegerNode>(node.from, $Node.INTEGER)) {
    context.issueManager.addError(node.from.range, ISSUE_MESSAGE.wrongType());

    return nothing;
  }

  if (!is<IntegerNode>(node.to, $Node.INTEGER)) {
    context.issueManager.addError(node.to.range, ISSUE_MESSAGE.wrongType());

    return nothing;
  }

  const declaration = context.declarationManager.single(
    DeclarationKind.TYPE,
    context.config.literalTypeNames.rangeTypeName,
    nothing,
    nothing,
  );

  if (!declaration || !semanticIs<TypeDeclarationSemantic>(declaration, $Semantic.TYPE_DECLARATION)) {
    context.issueManager.addError(
      node.range,
      ISSUE_MESSAGE.declarationNotFound(context.config.literalTypeNames.rangeTypeName),
    );

    return nothing;
  }

  const reference = context.createReference(node);
  const from = integerLiteralSemanticParse(context, node.from);
  const to = integerLiteralSemanticParse(context, node.to);

  if (!from || !to || !from.type.eq(to.type)) {
    context.issueManager.addError(node.from.range, ISSUE_MESSAGE.notImplemented());
    context.issueManager.addError(node.to.range, ISSUE_MESSAGE.notImplemented());

    return nothing;
  }

  const value: RangeLiteralSemantic['value'] = {
    from,
    to,
    step: nothing,
  };

  const type = declarationTypeSemantic(context, reference, declaration, [from.type]);
  const semantic = rangeLiteralSemantic(reference, type, value);

  return semantic;
}
