// 创建地图视图 View
class MapView {
  constructor({ container, map }) {
    this.container = container;
    this.map = map;
    this.context = null; // canvas 上下文
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

  registerEvent() {}

  destory() {}
}

// 注册事件
// 拖拽地图
// 放大缩小
// 先实现绘制图片
