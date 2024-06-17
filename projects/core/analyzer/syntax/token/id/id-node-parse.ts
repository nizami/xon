import {Integer, Nothing, nothing} from '../../../../../lib/types';
import {UNDERSCORE} from '../../../lexical/lexical-config';
import {SyntaxContext} from '../../../syntax-context';
import {IdNode, idNode} from './id-node';

export function idNodeParse(context: SyntaxContext, index: Integer): IdNode | Nothing {
  if (!context.checkLexemeAtIndex(UNDERSCORE, index) && !context.resource.data.isLetter(index)) {
    return nothing;
  }

  const text = context.resource.data.takeWhile(
    (x, i) => x === UNDERSCORE || context.resource.data.isLetterOrDigit(i),
    index,
  );

  const range = context.getRange(text.length);

  return idNode(range, text);
}
