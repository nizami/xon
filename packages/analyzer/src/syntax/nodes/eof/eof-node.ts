import {$LexicalNode, analyzerPackageType, LexicalNode} from '#analyzer';
import {newText, TextRange} from '#common';
import {Brand} from '#typing';

export type EofNode = LexicalNode & Brand<'Analyzer.EofNode'>;

export const $EofNode = analyzerPackageType<EofNode>('EofNode', $LexicalNode);

export function newEofNode(range: TextRange): EofNode {
  return {
    $: $EofNode,
    text: newText(),
    range,
  };
}
