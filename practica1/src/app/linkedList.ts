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

  append(value: any) {
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

  remove(index: number) {
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
    for (let i = 0; i < index - 1; i++) {
        if (current.next === null) {
        return;
        }
        current = current.next;
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

  peek(value: any) {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  size() {
    return this.length;
  }

  print() {
    let current = this.head;
    let estudiantes: any[] = [];

    while (current !== null) {
      console.log(current.value);
      estudiantes.push(current.value);
      current = current.next;
    }
    return estudiantes;
  }
}