class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher created!");
  }
  // 增加订阅者
  add(observer) {
    console.log("Publisher.add invoked");
    this.observers.push(observer);
  }
  // 移除订阅者
  remove(observer) {
    console.log("Publisher.remove invoked.");
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }
  // 通知所有订阅者
  notify() {
    console.log("Publisher.notify invoked.");
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}
module.exports = Publisher;