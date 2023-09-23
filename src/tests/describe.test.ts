import { expect, test } from 'vitest';
import { describe } from 'src/utils/math';

/*
 * это немного, но это честная работа
 * */

const cases = [
  {
    data: [],
    result: { max: -Infinity, min: +Infinity, mean: NaN, std: NaN, disp: NaN },
  },
  {
    data: [1],
    result: { max: 1, min: 1, mean: 1, std: 0, disp: 0 },
  },
  {
    data: [1, 1, 1],
    result: { max: 1, min: 1, mean: 1, std: 0, disp: 0 },
  },
  {
    data: [1, 2, 3, 4, 5],
    result: { max: 5, min: 1, std: 1.4142135623730951, mean: 3, disp: 2 },
  },
];

test('stats [] to equal { max: -Infinity, min: +Infinity, mean: NaN, std: 0, disp: 0 }', () => {
  expect(describe(cases[0].data)).toStrictEqual(cases[0].result);
});

test('stats [1] to equal { max: 1, min: 1, mean: 1, std: 0, disp: 0 }', () => {
  expect(describe(cases[1].data)).toStrictEqual(cases[1].result);
});

test('stats [1, 1, 1] to equal { max: 1, min: 1, mean: 1, std: 0, disp: 0 }', () => {
  expect(describe(cases[2].data)).toStrictEqual(cases[2].result);
});

test('stats [1, 2, 3, 4, 5] to equal {max: 5, min: 1, std: 1.4142135623730951, mean: 3, disp: 2}', () => {
  expect(describe(cases[3].data)).toStrictEqual(cases[3].result);
});
