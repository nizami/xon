import { AbstractAttributeTree } from '../../../tree/attribute/abstract/abstract-attribute-tree';
import { AttributeTree } from '../../../tree/attribute/attribute-node';
import { MethodAttributeNode } from '../../../tree/attribute/method/method-attribute-node';
import { ObjectAttributeNode } from '../../../tree/attribute/object/object-attribute-node';
import { ValueAttributeNode } from '../../../tree/attribute/value/value-attribute-node';
import { DeclarationScope } from '../../declaration-scope';
import { AbstractAttributeMetadata } from './abstract/abstract-attribute-metadata';
import { AttributeMetadata } from './attribute-metadata';
import { MethodAttributeMetadata } from './method/method-attribute-metadata';
import { ObjectAttributeMetadata } from './object/object-attribute-metadata';
import { ValueAttributeMetadata } from './value/value-attribute-metadata';

export function getAttributeMetadata(
  tree: AttributeTree,
  scope: DeclarationScope,
): AttributeMetadata {
  if (tree instanceof AbstractAttributeTree) return new AbstractAttributeMetadata(tree, scope);
  if (tree instanceof ObjectAttributeNode) return new ObjectAttributeMetadata(tree, scope);
  if (tree instanceof ValueAttributeNode) return new ValueAttributeMetadata(tree, scope);
  if (tree instanceof MethodAttributeNode) return new MethodAttributeMetadata(tree, scope);

  throw Error(`Attribute metadata not found for "${tree.constructor.name}"`);
}
