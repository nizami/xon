import { parse } from '../../../parse';
import { FunctionTree } from '../../function/function.tree';
import { SimpleTypeTree } from '../simple-type/simple-type.tree';
import { ArrayTypeTree } from './array-type.tree';

test('one arg', () => {
    const code = 'f(a num[]): log\n';
    const tree = new FunctionTree(parse(code).function());
    expect(tree.name).toBe('f');
    expect(tree.args.length).toBe(1);
    expect(tree.args[0].name).toBe('a');
    const arrayType = tree.args[0].type as ArrayTypeTree;
    expect(arrayType).toBeInstanceOf(ArrayTypeTree);
    const simpleType = arrayType.baseType as SimpleTypeTree;
    expect(simpleType.name).toBe('num');
});
