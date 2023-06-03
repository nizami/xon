import { LexicalAnalysis } from '~/analysis/lexical/lexical-analysis';
import { LexicalNode } from '~/analysis/lexical/lexical-node';
import { NodeType } from '~/analysis/node';
import { Integer, String2 } from '~/lib/core';

export interface JoiningNode extends LexicalNode {
  $: NodeType.JOINING;
}

export function joiningNode(start: Integer, stop: Integer, text: String2): JoiningNode {
  return {
    $: NodeType.JOINING,
    start,
    stop,
    text,
  };
}

const JOINING = '\\';
const AFTER_JOINING = ' \t\n\r';

export function scanJoiningNode({ text, index }: LexicalAnalysis): JoiningNode | null {
  if (text[index] !== JOINING) {
    return null;
  }

  let nextIndex = index;

  for (let i = index + 1; i < text.length; i++) {
    if (!AFTER_JOINING.includes(text[i])) {
      break;
    }
    nextIndex = i;
  }

  return joiningNode(index, nextIndex, text.slice(index, nextIndex + 1));
}
