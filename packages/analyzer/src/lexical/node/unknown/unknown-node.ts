import {$LexicalNode, analyzerPackageType, LexicalNode, lexicalNode} from '#analyzer';
import {Text, TextReference} from '#common';
import {Brand} from '#typing';

export type UnknownNode = LexicalNode & Brand<'Core.UnknownNode'>;

export const $UnknownNode = analyzerPackageType<UnknownNode>('UnknownNode', $LexicalNode);

export function unknownNode(reference: TextReference, text: Text): UnknownNode {
  return lexicalNode({$: $UnknownNode, reference, text});
}
