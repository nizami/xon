import {$PostfixNode, PostfixNode, syntaxFromResource} from '#analyzer';
import {newText, newTextResource, nothing} from '#common';
import {evaluate} from '#interpreter';
import {expect, test} from 'vitest';

test('after integer', () => {
  const text = newText('1!');
  const source = newTextResource(nothing, text);
  const syntax = syntaxFromResource(source);
  const statements = syntax.statements;
  const node = statements.at(0)?.value as PostfixNode;

  expect(statements.count()).toBe(1);
  expect(node.$).toBe($PostfixNode);
  expect(node.operator.text.toNativeString()).toBe('!');
  expect(evaluate(node.value)).toBe(1);
});
