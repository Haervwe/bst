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

  insert(value) {
    if (typeof this.find(value) != "string") {
      return "this node already exist";
    }
    let cur = this.root;
    do {
      if (value > cur.data) {
        if (cur.right != null) {
          cur = cur.right;
        } else {
          cur.right = new Node(value);
          console.log(cur, "inside right");
          break;
        }
      } else {
        if (cur.left != null) {
          cur = cur.left;
        } else {
          cur.left = new Node(value);
          console.log(cur), "inside left";
          break;
        }
      }
    } while (cur != null);
  }

  delete(value) {
    let toDelete = this.find(value);
    let curr;
    let curParent;
    if (typeof toDelete == "string") {
      return "node not found";
    }
    if (toDelete.right != null) {
      curParent = toDelete;
      curr = toDelete.right;
      if (curr.left == null) {
        toDelete.data = curr.data;
        curParent.right = null;
        return;
      }
      while (curr.left != null) {
        curParent = curr;
        console.log(curParent, "in delete", value, curr);
        curr = curr.left;
      }
      console.log(curParent, "in delete", value, curr);
      toDelete.data = curr.data;
      curParent.left = null;
      console.log(curParent, "finish delete", value, toDelete);
      return;
    }
    if (toDelete.left != null) {
      curParent = toDelete;
      curr = toDelete.left;
      if (curr.right == null) {
        toDelete.data = curr.data;
        curParent.left = null;
        return;
      }
      while (curr.right != null) {
        curParent = curr;
        console.log(curParent, "in delete", value, curr);
        curr = curr.right;
      }
      console.log(curParent, "in delete", value, curr);
      toDelete.data = curr.data;
      curParent.right = null;
      console.log(curParent, "finish delete", value, toDelete);
      return;
    }
    curr = this.root;
    let left = curr.left;
    let right = curr.right;
    while (left.data != value && right.data != value) {
      if (value < curr.data) {
        curr = curr.left;
        left = curr.left;
        right = curr.right;
      } else {
        curr = curr.right;
        left = curr.left;
        right = curr.right;
      }
    }
    if (left.data == value) {
      curr.left = null;
    }
    if (right.data == value) {
      curr.right = null;
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

  levelOrder(
    func = (n) => {
      return n;
    }
  ) {
    let queue = [this.root];
    let curr;
    let result = [];
    do {
      curr = queue[0];
      queue.shift();
      if (curr.left != null) {
        queue.push(curr.left);
      }
      if (curr.right != null) {
        queue.push(curr.right);
      }
      result.push(func(curr.data));
    } while (queue.length != 0);
    return result;
  }
  inOrder(
    func = (n) => {
      return n;
    },
    result = [],
    curr = this.root
  ) {
    if (curr.left != null) {
      result = this.inOrder(func, result, curr.left);
    }
    result.push(func(curr.data));
    if (curr.right != null) {
      result = this.inOrder(func, result, curr.right);
    }
    return result;
  }
  preOrder(
    func = (n) => {
      return n;
    },
    result = [],
    curr = this.root
  ) {
    result.push(func(curr.data));
    if (curr.left != null) {
      result = this.preOrder(func, result, curr.left);
    }
    if (curr.right != null) {
      result = this.preOrder(func, result, curr.right);
    }
    return result;
  }
  postOrder(
    func = (n) => {
      return n;
    },
    result = [],
    curr = this.root
  ) {
    if (curr.left != null) {
      result = this.postOrder(func, result, curr.left);
    }
    if (curr.right != null) {
      result = this.postOrder(func, result, curr.right);
    }
    result.push(func(curr.data));
    return result;
  }
  height() {}
  depth() {}
  isBalanced() {}
  reBalance() {}
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
console.log("----Delete----");
testbst.delete(1);
console.log("----1----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.delete(4);
console.log("----4----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.delete(7);
console.log("----7----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
console.log(testbst.find(5));
testbst.delete(5);
console.log("----5----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.delete(15);
console.log("----15----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
console.log("----Insert----");
testbst.insert(1);
console.log("----1----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.insert(4);
console.log("----4----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.insert(7);
console.log("----7----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.insert(5);
console.log("----5----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.insert(15);
console.log("----15----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
testbst.insert(255);
console.log("----255----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
console.log(testbst.find(255));
testbst.insert(-25);
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
console.log("---- -25 ----");
console.log(testbst.inOrder());
console.log(testbst.levelOrder());
console.log(
  testbst.levelOrder((n) => {
    return n / 2;
  })
);
console.log(testbst.inOrder());
console.log(
  testbst.inOrder((n) => {
    return n / 2;
  })
);
console.log(testbst.preOrder());
console.log(
  testbst.preOrder((n) => {
    return n / 2;
  })
);
console.log(testbst.postOrder());
console.log(
  testbst.postOrder((n) => {
    return n / 2;
  })
);
console.log(testbst.find(8));
