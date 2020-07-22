/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-15 19:05:34
 * @LastEditTime: 2020-07-15 22:41:08
 * @LastEditors: Jecyu
 */ 
require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/ElevationLayer",
  "esri/layers/MapImageLayer",
  "esri/geometry/Point",
], function(Map, SceneView, ElevationLayer, MapImageLayer, Point) {
  var elevationLayer;

  // Create the Map
  var map = new Map({
    // basemap: "topo",
    // ground: "world-elevation"
  });

let pt = new Point({
    x: 96,
    y: 20,
    spatialReference: {
      wkid: 4490,
      wkt: 4490
    }
  });
  // Create the MapView
  var view = new SceneView({
    container: "viewDiv",
    map: map,
    // camera: {
    //   position: [-121.83, 48.279, 1346],
    //   heading: 300,
    //   tilt: 60
    // },
    center: pt,
    scale: 1155583,
  });
  // Create elevation layer and add to the map
  elevationLayer = new ElevationLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer",
    visible: false
  });

  
  const imageLayer = new MapImageLayer({
    url: "http://52.82.98.186:6080/arcgis/rest/services/XZQH/XZQH_polygon/MapServer",
    visible: false
  });

  map.ground.layers.add(elevationLayer);
  // imageLayer.spatialReference = {
  //   wkid: 4049
  // }
  map.add(imageLayer);
  console.log(map);
  // Register events on the checkbox and create the callback function
  // document.getElementById("landslideInput").addEventListener("change", function () {
  //   // If checkbox is checked, use after landslide elevation data
  //   elevationLayer.visible = document.getElementById("landslideInput").checked;
  // });
});