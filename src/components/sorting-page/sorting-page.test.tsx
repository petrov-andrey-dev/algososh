
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { bubbleSort, selectSort } from './sorting-page.utils';

describe('Функция bubbleSort', () => {
    it('сортировка пустого массива по возрастанию', async () => {
        const array = [].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [].map(char => ({ value: char, state: ElementStates.Modified }));
        await bubbleSort(array, Direction.Ascending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка пустого массива по убыванию', async () => {
        const array = [].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [].map(char => ({ value: char, state: ElementStates.Modified }));
        await bubbleSort(array, Direction.Descending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из одного элемента по возрастанию', async () => {
        const array = [1,].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [1,].map(char => ({ value: char, state: ElementStates.Modified }));
        await bubbleSort(array, Direction.Ascending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из одного элемента по убыванию', async () => {
        const array = [1,].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [1,].map(char => ({ value: char, state: ElementStates.Modified }));
        await bubbleSort(array, Direction.Descending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из нескольких элементов по возрастанию', async () => {
        const array = [79, 43, 60, 6 ].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [6, 43, 60, 79].map(char => ({ value: char, state: ElementStates.Modified }));
        await bubbleSort(array, Direction.Ascending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из нескольких элементов по убыванию', async () => {
        const array = [79, 43, 60, 6 ].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [79, 60, 43, 6].map(char => ({ value: char, state: ElementStates.Modified }));
        await bubbleSort(array, Direction.Descending, () => { });
        expect(array).toEqual(expected);
    });
});

describe('Функция selectSort', () => {
    it('сортировка пустого массива по возрастанию', async () => {
        const array = [].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [].map(char => ({ value: char, state: ElementStates.Modified }));
        await selectSort(array, Direction.Ascending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка пустого массива по убыванию', async () => {
        const array = [].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [].map(char => ({ value: char, state: ElementStates.Modified }));
        await selectSort(array, Direction.Descending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из одного элемента по возрастанию', async () => {
        const array = [1,].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [1,].map(char => ({ value: char, state: ElementStates.Modified }));
        await selectSort(array, Direction.Ascending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из одного элемента по убыванию', async () => {
        const array = [1,].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [1,].map(char => ({ value: char, state: ElementStates.Modified }));
        await selectSort(array, Direction.Descending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из нескольких элементов по возрастанию', async () => {
        const array = [79, 43, 60, 6 ].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [6, 43, 60, 79].map(char => ({ value: char, state: ElementStates.Modified }));
        await selectSort(array, Direction.Ascending, () => { });
        expect(array).toEqual(expected);
    });
    it('сортировка массива из нескольких элементов по убыванию', async () => {
        const array = [79, 43, 60, 6 ].map(char => ({ value: char, state: ElementStates.Default }));
        const expected = [79, 60, 43, 6].map(char => ({ value: char, state: ElementStates.Modified }));
        await selectSort(array, Direction.Descending, () => { });
        expect(array).toEqual(expected);
    });
});