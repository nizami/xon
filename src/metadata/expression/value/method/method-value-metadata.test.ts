import { TestDeclarationScope } from '@/metadata/declaration/scope/test-declaration-scope';
import { MethodTypeMetadata } from '@/metadata/expression/type/method/method-type-metadata';
import { MethodValueMetadata } from '@/metadata/expression/value/method/method-value-metadata';
import { fillValueMetadata } from '@/metadata/expression/value/value-metadata-helper';
import { parseExpression } from '@/util/parse';

test('lambda', () => {
  const code = '(x: Number) => x + x';
  const tree = parseExpression(code);
  tree.scope.parent = new TestDeclarationScope();
  const metadata = fillValueMetadata(tree);

  expect(metadata).toBeInstanceOf(MethodValueMetadata);
  const type = metadata.type() as MethodTypeMetadata;
  expect(type).toBeInstanceOf(MethodTypeMetadata);
  expect(type.parameters.length).toBe(1);
  expect(type.parameters[0].name).toBe('x');
  expect(type.parameters[0].type.is(tree.scope.core.number.type)).toBe(true);
  expect(type.resultType.is(tree.scope.core.number.type)).toBe(true);
});
