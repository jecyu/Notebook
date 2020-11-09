//[key: string]: any 处理索引错误

```js
const processRegion: { [key: string]: any } = {
  regionCode: async (askValue: string): Promise<Array<info>> => {
    const answer = [];
    let code = askValue;
    if (askValue.length === 12) {
      code = code.slice(0, regionPlaceholder.length); // 超过 12 位，只取前 6 位
    }
    try {
      const findItem = await cn.info(code);
      if (
        findItem &&
        Object.prototype.toString.call(findItem) === "[object Object]"
      ) {
        for (const prop in findItem) {
          if (findItem.hasOwnProperty(prop))
            answer.push({
              name: prop,
              content:
                prop === "code"
                  ? findItem[prop] + regionPlaceholder
                  : findItem[prop],
            });
        }
        return answer;
      }
    } catch (err) {
      console.log(err);
    }
    return answer;
  },
};
```
