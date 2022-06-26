var bar = [1, 2, 3];
// should become
// var bar = mori.vector(1, 2, 3);

var foo = { bar: 1 };
// should become
// var foo = mori.hashMap('bar', 1);

foo.bar = 3;
// needs to become
// mori.assoc(foo, 'bar', 3);