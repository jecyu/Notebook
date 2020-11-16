// 创建地图数据容器 map（记录图片数据）
class Map {
  constructor({ basemap }) {
    this.allLayers = [];
    this.allBaseMapLayers = [];
    this.allBaseMapLayers.push(this.getBaseMap(basemap));
  }
  /**
   * @description:
   * @param {String} id
   * @return {*}
   */
  getBaseMap(id) {
    // 请求
  }
}

// 图层关闭 -> map 存储数据更改 -> 重新渲染 canvas，每个图层数据都是一个 canvas，最终合并成一个 canvas