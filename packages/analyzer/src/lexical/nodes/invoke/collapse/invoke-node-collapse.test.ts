import {
  $GroupNode,
  $IdNode,
  $InvokeNode,
  IdNode,
  InvokeNode,
  newAnalyzerContext,
  newCharacterStreamFromText,
  parseStatements,
} from '#analyzer';
import {newText, Text} from '#common';
import {is} from '#typing';
import {expect, test} from 'vitest';

test('member with id instance', () => {
  const text = newText("f(3, 'str')");
  const node = parseInvokeNode(text);

  expect(is(node.instance, $IdNode)).toBe(true);
  expect((node.instance as IdNode).text.toNativeString()).toBe('f');
  expect(is(node.group, $GroupNode)).toBe(true);
  expect(node.group.items.count()).toBe(2);
});

// test('method call', () => {
//   const text = newText("f(3, 'str')");
//   const source = newTextResource(nothing, text);
//   const syntax = syntaxFromResource(source);
//   const statements = syntax.statements;
//   const node = statements.at(0)?.value as InvokeNode;

//   expect(statements.count()).toBe(1);
//   expect(node.$).toBe($InvokeNode);
//   expect(node.group.items.count()).toBe(2);
//   expect(node.group.items.at(0)?.value?.$).toBe($IntegerNode);
//   expect((node.group.items.at(0)?.value as IntegerNode).content.text.toNativeString()).toBe('3');
//   expect(node.group.items.at(1)?.value?.$).toBe($CharacterNode);
//   expect((node.group.items.at(1)?.value as StringNode).content?.text.toNativeString()).toBe('str');
//   expect(node.instance.$).toBe($IdNode);
// });

// test('method on several lines', () => {
//   const text = newText(`f[3,
//         'str', 123,
//     415]`);
//   const source = newTextResource(nothing, text);
//   const syntax = syntaxFromResource(source);
//   const statements = syntax.statements;
//   const node = statements.at(0)?.value as InvokeNode;

//   expect(statements.count()).toBe(1);
//   expect(node.$).toBe($InvokeNode);
//   expect(node.group.items.count()).toBe(4);
//   const indexer1 = node.group.items.at(0)?.value;
//   const indexer2 = node.group.items.at(1)?.value;
//   expect(indexer1?.$).toBe($IntegerNode);
//   expect(indexer2?.$).toBe($CharacterNode);
//   expect(node.instance.$).toBe($IdNode);
// });

// test('can call with type parameter', () => {
//   const text = newText('a.get [1]');
//   const source = newTextResource(nothing, text);
//   const syntax = syntaxFromResource(source);
//   const statements = syntax.statements;
//   const node = statements.at(0)?.value as InvokeNode;

//   expect(statements.count()).toBe(1);
//   expect(node.$).toBe($InvokeNode);
//   expect(node.group.items.count()).toBe(1);
//   expect((node.group.items.at(0)?.value as IntegerNode).content.text.toNativeString()).toBe('1');
//   expect(node.instance.$).toBe($MemberNode);
//   const {operator, instance, id} = node.instance as MemberNode;
//   expect(operator.text.toNativeString()).toBe('.');
//   expect((instance as IdNode).text.toNativeString()).toBe('a');
//   expect((id as IdNode).text.toNativeString()).toBe('get');
// });

// test('object method', () => {
//   const text = newText('{a, b}.call()');
//   const source = newTextResource(nothing, text);
//   const syntax = syntaxFromResource(source);
//   const statements = syntax.statements;
//   const node = statements.at(0)?.value as InvokeNode;

//   expect(statements.count()).toBe(1);
//   expect(node.$).toBe($InvokeNode);
//   expect(node.group.items.count()).toBe(0);
//   expect(node.instance.$).toBe($MemberNode);
//   const {operator, instance, id} = node.instance as MemberNode;
//   expect(operator.text.toNativeString()).toBe('.');
//   const leftParameters = (instance as GroupNode).items;
//   expect(leftParameters.count()).toBe(2);
//   expect((leftParameters.at(0)?.value as IdNode).text.toNativeString()).toBe('a');
//   expect((leftParameters.at(1)?.value as IdNode).text.toNativeString()).toBe('b');
//   expect((id as IdNode).text.toNativeString()).toBe('call');
// });

// test('generics', () => {
//   const text = newText('Animal{T}');
//   const source = newTextResource(nothing, text);
//   const syntax = syntaxFromResource(source);
//   const statements = syntax.statements;
//   const node = statements.at(0)?.value as InvokeNode;

//   expect(statements.count()).toBe(1);
//   expect(node.$).toBe($InvokeNode);
//   expect(node.group.items.count()).toBe(1);
//   expect(node.instance.$).toBe($IdNode);
//   expect((node.instance as IdNode).text.toNativeString()).toBe('Animal');
// });

function parseInvokeNode(text: Text): InvokeNode {
  const source = newCharacterStreamFromText(text);
  const context = newAnalyzerContext(source);
  const statements = parseStatements(context).statements;
  const node = statements.first()?.value as InvokeNode;

  expect(node).toBeTruthy();
  expect(is(node, $InvokeNode)).toBe(true);

  return node;
}
