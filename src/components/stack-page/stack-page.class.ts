interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peek: () => T |null;
    clear: () => void;
    getItems: () => T[];
};

export class Stack<T> implements IStack<T> {
    private items: T[] = [];

    push = (item: T) => {
        this.items.push(item);
    };

    pop = () => {
        this.items.pop();
    };

    peek = () => {
        return this.items[this.items.length -1];
    };

    clear = () => {
        this.items = [];
    };

    getItems = () => {
        return this.items
    }
}