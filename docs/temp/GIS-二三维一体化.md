# Arcgis API For JS 二三维一体化

头脑风暴

- 运维权限，三维地图服务如何配置，目前只支持二维地图服务
  - 前端配置文件
- 如何更好地嵌入三维地图
- 三维数据包括场景数据和高程数据，arcgis for api 如何加载处理
  - arcgis 4.9 api 所支持的三维服务如何
  - mapView（二维）
  - sceneView（三维）
  - 加载高程数据
    - ElevationLayer
    - TileLayer
  - 加载场景数据
    - SceneLayer
  - 加载三维影像数据
    - ImageryLayerView
- 加载三维图层时，不需要设置 baseMap 地图，因为不是叠加。
- 三维与二维的区别
- 二三维联动/切换
- 三维需求

- 定位渲染
- 目前的基线 draw 无法使用
- 查询数据，在三维服务中一样可以正常查询

- 如何更好的接入，对于二三维一体化。是否需要新建一个 三维 map 组件专门处理。

  - 三维与二维其实更像是一个摄像机的正交
  - 运维权限
  - 二维与三维底图坐标系要一致。
  - 如果要在三维中，添加二维图层，通过共用 view，然后叠加
  - 是否要同步二维地图已经加载的图层，在三维地图中的显示，例如某个专题、查询的渲染效果，同步添加三维地图上。

- 图层的叠加要求
  - 参考坐标系一致 spatialReference
  - center/zoom/scale
  - 场景图层
  - camera 的设置
- [x] 二维叠加到三维地图上
- [ ] 天地图加载到三维
- [ ] 运维权限的配置底图
- 操作
  - 定位（二维要素的定位、三维要素的）
    - 经度与维度
    - x 与 y
  - 查询分析
- 实现：地图初始化、空间参考坐标系的问题了
  - 目标没有一个二维图层、三维高程同一个坐标系上的数据服务
- 下午在基础信息平台引入三维测试，二维地图的显示
- 地图是天地图，如果不正确设置的话，地图也会出不来

使用同一个 map 对象，实现特殊同步，如果需要集成再考虑后续处理。

viewpoint

```js
var view = new SceneView({
        container: "viewDiv",
        viewingMode: "global",
        map: map,
        camera: {
          position: {
            x: -168869,
            y: 3806095,
            z: 1618269,
            spatialReference: {
              wkid: 102100
            }
          },
          heading: 17,
          tilt: 48
        },
        constraints: {
          `snapToZoom: false`
        }
      });
```

## ArcGIS 三维数据生产

## ArcGIS 服务发布

10.7

ArcGIS Pro

## ArcGIS 三维服务使用

## 已知的限制

- 二维数据可以在三维地图中加载显示
- 三维数据不能在二维地图中加载显示
- 绘制工具暂无法支持三维数据

## 二三维一体化

### 初始化范围

### 地图是如何制作出来的——二维地图与三维地图

- 如何映射到二维地图
- 二维地图数据（x，y/经度、维度）如何映射叠加到三维球体
  - 能否直接添加等等
  - 切片与动态图层（切片加载，ArcGIS API 会对应请求到相对应的图片）
  - 坐标系统（本身集成到三维）

默认的二维也可以添加到三维地图上的，用了相同的世界坐标。

理解这些有利于确定二三维如何一体化，首先是展示上的一体化。

- 二三维切换（联动），同步数据、事件、查询结果
- 二维在三维地球中进行叠加

### 限制

Limitations about switching between 2D and 3D
Keep in mind that switching from a MapView to a SceneView requires careful consideration for a number of factors. See the list below for some of the factors of consideration. This list is not comprehensive.

- **Data types** - Some layers aren't supported in 2D because of their 3D nature. These include SceneLayer, IntegratedMeshLayer, and PointCloudLayer. They will need to be removed from the map instance altogether, or replaced with 2D counterparts. For example, you could switch a SceneLayer representing buildings with a polygon FeatureLayer representing building footprints. ElevationLayer doesn't need to be considered as closely as the other layers mentioned above since the Map's ground is ignored in MapViews.
- **Symbols** - While most 2D symbols are useable in SceneView, all 3D symbols are not supported in MapViews. Renderers may need to be reconfigured if 3D symbols are used.
- **UI components** - If adding widgets and other UI components using view.ui.add(), then keep in mind that these components need extra logic for persisting from one view to the next.
- **Widgets** - All widgets in the API are tied to a specific view. If persisting widgets from a 2D to 3D view is desired then extra logic will need to be included for switching the view referenced by each widget. This includes a view's popup instance.

### 是否二维和三维共用一个地图组件，考虑到复用公共的组件，在三维中能否使用二维地图的工具函数、初始化 ，或者说区分为不同的工具类合集。

最终想要实现的效果：

- 将二维和三维地图集成到同一个 GIS 中,在浏览器中并列显示二维和三维地图，实现二维和三维地图的联动和数据同步，用户就可以通过两个维度同时去观察和处理地理信息数据。
- 实现二维和三维地图的联动，数据显示、更新与分析结果的同步，并且与 OGC Web 服务无缝集成，完成了 WebGIS 二三维一体化的目标。

考虑指标：

- `底图加载`是否一致（需要做哪些处理），例如加载天地图、影像图等（）
  - 地图的 spatialReference 引用
  - 全球场景，对底图的切片本身有要求。
- `图层加载`（例如加载三维图层、在三维地图中加载二维图层，方法一致，除了高程图层）
- 要素（数据）查询（查询 API 几乎一致，除了 sceneLayer 的服务端和客户端查询，绘制工具需要添加三维符号，这个也不能直接复用，考虑到后续。可以逐步添加上。）
  - 属性查询、空间查询
  - 绘制工具是否一致，看了官网示例可以公开课（ArcGIS JavaScript API 开发 Web 3D 应用），不一致，绘制的是三维符号，但只不过是在原来的二维面增加了高度。本质上绘制应该也是可以查询到数据，测试后可以使用。只不过没有绘制出一个高度的效果。可以在二维图层绘制，但是如果是绘制的线是立体的，例如从某一个点从另外的三维的，也是 x，y，z 都改变的话，就不能简单复用了。
  - 二维的图层叠加后，一样可以点击对应图层的符号弹出弹框，只不过它是二维的。
- `要素定位`（不一致，除了 extent，还需要设置摄像机的处理。或者在三维中完全可以用摄像机替换掉 extent 的定位，添加 heading 和 tilt，不过 API 都是使用 goTo，只不过封装上需要处理）
  - 二维服务无法在三维地图中定位，如果默认不调整摄像机的情况下，是可以按照原来的二维那样进行定位的，因为默认是正交投影的视图。
  - 因此如果要正常在三维地图中定位二维的要素时，除了 x，y 坐标外，还要设置摄像机进行处理。（这个也跟 WebGL 的原理一致，Unity 3D 的游戏摄像机一致，这个例子可以看规划分析的开发适应性。）
- `要素符号化渲染`（渲染方法不一致，多了 3D SymbolLayer）
  - 可以对二维数据进行三维符号化（ 但是方式不太一样，多了符号的图层，例如对于 symbolLayer 的渲染）
    - 二维要素点能否直接显示为三维要素点，可以通过 symbolLayer 结合某个渲染字段作为 z 轴的信息。
    - 或者把二维数据添加 z 轴。
  - 三维的渲染
- `事件通信`（是否有二三维联动的需求）、数据同步（重点考虑），数据主要是同一个 Map 数据。
  - 二三维代码一体化，直接在初始化的时候就进行了同步，在初始化的时候，同时实例化了三维与二维的 mapView 与 SceneView。
  - 分开渲染，那么 sceneView 的数据不能够同步渲染。
  - 抽离一个共同的图层数据管理，在切换时进行同步。目前佛山的实践是没有同步数据的，而是重新进行了渲染，initMap 加载数据，在切换地图的时候就进行了渲染。这样的话，需要重新触发加载图层，例如在某个专题图层打开的情况，如何切换同步到三维。
  - 所以不仅仅考虑初始化，还要考虑编辑。
  - map 对象是一致的，这就是数据。在切换的时候，加载不同的 map？
- 能否能够集成现有的`运维的配置`，需要开发对应的三维地图配置
  - 针对三维图层的配置
- 如何配置

mapView 与 sceneView 都是两个图层，最好的数据更新即可同步。现有的架构。（架构）

- 三维中：本地视图（一块区域）与全球视图（一个球体）
- 如何在 WebGIS 中组合二三维的架构。
- 可以通过 ·localSence· 也可以转换到本二维视图。（这样就不用两个 view 了？功能上可能不够）

考虑如何引入，至于范围上会有多少的区别？如果要同步图层和数据的话，那么在一开始的增删改查也要对 Map 进行的处理，切换的时候，基于现在的 Map 进行实例化不同的地图 View 视图。（二维和三维视图）

map 是共同的数据，mapView 和 sceneView 是视图，以及一些处理的方法。

要素图层也可以发布不带有 z 的，可以通过 SceneLayer 进行链接管理显示要素的属性。主要 demo 为 [](http://localhost:8080/arcgis_js_v49_sdk/arcgis_js_api/sdk/latest/sample-code/sandbox/index.html?sample=layers-scenelayer-query-popup)

另外一种是服务发布了关联要素图层的场景图层，可以直接点击查询

![](../.vuepress/public/images/2020-07-16-18-35-27-scene-layer.png)

![](../.vuepress/public/images/2020-07-16-18-49-10-scene-layer.png)

demo

- 完全 Map 组件
  - styleProject
- 二三维一体化 demo
  - 设置 viewClass

LOD 是什么

- View 视图层
- Map 数据层

![](../.vuepress/public/images/2020-07-16-18-44-46-map.png)

ground：dm 图层

webScene 作为一个非 Global 的自定义三维地图，直接加载一个特定的三维地图。

### 绘制工具（geometry）

### 定位

### 查询

### 渲染

## 实现三维

arcgis for js api ：4.9

arcmap 软件版本：

三维数据：高程数据与场景数据

### 使用 View

### 二三维模式切换

版本一：不同步，全部初始化

```html
<!-- <template v-show="sceneType === '2d'"> -->
<div class="eyemap-map" ref="mapNode"></div>
<div
  class="shadow-map"
  ref="shadowMapNode"
  :style="shadowMapSize"
  v-if="mapExport"
></div>
<!-- </template> -->
<!-- <template v-show="sceneType === '3d'">
      <div class="eyemap-map 3d" ref="mapNode3d"></div>
      <div class="shadow-map 3d" ref="shadowMapNode3d" :style="shadowMapSize" v-if="mapExport"></div>
    </template> -->
```

版本二：同步 map 对象，通过两个不同的 dom 容器隐藏/显示，来进行同步，并切换。（武汉方案，未测试陈工）

目前不需要 mapStore 处理。

测试可以。版本三：同步 map 对象，共用一个 container ，通过操作 mapView 或 sceneView 的 container 属性，进行切换。（这个可以看看应该是 container 属性改变后，会重新挂载 view 视图）

由于共用了统一个 map 对象，因此三维的底图和二维的底图，空间坐标系必须一致。（4460，需要做一次坐标偏移）

再进一步的是，使用 mapStore 管理两个以上的 views

底图处理

viewpoint，如果底图的坐标系不同，那么会导致 viewpoint 不一致。

二三维的坐标系必须一致，才能一体化

坐标跟游戏的贴图。

## 架构处理

## 权限配置

## 地图坐标系

- [地理坐标系统](./地理坐标系统.md)

## 底图处理

tiled、dynamic、wmts、tdt

3D 坐标系
投影坐标系也逐渐开始使用 z 值来计量低于或高于平均海平面的高程。

## 附录

版本一：map.VUE

```html
<template>
  <div style="width:100%; height:100%;">
    <!-- <template v-show="sceneType === '2d'"> -->
    <div class="eyemap-map" ref="mapNode"></div>
    <div
      class="shadow-map"
      ref="shadowMapNode"
      :style="shadowMapSize"
      v-if="mapExport"
    ></div>
    <!-- </template> -->
    <!-- <template v-show="sceneType === '3d'">
      <div class="eyemap-map 3d" ref="mapNode3d"></div>
      <div class="shadow-map 3d" ref="shadowMapNode3d" :style="shadowMapSize" v-if="mapExport"></div>
    </template> -->
  </div>
</template>

<script>
  import Vue from "vue";
  import loadModules from "@/utils/loadModules";
  import layerUtils from "./layers/layerUtils";
  import canvasLayerUtils from "./layers/canvasLayerUtils";
  import createTDTLayer from "./layers/tdtLayer2";
  import createWmtsLayer from "./layers/wmtsLayer";
  import query from "./query/queryUtils";
  import render from "./features/render";
  import baseUtils from "./utils/baseUtils";
  // import geometryUtils from "./utils/geometryUtils";
  import locateUtils from "./locate/locateUtils";
  import draw from "./draw/draw";
  import drawTool from "./draw/drawTool";
  import measure from "./measure/measure";
  import screenLegend from "../Legend/Legend";
  import html2canvas from "html2canvas";
  import { logType } from "@/utils/base";
  import { log } from "@/api/user";

  // import MapStore from "./model/mapStore";
  // import mapConfig from "../../../views/FZBZ/NatureAnalysisEvaluation/ModelEvalution/Common/mixins/mapConfig";
  export default {
    name: "eyemap-map",
    mixins: [
      layerUtils,
      canvasLayerUtils,
      query,
      render,
      baseUtils,
      // geometryUtils,
      locateUtils,
      draw,
      drawTool,
      measure,
    ],
    components: {},
    props: {
      // 底图地址
      baseLayerUrls: {
        type: Array,
        default: () => [],
      },
      sceneType: {
        type: String,
        default: "2d",
      },
      // GeometryServer
      geometryServerUrl: {
        type: String,
        default: () => "",
      },
      extent: {
        type: Object,
        default: () => {
          return {};
        },
      },
      d3Layer: {
        type: Object,
        default: () => {
          return {};
        },
      },
      // GeometryServer
      tileInfo: {
        type: Object,
        default: () => {
          return {};
        },
      },
      viewpoint: {
        type: Object,
        default: () => {
          return {};
        },
      },
      // 全图
      fullMap: {
        type: Boolean,
        default: false,
      },
      // 全屏
      fullScreen: {
        type: Boolean,
        default: false,
      },
      // 图例
      legend: {
        type: Boolean,
        default: false,
      },
      zoom: {
        type: Boolean,
        default: true,
      },
      // 底图切换
      basemapToggle: {
        type: Boolean,
        default: false,
      },
      // 事件管理
      eventBus: {
        type: Object,
        default: () => new Vue(),
      },
      mapExport: {
        type: Boolean,
        default: false,
      },
      showScaleBar: {
        type: Boolean,
        defalut: false,
      },
      shadowMapSize: {
        type: Object,
        default: () => {
          return {
            width: "1754px",
            height: "1240px",
          };
        },
      },
      module: {
        type: String,
        default: "",
      },
      mapType: {
        type: String,
        default: "alone", // 默认均为独立地图页面，由于分屏同样使用该map，故设置地图类型为split，以防止初始化相互冲掉
      },
    },
    data() {
      return {
        map: null,
        mapView: null, // 2dView or 3dView
        shadowMapView: null,
        activeView: null, // 当前激活的视图，用于同步视图点
        mapStore: null,
        regionGraphicLayer: null,
        initViewPoint: null,
        // eventBus: new Vue(),
        url: null,
        mapScalebar: null,
        shadowScaleBar: null,
        legendInst: null,
        expandInst: null,
        swipeValue: 25,
        swipeLayers: [],
        originImg: null,
        toolTipTimeOut: null,
        homeWidget: null, // 全图组件实例
        viewConfig: {
          mapView: null,
          sceneView: null,
          activeView: null,
          container: null,
          baseMap2d: null,
          baseMap3d: null,
        },
      };
    },
    computed: {
      currentViewpoint() {
        if (
          this.mapView.viewpoint.targetGeometry.latitude !== null &&
          this.mapView.viewpoint.targetGeometry.longitude !== null
        ) {
          return JSON.stringify({
            level: this.mapView.zoom,
            latitude: this.mapView.viewpoint.targetGeometry.latitude,
            longitude: this.mapView.viewpoint.targetGeometry.longitude,
          });
        } else {
          return JSON.stringify({
            level: this.mapView.zoom,
            latitude: this.mapView.viewpoint.targetGeometry.x,
            longitude: this.mapView.viewpoint.targetGeometry.y,
          });
        }
      },
    },
    watch: {
      showScaleBar(val) {
        this._showScaleBar(val);
      },
      sceneType: {
        handler(val) {
          this.switchView(val);
        },
      },
    },
    beforeDestroy() {
      if (this.legendInst) {
        this.legendInst.$destroy();
      }
      console.log("map destroy");
      if (this.toolTipTimeOut) {
        clearTimeout(this.toolTipTimeOut);
        this.toolTipTimeOut = null;
      }
      if (this.mapPointerMoveHandler) {
        this.mapPointerMoveHandler.remove();
        this.mapPointerMoveHandler = null;
      }
      if (this.mapPointerLeaveHandler) {
        this.mapPointerLeaveHandler.remove();
        this.mapPointerLeaveHandler = null;
      }
      if (this.mapClickHandler) {
        this.mapClickHandler.remove();
        this.mapClickHandler = null;
      }
      this.eventBus.$emit("EyeMapDestroy");
    },
    // 把 map、mapView 注入到子组件中
    provide() {
      return {
        map: this.map,
        mapView: this.mapView,
        eventBus: this.eventBus,
        shadowMapView: this.shadowMapView,
        curSubSystemName: "",
      };
    },
    async mounted() {
      this.$eyeMapApiPromiseLazy().then(() => {
        this.initMap();
        // this.loadApiModeules();
      });
      let subSysName = "";
      if (
        this.$route.matched &&
        this.$route.matched[0] &&
        this.$route.matched[0].meta
      ) {
        subSysName = this.$route.matched[0].meta.navTitle;
      }
      this.curSubSystemName = subSysName;
    },
    methods: {
      // 加载api
      async loadApiModeules() {
        const modules = await loadModules(
          "esri/Graphic",
          "esri/geometry/Polygon",
          "esri/layers/GraphicsLayer"
        );
        for (let key in modules) {
          if (this.hasOwnProperty(key)) {
            this[key] = modules[key];
          }
        }
      },
      async get3dMapInitParams() {
        const { Extent, Point } = await loadModules(
          "esri/geometry/Extent",
          "esri/geometry/Point"
        );
        let options = {};
        // 参考坐标系需要与底图一直，否则视图也加载不出来
        if (JSON.stringify(this.viewpoint) != "{}") {
          let pt = new Point({
            x: this.viewpoint.latitude,
            y: this.viewpoint.longitude,
            spatialReference: {
              wkid: this.viewpoint.wkid,
              wkt: this.viewpoint.wkt, // + 3d
            },
          });
          options = {
            spatialReference: {
              wkid: this.viewpoint.wkid,
              wkt: this.viewpoint.wkt, // + 3d
            },
            center: pt,
            scale: this.viewpoint.scale,
          };
        } else {
          options = {
            // spatialReference: {
            //   wkid: this.extent.wkid // -
            // },
            constraints: {
              rotationEnabled: false,
            },
            environment: {
              background: {
                type: "color",
                color: [3, 24, 42, 1],
              },
              starsEnabled: true,
              atmosphereEnabled: false,
            },
          };
          let pt = new Point({
            x: this.extent.x,
            y: this.extent.y,
            spatialReference: {
              wkid: this.extent.wkid, // -
            },
          });
          if (this.checkParameter(this.extent.zoom)) {
            options.center = pt;
            options.zoom = this.extent.zoom;
          } else {
            if (this.checkParameter(this.extent.scale)) {
              options.center = pt;
              options.scale = this.extent.scale;
            } else {
              if (this.checkParameter(this.extent.extent)) {
                options.extent = new Extent({
                  xmin: this.extent.extent.xmin,
                  ymin: this.extent.extent.ymin,
                  xmax: this.extent.extent.xmax,
                  ymax: this.extent.extent.ymax,
                  // spatialReference: {
                  //   wkid: this.extent.wkid
                  // }
                });
              } else {
                console.log("init map para error");
              }
            }
          }
        }
        return options;
      },
      async get2dMapInitParams() {
        const { Extent, Point } = await loadModules(
          "esri/geometry/Extent",
          "esri/geometry/Point"
        );
        let options = {};
        if (JSON.stringify(this.viewpoint) != "{}") {
          let pt = new Point({
            x: this.viewpoint.latitude,
            y: this.viewpoint.longitude,
            spatialReference: {
              wkid: this.viewpoint.wkid,
            },
          });
          options = {
            spatialReference: {
              wkid: this.viewpoint.wkid,
            },
            center: pt,
            scale: this.viewpoint.scale,
          };
        } else {
          options = {
            spatialReference: {
              wkid: this.extent.wkid,
            },
            constraints: {
              rotationEnabled: false,
            },
          };
          let pt = new Point({
            x: this.extent.x,
            y: this.extent.y,
            spatialReference: {
              wkid: this.extent.wkid,
            },
          });
          if (this.checkParameter(this.extent.zoom)) {
            options.center = pt;
            options.zoom = this.extent.zoom;
          } else {
            if (this.checkParameter(this.extent.scale)) {
              options.center = pt;
              options.scale = this.extent.scale;
            } else {
              if (this.checkParameter(this.extent.extent)) {
                options.extent = new Extent({
                  xmin: this.extent.extent.xmin,
                  ymin: this.extent.extent.ymin,
                  xmax: this.extent.extent.xmax,
                  ymax: this.extent.extent.ymax,
                  spatialReference: {
                    wkid: this.extent.wkid,
                  },
                });
              } else {
                console.log("init map para error");
              }
            }
          }
        }
        return options;
      },
      async initMap() {
        const {
          MapView,
          SceneView,
          Map,
          Basemap,
          TileLayer,
          MapImageLayer,
          GraphicsLayer,
          // watchUtils,
          // Extent,
          // Point,
          config,
          urlUtils,
          // lang,
          WebTileLayer,
          TileInfo,
        } = await loadModules(
          "esri/views/MapView",
          "esri/views/SceneView",
          "esri/Map",
          "esri/Basemap",
          "esri/layers/TileLayer",
          "esri/layers/MapImageLayer",
          "esri/layers/GraphicsLayer",
          "esri/core/watchUtils",
          "esri/geometry/Extent",
          "esri/geometry/Point",
          "esri/config",
          "esri/core/urlUtils",
          "dojo/_base/lang",
          "esri/layers/WebTileLayer",
          "esri/layers/support/TileInfo"
        );

        let mapServerProxy = this.$store.getters.mapServerProxy;
        config.request.proxyRules = []; // 清除已经存在的服务代理信息
        if (mapServerProxy && mapServerProxy[this.module]) {
          let serverProxy = mapServerProxy[this.module];
          if (serverProxy !== null && JSON.stringify(serverProxy) != "{}") {
            Object.keys(serverProxy).forEach((key) => {
              urlUtils.addProxyRule({
                urlPrefix: key,
                proxyUrl: serverProxy[key],
              });
            });
          } else {
            console.log("serverProxy为null或空对象");
          }
        } else {
          console.log("mapServerProxy为空或module未指定");
        }
        // 设置云服务管理代理的服务请求让携带cookie
        // let dataMapList = this.$store.getters.dataMapList;
        // dataMapList.forEach(service => {
        //   if (service.useproxy === "true") {
        //     const pattern = /(http|https):\/\/?(\w+(\.)?)+(:[0-9]{1,4})+/;
        //     const domainUrl = service.url.match(pattern)[0];
        //     const trustedServers = config.request.trustedServers;
        //     if (trustedServers.indexOf(domainUrl) < 0) {
        //       trustedServers.push(domainUrl);
        //     }
        //   }
        // });

        // 将底图服务添加到 map 上（切片服务和影像服务、天地图）
        const tbasemaps = []; // 天地图
        const tbasemaps_1 = [];
        const dbasemaps = []; // 动态图层
        if (this.baseLayerUrls && this.baseLayerUrls.length > 0) {
          for (let i = 0; i < this.baseLayerUrls.length; i++) {
            let access_token = "";
            if (this.baseLayerUrls[i].type === "tiled") {
              if (
                this.baseLayerUrls[i].access_token &&
                this.baseLayerUrls[i].access_token === true
              ) {
                access_token = this.$store.getters.access_token;
                config.request.interceptors.push({
                  urls: this.baseLayerUrls[i].url,
                  before: function(params) {
                    if (params.requestOptions.query) {
                      params.requestOptions.query.access_token = access_token;
                    } else {
                      params.requestOptions.query = {};
                      params.requestOptions.query.access_token = access_token;
                    }
                  },
                  after: function(response) {
                    if (!response.ssl) {
                      // response.ssl = true;
                    }
                  },
                });
              }
              let tlayer = new TileLayer({
                url: this.baseLayerUrls[i].url,
                visible: true, // this.baseLayerUrls[i].visible
              });
              if (this.baseLayerUrls[i].hasOwnProperty("id")) {
                tlayer.id = this.baseLayerUrls[i].id;
              }

              if (this.baseLayerUrls[i].visible === true) {
                tbasemaps.push(tlayer);
              } else {
                tlayer.visible = false;
                tbasemaps_1.push(tlayer);
              }
            } else if (this.baseLayerUrls[i].type === "dynamic") {
              let dlayer = new MapImageLayer({
                url: this.baseLayerUrls[i].url,
                visible: this.baseLayerUrls[i].visible,
              });
              if (this.baseLayerUrls[i].hasOwnProperty("id")) {
                dlayer.id = this.baseLayerUrls[i].id;
              }
              dbasemaps.push(dlayer);
            } else if (this.baseLayerUrls[i].type === "wmts") {
              if (
                this.baseLayerUrls[i].access_token &&
                this.baseLayerUrls[i].access_token === true
              ) {
                access_token =
                  "&access_token=" + this.$store.getters.access_token;
              }
              const _wmtsLayer = await createWmtsLayer(
                this.baseLayerUrls[i].id,
                this.baseLayerUrls[i].name,
                this.baseLayerUrls[i].url + access_token,
                this.tileInfo
              );
              _wmtsLayer.visible = true;
              if (this.baseLayerUrls[i].visible === true) {
                tbasemaps.push(_wmtsLayer);
              } else {
                _wmtsLayer.visible = false;
                tbasemaps_1.push(_wmtsLayer);
              }
            } else if (this.baseLayerUrls[i].type === "tdt") {
              const _tdtLayer = await createTDTLayer(
                this.baseLayerUrls[i].name,
                this.baseLayerUrls[i].name,
                this.baseLayerUrls[i].url
              );
              _tdtLayer.visible = true;
              _tdtLayer.on(
                "layerview-create",
                ((event) => {
                  if (_tdtLayer.name == "电子地图注记") {
                    this.swipeLayer = event.layerView;
                    // event.layerView.container._childrenRenderParameters.state.clipParas = {
                    //   type: "H",
                    //   width: this.swipeValue
                    // };
                    // this.swipeLayer.watch("updating", val => {
                    //   console.log(val);
                    // });
                  }
                }).bind(this)
              );
              if (this.baseLayerUrls[i].visible === true) {
                tbasemaps.push(_tdtLayer);
              } else {
                _tdtLayer.visible = false;
                tbasemaps_1.push(_tdtLayer);
              }
            }
          }
        } else {
          console.log("basemap config error");
          return;
        }

        const map = new Map();
        const shadowMap = new Map();
        // this.mapStore = new MapStore(map); // 实例化 mapStore 记录

        // 底图处理
        if (tbasemaps.length > 0) {
          const basemap = new Basemap({
            baseLayers: tbasemaps.concat(tbasemaps_1),
          });
          map.basemap = basemap;
          shadowMap.baseMap = basemap;
          this.viewConfig.basemap = basemap;

          // 临时方案 3D 底图，因为目前的 2d 底图都无法正常添加到 3维球体上
          let tileInfo = new TileInfo({
            dpi: 90.71428571427429,
            rows: 256,
            cols: 256,
            compressionQuality: 0,
            origin: {
              x: -180,
              y: 90,
            },
            spatialReference: {
              wkid: 4326, // 临时方案，后续采用客户统一的底图服务支持二维和三维显示
              // wkid: 4490
            },
            lods: [
              {
                level: 0,
                levelValue: 1,
                resolution: 0.703125,
                scale: 295497593.05875003,
              },
              {
                level: 1,
                levelValue: 2,
                resolution: 0.3515625,
                scale: 147748796.52937502,
              },
              {
                level: 2,
                levelValue: 3,
                resolution: 0.17578125,
                scale: 73874398.264687508,
              },
              {
                level: 3,
                levelValue: 4,
                resolution: 0.087890625,
                scale: 36937199.132343754,
              },
              {
                level: 4,
                levelValue: 5,
                resolution: 0.0439453125,
                scale: 18468599.566171877,
              },
              {
                level: 5,
                levelValue: 6,
                resolution: 0.02197265625,
                scale: 9234299.7830859385,
              },
              {
                level: 6,
                levelValue: 7,
                resolution: 0.010986328125,
                scale: 4617149.8915429693,
              },
              {
                level: 7,
                levelValue: 8,
                resolution: 0.0054931640625,
                scale: 2308574.9457714846,
              },
              {
                level: 8,
                levelValue: 9,
                resolution: 0.00274658203125,
                scale: 1154287.4728857423,
              },
              {
                level: 9,
                levelValue: 10,
                resolution: 0.001373291015625,
                scale: 577143.73644287116,
              },
              {
                level: 10,
                levelValue: 11,
                resolution: 0.0006866455078125,
                scale: 288571.86822143558,
              },
              {
                level: 11,
                levelValue: 12,
                resolution: 0.00034332275390625,
                scale: 144285.93411071779,
              },
              {
                level: 12,
                levelValue: 13,
                resolution: 0.000171661376953125,
                scale: 72142.967055358895,
              },
              {
                level: 13,
                levelValue: 14,
                resolution: 8.58306884765625e-5,
                scale: 36071.483527679447,
              },
              {
                level: 14,
                levelValue: 15,
                resolution: 4.291534423828125e-5,
                scale: 18035.741763839724,
              },
              {
                level: 15,
                levelValue: 16,
                resolution: 2.1457672119140625e-5,
                scale: 9017.8708819198619,
              },
              {
                level: 16,
                levelValue: 17,
                resolution: 1.0728836059570313e-5,
                scale: 4508.9354409599309,
              },
              {
                level: 17,
                levelValue: 18,
                resolution: 5.3644180297851563e-6,
                scale: 2254.4677204799655,
              },
              {
                level: 18,
                levelValue: 19,
                resolution: 2.68220901489257815e-6,
                scale: 1127.23386023998275,
              },
              {
                level: 19,
                levelValue: 20,
                resolution: 1.341104507446289075e-6,
                scale: 563.616930119991375,
              },
            ],
          });
          let tiledLayer = new WebTileLayer(
            "http://{subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE=default&FORMAT=tiles&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ac0daf56728bbb77d9514ba3df69bcd3",
            {
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              tileInfo: tileInfo,
            }
          );
          this.viewConfig.basemap3d = {
            baseLayers: [tiledLayer],
          };
        }
        if (dbasemaps.length > 0) {
          map.addMany(dbasemaps);
        }
        let regionGraphicLayer = new GraphicsLayer({
          id: "regionGraphicLayer",
        });
        map.add(regionGraphicLayer);
        this.regionGraphicLayer = regionGraphicLayer;

        // 将map添加到view中
        const mapNode = this.$refs.mapNode;
        // const mapNode3d = this.$refs.mapNode3d;
        const shadowNode = this.$refs.shadowMapNode;
        this.viewConfig.container = mapNode;
        // const shadowNode3d = this.$refs.shadowMapNode3d;

        // 初始化范围
        let option = await this.get2dMapInitParams();
        let option3d = await this.get3dMapInitParams();

        const mapView = this.createView(MapView, map, mapNode, option);
        this.viewConfig.mapView = mapView;
        this.viewConfig.activeView = mapView;
        // const mapView3d = this.createView(SceneView, map, mapNode, option3d); // 不能使用同一个 mapNode 会把 2dMap 覆盖掉
        const mapView3d = this.createView(SceneView, map, null, option3d);
        this.viewConfig.sceneView = mapView3d;
        // 把 view 都存起来，由于 map 作为一个组件给每个子系统使用，即拥有多个地图组件，因此不便放到 store 里管理
        // 单独使用 model 引入
        // 地图初始化的时候，通过使用共同的 map 对象（Model），底图的初始化，便把一系列的地图视图存起来，包括 shadowMapView。数据结构可以使用哈希表处理，可以对视图的增加、删除，新增视图
        // 在切换视图的时候，从 store 中获取视图，例如 sceneView，然后赋予给 mapView 即可（mapView 即是当前激活的视图，后期更改命名）
        // 并进行视图点的同步，这样一个懒方式。也可以针对多个视图同时存在的情况下，操作视图对其他视图同步处理。
        // this.mapStore.addView("2d", mapView);
        // this.mapStore.addView("3d", mapView3d);

        // let shadowMapView = null;
        // let shadowMapView3d = null;
        if (this.mapExport) {
          shadowMapView = this.createView(MapView, map, shadowNode, option);
          // shadowMapView3d = this.createView(
          //   // TODO 后续处理导出
          //   SceneView,
          //   map,
          //   shadowNode3d,
          //   option3d
          // );
        }

        // 初始化视图
        this.map = map;
        window.distMap = map;
        // if (this.sceneType === "2d") {
        //   this.mapView = mapView; // 后续切换视图需要更改的属性
        //   this.shadowMapView = shadowMapView;
        // } else if (this.sceneType === "3d") {
        //   this.mapView = mapView3d;
        //   this.shadowMapView = shadowMapView3d;
        // }
        // 同步当前激活的 view，这个切换视图也需要切换
        this.mapView = this.viewConfig.activeView;
        this.shadowMapView = this.viewConfig.activeView;
        await this.initView();
      },
      async initView() {
        const { watchUtils, lang } = await loadModules(
          "esri/core/watchUtils",
          "dojo/_base/lang"
        );
        this.mapView.ui.components = [];
        // 是否有图例
        if (this.legend) {
          const { Expand } = await loadModules("esri/widgets/Expand");
          let legendMount = document.createElement("div");
          let legendContainer = document.createElement("div");
          legendContainer.appendChild(legendMount);
          const scrLegend = Vue.extend(screenLegend);
          const instance = new scrLegend();
          this.legendInst = instance;
          instance.map = this.map;
          instance.mapView = this.mapView;
          instance.eventBus = this.eventBus;
          instance.store = this.$store;
          instance.mapVC = this;
          instance.module = this.module;
          instance.$mount(legendMount);
          const bgExpand = new Expand({
            view: this.mapView,
            mode: "floating",
            content: legendContainer,
            collapseIconClass: "esri-icon-overview-arrow-bottom-right",
            collapseTooltip: "隐藏图例",
            expandIconClass: "esri-icon-media",
            expandTooltip: "显示图例",
          });
          this.expandInst = bgExpand;
          this.mapView.ui.add(bgExpand, "bottom-right");
        }

        // 是否有全屏
        if (this.fullScreen) {
          const { Fullscreen } = await loadModules("esri/widgets/Fullscreen");
          const fullscreen = new Fullscreen({
            view: this.mapView,
          });
          this.mapView.ui.add(fullscreen, "bottom-right");
        }

        // 是否有全图
        if (this.fullMap) {
          const { Home } = await loadModules("esri/widgets/Home");
          this.homeWidget = new Home({
            view: this.mapView,
          });
          this.mapView.ui.add(this.homeWidget, "bottom-right");

          this.homeWidget.goToOverride = lang.hitch(this, function(mapView) {
            console.log("fullmap");

            let mapToPromise = mapView.goTo(this.initViewPoint, {
              duration: 500,
            });

            mapToPromise.then(
              lang.hitch(this, function() {
                this.$emit("map-full-extent", {
                  home: true,
                  scale: this.initViewPoint.scale,
                  x: this.initViewPoint.targetGeometry.x,
                  y: this.initViewPoint.targetGeometry.y,
                });
              })
            );
            return mapToPromise;
          });
        }

        // 是否有最大最小
        if (this.zoom) {
          const { Zoom } = await loadModules("esri/widgets/Zoom");
          const zoom = new Zoom({
            view: this.mapView,
          });
          this.mapView.ui.add(zoom, "bottom-right");
        }

        // 完成后发送map-ready事件
        window.distMapView = this.mapView;

        if (this.showScaleBar) {
          const { ScaleBar } = await loadModules("esri/widgets/ScaleBar");
          let scaleBar = new ScaleBar({
            view: this.mapView,
            unit: "metric",
            style: "ruler",
          });
          this.mapScalebar = scaleBar;
          this.mapView.ui.add(scaleBar, {
            position: "bottom-left",
          });
          if (this.shadowMapView) {
            let scaleBar = new ScaleBar({
              view: this.shadowMapView,
              unit: "metric",
              style: "ruler",
            });
            this.shadowScaleBar = scaleBar;
            this.shadowMapView.ui.add(scaleBar, {
              position: "bottom-left",
            });
          }
        }

        this.mapView.when(
          lang.hitch(this, function() {
            this.initViewPoint = this.mapView.viewpoint;
            if (this.sceneType == "3d") {
              // this.setShowGeo(
              //   options.extent,
              //   this.extent.heading,
              //   this.extent.tilt
              // );
              this.add3dLayer();
            }
            // this.originImg = mapView.allLayerViews.items[1].container.element.toDataURL();
            this.mapView.watch("extent", (val) => {
              this.$emit("map-extent", {
                type: val.type,
                extent: val.extent,
                center: val.center,
                scale: this.mapView.scale,
              });
            });
            this.toolTipTimeOut = setTimeout(() => {
              this.setToolTip();
            }, 1000);
            if (this.mapType === "alone") {
              // 为alone时，标识为distMap专有
              this.eventBus.$emit("mapInitReady", {
                map,
                mapView: this.mapView,
                mapDiv: this,
              });
              this.$emit("map-ready", {
                map,
                mapView: this.mapView,
                mapDiv: this,
              });
            } else if (this.mapType === "split") {
              // 为split时，标识为分屏地图页面
              this.$emit("map-ready-split", {
                map,
                mapView: this.mapView,
                mapDiv: this,
              });
            }
            setTimeout(this.addWidgetClickHandler, 500);
          })
        );
        // 监测主图范围变化更新打印图范围
        watchUtils.whenTrue(this.mapView, "stationary", () => {
          if (this.mapView.extent) {
            this.eventBus.$emit("mapExtentChange", {
              vueComponent: this,
              type: this.mapView.extent.type,
              extent: this.mapView.extent,
              center: this.mapView.extent.center,
              scale: this.mapView.scale,
            });
            if (this.shadowMapView) {
              this.shadowMapView.extent = this.mapView.extent;
            }
          }
        });
        if (this.shadowMapView) {
          this.shadowMapView.watch("stationary", (res) => {
            this.$emit("shdowMapExtentChange", res);
          });
        }
      },
      async switchView(viewType) {
        const open3d = viewType === "3d";
        this.viewConfig.activeView.container = null; // 移除上一个视图的容器引用，即隐藏视图
        if (open3d) {
          if (this.viewConfig.activeView.viewpoint) {
            this.viewConfig.sceneView.viewpoint = this.viewConfig.activeView.viewpoint.clone();
          }
          this.viewConfig.sceneView.container = this.viewConfig.container;
          this.viewConfig.activeView = this.viewConfig.sceneView;
          // 临时处理，后续统一底图坐标系，可以同时添加到二维和三维球体上的
          this.map.basemap = this.viewConfig.basemap3d;
          // const view = this.mapStore.findView("2d");
          // view.viewpoint = this.activeView.viewpoint;
          // this.mapView = view;
          // this.shadowMapView = this.mapStore.findView("2dshadow");
        } else {
          // 如果目前是 sceneView，同步 mapView 的视图点
          if (this.viewConfig.activeView.viewpoint) {
            this.viewConfig.mapView.viewpoint = this.viewConfig.activeView.viewpoint.clone();
          }
          this.viewConfig.mapView.container = this.viewConfig.container;
          this.viewConfig.activeView = this.viewConfig.mapView;
          this.map.basemap = this.viewConfig.basemap;
          // const view = this.mapStore.findView("3d");
          // view.viewpoint = this.activeView.viewpoint;
          // this.mapView = view;
          // this.mapView.container = ""
          // this.shadowMapView = this.mapStore.findView("3dshadow");
        }
        this.mapView = this.viewConfig.activeView;
        this.shadowMapView = this.viewConfig.activeView;
        // await this.initView();
      },
      /**
       * 创建地图视图：2d/3d
       */
      createView(viewType, map, containerNode, option) {
        const view = new viewType({
          map,
          container: containerNode,
          ...option,
        });
        return view;
      },
      /**
       * 增加三维数据
       */
      async add3dLayer() {
        if (this.d3Layer) {
          const { ElevationLayer, TileLayer } = await loadModules(
            "esri/layers/ElevationLayer",
            "esri/layers/TileLayer"
          );
          if (this.d3Layer.elevationLayer) {
            this.d3Layer.elevationLayer.forEach((url, index) => {
              let elevationLayer = new ElevationLayer(url);
              this.map.ground.layers.add(elevationLayer);
              if (index == 0) {
                elevationLayer.on(
                  "layerview-create",
                  ((event) => {
                    this.setShowGeo(
                      event.target.fullExtent,
                      this.extent.heading,
                      this.extent.tilt
                    );
                  }).bind(this)
                );
              }
            });
          }
          if (this.d3Layer.layers) {
            this.d3Layer.layers.forEach((item) => {
              let layer = null;
              if (item.type == "tileLayer") {
                layer = new TileLayer(item.url);
              }
              this.map.layers.add(layer);
            });
          }
        }
      },

      // 给地图右下角的小部件添加点击事件，用于记录日志
      addWidgetClickHandler() {
        if (
          this.mapView.ui._components &&
          this.mapView.ui._components.length > 0
        ) {
          this.mapView.ui._components.forEach((component) => {
            let node = component.node;
            if (node.className.indexOf("esri-expand") > -1) {
              node.addEventListener("click", () => {
                if (component.widget.expanded) {
                  this.functionLog(
                    this.curSubSystemName,
                    "图例",
                    "地图操作",
                    "打开"
                  );
                } else {
                  this.functionLog(
                    this.curSubSystemName,
                    "图例",
                    "地图操作",
                    "关闭"
                  );
                }
              });
            }
            if (node.className.indexOf("esri-fullscreen") > -1) {
              node.addEventListener("click", () => {
                this.functionLog(
                  this.curSubSystemName,
                  "地图全屏",
                  "地图操作",
                  "点击"
                );
              });
            }
            if (node.className.indexOf("esri-home") > -1) {
              node.addEventListener("click", () => {
                this.functionLog(
                  this.curSubSystemName,
                  "地图全图",
                  "地图操作",
                  "点击"
                );
              });
            }
            if (node.className.indexOf("esri-zoom") > -1) {
              node.addEventListener("click", (evt) => {
                if (evt.target.className.indexOf("esri-icon-plus") > -1) {
                  this.functionLog(
                    this.curSubSystemName,
                    "地图放大",
                    "地图操作",
                    "点击"
                  );
                } else if (
                  evt.target.className.indexOf("esri-icon-minus") > -1
                ) {
                  this.functionLog(
                    this.curSubSystemName,
                    "地图缩小",
                    "地图操作",
                    "点击"
                  );
                }
              });
            }
          });
        }
      },
      /**
       * 设置显示的extent
       */
      setShowGeo: function(geo, heading, tilt) {
        this.mapView.goTo({
          target: geo,
          heading: heading,
          tilt: tilt,
        });
      },
      setMapCenterPoint(x, y, level, scale) {
        console.log("test定位");
        this.locateByCoordinate(x, y, level, scale).then(() => {
          this.initViewPoint = this.mapView.viewpoint;
        });
      },
      getMapCenterPoint() {
        if (
          this.mapView.viewpoint.targetGeometry.latitude !== null &&
          this.mapView.viewpoint.targetGeometry.longitude !== null
        ) {
          if (this.mapView.spatialReference.wkid) {
            return {
              wkid: this.mapView.spatialReference.wkid,
              scale: this.mapView.scale,
              latitude: this.mapView.viewpoint.targetGeometry.latitude,
              longitude: this.mapView.viewpoint.targetGeometry.longitude,
            };
          } else {
            return {
              wkt: this.mapView.spatialReference.wkt,
              scale: this.mapView.scale,
              latitude: this.mapView.viewpoint.targetGeometry.latitude,
              longitude: this.mapView.viewpoint.targetGeometry.longitude,
            };
          }
        } else {
          if (this.mapView.spatialReference.wkid) {
            return {
              wkid: this.mapView.spatialReference.wkid,
              scale: this.mapView.scale,
              latitude: this.mapView.viewpoint.targetGeometry.x,
              longitude: this.mapView.viewpoint.targetGeometry.y,
            };
          } else {
            return {
              wkt: this.mapView.spatialReference.wkt,
              scale: this.mapView.scale,
              latitude: this.mapView.viewpoint.targetGeometry.x,
              longitude: this.mapView.viewpoint.targetGeometry.y,
            };
          }
        }
      },
      takeScreenshot(isShadow) {
        // html2canvas出图对filter置灰无效，故出图之前对置灰的canvas像素点进行灰度设置
        const mapView = isShadow ? this.shadowMapView : this.mapView;
        const mapNode = isShadow
          ? this.$refs.shadowMapNode
          : this.$refs.mapNode;
        const layerViews = mapView.allLayerViews.items;
        for (let i = 0; i < layerViews.length; i++) {
          const layer = layerViews[i];
          if (!layer.visible) {
            continue;
          }
          let element = layer.container.element;
          let opacity = layer.layer.opacity;
          if (opacity < 1) {
            let ctx = element.getContext("2d");
            const w = element.width;
            const h = element.height;
            let ctxData = ctx.getImageData(0, 0, w, h);
            for (let j = 0; j < ctxData.data.length; j += 4) {
              // 改变每个像素的透明度
              ctxData.data[j + 3] = ctxData.data[j + 3] * opacity;
            }
            ctx.putImageData(ctxData, 0, 0);
          }
          if (element && element.classList.contains("gray-map")) {
            let context = element.getContext("2d");
            const w = element.width;
            const h = element.height;
            let canvasData = context.getImageData(0, 0, w, h);
            for (let x = 0; x < canvasData.width; x++) {
              for (let y = 0; y < canvasData.height; y++) {
                let idx = (x + y * canvasData.width) * 4;
                let r = canvasData.data[idx + 0];
                let g = canvasData.data[idx + 1];
                let b = canvasData.data[idx + 2];
                let gray = 0.299 * r + 0.587 * g + 0.114 * b;
                canvasData.data[idx + 0] = gray;
                canvasData.data[idx + 1] = gray;
                canvasData.data[idx + 2] = gray;
              }
            }
            context.putImageData(canvasData, 0, 0);
          }
        }
        return html2canvas(mapNode, {
          backgroundColor: null,
        });
      },
      async _showScaleBar(showScaleBar) {
        if (showScaleBar) {
          const { ScaleBar } = await loadModules("esri/widgets/ScaleBar");
          let scaleBar = new ScaleBar({
            view: this.mapView,
            unit: "metric",
            style: "ruler",
          });
          this.mapScalebar = scaleBar;
          this.mapView.ui.add(this.mapScalebar, {
            position: "bottom-left",
          });
          if (this.shadowMapView) {
            let scaleBar = new ScaleBar({
              view: this.mapView,
              unit: "metric",
              style: "ruler",
            });
            this.shadowScaleBar = scaleBar;
            this.shadowMapView.ui.add(this.shadowMapScalebar, {
              position: "bottom-left",
            });
          }
        } else {
          this.mapScalebar && this.mapScalebar.destroy();
          this.mapView.ui.remove("scaleBar");
          if (this.shadowMapView) {
            this.shadowScaleBar && this.shadowScaleBar.destroy();
            this.shadowMapView.ui.remove("scaleBar");
          }
        }
      },

      getCurrentLegend() {
        if (this.legendInst) {
          return {
            topicLegend: this.legendInst.legendList,
            renderLegend: this.legendInst.renderColorLabelData,
          };
        }
        return null;
      },

      getCurrentShowLayers() {
        let showLayers = [];
        let baseLayers = this.map.basemap.baseLayers.items;
        baseLayers.forEach((item) => {
          if (item.visible) {
            showLayers.push(item);
          }
        });
        return showLayers;
      },

      setToolTip() {
        let homeDiv = document.querySelector(
          ".esri-component.esri-home.esri-widget--button.esri-widget"
        );
        if (homeDiv) homeDiv.title = "默认视图";
        let fullscreenDiv = document.querySelector(
          ".esri-component.esri-fullscreen.esri-widget--button.esri-widget"
        );
        if (fullscreenDiv) fullscreenDiv.title = "地图全屏";
        if (this.toolTipTimeOut) {
          clearTimeout(this.toolTipTimeOut);
          this.toolTipTimeOut = null;
        }
      },

      zoomToInitExtent() {
        this.homeWidget.go();
      },

      functionLog(subSysName, targetName, site, action) {
        log({
          systemName: subSysName,
          type: logType.FEATUREOPER,
          action: action,
          targetObj: targetName,
          site: site,
        });
      },
    },
  };
</script>

<style lang="scss">
  @import "./features/render.css";

  .shadow-map {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -100;

    .esri-view-root .esri-view-surface.esri-view-surface--inset-outline::after {
      content: none;
    }

    .esri-view-surface:focus {
      outline: none;
    }
  }

  .eyemap-map {
    width: 100%;
    height: 100%;

    .esri-view-root .esri-view-surface.esri-view-surface--inset-outline::after {
      content: none;
    }

    .esri-view-surface {
      z-index: 0 !important;
    }

    .esri-view-surface:focus {
      outline: none;
    }

    .esri-view-surface > div.esri-display-object:first-of-type {
      z-index: 1 !important;
    }

    .esri-expand__content.esri-expand__content--expanded {
      z-index: 3 !important;
    }
  }

  .esri-scale-bar__ruler-block {
    background-color: #000 !important;
  }

  .esri-ui .esri-ui-inner-container.esri-ui-corner-container {
    top: 0.94rem !important;
    left: 0.94rem !important;
    right: 0.94rem !important;
    bottom: 1rem !important;
  }

  .esri-ui
    .esri-ui-inner-container.esri-ui-corner-container
    .esri-ui-bottom-right {
    flex-flow: column-reverse;
  }
  .esri-ui
    .esri-ui-inner-container.esri-ui-corner-container
    .esri-ui-bottom-right.active {
    display: none;
  }
  .esri-ui
    .esri-ui-inner-container.esri-ui-corner-container
    .esri-ui-bottom-right
    .esri-component {
    margin-top: 10px;
  }

  /* infowindow */
  .esri-ui .esri-ui-inner-container.esri-ui-manual-container .esri-popup {
    display: none;
    position: absolute;
    /* height: 80px; */
    width: 8.88rem;
    min-width: 8.88rem;
    z-index: 100;
    border-radius: 0.26rem;
    -moz-border-radius: 0.26rem;
    -webkit-border-radius: 0.26rem;
    -o-border-radius: 0.26rem;
    -moz-box-shadow: 0 0 1em #26393d;
    border: 0px solid #046380;
    font-family: Microsoft YaHei, sans-serif;
    font-size: 0.63rem;
    background-color: rgba(109, 109, 109, 0.8);
  }

  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__main-container {
    /* position: absolute;
  height: 100%; */
    width: 100%;
    min-width: 8.88rem;
    z-index: 100;
    border-radius: 0.26rem;
    -moz-border-radius: 0.26rem;
    -webkit-border-radius: 0.26rem;
    -o-border-radius: 0.26rem;
    -moz-box-shadow: 0 0 1em #26393d;
    border: 0px solid #046380;
    font-family: Microsoft YaHei, sans-serif;
    font-size: 0.63rem;
    background-color: rgba(109, 109, 109, 0.8);
  }

  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__pointer,
  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__pointer
    > div {
    background-color: rgba(109, 109, 109, 0.8);
  }

  .esri-ui .esri-ui-inner-container.esri-ui-manual-container .esri-attribution,
  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__header,
  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__footer,
  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__feature-buttons {
    display: none;
  }

  .esri-ui
    .esri-ui-inner-container.esri-ui-manual-container
    .esri-popup
    .esri-popup__content {
    overflow: hidden;
    margin: 2px;
  }

  .esri-ui-bottom-right.esri-ui-corner {
    .esri-widget--button {
      width: 1.68rem;
      height: 1.68rem;

      .esri-icon {
        font-size: 0.84rem;
      }
    }

    .esri-component {
      margin-top: 0.526rem !important;
      margin-left: 0.526rem !important;
    }
  }

  /* 底图切换 */
  .esri-view-root
    .esri-ui
    .esri-ui-inner-container.esri-ui-corner-container
    .esri-basemap-toggle,
  .esri-view-root
    .esri-ui
    .esri-ui-inner-container.esri-ui-corner-container
    .esri-basemap-toggle
    > div,
  .esri-view-root
    .esri-ui
    .esri-ui-inner-container.esri-ui-corner-container
    .esri-basemap-toggle
    > div
    > div {
    width: 30px;
    height: 30px;
  }
</style>
```

## 加载三维数据

### 加载场景数据

## 一些必要调整

分屏

屏幕坐标-》地图坐标转换 toMap 在三维中转换有问题。

```js
this.mapPointerMoveHandler = this.mapView.on("point-move", (evt) => {
  let mapPoint = this.mapView.toMap({
    x: evt.x,
    y: evt.y,
  }); // null
});
this.curX = map.x.toFixed(2);
this.curY = map.y.toFixed(2);
```

需要判断 mapPoint 是否为空

下面的 extent 触发时，val 为 null，在 SceneView 下。
```js
mapView.when(
        lang.hitch(this, function() {
          this.initViewPoint = mapView.viewpoint;
          // this.originImg = mapView.allLayerViews.items[1].container.element.toDataURL();
          mapView.watch("extent", val => {
            this.$emit("map-extent", {
              type: val.type,
              extent: val.extent,
              center: val.center,
              scale: mapView.scale
            });
          });
          this.toolTipTimeOut = setTimeout(() => {
            this.setToolTip();
          }, 1000);
```

val 也为 null，原因在于没有用 extent 初始化。后续都需要处理。

分屏同步视点。

## 加载场景图层和高程图层

数据的生成

对应的加载图层

如何直到数据是高程数据还是场景数据。

ElevationLayer is a tile layer used for rendering elevations in SceneViews. A default world elevation layer can be added to the map by setting the map's ground property to world-elevation.

If the service is requested from a different domain, a CORS enabled server or a proxy is required.

The SceneLayer is a layer type designed for on-demand streaming and displaying large amounts of data in a SceneView. SceneLayers support two geometry types: Point and 3D Objects (e.g. Buildings).

[A guide to scene layers](http://localhost:8080/arcgis_js_v49_sdk/arcgis_js_api/sdk/latest/guide/working-with-scene-layers/index.html)

判断 layerType 类型：3dObject sts

**3D Object** scene layer	SceneLayer	yes (see renderers)	no	partially (see Query section of the SceneLayer class)	yes (see popupTemplate)	3D-object-sample
**Point cloud scene layer**	PointCloudLayer	yes (see supported
renderers in PointCloudRenderer)	no	no	no	point-cloud-samples
**Integrated mesh scene laye**r	IntegratedMeshLayer	no	no	no	no	integrated-mesh-sample
Point scene layer	SceneLayer

如何判断使用哪个 sceneLayer 和 evaluationLayer 

## 参考资料

- [viewing-modes](http://localhost:8080/arcgis_js_v49_sdk/arcgis_js_api/sdk/latest/api-reference/esri-views-SceneView.html#viewing-modes)
- [ArcGIS API for JavaScript 4.2学习笔记[21] 对3D场景上的3D要素进行点击查询【Query类学习】](https://www.cnblogs.com/onsummer/p/6421503.html)
- 《（简）超图软件-SM二三维一体化解决方案V1-20120619 (1)》pdf
- [ArcGis Api for JavaScript开发心得【原】](https://www.cnblogs.com/xionglee/articles/5814932.html)
- [三维GIS开发](http://www.bolemap.com/xtkf/3w/)
- 《SuperMap GIS二三维一体化开发实战》
- [2019 年 Esri 技术公开课（9）使用 ArcGIS JavaScript API 开发 Web 3D 应用](https://malagis.com/esri-open-class-2019-07-16.html) 从 ArcGIS 三维数据产生、ArcGIS 服务发布、ArcGIS 三维服务使用。
- 这个可以引入到地图中[使用 Javascript API for ArcGIS 4.X 实现二三维一体化](https://blog.csdn.net/qq_36264495/article/details/78032997?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase)
- [Esri Events](https://www.youtube.com/c/EsriEvents/search?query=3d) Esri 官方演讲视频
  - [Practical Guide to Building 3D Web Apps](https://www.youtube.com/watch?v=jmwCtQvGJTo)
- [ESRI 公开课 2019](https://malagis.com/category/esri-open-class-2019/2/)
- [WebGL 系列教程]()
- [node ~ zip 压缩 && 文件加密](https://juejin.im/post/5b455c41f265da0f9a2ccfe2)
- [百度地图]
- [SceneView](http://localhost:8080/arcgis_js_v49_sdk/arcgis_js_api/sdk/latest/api-reference/esri-views-SceneView.html)
- [arcgis api 4.x for js 之基础地图篇](https://zhuanlan.zhihu.com/p/33074260)
- [4.11API 在三维加载 wkid4490 天地图](http://zhihu.geoscene.cn/article/3942)
- [Switch view from 2D to 3D](http://localhost:8080/arcgis_js_v49_sdk/arcgis_js_api/sdk/latest/sample-code/views-switch-2d-3d/index.html)
- [SceneView](http://localhost:8080/arcgis_js_v49_sdk/arcgis_js_api/sdk/latest/api-reference/esri-views-SceneView.html#viewing-modes)
