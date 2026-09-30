export class Node {
  value: number;
  left: Node | null = null;
  right: Node | null = null;

  constructor(value: number) {
    this.value = value;
  }
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }
}

export class BinaryTree {
  root: Node | null = null;

  insert(value: number): void {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(current: Node, newNode: Node): void {
    if (newNode.value < current.value) {

      if (current.left === null) {
        current.left = newNode;
      } else {
        this.insertNode(current.left, newNode);
      }

    } else if (newNode.value > current.value) {

      if (current.right === null) {
        current.right = newNode;
      } else {
        this.insertNode(current.right, newNode);
      }

    } else {
      console.log(`El valor ${newNode.value} ya existe en el árbol.`);
    }
  }

  contains(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: Node | null, value: number): boolean {
    if (node === null) {
      return false;
    }
    if (value === node.value) {
      return true;
    }
    if (value < node.value) {
      return this.searchNode(node.left, value);
    }
    return this.searchNode(node.right, value);
  }

  preOrder(): number[] {
    const result: number[] = [];
    this.preOrderNode(this.root, result);
    return result;
  }

  private preOrderNode(node: Node | null, result: number[]): void {
    if (node === null) {
      return;
    }
    result.push(node.value);
    this.preOrderNode(node.left, result);
    this.preOrderNode(node.right, result);
  }

  inOrder(): number[] {
    const result: number[] = [];
    this.inOrderNode(this.root, result);
    return result;
  }

  private inOrderNode(node: Node | null, result: number[]): void {
    if (node === null) {
      return;
    }
    this.inOrderNode(node.left, result);
    result.push(node.value);
    this.inOrderNode(node.right, result);
  }

  postOrder(): number[] {
    const result: number[] = [];
    this.postOrderNode(this.root, result);
    return result;
  }

  private postOrderNode(node: Node | null, result: number[]): void {
    if (node === null) {
      return;
    }
    this.postOrderNode(node.left, result);
    this.postOrderNode(node.right, result);
    result.push(node.value);
  }
}