import { DeclarationNode } from '../../../../../syntax/node/declaration/declaration-node';
import { parseSyntax } from '../../../../../syntax/syntax';
import { ConstantSemantic } from '../../../../declaration/constant/constant-semantic';
import { $Semantic, parseSemantic } from '../../../../semantic';
import { DeclarationTypeSemantic } from '../../declaration/declaration-type-semantic';
import { IntegerTypeSemantic } from '../integer/integer-type-semantic';
import { ArrayTypeSemantic } from './array-type-semantic';

test('a is array', () => {
  const text = `
    model Integer
    const a: Integer[3]
  `;
  const syntax = parseSyntax(text);
  const semantic = parseSemantic(syntax);

  expect(Object.keys(semantic.declarations).length).toBe(2);
  expect(semantic.declarations.a[0].$).toBe($Semantic.CONSTANT);
  expect(semantic.declarations.a[0].name).toBe('a');

  const constNode = syntax.statements[1].item as DeclarationNode;
  expect(constNode.id?.text).toBe('a');
  expect(constNode.id?.semantic?.$).toBe($Semantic.CONSTANT);

  const idSemantic = constNode.id?.semantic as ConstantSemantic;
  expect(idSemantic.name).toBe('a');

  const typeSemantic = constNode.type?.value?.semantic as ArrayTypeSemantic;
  expect(typeSemantic.$).toBe($Semantic.ARRAY_TYPE);
  expect(typeSemantic.type.$).toBe($Semantic.DECLARATION_TYPE);
  expect((typeSemantic.type as DeclarationTypeSemantic).declaration.name).toBe('Integer');
  expect(typeSemantic.size?.$).toBe($Semantic.INTEGER_TYPE);
  expect((typeSemantic.size as IntegerTypeSemantic).value).toBe(3);
});
