# 概览


## GIS 组成要素

如果放大后查看大图仍不清晰，请右键新标签页打开。
<img :src="$withBase('/images/gis-component.png')" class="my-img">

## Arcgis 软件介绍

### Arcgis 的起源与发展

- 美国环境系统研究所公司（Environmental Systems Research Institute,Inc），简称 ESRI 公司。

- 在 1995年，为了满足了 BtoB 市场的需要，ESRI 推出了 **SDE**，这样空间数据和表格数据可以同时存储在商业的关系性数据库管理系统（DBMS）中。

- Arcgis 10.3 
  - 以用户为中心（Named User）的授权模式。
  - 3D 场景创建。
  - Web builder。
  - Open Data 数据开放。
- Arcgis 10.4
  - 3D、实时数据、矢量切片、影像。
  - 空间分析工具。
  - Portal ArcGIS 新增空间分析能力，支持国产达梦数据库，集成了 R 统计算法。
  - 灾难恢复工具。
  - ArcGIS for Server 站点支持只读模式，保护站点中的数据、图层和服务不会被纂改。
  - 平台安装部署升级，可以通过 ArcGIS Cookbook 在多台 GIS 服务器上实现无人值守式一键安装。

### ArcGIS 10.4 的体系结构

- 地图制作
- 空间数据管理
- 空间分析
- 空间信息整合
- 发布与共享

在新一代 Web GIS 的应用模式中，资源和功能都进一步整合，GIS 服务的提供者以 Web 的方式提供资源和功能，而用户则采用多种终端随时随地访问这些资源和功能。不再受限于软件产品与功能级别，而是更加注重应用模式及应用架构。

![](../.vuepress/public/images/Arcgis-platform.png)

Named User: Named User 是登入新一代 Web GIS 平台的密钥。
门户（Portal）：ArcGIS 平台的访问控制中枢，是用户是心啊多维内容管理、跨部门协同分享、精细化访问控制，以及便捷地发现和使用 GIS 资源的渠道。


服务器（Server）：Server 包括 ArcGIS for Server、Content 和 Services。它是空间数据和GIS 分析能力在 Web 中发挥价值的关键。负责将数据转换为 GIS 服务（GIS Service），通过浏览器和多种设备将服务带到更多人身边。

### ArcGIS for Desktop

主要程序包括：
- ArcMap
- ArcCatalog
- ArcToolbox
- ArcGlobe
- ArcScene
- ModelBuilder
- 扩展模块等。

提供功能：
- 空间分析
- 数据管理
  - 用户可以轻松集成所有类型的数据进行可视化和分析。
  - 几乎数据、属性表、元数据。
- 制图和可视化
- 高级编辑
- 地理编码
  - 使用地理编码地址，可以显示地址的空间位置，并识别出信息中事物的模式。
- 地图投影。
  - 诸多投影和地理坐标系统的选择，可以将来源不同的数据集合并到共同的框架中。
- 高级影像。
- 数据分享
  - 可以使用 ArcGIS Online 或 Portal for ArcGIS 中的资源

#### ArcMap

ArcMap 集成传统的空间数据编辑、查询、显示、分析、报表、制图。
ArcMap 提供两种类型的操作界面:
- 地理数据视图
  - 能对地理图层进行符号化显示、分析和编辑 GIS 数据集。
- 地理布局视图
  - 可以处理地图的版面，包括地理数据视图和比例尺、图例、指北针等地图元素。
  
#### ArcCatalog

ArcCatalog 是地理数据的资源管理器，用于组织和管理所有 GIS 数据，它包含一组供具用于浏览和查找地理数据、记录和浏览元数据、快速显示数据集，以及为地理数据定义数据结构。帮助用户组织和管理所有的 GIS 信息，如地图、数据集、模型、元数据、服务等。

![](../.vuepress/public/images/ArcCatalog.png)

- 浏览和查找地理信息；
- 创建各种数据类型的数据；
- 记录、查看和管理元数据；
- 定义、输入和输出 Geodatabase 数据模型；
- 在局域网和广域网上搜索和查找的 GIS 数据；
- 管理运行于 SQL Server Express 中的 ArcSDE Geodatabase；
- 管理文件类型的 Geodatabase 和个人类型的 Geodatabase；
- 管理企业级 Geodatabase，支持的大型关系数据库包括 DB2、Informix、SQL Server（including SQL Azure）、Netezza、Oracle、PostgresSQL 及国产的达梦数据库；
- 管理多种 GIS 服务；
- 管理数据库操作连接。

#### ArcToolbox

ArcToolbox 是一个地理数据处理工具的集合，涵盖数据处理、转换、制图分析等多方面的功能，在 ArcCatalog、ArcMap、ArcScene、ArcGlobe 中单击下图工具按钮即可进入 ArcToolbox。

![ArcToolbox 界面](../.vuepress/public/images/ArcToolbox.png)

#### ArcGlobe 

ArcGlobe 是 ArcGIS for Desktop 中 3D 分析扩展模块中的一个部分，提供了全球地理信息的连续、多分辨率的交互式浏览功能。像 ArcMap 一样， ArcGlobe 也是使用 GIS 数据层，显示 Geodatabase 和所有支持的 GIS 数据格式中的信息的。ArcGlobe 具有地理信息的动态 3D 视图。ArcGlobe 创建的 Globe 文档可以使用 ArcGIS for Server 将其发布为服务，通过 ArcGIS for Server 球体服务（Globe Service）向众多 3D 客户端提供服务。

#### ArcScene

ArcScene 是 ArcGIS Desktop 中专门用于显示于分析三维数据的独立程序。ArcScene 的功能包括浏览三维数据、创建表面、进行表面分析、三维飞行模拟等。ArcScene 可以看成 ArcGlobe 的一个子集，它们都依赖于展示三维透视场景的平台，可以在三维场景中漫游并与三维矢量与栅格数据进行交互，适用于小场景的 3D 显示与分析。ArcScene 基于 OpenGL，支持 TIN 数据据显示。

#### ModelBuilder

ModelBuilder （模型构建器）是数据建模工具，它为设计和实现 ArcGIS 中各种数据处理提供了一个图形化的建模环境。模型是以流程图的形式表示的，这个流程由（数据处理）工具和数据组成。整个数据处理过程按流程图先后执行，类似电子政务中工作流，都是顺序、支持并行，都有数据输入和数据输出，不同的是它没有人员和权限、办理时限等。

用户可以按照自己的需求，只需选择输入数据源，指定结果输出路径，设置参数即可执行分析。

![Model-Builder 界面](../.vuepress/public/images/Model-Builder.png)

### 扩展模块

ArcGIS for Desktop 提供了一系列的扩展模块，使得用户可以实现高级分析功能，如栅格空间处理和 3D 分析功能。

- 分析类
- 生产类
- 解决方案类

### ArcGIS Pro

ArcGIS Pro 是一款全新的桌面应用程序，它改变了桌面 GIS 的工作方式。给专业 GIS 人员使用。二三维一体化。

### ArcGIS for Server



### ArcGIS Online

### ESRI CityEngine

## 问题

### ArcGlobe 与 ArcScene 有什么区别?