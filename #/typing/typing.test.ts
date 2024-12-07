import {is_v2} from '#common';
import {$TextA, $TextB, newTextA, newTextB} from '#typing';

test('0', () => {
  const a = newTextA();
  const b = newTextB(a);
  expect(is_v2(a, $TextA)).toBe(true);
  expect(is_v2(b, $TextB())).toBe(true);
  expect(is_v2(b, $TextB($TextA))).toBe(true);
  // expect(is_v2(b, $TextB($SomeA()))).toBe(true);
  expect(is_v2(b, $TextA)).toBe(true);
});
