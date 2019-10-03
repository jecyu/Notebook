# markdown 语法

## 表格

```md

| 方法 | 说明 |
| --- | --- |
| GET | GE  |
```

## 画线

### 删除线

使用 `~~`包住要删除的文字
```md
~~要添加删除线的文字~~
```

### 下划线

```md
<u>CPU 的内部由寄存器、控制器、运算器和时钟四个部分构成。</u>
```

## 导航

### 方法一：手动

```md
1. [EventEmitter](#1.Tree)

## 列表

### 1.Tree
```

### 方法二：npm doctoc 生成目录

假如你的markdown文件在work/demo.md文件下，只需要cd work 切换到当前文件目录下，执行doctoc demo.md文件，即可在文档中自动生成目录。
```bash
npm i doctoc -g //install 简写 i
```

