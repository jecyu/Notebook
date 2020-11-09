// 创建地图视图 View  // TODO 绘制 MapView 与 map 类图，或者说是一个 mini 需要拥有的，包括属性方法事件子视图
class MapView {
  constructor({ container, map }) {
    this.container = container;
    this.map = map;
    this.context = null;
  }

  /**
   * @description:
   * @param {*}
   * @return {*}
   */
  render() {
    // 取出 this.map 的图层数据，进行绘制到 mapView 的 canvas 上
    const c = document.createElement("canvas");
    const container = document.querySelector("#viewDiv");
    c.width = container.clientWidth;
    c.height = container.clientHeight;
    this.context = c.getContext("2d");
    container.appendChild(c);
  }
}

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
  }
}

// 加载图层
// 注册事件
// 拖拽地图

// 放大缩小

// 尽量采用 amd，为了看 arcgis 源码更加清晰
