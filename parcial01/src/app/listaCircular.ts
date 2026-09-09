export class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedList {
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
    } else {
      newNode.next = this.head;
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
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
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
}