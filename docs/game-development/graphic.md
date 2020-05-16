# 3D 游戏与计算机图形学中的数学方法


## 图形处理器


一个渲染成 3D 图形的典型场景通常由许多独立物体组成，物体的几何形状都被表示成顶点集合和表示顶点连接关系的特定图形元素。

图形硬件可以渲染单个顶点集合、连串的线段和一组填充多边形。在多数情况下，3D 模型的表面表示成三角形列表，其中的每个三角形引用顶点列表中的 3 个顶点。

![](../.vuepress/public/images/2020-05-14-22-57-47-openGL-basic-graphic.png)

### 独立显卡和集成显卡

![GPU 与 CPU 之间的通信](../.vuepress/public/images/2020-05-14-22-59-05-GPU-CPU-communicate.png)

### 顶点变换

![](../.vuepress/public/images/2020-05-14-23-00-23-vert-transform.png)

- 虚拟相机
- x、y 与显示器对齐，与观察者视线平行为 z。

渲染 2D、3D 图形。

## 向量

- 分量
- 标量

## 参考资料

- [电脑有独立显卡和没有独立显卡有什么区别](https://zhidao.baidu.com/question/744523442069143452.html)
- [是独立显卡好还是集成显卡好？](https://www.zhihu.com/question/24272857)
- [标量](https://zh.wikipedia.org/wiki/%E6%A0%87%E9%87%8F)