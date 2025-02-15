import {$AnalyzerType, $ValueSemantic, Node, TypeSemantic, ValueSemantic} from '#analyzer';
import {Nothing, Text} from '#common';

export type MemberValueSemantic = ValueSemantic & {
  instance: ValueSemantic;
  name: Text | Nothing;
};

export const $MemberValueSemantic = () =>
  $AnalyzerType<MemberValueSemantic>('MemberValueSemantic', $ValueSemantic());

export function memberValueSemantic(
  nodeLink: Node,
  instance: ValueSemantic,
  name: Text | Nothing,
  type: TypeSemantic,
): MemberValueSemantic {
  return {
    $: $MemberValueSemantic(),
    nodeLink,
    instance,
    name,
    type,
  };
}
