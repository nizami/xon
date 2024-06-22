import {Nothing, String2} from '../../../../../lib/types';
import {TextRange} from '../../../../util/resource/text/text-range';
import {Semantic} from '../../../semantic/semantic';
import {$Node} from '../../../syntax/node';
import {TokenNode, tokenNode} from '../token-node';

export type DocumentationLabelNode = TokenNode<$Node.DOCUMENTATION_LABEL> & {
  semantic?: Semantic | Nothing;
};

export function documentationLabelNode(range: TextRange, text: String2): DocumentationLabelNode {
  return tokenNode({$: $Node.DOCUMENTATION_LABEL, range, text});
}
