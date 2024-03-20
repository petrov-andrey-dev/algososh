
import { ElementStates } from '../../types/element-states';
import { reverseString } from './strung.utils';

describe('Функция reverseString', () => {
  it('разворот строки с четным количеством символов', async () => {
    const array = 'abcd'.split('').map(char => ({value: char, state: ElementStates.Default}));
    const expected = 'dcba'.split('').map(char => ({value: char, state: ElementStates.Modified}));
    await reverseString(array, () => {});
    expect(array).toEqual(expected);
  });
  it('разворот строки с нечетным количеством символов', async () => {
    const array = 'abcde'.split('').map(char => ({value: char, state: ElementStates.Default}));
    const expected = 'edcba'.split('').map(char => ({value: char, state: ElementStates.Modified}));
    await reverseString(array, () => {});
    expect(array).toEqual(expected);
  });
  it('разворот строки с 1 смволом', async () => {
    const array = 'a'.split('').map(char => ({value: char, state: ElementStates.Default}));
    const expected = 'a'.split('').map(char => ({value: char, state: ElementStates.Modified}));
    await reverseString(array, () => {});
    expect(array).toEqual(expected);
  });
  it('разворот пустой строки', async () => {
    const array = ''.split('').map(char => ({value: char, state: ElementStates.Default}));
    const expected = ''.split('').map(char => ({value: char, state: ElementStates.Modified}));
    await reverseString(array, () => {});
    expect(array).toEqual(expected);
  });
});
