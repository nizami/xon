import { Integer } from '~/lib/core';
import { Node, NodeType } from '~/node/node';
import { Source } from '~/parser/source/source';

export interface CommaNode extends Node {}

export function commaNode(startIndex: Integer, stopIndex: Integer): CommaNode {
  return {
    type: NodeType.COMMA,
    startIndex,
    stopIndex,
  };
}

const COMMA = ',';

export function scanCommaNode(source: Source, startIndex: Integer, stopIndex: Integer): CommaNode | null {
  if (source.text[startIndex] === COMMA) {
    return commaNode(startIndex, startIndex);
  }
  return null;
}
