exports.name = "john";
exports.data = 'this is some data';

const privateVariable= 5;
exports.getPrivate = function() {
  return privateVariable;
}