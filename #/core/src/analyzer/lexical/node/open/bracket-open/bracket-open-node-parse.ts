import {newTextData, Nothing, nothing} from '#common';
import {BRACKET_OPEN, BracketOpenNode, bracketOpenNode, LexicalAnalyzer} from '#core';

export function bracketOpenNodeParse(analyzer: LexicalAnalyzer): BracketOpenNode | Nothing {
  if (!analyzer.hasTextAtIndex(BRACKET_OPEN)) {
    return nothing;
  }

  const text = newTextData(BRACKET_OPEN);
  const reference = analyzer.textReference(text);

  return bracketOpenNode(reference, text);
}
