import {
  $CommentBlockNode,
  newAnalyzerContext,
  newCharacterStreamFromText,
  parseCommentBlockNode,
} from '#analyzer';
import {newText} from '#common';
import {is} from '#typing';
import {expect, test} from 'vitest';

test('block comment', () => {
  const text = newText('---   abc ---');
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const node = parseCommentBlockNode(context);

  expect(is(node, $CommentBlockNode)).toBe(true);
  expect(node?.contentNode?.text.toNativeString()).toBe('   abc ');
  expect(node?.contentNode?.range.start.index).toBe(3);
  expect(node?.contentNode?.range.stop.index).toBe(10);
});
