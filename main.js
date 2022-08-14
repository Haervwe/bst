class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class bst {
  //fisrt constructor call only neds array as input, oders de array and removes duplicates before creating de tree;
  constructor(array) {
    array.sort((a, b) => a - b);
    let filtered = array.filter((item, index) => array.indexOf(item) === index);
    this.root = this.buildTree(filtered, 0, filtered.length - 1);
  }

  buildTree(array, init, end) {
    if (end < init) {
      return null;
    }
    let middle = Math.floor((end + init) / 2);
    let root = new Node(array[middle]);
    console.log(root.data);
    root.left = this.buildTree(array, init, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);
    return root;
  }

  insert(value) {}

  delete(value) {
    let toDelete = this.find(value);
    let curr;
    let curParent;
    if (typeof toDelete == "string") {
      return "node not found";
    }
    if (toDelete.right != null) {
      curr = toDelete.right;
      console.log(toDelete);
      while (curr.left != null) {
        curParent = curr;
        curr = curr.left;
      }
      console.log(toDelete);
      toDelete.data = curr.data;
      curParent.left = null;
    } else if (toDelete.left != null) {
      curr = toDelete.left;
      while (curr.right != null) {
        curParent = curr;
        curr = curr.right;
      }
      console.log(toDelete);
      toDelete.data = curr.data;
      curParent.right = null;
      console.log(toDelete);
    }
  }

  find(value, current = this.root) {
    if (value == current.data) {
      return current;
    }
    if (value < current.data) {
      if (current.left != null) {
        return this.find(value, current.left);
      }
      return "node not found";
    }
    if (value > current.data) {
      if (current.right != null) {
        return this.find(value, current.right);
      }
      return "node not found";
    }
  }

  levelOrder(func) {}
}

let test = [
  1, 2, 3, 4, 5, 10, 11, 12, 13, 6, 7, 8, 9, 14, 15, 16, 17, 18, 1, 2, 3, 4, 5,
  10, 11, 12, 13, 6, 7, 8, 9, 14, 15, 16, 17, 18,
];

let testbst = new bst(test, 0, test.length - 1);

console.log(testbst);

for (let i = 0; i < 18; i++) {
  let test = testbst.find(i + 1);
  if (typeof test == "string") {
    console.log(test);
  } else {
    console.log(test.data);
  }
}
testbst.delete(1);
for (let i = 0; i < 18; i++) {
  let test = testbst.find(i + 1);
  if (typeof test == "string") {
    console.log(test);
  } else {
    console.log(test.data);
  }
}
