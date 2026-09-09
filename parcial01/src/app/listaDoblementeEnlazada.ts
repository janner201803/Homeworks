export class Node {
  value: any;
  next: Node | null;
  previous: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export class DoubleLinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any): void {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  peek(): Node | null {
    return this.head;
  }

  size(): number {
    return this.length;
  }

  remove(): any {
    if (this.head === null) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head !== null) {
      this.head.previous = null;
    } else {
      this.tail = null;
    }

    this.length--;
    return value;
  }

  print(): any[] {
    const values: any[] = [];
    let current = this.head;

    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  printReverse(): any[] {
    const values: any[] = [];
    let current = this.tail;

    while (current !== null) {
      values.push(current.value);
      current = current.previous;
    }
    return values;
  }

  getNode(index: number): Node | null {
    let current = this.head;
    let count = 0;

    while (current !== null && count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  removeNode(node: Node): void {
    if (node.previous !== null) {
      node.previous.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.previous = node.previous;
    } else {
      this.tail = node.previous;
    }
    this.length--;
  }
}

