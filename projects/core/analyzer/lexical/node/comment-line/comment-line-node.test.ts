import {$Node} from '../../../../$';
import {nothing} from '../../../../../lib/types';
import {textResourceFrom} from '../../../../util/resource/text/text-resource';
import {syntaxFromResource} from '../../../syntax/syntax-analyzer';
import {CommentLineNode} from './comment-line-node';

test('line comment', () => {
  const text = '// abc';
  const source = textResourceFrom(nothing, text);
  const syntax = syntaxFromResource(source);
  const statements = syntax.statements;
  const node = syntax.hiddenNodes[0] as CommentLineNode;

  expect(statements.length).toBe(0);
  expect(syntax.hiddenNodes.length).toBe(1);
  expect(node.$).toBe($Node.CommentLineNode);
  expect(node.text).toBe('// abc');
});
