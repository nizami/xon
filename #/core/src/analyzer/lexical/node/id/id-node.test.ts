import {newText, newTextResource, nothing} from '#common';
import {$IdNode, IdNode, predefinedDiagnostics, syntaxFromResource} from '#core';

test('single id', () => {
  const text = newText('abc');
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const statements = syntax.statements;
  const node = statements[0].value as IdNode;

  expect(statements.length).toBe(1);
  expect(node.text.toString()).toBe('abc');
  expect(node.$).toBe($IdNode);
});

test('several id', () => {
  const text = newText('abc edf_    _ghi1_23');
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const statements = syntax.statements;
  const node = statements[0].value as IdNode;

  expect(statements.length).toBe(1);
  expect(node.text.toString()).toBe('abc');
  expect(node.$).toBe($IdNode);

  expect(syntax.diagnosticManager.diagnostics.length).toBe(2);

  const diagnosticMessage = predefinedDiagnostics(node.reference).unexpectedExpression().message;

  expect(syntax.diagnosticManager.diagnostics[0].message.actual).toBe(diagnosticMessage.actual);
  expect(syntax.diagnosticManager.diagnostics[1].message.actual).toBe(diagnosticMessage.actual);
});
