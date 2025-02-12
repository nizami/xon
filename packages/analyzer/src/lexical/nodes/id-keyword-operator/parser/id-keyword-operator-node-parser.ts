import {
  $AsOperatorNode,
  $ConstKeywordNode,
  $ElseKeywordNode,
  $IdNode,
  $IfKeywordNode,
  $IsOperatorNode,
  $PublicKeywordNode,
  $ReturnKeywordNode,
  $TypeKeywordNode,
  AnalyzerContext,
  AS,
  CONST,
  ELSE,
  IdNode,
  IF,
  IS,
  KeywordNode,
  OperatorNode,
  PUBLIC,
  RETURN,
  TYPE,
  UNDERSCORE,
} from '#analyzer';
import {Dictionary, newArrayData, newDictionary, newKeyValue, nothing, Nothing, Text} from '#common';
import {$Type} from '#typing';

const wordMap: Dictionary<Text, $Type> = newDictionary(
  newArrayData([
    // declarations
    newKeyValue(TYPE, $TypeKeywordNode),
    newKeyValue(CONST, $ConstKeywordNode),
    // modifiers
    newKeyValue(PUBLIC, $PublicKeywordNode),
    // controls
    newKeyValue(IF, $IfKeywordNode),
    newKeyValue(ELSE, $ElseKeywordNode),
    newKeyValue(RETURN, $ReturnKeywordNode),
    // operators
    newKeyValue(AS, $AsOperatorNode),
    newKeyValue(IS, $IsOperatorNode),
  ]),
);

export function parseIdKeywordOperatorNode(
  context: AnalyzerContext,
): IdNode | KeywordNode | OperatorNode | Nothing {
  const node = context.source.takeWhile(
    $IdNode,
    (x, i) => (i === 0 && x.isLetter()) || (i > 0 && x.isLetterOrDigit()) || UNDERSCORE.equals(x),
  );

  if (!node) {
    return nothing;
  }

  const $Type = wordMap.get(node.text);

  if ($Type) {
    node.$ = $Type;

    return node;
  }

  if (node) {
    node.canBeExpression = true;
  }

  return node;
}
