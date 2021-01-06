<!--
 * @Author: Jecyu
 * @Date: 2021-01-06 10:20:15
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-01-06 10:40:54
 * @FilePath: /Notebook/docs/temp/77-echart-踩坑总结.md
 * @Description:
-->


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

# 参考资料

- [（小小黑科技）vue+echarts 实现半圆图表](https://segmentfault.com/a/1190000018817351)
- https://echarts.apache.org/examples/zh/editor.html?c=sunburst-book
