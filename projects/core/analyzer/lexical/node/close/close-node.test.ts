import {nothing} from '../../../../../lib/types';
import {textResourceFrom} from '../../../../util/resource/text/text-resource';
import {$Node} from '../../../node';
import {syntaxParse} from '../../../syntax/syntax-analyzer';
import {CloseNode} from './close-node';

test('close paren', () => {
  const text = ')';
  const source = textResourceFrom(nothing, text);
  const syntax = syntaxParse(source);
  const statements = syntax.statements;
  const node = statements[0].value as CloseNode;

  expect(statements.length).toBe(1);
  expect(node.$).toBe($Node.CLOSE);
  expect(node.text).toBe(')');
});
