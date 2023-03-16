import { Char, Integer, String2 } from '~/lib/core';
import { NodeType, TokenNode } from '~/node/node';

export interface NlNode extends TokenNode {
  type: NodeType.NL;
}

export function nlNode(start: Integer, stop: Integer, text: String2): NlNode {
  return {
    type: NodeType.NL,
    start,
    stop,
    text,
  };
}

const LF = '\n';
const CR = '\r';

export function scanNlNode(chars: Char[], index: Integer): NlNode | null {
  if (chars[index] === LF) {
    return nlNode(index, index, LF);
  }
  if (chars[index] === CR) {
    if (chars[index + 1] === LF) {
      return nlNode(index, index + 1, CR + LF);
    }
    return nlNode(index, index, CR);
  }

  return null;
}
