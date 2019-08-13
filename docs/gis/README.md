# GIS

## 图层概念

- [GIS 图层概念及应用](https://juejin.im/post/5d3ff32ef265da03986bcd21)

## 管理图层

### 调整图层顺序

`recoderLayer(layer, index)` 需求，调整新添加的图层为底图
```js
map.addLayer(cityLayer);
map.recoderLayer(cityLayer, 1);
```

## 文件处理

### CAD 加载流程

1. 客户端将CAD文件上传至服务器A（后台版本所在服务器）的文件夹A
2. 上传成功后，服务器A同步将文件夹A中该CAD文件通过FTP上传至服务器B（ArcGIS Server所在服务器）的FTP目录下的文件夹B（需要配置，后台配置文件中需要做相应的配置）中，同时将文件夹A中的CAD文件删除；
3. 然后通过部署在服务器B上的SOE服务（已绑定文件夹B）将该CAD文件转为gdb要素；
4. 最后通过动态图层技术将gdb要素临时加载到地图上显示。

![CAD load](../.vuepress/public/images/cad-load.png)