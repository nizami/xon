import {newAnalyzerContext, newCharacterStreamFromText, parseStringNode} from '#analyzer';
import {ArrayData, newText, Text} from '#common';
import {AnalyzerDiagnostic} from '#diagnostic';
import {expect, test} from 'vitest';

test('String has no errors', () => {
  const text = newText('"abc"');
  const diagnostics = stringNodeDiagnostics(text);

  expect(diagnostics.count()).toBe(0);
});

test('Expect close token', () => {
  const text = newText('"abc');
  const diagnostics = stringNodeDiagnostics(text);

  expect(diagnostics.count()).toBe(1);
  expect(diagnostics.first()?.message.toNativeString()).toBe('Expect close token');
});

function stringNodeDiagnostics(text: Text): ArrayData<AnalyzerDiagnostic> {
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const node = parseStringNode(context);

  return node!.diagnose!();
}
