import { Token } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { String2 } from '~/lib/core';
import { DeclarationMetadata } from '~/metadata/declaration/declaration-metadata';
import { SourceSpan } from '~/source/source-span';
import { Tree } from '~/tree/tree';

export class IdTree extends Tree {
  sourceSpan: SourceSpan;
  metadata: DeclarationMetadata | null = null;
  text: String2;

  constructor(token: Token | TerminalNode) {
    super();
    if (token instanceof TerminalNode) {
      this.sourceSpan = SourceSpan.fromToken(token.payload);
    } else {
      this.sourceSpan = SourceSpan.fromToken(token);
    }
    this.text = token.text ?? '';
  }

  toString(): String2 {
    return this.text;
  }
}
