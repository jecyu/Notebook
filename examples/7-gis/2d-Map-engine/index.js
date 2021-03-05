/*
 * @Author: Jecyu
 * @Date: 2021-03-04 15:36:01
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-03-04 16:35:57
 * @FilePath: /examples/7-gis/2d-Map-engine/index.js
 * @Description:
 */
import Map from "./Map.js";
import LonLat from "./LonLat.js";
let map = new Map({
  center: new LonLat(116.3, 39.85),
  zoom: 10,
});

map.addTileLayer({
  id: "tile",
  url: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
});


// 栅格瓦片（切片出图，或者索性出一张大图）
// 矢量数据（geojson）