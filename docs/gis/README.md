# GIS

## 管理图层

### 调整图层顺序

`recoderLayer(layer, index)` 需求，调整新添加的图层为底图
```js
map.addLayer(cityLayer);
map.recoderLayer(cityLayer, 1);
```