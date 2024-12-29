import {newText, newTextResource, nothing, Text} from '#common';
import {
  $AttributeValueDeclarationSemantic,
  $ComplementTypeSemantic,
  $IdTypeSemantic,
  $ValueDeclarationSemantic,
  AttributeValueDeclarationSemantic,
  ComplementTypeSemantic,
  createSemanticAnalyzer,
  DeclarationNode,
  IdTypeSemantic,
  syntaxFromResource,
  typeNodeType,
  TypeSemantic,
} from '#core';
import {expect, test} from 'vitest';

test('a is integer or float', () => {
  const text = newText(`
    type Integer
    type Float

    const a: Integer \\ Float
  `);
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const semantic = createSemanticAnalyzer(syntax);

  expect(semantic.declarationManager.count()).toBe(3);
  expect(semantic.declarationManager.declarations.get(newText('a'))?.at2(0).$).toBe(
    $AttributeValueDeclarationSemantic,
  );
  expect(semantic.declarationManager.declarations.get(newText('a'))?.at2(0).name).toBe('a');

  const constNode = syntax.statements[2].value as DeclarationNode;
  expect(constNode.id?.text.toString()).toBe('a');
  expect(constNode.id?.semantic?.$).toBe($AttributeValueDeclarationSemantic);

  const idSemantic = constNode.id?.semantic as AttributeValueDeclarationSemantic;
  expect(idSemantic.name).toBe('a');

  const typeSemantic = constNode.type
    ? (typeNodeType(semantic, constNode.type) as ComplementTypeSemantic)
    : nothing;
  expect(typeSemantic?.$).toBe($ComplementTypeSemantic);
  expect(typeSemantic?.left.$).toBe($IdTypeSemantic);
  expect((typeSemantic?.left as IdTypeSemantic).declaration?.name).toBe('Integer');
  expect(typeSemantic?.right.$).toBe($IdTypeSemantic);
  expect((typeSemantic?.right as IdTypeSemantic).declaration?.name).toBe('Float');
});

test('check type', () => {
  const text = newText(`
    type Number
    type Integer: Number
    type Float: Number
    type String

    const a: Number \\ Float
    const b: Integer
    const c: Float
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

  expect(aType.$).toBe($ComplementTypeSemantic);
  expect(bType.$).toBe($IdTypeSemantic);
  expect(cType.$).toBe($IdTypeSemantic);

  expect(bType.is(aType)).toBe(true);
  expect(cType.is(aType)).toBe(false);
});
