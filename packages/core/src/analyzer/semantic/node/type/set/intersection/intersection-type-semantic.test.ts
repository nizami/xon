import {newText, newTextResource, nothing, Text} from '#common';
import {
  $AttributeValueDeclarationSemantic,
  $IdTypeSemantic,
  $IntersectionTypeSemantic,
  $ValueDeclarationSemantic,
  AttributeValueDeclarationSemantic,
  createSemanticAnalyzer,
  DeclarationNode,
  IdTypeSemantic,
  IntersectionTypeSemantic,
  syntaxFromResource,
  typeNodeType,
  TypeSemantic,
} from '#core';
import {expect, test} from 'vitest';

test('a is integer', () => {
  const text = newText(`
    type Integer
    type Float

    const a: Integer & Float
  `);
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const semantic = createSemanticAnalyzer(syntax);

  expect(semantic.declarationManager.count()).toBe(3);
  expect(semantic.declarationManager.declarations.get(newText('a'))?.at2(0).$).toBe(
    $AttributeValueDeclarationSemantic,
  );
  expect(semantic.declarationManager.declarations.get(newText('a'))?.at2(0).name.toNativeString()).toBe('a');

  const constNode = syntax.statements.at(2)?.value as DeclarationNode;
  expect(constNode.id?.text.toNativeString()).toBe('a');
  expect(constNode.id?.semantic?.$.toNativeString()).toBe(
    $AttributeValueDeclarationSemantic.toNativeString(),
  );

  const idSemantic = constNode.id?.semantic as AttributeValueDeclarationSemantic;
  expect(idSemantic.name.toNativeString()).toBe('a');

  const typeSemantic = constNode.type
    ? (typeNodeType(semantic, constNode.type) as IntersectionTypeSemantic)
    : nothing;
  expect(typeSemantic?.$).toBe($IntersectionTypeSemantic);
  expect(typeSemantic?.left.$).toBe($IdTypeSemantic);
  expect((typeSemantic?.left as IdTypeSemantic).declaration?.name.toNativeString()).toBe('Integer');
  expect(typeSemantic?.right.$).toBe($IdTypeSemantic);
  expect((typeSemantic?.right as IdTypeSemantic).declaration?.name.toNativeString()).toBe('Float');
});

test('check type', () => {
  const text = newText(`
    type Number
    type Integer: Number
    type Float: Number
    type String

    const a: Number & Float
    const b: Float
    const c: String
  `);
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const semantic = createSemanticAnalyzer(syntax);

  const getConst = (name: Text) =>
    (
      semantic.declarationManager.find(
        $ValueDeclarationSemantic,
        name,
        nothing,
        nothing,
      ) as AttributeValueDeclarationSemantic
    ).type as TypeSemantic;

  const aType = getConst(newText('a'));
  const bType = getConst(newText('b'));
  const cType = getConst(newText('c'));

  expect(aType.$.toNativeString()).toBe($IntersectionTypeSemantic.toNativeString());
  expect(bType.$.toNativeString()).toBe($IdTypeSemantic.toNativeString());
  expect(cType.$.toNativeString()).toBe($IdTypeSemantic.toNativeString());

  expect(bType.is(aType)).toBe(true);
  expect(cType.is(aType)).toBe(false);
});
