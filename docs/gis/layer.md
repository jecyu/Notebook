# 图层

## 图层概念

- [GIS 图层概念及应用](https://juejin.im/post/5d3ff32ef265da03986bcd21)

## 管理图层

### 调整图层顺序

`recoderLayer(layer, index)` 需求，调整新添加的图层为底图
```js
map.addLayer(cityLayer);
map.recoderLayer(cityLayer, 1);
```

