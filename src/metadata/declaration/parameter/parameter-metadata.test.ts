import { ParameterTree } from '../../../tree/parameter/parameter-tree';
import { DeclarationStatementTree } from '../../../tree/statement/declaration/declaration-statement-tree';
import { parseSource } from '../../../util/parse';
import { LiteralTypeMetadata } from '../../expression/type/literal/literal-type-metadata';
import { TypeMetadata } from '../../expression/type/type-metadata';
import { ValueMetadata } from '../../expression/value/value-metadata';
import { SourceMetadata } from '../../source/source-metadata';
import { getSourceMetadata } from '../../source/source-metadata-helper';
import { TestDeclarationScope } from '../scope/test-declaration-scope';
import { ParameterMetadata } from './parameter-metadata';

test('single parameter', () => {
  const code = 'a: Number =  132';
  const tree = parseSource(code);
  const scope = new TestDeclarationScope();
  const metadata = getSourceMetadata(tree, scope);

  expect(metadata).toBeInstanceOf(SourceMetadata);
  expect(scope.declarations.length).toBe(1);
  expect(scope.filter('a')[0].name).toBe('a');

  const parameter = (tree.statements[0] as DeclarationStatementTree).declaration as ParameterTree;
  const valueType = (parameter.value.metadata as ValueMetadata).type() as LiteralTypeMetadata;
  expect(valueType.definition.name).toBe('Integer');
  expect(valueType.is(scope.core.number.type)).toBe(true);
  expect((parameter.type.metadata as TypeMetadata).equals(scope.core.number.type)).toBe(true);
});

test('multiple parameters array value', () => {
  const code = "[a, b, c] := [1,'hi',2.3]";
  const tree = parseSource(code);
  const scope = new TestDeclarationScope();
  const metadata = getSourceMetadata(tree, scope);

  expect(metadata).toBeInstanceOf(SourceMetadata);
  expect(scope.declarations.length).toBe(3);

  expect(scope.filter('a')[0].name).toBe('a');
  expect(scope.filter('a')[0]).toBeInstanceOf(ParameterMetadata);
  expect(scope.filter('a')[0].type).toBeInstanceOf(LiteralTypeMetadata);
  expect(scope.filter('a')[0].type.equals(new LiteralTypeMetadata(1, scope.core.integer))).toBe(
    true,
  );

  expect(scope.filter('b')[0].name).toBe('b');
  expect(scope.filter('b')[0].type.equals(new LiteralTypeMetadata('hi', scope.core.string))).toBe(
    true,
  );

  expect(scope.filter('c')[0].name).toBe('c');
  expect(scope.filter('c')[0].type.equals(new LiteralTypeMetadata(2.3, scope.core.float))).toBe(
    true,
  );
});

test('multiple parameters object value', () => {
  const code = "{a, b, c} := {a=1,b='hi',c=2.3}";
  const tree = parseSource(code);
  const scope = new TestDeclarationScope();
  const metadata = getSourceMetadata(tree, scope);

  expect(metadata).toBeInstanceOf(SourceMetadata);
  expect(scope.declarations.length).toBe(3);

  expect(scope.filter('a')[0].name).toBe('a');
  expect(scope.filter('a')[0]).toBeInstanceOf(ParameterMetadata);
  expect(scope.filter('a')[0].type).toBeInstanceOf(LiteralTypeMetadata);
  expect(scope.filter('a')[0].type.equals(new LiteralTypeMetadata(1, scope.core.integer))).toBe(
    true,
  );

  expect(scope.filter('b')[0].name).toBe('b');
  expect(scope.filter('b')[0].type.equals(new LiteralTypeMetadata('hi', scope.core.string))).toBe(
    true,
  );

  expect(scope.filter('c')[0].name).toBe('c');
  expect(scope.filter('c')[0].type.equals(new LiteralTypeMetadata(2.3, scope.core.float))).toBe(
    true,
  );
});
