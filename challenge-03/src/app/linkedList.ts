export class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
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
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  peek(index: number): Node | null {
    let current = this.head;
    let count = 0;

    while (current !== null && count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  size(): number {
    return this.length;
  }

  remove(index: number): void {
    if (this.head === null) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      this.length--;

      if (this.length === 0) {
        this.tail = null;
      }
      return;
    }

    let current = this.head;
    let count = 0;

    while (current.next !== null && count < index - 1) {
      current = current.next;
      count++;
    }
    if (current.next === null) {
      return;
    }
    if (current.next === this.tail) {
      this.tail = current;
    }
    current.next = current.next.next;
    this.length--;
  }

  print(): void {
    let current = this.head;

    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }
}