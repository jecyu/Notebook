# unity 游戏引擎

## 基础

### 工程目录

```bash
Apple Pcker Prototyp
  - Apple Pcker Prototyp.sln
  - Assembly-CSharp.csproj
  - Assets # 图片、脚本、模型
  - Library # 依赖的一些库
  - Logs
  - obj
  - Packages
  - ProjectSettings # 项目的配置
```

### Unity 面版

![](../.vuepress/public/images/unity-panel.png)

### 什么是 Unity 中的场景

游戏的场景跟电影的场景类似，一个场景具有多个人物对象，一部电影由多个场景组成。同理，一个游戏由多个场景组成，可以从一个场景切换到另一个场景，且不同的场景下具有不同的游戏对象。

创建场景：File0 -> New Scene，命名为 _Scene，生成的场景文件有两个：
- _Scene_.unity
- _Scene_.unity.meta

![scene](../.vuepress/public/images/unity-scene.png)

直接点击播放按钮后，即可运行场景。如果所有游戏对象和逻辑都放在一个场景中，后续会难以管理和维护。因此，一般游戏中都由多个场景组成。例如，游戏开始界面为一个场景，游戏进行的界面为一个场景，而游戏结束界面也为一个场景。

### Unity 中怎么操作视野

- 按住鼠标右键，可以上下左右旋转视野。
- 按住 Alt + 鼠标左键，可以居于某一点（例如聚焦某一个游戏对象）进行拖动。
- 按住 Alt + 鼠标右键，可以对视野放大缩小。
- 可以通过右上角的坐标轴
  - 进行不同坐标轴组合的观察。
  - 也可以选择透视视野（近大远小）、正交视野（近远大小一样）
- 按住鼠标中键（或者 Q 键）可以平移。
- 选中物体，鼠标单击
- 鼠标双击聚焦游戏对象（或者使用 F 键）
- 放大缩小，鼠标滚轮。mac 触摸屏，两个手指同时上下滑动。

操作游戏对象，一般流程：先聚焦 -> 然后结合快捷键旋转观察 -> 进行调整

![unity-scene-opera](../.vuepress/public/images/2020-04-27-22-09-40-unity-scene-opera.png)

### Unity 中游戏物体的基本操作

### Unity 中游戏物体和组件的关系

## 入门

### Transform

`Transform` 可以说是每个游戏对象上必备的组件，主要有两个作用：一个是控制游戏对象的位置、旋转和缩放，**第二个是管理游戏对象间的父子关系。**所以说 Transform 并不止是在 Unity Inspector 上看到的仅仅三个属性：position、rotation、Scale。

打开 Unity 创建一个 Cube 物体，然后给 Cube 物体添加一个脚本,新建的 cube 可能不在原点，这时可以选中 Cube 物体，然后在 Inspector 面板中找到 Transform 属性，右键点击 Transform，可以弹出下面的对话框，点击 reset 就可设置 Cube 物体到原点了。

#### 管理游戏对象间的父子关系

可以通过 transfrom 查找当前游戏对象的孩子游戏对象或者父亲游戏对象

```cs
public class Test: MonoBehaviour {
  void Start() {
    // 获取当前游戏父对象的 transform 组件
    transform.parent;
    // 当前游戏对象的根对象 transform 组件
    transform.root;
    // 获取当前游戏对象 叫做 Cube 的对象的 transform 组件
    transform.Find("Cube");
    // // 获取当前游戏对象 叫做 Cube 的子对象
    // transform.FindChild("Cube");  
  } 
}

```

```cs
 // 用一个 List 返回游戏对象或其子对象的所有材质
  static public Material[] GetAllMaterials(GameObject go)
  {
    List<Material> mats = new List<Material>();
    if (go.GetComponent<Renderer>() != null)
    {
      mats.Add(go.GetComponent<Renderer>().material);
    }
    foreach (Transform t in go.transform)
    {
      mats.AddRange(GetAllMaterials(t.gameObject));
    }
    return mats.ToArray();
  }
```

##### 遍历子对象

**问题**：如何遍历一个游戏物体的子对象

**分析**：Unity 中的 `GameObject` 是没有层次关系的，但是每个`GameObject` 都有一个 `transform` 组件，这个组件实现了`IEnumerable` 接口，从而支持计数器，因此可以使用循环遍历子物体。

方法一：

```cs
 void FindObjects(GameObject obj){
  print (obj.transform.childCount);
  int i=0;
  while(i<obj.transform.childCount){
   Transform parent=obj.transform.GetChild(i);
   print ("parent: "+obj.name+"child: "+i+" "+parent.name);
   if(parent.childCount>0)
    FindObjects(parent.gameObject);
   i++;
  }
 } 
```

方法二：

```cs
foreach（Transform t in transform）｛  ｝
```

### 鼠标

```cs
// 获取鼠标光标在二维窗口中的坐标
Vector3 mousePos2D = Input.mousePosition;
// 将鼠标光标位置转换为三维世界坐标
mousePos2D.z = -Camera.main.transform.position.z;
Vector3 mousePos3D = Camera.main.ScreenToWorldPoint(mousePos2D);
```

鼠标移入移出

```cs
  //  OnMouseEnter 和 OnMouseExit 需要添加 collider 组件，并且 isTrigger = false
  private void OnMouseEnter()
  {
    //print("Slingshot: OnMouseEnter()");
    launchPoint.SetActive(true);
  }

  private void OnMouseExit()
  {
    //print("Slingshot: OnMouseExit()");
    launchPoint.SetActive(false);
  }
```

按下鼠标

```cs
  private void OnMouseDown()
  {
    // 玩家在鼠标光标悬停在弹弓上方时按下了鼠标左键
    aimingMode = true;
    // 实例化一个弹丸
    projectile = Instantiate(prefabProjectile) as GameObject;
    // 该实例的初始位置位于 launchPoint 处
    projectile.transform.position = launchPos;
    // 设置当前的 Kinematic 属性
    projectile.GetComponent<Rigidbody>().isKinematic = true;
  }
```

松开鼠标

```cs
if (Input.GetMouseButtonUp(0))
    {
      // 如果已经公开鼠标
      aimingMode = false;
      projectile.GetComponent<Rigidbody>().isKinematic = false;
      projectile.GetComponent<Rigidbody>().velocity = -mouseDelta * velocityMult;
      FollowCam.S.poi = projectile; // 同步摄像机兴趣点
      projectile = null;
      MissionDemolition.ShotFired(); // 增加发射次数
    }
```

### 碰撞检测

## 进阶

## 底层原理

## 参考资料

- 《游戏引擎架构》深入某个方向（如渲染、动画）
- Unity 工作一年能力应该达到什么水平？
