import {SyntaxResult} from '../../../core/parser/syntax-context';
import {Array2, Nothing, nothing} from '../../../lib/types';
import {$Node, ExpressionNode, Node, is} from '../../parser/node/node';
import {SemanticContext} from '../semantic-context';
import {TypeSemantic} from '../type/type-semantic';
import {declarationValueTypeTryParse} from './declaration/declaration-value-type-parser';
import {literalValueTypeTryParse} from './literal/literal-value-type-parser';
import {memberValueTypeTryParse} from './member/member-value-type-parser';
import {ValueSemantic, valueSemantic} from './value-semantic';

type ValueSemanticTryParseFn = (context: SemanticContext, node: Node) => TypeSemantic | Nothing;

export const parsers: Array2<ValueSemanticTryParseFn> = [
  literalValueTypeTryParse,
  declarationValueTypeTryParse,
  memberValueTypeTryParse,
];

export function syntaxValuesParse(context: SemanticContext, syntax: SyntaxResult) {
  for (const statement of syntax.statements) {
    if (statement.value) {
      continue;
    }

    for (const node of statement.children) {
      valueSemanticParse(context, node);
    }
  }
}

export function valueSemanticParse(context: SemanticContext, node: Node | Nothing): ValueSemantic | Nothing {
  if (!is<ExpressionNode>(node, $Node.EXPRESSION)) {
    return nothing;
  }

  const type = parsers.findMap((parse) => parse(context, node));

  if (!type) {
    return nothing;
  }

  const reference = context.createReference(node);
  const semantic = valueSemantic(reference, type);
  node.semantic = semantic;

  return semantic;
}
