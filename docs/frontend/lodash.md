# lodash 源码分析及思路学习

## map.js 

```js
// map.js
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}
export default map
```
map 用来映射，返回新的数组长度应该跟原数组长度一致，因此一开始就先拿到原数组的 `length` 属性，创建一个跟原数组长度一致的空数组。

接着遍历，将数组中每项依次取出，作为第一个参数传递给 `iteratee` 处理函数。 `iteratee` 的第二个参数为当前项的索引，第三个参数为原数组。然后将 `iteratee` 返回的结果放入新数组 `result` 中。遍历完毕后，将新的数组返回，即实现了 `map` 函数。