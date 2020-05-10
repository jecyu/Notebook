ts 调试
ts 编写

ts vuex 不需要抽离 type

```js
export const SET_PERMISSION = "SET_PERMISSION";
export const RESET_ALL_PERMISSION = "RESET_ALL_PERMISSION";

// permission
export const SET_ROUTES = "SET_ROUTES";

// general
export const SET_GENERAL_UPLOADFILEMODALSTATUS =
  "SET_GENERAL_UploadFileModalStatus";

// 不需要抽离type了，因为使用 ts 直接调用类的方法了。
```

使用非 ts vue 2.5 的时候才需要，
如

```ts
this.$store.commit(FZBZ_SET_AIANALYSIS_STATUS, option);
// 为了方便他人使用不用重新填写字符串。
```

函数重载，根据不同参数不同类型进行处理

```cs
  // 下面两个函数在 this.parts 中按名称或游戏对象查找某个组件
  Part FindPart(string n)
  {
    foreach (Part prt in parts)
    {
      if (prt.name == n)
      {
        return prt;
      }
    }
    return null;
  }

  Part FindPart(GameObject go)
  {
    foreach (Part prt in parts)
    {
      if (prt.go == go)
      {
        return prt;
      }
    }
    return null;
  }
```
