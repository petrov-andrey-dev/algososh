class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
};

interface ILinkedList<T> {
  addToHead: (element: T) => void;
  addToTail: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  delFromHead: () => void;
  delFromTail: () => void;
  delByIndex: (index: number) => void;
  toArray: () => Node<T>[]
  getSize: () => number;
  print: () => void;
};

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  };

  addToHead(element: T) {
    let node = new Node(element);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  };

  addToTail(element: T) {
    const node = new Node(element);

    if (this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  };


  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        this.addToHead(element);
      } else if (index === this.size) {
        this.addToTail(element);
      } else if (this.head != null) {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex !== index - 1 && curr.next !== null) {
          curr = curr.next;
          currIndex++;
        }
        node.next = curr.next;
        curr.next = node;
      }
      this.size++;
    }
  };

  delFromHead() {
    if (this.head === null || this.tail === null) {
      console.log('The list is empty');
      return;
    } else {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }
    }
    this.size--;
  };

  delFromTail() {
    if (this.head === null || this.tail === null) {
      console.log('The list is empty');
      return;
    } else {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        let curr = this.head;
        let prev = this.head;
        while (curr !== null && curr.next != null) {
          prev = curr;
          curr = curr.next;
        }
        this.tail = prev;
        this.tail.next = null;
      }
    }
    this.size--;
  };

  delByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.delFromHead();
      } else if (index === this.size - 1) {
        this.delFromTail();
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;
        while (currIndex < index && curr != null) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }
        if (prev != null && curr != null) {
          prev.next = curr.next;
        }
      }
    }
    this.size--;
  };

  toArray() {
    const nodes = [];
    let curr = this.head;
    while (curr) {
      nodes.push(curr);
      curr = curr.next;
    }
    return nodes;
  };


  getSize() {
    return this.size;
  };

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  };
};