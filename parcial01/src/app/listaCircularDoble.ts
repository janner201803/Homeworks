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

export class CircularDoubleLinkedList {
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
      newNode.next = newNode;
      newNode.previous = newNode;
    } else {
      newNode.next = this.head;
      newNode.previous = this.tail;

      this.tail!.next = newNode;
      this.head.previous = newNode;
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
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.previous = this.tail;

      this.tail!.next = this.head;
    }
    this.length--;
    return value;
  }

  print(): any[] {
    const values: any[] = [];
    if (this.head === null) {
      return values;
    }
    let current = this.head;
    do {
      values.push(current.value);
      current = current.next!;
    } while (current !== this.head);
    return values;
  }

  printReverse(): any[] {
    const values: any[] = [];
    if (this.tail === null) {
      return values;
    }
    let current = this.tail;
    do {
      values.push(current.value);
      current = current.previous!;
    } while (current !== this.tail);
    return values;
  }
}