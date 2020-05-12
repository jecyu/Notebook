# 函数式编程

函数通常是输入输出一致，方法会做更多的东西。

只要是跟函数外部环境发生的交互就都是副作用。

```js
// 纯的
var signUp = function(Db, Email, attrs) {
  // 
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

var saveUser = function(Db, attrs) {
    ...
};

var welcomeUser = function(Email, user) {
    ...
};
```


这里返回函数的意义是：外部函数统一处理 Db、Email、attrs 等参数，再返回内部函数。
```js
var signUp = function(Db, Email, attrs) {
  // 
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};
```

### 函数里返回函数的意义

除了常见的闭包保存变量到内存外，以及创建私有变量，还有下面这种需求（外部函数统一处理参数值）：

例子：
before:
```js
var accessors = {
	sortable: {
		get: function() {
			return typeof this.getAttribute('sortable') != 'undefined';
		}
	},
	droppable: {
		get: function() {
			return typeof this.getAttribute('droppable') != 'undefined';
		}
	}
};
```

After1：
1. 抽离一个函数统一处理 attr
```js
function getAttribute(attr) {
	return typeof this.getAttribute(attr) != 'undefined';
}
 
var accessors = {
	sortable: {
		get: function() {
			return getAttribute('sortable');
		}
	},
	droppable: {
		get: function() {
			return getAttribute('droppable');
		}
	}
};
```

After2：
1. 外部函数 generateGetMethod 接收参数，返回一个新的函数。这样就不需要在 get 这里使用`匿名函数`包含，每次都要调用一次这个`匿名函数`。
2. 这样既可以满足 get 需要函数的赋值需求，也能根据不同的参数返回不同的函数。
```js
function generateGetMethod(attr) {
	return function() {
		return typeof this.getAttribute(attr) != 'undefined';
	};
}
 
var accessors = {
	sortable: {
		get: generateGetMethod('sortable')
	},
	droppable: {
		get: generateGetMethod('droppable')
	}
};
```

## 参考资料

 
- [JavaScript Functions that Return Functions](https://davidwalsh.name/javascript-functions)