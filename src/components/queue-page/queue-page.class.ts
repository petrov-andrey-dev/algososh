interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: (emptyItem: T) => void;
    getHead: () => number;
    getTail: () => number;
    getSize: () => number;
    changeHeadItem: (changedItem: T) => void;
    changeTailItem: (changedItem: T) => void;
    clear: (clearArray: T[]) => void;
    getItems: () => T[];
}

export class Queue<T> implements IQueue<T> {
    private items: (T)[] = [];
    private head: number = 0;
    private tail: number = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number, items: T[]) {
        this.size = size;
        this.items = items;
    };

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error('Достигнута максималльная длина очереди');
        };
        this.items[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = (emptyItem: T) => {
        this.items[this.head % this.size] = emptyItem;
        if (this.head === this.tail - 1) {
            this.head = 0;
            this.tail = 0;
            this.length = 0;
        } else {
            this.head++;
        }
        this.length--;
    };

    getHead = () => {
        return this.head;
    };

    getTail = () => {
        return this.tail;
    };

    getSize = () => {
        return this.size;
    }

    changeHeadItem = (changedItem: T) => {
        this.items[this.head] = changedItem;
    };

    changeTailItem = (changedItem: T) => {
        this.items[this.tail] = changedItem;
    };

    clear = (clearArray: T[]) => {
        this.items = clearArray
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    };

    getItems = () => {
        return this.items;
    };

}