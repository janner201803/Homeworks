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
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return value;
  }

  removePorNombre(nombre: string): any | null {
    if (this.head === null) {
      return null;
    }

    if (this.head.value === nombre) {
      const paciente = this.head.value;
      this.head = this.head.next;
      this.length--;

      if (this.head === null) {
        this.tail = null;
      }

      return paciente;
    }

    let actual = this.head;

    while (actual.next !== null) {
      if (actual.next.value === nombre) {
        const paciente = actual.next.value;

        actual.next = actual.next.next;

        if (actual.next === null) {
          this.tail = actual;
        }

        this.length--;

        return paciente;
      }

      actual = actual.next;
    }

    return null;
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
}