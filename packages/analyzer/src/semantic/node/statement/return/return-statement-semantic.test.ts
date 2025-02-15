import {
  $ReturnNode,
  createSemanticAnalyzer,
  IntegerValueSemantic,
  ReturnNode,
  syntaxFromResource,
} from '#analyzer';
import {newText, newTextResource, nothing} from '#common';
import {expect, test} from 'vitest';

test('with value', () => {
  const text = newText(`return  3`);
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const semanticAnalyzer = createSemanticAnalyzer(syntax);

  const returnNode = semanticAnalyzer.statements.at(0)?.value as ReturnNode;
  expect(returnNode.$).toBe($ReturnNode());

  const idSemantic = returnNode.value?.semantic as IntegerValueSemantic;
  expect(idSemantic.type.value).toBe(3);
});
