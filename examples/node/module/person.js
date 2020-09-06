function Person(name) {
  this.name = name;
}

Person.prototype.talk = function() {
  console.log("我的名字是", this.name);
};

module.exports = Person;