import { parseCode } from '../../../test-helper';
import { IndexExpressionTree } from './index-expression.tree';
import { MemberExpressionTree } from '../member-expression/member-expression.tree';
import { StringLiteralExpressionTree } from '../string-literal-expression/string-literal-expression.tree';
import { AddSubExpressionTree } from '../add-sub-expression/add-sub-expression.tree';

test('string expression index', () => {
    const code = 'some_object.prop["ppp"]';
    const tree = parseCode(code, IndexExpressionTree);
    expect(tree.value).toBeInstanceOf(MemberExpressionTree);
    expect(tree.index).toBeInstanceOf(StringLiteralExpressionTree);
});

test('integer expression index', () => {
    const code = 'some_object.prop[12+33]';
    const tree = parseCode(code, IndexExpressionTree);
    expect(tree.value).toBeInstanceOf(MemberExpressionTree);
    expect(tree.index).toBeInstanceOf(AddSubExpressionTree);
});
