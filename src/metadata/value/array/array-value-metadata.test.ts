import { parseExpression } from '../../../util/parse';
import { TestDeclarationScope } from '../../declaration/scope/test-declaration-scope';
import { getValueMetadata } from '../value-metadata-helper';
import { ArrayValueMetadata } from './array-value-metadata';

test('empty', () => {
  const code = '[]';
  const tree = parseExpression(code);
  const scope = new TestDeclarationScope();
  const metadata = getValueMetadata(tree, scope);

  expect(metadata).toBeInstanceOf(ArrayValueMetadata);
  expect(metadata.type().equals(scope.core.array.type())).toBe(true);
});

test('123', () => {
  const code = '[1, 2, 3]';
  const tree = parseExpression(code);
  const scope = new TestDeclarationScope();
  const metadata = getValueMetadata(tree, scope);

  expect(metadata).toBeInstanceOf(ArrayValueMetadata);
  expect(metadata.type().equals(scope.core.array.type())).toBe(true);
});
