function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;  // 这里循环引用了
  
  return {
    father: man,
    mother: woman
  }
}

let family = marry({name: "Jonh"}, { name: "Ann"});
console.log('family =>', family);

// 然后删除两个引用，现在 John 现在是不可访问的，并将从内存中删除所有不可访问的数据
delete family.father;
delete family.mother.husband;

// 或者把根删掉
// family = null，它引用的对象内存将会被回收，js 引擎
console.log('family =>', family);

