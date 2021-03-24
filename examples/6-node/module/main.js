// require("./a");
// require("./b");
const Person = require("./person");
const john = new Person("john");
john.talk();

const a = require("./module_a");
console.log(a.name);
console.log(a.data);
console.log(a.getPrivate());
