import { SourceTree } from '../../tree/source/source-tree';
import { DeclarationScope } from '../declaration/scope/declaration-scope';
import { SourceMetadata } from './source-metadata';

export function getSourceMetadata(
  tree: SourceTree,
  scope: DeclarationScope,
  deepRun = true,
): SourceMetadata {
  return new SourceMetadata(tree, scope, deepRun);
}
