import {Text, TextReference} from '#common';
import {$LexicalNode, corePackageType, LexicalNode, lexicalNode} from '#core';
import {Brand} from '#typing';

export type CharContentNode = LexicalNode & Brand<'Core.CharContentNode'>;

export const $CharContentNode = corePackageType<CharContentNode>('CharContentNode', $LexicalNode);

export function charContentNode(reference: TextReference, text: Text): CharContentNode {
  return lexicalNode({$: $CharContentNode, reference, text});
}
