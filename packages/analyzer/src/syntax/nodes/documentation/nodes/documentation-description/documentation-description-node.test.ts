import {
  $DocumentationDescriptionNode,
  newAnalyzerContext,
  newCharacterStreamFromText,
  parseDocumentationDescriptionNode,
} from '#analyzer';
import {newText} from '#common';
import {is} from '#typing';
import {expect, test} from 'vitest';

test('description before close', () => {
  const text = newText('abc===');
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const node = parseDocumentationDescriptionNode(context);

  expect(is(node, $DocumentationDescriptionNode)).toBe(true);
  expect(node?.text.toNativeString()).toBe('abc');
  expect(node?.range.start.index).toBe(0);
  expect(node?.range.stop.index).toBe(3);
});

test('empty description', () => {
  const text = newText('===');
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const node = parseDocumentationDescriptionNode(context);

  expect(node).toBeFalsy();
});
