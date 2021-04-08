# Echart 5.x 项目总结

## Echart 5.x

dataSet，https://echarts.apache.org/en/tutorial.html#Dataset

series 一个 series 代表一种图形的显示，

x轴 和 y 轴的类型

'catogery' 分类

### 圆环图

https://echarts.apache.org/zh/option.html#series-pie.encode

```js
 const pieOption: any = ref({
      legend: {
        show: true,
        data: ["旱地", "水田", "水浇地"],
        orient: "vertical",
        top: 0,
        right: 0,
        textStyle: {
          color: "#fff"
        }
      },
      dataset: {
        dimensions: ["type", "area", "radio"],
        source: [
          {
            type: "旱地",
            area: "271444.47",
            radio: "56.22%"
          },
          {
            type: "水田",
            area: "209667.39",
            radio: "43.42%"
          },
          {
            type: "水浇地",
            area: "1752.29",
            radio: "0.36%"
          }
        ]
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          encode: {
            itemName: "type",
            value: "area"
          },
          label: {
            color: '#fff',
            formatter: '{d}%'
          },
        }
      ]
    });
```

### 柱状图

```js
const barChartOption = ref({
      textStyle: {
        color: "#fff",
        overflow: "break"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#fff"
          }
        }
      },
      dataset: {
        dimensions: ["regionName", "gdxzmj", "gdbyl", "gdhbzy"],
        source: [
          {
            regionName: "兴宁区",
            gdxzmj: "117.976087",
            gdbyl: "119.226999 ",
            gdhbzy: "50.845294 "
          },
          {
            regionName: "青秀区",
            gdxzmj: "197.803053",
            gdbyl: "199.900379 ",
            gdhbzy: "85.249092 "
          },
          {
            regionName: "江南区",
            gdxzmj: "338.247211",
            gdbyl: "341.833680 ",
            gdhbzy: "145.777667 "
          },
          {
            regionName: "西乡塘区",
            gdxzmj: "343.955377",
            gdbyl: "347.602370 ",
            gdhbzy: "148.237771 "
          },
          {
            regionName: "良庆区",
            gdxzmj: "244.661483",
            gdbyl: "247.255653 ",
            gdhbzy: "105.444122 "
          },
          {
            regionName: "邕宁区",
            gdxzmj: "370.91938",
            gdbyl: "374.852275 ",
            gdhbzy: "159.858708 "
          },
          {
            regionName: "武鸣区",
            gdxzmj: "770.157316",
            gdbyl: "778.323371 ",
            gdhbzy: "331.922137 "
          },
          {
            regionName: "隆安县",
            gdxzmj: "509.074562",
            gdbyl: "514.472330 ",
            gdhbzy: "219.400781 "
          },
          {
            regionName: "马山县",
            gdxzmj: "411.334123",
            gdbyl: "415.695540 ",
            gdhbzy: "177.276640 "
          },
          {
            regionName: "上林县",
            gdxzmj: "406.021628",
            gdbyl: "410.326716 ",
            gdhbzy: "174.987062 "
          },
          {
            regionName: "宾阳县",
            gdxzmj: "747.364887",
            gdbyl: "755.289272 ",
            gdhbzy: "322.099064 "
          },
          {
            regionName: "横县",
            gdxzmj: "891.043591",
            gdbyl: "900.491415 ",
            gdhbzy: "384.021662 "
          }
        ]
      },
      xAxis: { type: "category", nameTextStyle: { overflow: "truncate" } },
      yAxis: {
        show: false
      },
      series: [
        {
          type: "bar",
          encode: {
            x: "regionName",
            y: "gdxzmj"
          },
          barWidth: "25%",
          itemStyle: {
            borderRadius: 25
          }
        },
        {
          type: "line",
          encode: {
            // Map dimension "regionName" to the X axis.
            x: "regionName",
            // Map dimension "gdxzmj" to the Y axis.
            y: "gdxzmj"
          }
        }
      ]
    });
```

## Echart 3.x/4.x 写法

###  圆环图

```js
  tooltip: {
        trigger: "item"
      },
      legend: {
        bottom: "5%"
      },
      series: [
        {
          name: "耕地类别",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" }
          ]
        }
      ]
```

### 柱状图

```js
  textStyle: {
        color: "#fff",
        overflow: "break"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#fff"
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ["蒸发量", "降水量", "平均温度"]
      },
      xAxis: [
        {
          type: "category",
          data: [
            "青秀区",
            "兴宁区",
            "江南区",
            "良庆区",
            "邕宁区",
            "西乡塘区",
            "横县",
            "隆安县",
            "武鸣县"
          ],
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "全市耕地现状面积 5348.56 ⬆",
          show: false,
          min: 0,
          max: 500,
          interval: 50,
          axisLabel: {
            formatter: "{value} ml"
          }
        }
      ],
      series: [
        {
          name: "耕地现状面积",
          type: "bar",
          data: [
            472.0,
            474.9,
            477.0,
            4123.2,
            4125.6,
            476.7,
            435.6,
            462.2,
            432.6
          ],
          barWidth: "25%",
          itemStyle: {
            borderRadius: 25
          }
        },
        {
          name: "耕地现状面积",
          type: "line",
          data: [472.0, 474.9, 477.0, 423.2, 425.6, 476.7, 435.6, 462.2, 432.6]
        }
      ]
```



### 扇形图

```json
{
  "tooltip": {
    "confine": "true",
    "trigger": "axis",
    "axisPointer": { "type": "shadow" },
    "formatter": {
      "_custom": { "type": "function", "display": "<span>ƒ</span> (params)" }
    }
  },
  "grid": { "top": 170, "bottom": 25, "left": 60 },
  "legend": {
    "top": 10,
    "left": "center",
    "itemWidth": 15,
    "itemHeight": 10,
    "textStyle": { "fontSize": 10 },
    "data": [
      "三调林地和一张图林地无冲突",
      "三调林地且一张图非林地",
      "三调林地和一张图林地无冲突",
      "一张图林地且三调非林地",
      "农业生产适宜",
      "农业生产不适宜",
      "农业生产适宜",
      "农业生产不适宜",
      "农业生产适宜",
      "农业生产不适宜",
      "农业生产适宜",
      "农业生产不适宜"
    ],
    "selected": {
      "三调林地和一张图林地无冲突": true,
      "三调林地且一张图非林地": true,
      "一张图林地且三调非林地": true,
      "农业生产适宜": true,
      "农业生产不适宜": true
    }
  },
  "yAxis": {
    "type": "category",
    "data": ["南宁市"],
    "inverse": true,
    "axisLabel": { "interval": 0 },
    "triggerEvent": true
  },
  "xAxis": {
    "type": "value",
    "position": "top",
    "axisLabel": { "formatter": "{value}" },
    "min": 0,
    "max": 100,
    "splitNumber": 5
  },
  "series": [
    {
      "name": "三调林地和一张图林地无冲突",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6772,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 1,
          "rank": "三调林地和一张图林地无冲突",
          "content": "area",
          "result": "1045213.272",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G1-1",
          "ratioUnit": "占三调林地（%）",
          "ratio": 0.838,
          "areaUnit": "面积（公顷）",
          "area": 1045213.272,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 83.8
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "三调林地且一张图非林地",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6776,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 2,
          "rank": "三调林地且一张图非林地",
          "content": "area",
          "result": "201788.841",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G1-2",
          "ratioUnit": "占三调林地（%）",
          "ratio": 0.162,
          "areaUnit": "面积（公顷）",
          "area": 201788.841,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 16.2
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "三调林地和一张图林地无冲突",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6780,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 3,
          "rank": "三调林地和一张图林地无冲突",
          "content": "area",
          "result": "1045213.272",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G2-1",
          "ratioUnit": "占林业一张图林地（%）",
          "ratio": 0.946,
          "areaUnit": "面积（公顷）",
          "area": 1045213.272,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 94.6
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "一张图林地且三调非林地",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6784,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 4,
          "rank": "一张图林地且三调非林地",
          "content": "area",
          "result": "59647.108",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G2-2",
          "ratioUnit": "占林业一张图林地（%）",
          "ratio": 0.053,
          "areaUnit": "面积（公顷）",
          "area": 59647.108,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 5.3
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6788,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 5,
          "rank": "农业生产适宜",
          "content": "area",
          "result": "106706.467",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G1-1-1",
          "ratioUnit": "占比（%）",
          "ratio": 0.086,
          "areaUnit": "面积（公顷）",
          "area": 106706.467,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 8.6
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产不适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6792,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 6,
          "rank": "农业生产不适宜",
          "content": "area",
          "result": "938506.805",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G1-1-2",
          "ratioUnit": "占比（%）",
          "ratio": 0.753,
          "areaUnit": "面积（公顷）",
          "area": 938506.805,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 75.3
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6796,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 7,
          "rank": "农业生产适宜",
          "content": "area",
          "result": "116544.007",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G1-2-1",
          "ratioUnit": "占比（%）",
          "ratio": 0.093,
          "areaUnit": "面积（公顷）",
          "area": 116544.007,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 9.3
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产不适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6800,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 8,
          "rank": "农业生产不适宜",
          "content": "area",
          "result": "85244.834",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G1-2-2",
          "ratioUnit": "占比（%）",
          "ratio": 0.068,
          "areaUnit": "面积（公顷）",
          "area": 85244.834,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 6.8
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6807,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 9,
          "rank": "农业生产适宜",
          "content": "ratioUnit",
          "result": "占比（%）",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G2-1-1",
          "ratio": 0.097,
          "areaUnit": "面积（公顷）",
          "area": 106706.467,
          "ratioUnit": "占比（%）",
          "contentArr": ["ratioUnit", "area", "areaUnit", "ratio"],
          "value": 9.7
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产不适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6808,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 10,
          "rank": "农业生产不适宜",
          "content": "area",
          "result": "938506.805",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G2-1-2",
          "ratioUnit": "占比（%）",
          "ratio": 0.849,
          "areaUnit": "面积（公顷）",
          "area": 938506.805,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 84.9
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6812,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 11,
          "rank": "农业生产适宜",
          "content": "area",
          "result": "30749.485",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G2-2-1",
          "ratioUnit": "占比（%）",
          "ratio": 0.028,
          "areaUnit": "面积（公顷）",
          "area": 30749.485,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 2.8
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    },
    {
      "name": "农业生产不适宜",
      "type": "bar",
      "barWidth": 15,
      "data": [
        {
          "id": 6816,
          "year": "2020",
          "regionCode": "450100000000",
          "regionName": "南宁市",
          "kind": "林地优化调整",
          "mapName": "农业生产适宜性集成评价结果",
          "rankCode": 12,
          "rank": "农业生产不适宜",
          "content": "area",
          "result": "28777.129",
          "productName": "林地中农业生产适宜性分析",
          "relation": "G2-2-2",
          "ratioUnit": "占比（%）",
          "ratio": 0.026,
          "areaUnit": "面积（公顷）",
          "area": 28777.129,
          "contentArr": ["area", "areaUnit", "ratio", "ratioUnit"],
          "value": 2.6
        }
      ],
      "stack": "总量",
      "itemStyle": { "normal": { "color": "" } }
    }
  ]
}
```

```js

computed() {
multipleChartOption() {
      const options = [];
      const { series } = this.optionData;
      // series.startAngle = 180;
      series.data.forEach(item => {
        const obj = deepCloneByWeakMap(this.optionData);
        options.push(obj);
      });

      // 处理 echart 数据为扇形
      options.forEach((option, optionIndex) => {
        let targetValue = 0;
        // 先获得目标值
        option.series.data.forEach((item, index) => {
          if (index === optionIndex) {
            targetValue = item.value / 100;
          }
        });
        // 再处理其他的值
        option.series.data.forEach((item, index) => {
          if (index !== optionIndex) {
            const otherValue = 1 - targetValue / (options.length - 1);
            item.value = otherValue * 100;
            item.itemStyle = {
              normal: {
                color: "#ffffff"
              }
            };
            item.tooltip = { formatter: () => "" };
          }
        });
      });
      return options;
    },
}

```

### 圆形

### Echarts 的旭日图如何显示 tooltip

```js
const option = {
  tooltip: {
    trigger: "item", // 必须设置这个，否则没效果
    formatter: function(params) {
      // const { name } = param;
      // const item = data[dataIndex];
      // let str = `${name}<br>`;
      // const { marker, value } = params[0];
      // str += `${marker}占比：${value} %<br>`;
      // str += `${marker}面积：${item[area]} 公顷`;
      return "你好";
    },
  },
  series: [],
};
```

### echarts tooltip 超出容器被遮挡的解决办法

- tooltip.confine 设为 true
- 或者使用 extraCssText，添加 zindex

### 旭日图文字过长如何处理

最好的效果是超出图形区域时，显示省略号，放大区域时，则恢复原文字。

![](../.vuepress/public/images/2021-01-07-11-45-15.png)

比如图中的三调林地且一张图非林地。

暂无解决方法，可以不设置文字，然后通过图例来展示相关的文字？

间接方案：

```js
const option = {
  label: {
    // fontSize: 10
    containLabel: false,
    formatter: function(param) {
      const { name } = param;
      // 根据图形大小，来设置截断的长度
      // TODO 更好的方式是获取 echart 的大小
      // 1. 获取文字最长的项目
      // 2. 与 echart 的宽度/叶子的层级，如果大于该长度，则设置省略号，否则原样显示
      let str = name;
      if (name.length > 4) {
        str = name.substring(0, 4) + "...";
      } else {
        str = name;
      }
      return str;
    },
  },
};
```

# 参考资料

- [echart 饼图 label 超出绘图区域显示省略号](https://blog.csdn.net/qq_41882147/article/details/82793516)
- [echarts tooltip 超出容器被遮挡的解决办法](https://blog.csdn.net/Soul_mate_61/article/details/83410949)
- [（小小黑科技）vue+echarts 实现半圆图表](https://segmentfault.com/a/1190000018817351)
- https://echarts.apache.org/examples/zh/editor.html?c=sunburst-book
- [Echarts 设置 tooltip 层级 z-index](https://blog.csdn.net/weixin_43207025/article/details/108670430)
- [echarts 图表文字大小自适应](https://blog.csdn.net/qq_39122996/article/details/102454644)
