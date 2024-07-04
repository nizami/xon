import {$Node} from '../../../../$';
import {TextResourceRange} from '../../../../util/resource/text/text-resource-range';
import {SemanticAnalyzer} from '../../semantic-analyzer';
import {DeclarationSemantic} from '../declaration/declaration-semantic';
import {SemanticNode} from '../semantic-node';

export interface DocumentationIdSemantic extends SemanticNode {
  $: $Node.DocumentationIdSemantic;
  declaration: DeclarationSemantic;
}

export function documentationIdSemantic(
  analyzer: SemanticAnalyzer,
  reference: TextResourceRange,
  declaration: DeclarationSemantic,
): DocumentationIdSemantic {
  return {
    $: $Node.DocumentationIdSemantic,
    reference,
    declaration,
  };
}
