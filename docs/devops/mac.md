# mac

## mac 电脑如何输入数学符号

- 输入≈，按【option+x】，那么即可输入。
- 输入度数，那么按键盘【shift+option+8】。
- 要输小于或者等于，或者是大于等于，那么分别按【option+，】【option+。】，即可输入对应的符号。
- 输入不等于，则按【option+=】即可输入。
- 输入除号则输入【option+/】，那么即可输入。
- 输入无穷大符号，则按【option+5】，那么即可输入了。
- 输入圆周率的，则按【option+p】即可输入
- 输入正负号，则按键盘【shift+option+=】，那么即可输入了。
- 要输入开方符号，那么按键盘【option+v】，即可输入【√】。
- 输入求和符号则按【option+w】，就能够输入了的【∑】。

## 电脑上如何输入 Emoji 表情?

`control + command + 空格`

## Mac 下自带的预览程序查看图片的时候如何连续翻页

### 导语

只能单张单张的点开看，不能像 win 里面那样直接翻看同一个文件夹里的下一张。

### 解决

把图片全部放在统一个文件夹内，然后 command + a 全部选中，右键点击打开。切换图片，用方向键。

## 命令行tree命令生成文件树

为了方便查看文件内容以及相关目录，我们一般用文件树进行操作，在windows系统下，我们可以直接使用tree命令进行操作：
`->`是输出到 list.txt 文件中。
```bash
tree -> list.txt  
```

那么对于Mac OS或者Linux系统，可以通过以下命令安装tree这个生成插件，打开终端并输入：（没有安装brew请先输入brew install）
```bash
brew install tree
```

然后进入文件夹下，在命令行输入：
```bash
tree -a
```
接着我们就可以在终端看到当前的目录树。除此之外，我们还有其他的参数可以设置：
<table>
  <thead>
    <tr>
      <td>命令行</td>
      <td>效果</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tree -d</td>
      <td>只显示文件夹</td>
    </tr>
    <tr>
      <td>tree -D</td>
      <td>显示文件的最后修改时间</td>
    </tr>
    <tr>
      <td>tree -L</td>
      <td>n 表示显示项目的层级，n=3 即只显示项目的三层结构</td>
    </tr>
    <tr>
      <td>tree -l pattern</td>
      <td>pattern 表示想要过滤的目录，例如 tree -l "node_modules" 可以过滤掉 node_modules 这个文件夹</td>
    </tr>
  </tbody>
</table>
这里，这里的参数 `-d`、`-D`区分大小写。