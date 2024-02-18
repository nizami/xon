import { parseSyntax } from '../../syntax';
import { is } from '../../util/is';
import { GroupNode } from '../group/group-node';
import { InfixNode } from '../infix/infix-node';
import { IntegerNode } from '../integer/integer-node';
import { $Node } from '../node';

test('empty object', () => {
  const text = '{}';
  const nodes = parseSyntax(text).statements.map((x) => x.item);
  const tree = nodes[0];

  expect(nodes.length).toBe(1);

  expect(tree.$).toBe($Node.OBJECT);
});

test('single item', () => {
  const text = '[123 456]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(1);
  expect((group.items[0] as IntegerNode).text).toBe('123');
});

test('single comma', () => {
  const text = '[,]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(is(group.open, $Node.OPEN)).toBe(true);
  expect(is(group.close, $Node.CLOSE)).toBe(true);
  expect(group.items.length).toBe(0);
});

test('empty not closed', () => {
  const text = '[';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(is(group.open, $Node.OPEN)).toBe(true);
  expect(group.close).toBe(null);
  expect(group.items.length).toBe(0);
});

test('inner group', () => {
  const text = '[()]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(1);

  const innerGroup = group.items[0] as GroupNode;
  expect(is(innerGroup, $Node.GROUP)).toBe(true);
  expect(innerGroup.items.length).toBe(0);
});

test('inner empty group', () => {
  const text = '[[[]]]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(1);

  const innerGroup = group.items[0] as GroupNode;
  expect(is(innerGroup, $Node.ARRAY)).toBe(true);
  expect(innerGroup.items.length).toBe(1);

  const innerInnerGroup = innerGroup.items[0] as GroupNode;
  expect(is(innerInnerGroup, $Node.ARRAY)).toBe(true);
  expect(innerInnerGroup.items.length).toBe(0);
});

test('two integers no comma and ws at the end', () => {
  const text = '[1, 2]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(2);
  expect((group.items[0] as IntegerNode).text).toBe('1');
  expect((group.items[1] as IntegerNode).text).toBe('2');
});

test('two integers and comma no ws at the end', () => {
  const text = '[1, 2,]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(2);
  expect((group.items[0] as IntegerNode).text).toBe('1');
  expect((group.items[1] as IntegerNode).text).toBe('2');
});

test('two integers and comma and ws', () => {
  const text = '[1, 2, ]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(2);
  expect((group.items[0] as IntegerNode).text).toBe('1');
  expect((group.items[1] as IntegerNode).text).toBe('2');
});

test('array on several lines', () => {
  const text = `[1,
                2+2
                3,
     4,    6+6]`;
  const context = parseSyntax(text);
  const nodes = context.statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(4);
  expect((group.items[0] as IntegerNode).text).toBe('1');
  expect((group.items[1] as InfixNode).operator.text).toBe('+');
});

test('debug 1', () => {
  const text = '[1, , 2 ]';
  const nodes = parseSyntax(text).statements.map((x) => x.item);

  expect(nodes.length).toBe(1);

  const group = nodes[0] as GroupNode;
  expect(is(group, $Node.ARRAY)).toBe(true);
  expect(group.items.length).toBe(2);
  expect((group.items[0] as IntegerNode).text).toBe('1');
  expect((group.items[1] as IntegerNode).text).toBe('2');
});
