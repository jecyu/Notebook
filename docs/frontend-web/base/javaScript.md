# JavaScript 基础

## 数据类型

### 解构赋值

#### 数组解构

```js
// 我们有一个存放了名字和姓氏的数组
let arr = ["Ilya", "Kantor"]

// 解构赋值
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

alert(firstName); // Ilya
alert(surname);  // Kantor
```

##### 等号右侧可以是任何可迭代对象

……实际上，我们可以将其与任何可迭代对象一起使用，而不仅限于数组：
```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

##### 交换变量值的技巧

一个用于交换变量值的典型技巧：
```js
let guest = "Jane";
let admin = "Pete";

// 交换值：让 guest=Pete，admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane(成功交换！)
```

这里我们创建了一个由两个变量组成的临时数组，并且立即以交换了的顺序对其进行了解构。
我们可以用这种方式交换两个以上的变量。

#### 对象解构
## 函数

