import {nothing} from '../../../../lib/core';
import {textResourceFrom} from '../../../../util/resource/text/text-resource';
import {syntaxParse} from '../../../syntax-parser';
import {$Node} from '../../node';
import {InfixNode} from '../../syntax/infix/infix-node';
import {PostfixNode} from '../../syntax/postfix/postfix-node';
import {OperatorNode} from './operator-node';

test('single operator', () => {
  const text = '!';
  const source = textResourceFrom(nothing, text);
  const syntax = syntaxParse(source);
  const statements = syntax.statements;
  const node = statements[0].item as OperatorNode;

  expect(statements.length).toBe(1);
  expect(node.text).toBe('!');
  expect(node.$).toBe($Node.OPERATOR);
});

test('after integer', () => {
  const text = '1!';
  const source = textResourceFrom(nothing, text);
  const syntax = syntaxParse(source);
  const statements = syntax.statements;
  const node = statements[0].item as PostfixNode;

  expect(statements.length).toBe(1);
  expect(node.$).toBe($Node.POSTFIX);
  expect(node.operator.text).toBe('!');
});

test('x + x', () => {
  const text = 'x is Number';
  const source = textResourceFrom(nothing, text);
  const syntax = syntaxParse(source);
  const statements = syntax.statements;
  const node = statements[0].item as InfixNode;

  expect(statements.length).toBe(1);
  expect(node.$).toBe($Node.INFIX);
  expect(node.operator.text).toBe('is');
});
