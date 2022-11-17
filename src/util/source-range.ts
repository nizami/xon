import { ParserRuleContext, Token } from 'antlr4ts';
import { Boolean2, String2 } from '~/lib/core';
import { defaultLinePosition, LinePosition } from '~/util/line-position';

export class SourceRange {
  sourceName: String2 | null = null;
  rangeText: String2 = '';
  sourceText: String2 = '';
  start: LinePosition = defaultLinePosition;
  stop: LinePosition = defaultLinePosition;

  equals(other: SourceRange): Boolean2 {
    return this.sourceName === other.sourceName && this.start.index === other.start.index;
  }

  toString(): String2 {
    return this.rangeText;
  }

  static fromContext(context: ParserRuleContext): SourceRange {
    return SourceRange.fromTwoTokens(context.start, context.stop ?? null);
  }

  static fromToken(token: Token): SourceRange {
    return SourceRange.fromTwoTokens(token, token);
  }

  static fromTwoTokens(start: Token, stop: Token | null): SourceRange {
    const ref = new SourceRange();
    ref.sourceName = start.inputStream?.sourceName ?? null;
    ref.start = new LinePosition(start.line, start.charPositionInLine + 1, start.startIndex);
    ref.stop = stop
      ? new LinePosition(
        stop.line,
        stop.charPositionInLine + (stop.stopIndex - stop.startIndex) + 1,
        stop.stopIndex,
      )
      : defaultLinePosition;
    ref.sourceText = String(start.inputStream);
    ref.rangeText = ref.sourceText.slice(ref.start.index, ref.stop.index + 1);
    return ref;
  }

  static fromTwoRange(start: SourceRange, stop: SourceRange): SourceRange {
    const ref = new SourceRange();
    ref.sourceName = start.sourceName;
    ref.start = new LinePosition(start.start.line, start.start.column, start.start.index);
    ref.stop = new LinePosition(stop.stop.line, stop.stop.column, stop.stop.index);
    ref.sourceText = start.sourceText;
    ref.rangeText = ref.sourceText.slice(ref.start.index, ref.stop.index + 1);
    return ref;
  }
}
