import {Text, TextReference} from '#common';
import {$OpenNode, OpenNode, corePackageType, lexicalNode} from '#core';
import {Brand} from '#typing';

export type CharOpenNode = OpenNode & Brand<'Core.CharOpenNode'>;

export const $CharOpenNode = corePackageType<CharOpenNode>('CharOpenNode', $OpenNode);

export function charOpenNode(reference: TextReference, text: Text): CharOpenNode {
  return lexicalNode({$: $CharOpenNode, reference, text});
}
