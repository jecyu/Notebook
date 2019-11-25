# 设计模式

## 观察者模式

当对象存在一对多关系时，则使用观察者模式（Observer Pattern）。比如，当一个对象被修改时，则会自动通知它的依赖对象。观察者模式又叫做发布-订阅（Publish/Subscribe）模式、模式-视图（Model/View）模式、源-监听器（Source/Listener）模式或从属者（Dependents）。观察者模式属于一种对象行为型模式。

### 介绍

**意图**：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。在此，发生改变的对象称为<strong>观察目标</strong>，而被通知的对象称为<strong>观察者</strong>，一个观察目标可以对应多个观察者，而且这些观察者之间没有相互联系，可以根据需要增加和删除观察者，使得系统更易于扩展，这就是观察者模式的模式动机。

**主要解决**：一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合（观察者之间没有联系），保证高度的写作。

**如何解决**：使用面向对象技术，可以将这种依赖弱化。

**关键代码**：在抽象类里有一个 ArrayList 存放观察者们。

**优点**：
- 观察者和被观察者是抽象耦合的。
- 建立一套触发机制。

**缺点**：
- 如果一个被观察者有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。（前端的话，如阻塞卡顿）
- 如果在观察者和观察模板之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
- 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

**使用场景**：
- 一个抽象模型有两个方面，其中一个方面依赖于另一个方面。将这些方面封装在独立的对象中使它们可以各自独立地改变和复用。
- 一个对象的改变将导致其他一个或多个对象也发生改变，而不知道具体有多少对象将发生改变，可以降低对象之间的耦合度。
- 一个对象必须通知其他对象，而并不知道这些对象是谁。
- 需要在系统中创建一个触发链，A 对象的行为将影响 B 对象，B 对象的行为将影响 C 对象......，可以使用观察者模式创建一种链式触发机制。

### 实现

#### 观察者模式

- 一种一对多的依赖，当一个对象的状态发生改变时，所以依赖它的对象都将得到通知
- 关于“观察者模式”的设计模式，也是vue响应式实现的核心，订阅发布模式是观察者模式的升级版，dojo的Topic，vue的eventBus这些就是用的发布订阅模式
```js
class Observer {
  constructor() {
    this.subs = [];
  }
  subscribe(target, cb) {
    target.subs.push(cb);
  }

  publish() {
    this.subs.forEach(sub => sub());
  }
}

const ob1 = new Observer();
const ob2 = new Observer();
const ob3 = new Observer();

ob2.subscribe(ob1, function() {
  console.log('ob2 添加了对 ob1 的依赖，ob1 通知了我会响应');
})

ob3.subscribe(ob1, function() {
  console.log('ob3 添加了对 ob1 的依赖，ob1 通知了我会响应');
})

ob1.publish(); // ob1 发起了通知
```

#### 发布——订阅

- 发布——订阅是观察者的升级版
- 发布——订阅 拥有一个调度中心
- 如果用 发布——订阅，上面 Observer 类的 subscribe 和 publish 方法都在 observer 对象（调度中心）进行管理
```js
const observer = {
  subs: Object.create(null),
  subscribe(type, cb) {
    (this.subs[type] || (this.subs[type] = [])).push(cb);
  },
  publish(type, ...args) {
    (this.subs[type] || []).forEach(cb => cb.apply(null, args));
  }
}

observer.subscribe('foo', function() {
  console.log('foo 事件被订阅了，可以发布');
})

observer.subscribe('bar', function() {
  console.log('bar 事件被订阅了，可以发布');
})

observer.publish('foo');
observer.publish('bar');
```