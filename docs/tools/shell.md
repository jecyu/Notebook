# Shell 教程

目前遇到的问题：

sh 文件

```sh
#!/bin/bash -x
# throw error when scripts not work
set -e
target="scst-natural-resources-cli3"
time=$(date +"%Y-%m-%d-%H:%M:%S")
filename=${target}-${time}
cd $target
rm -rf node_modules

zip -r "${filename}".zip "./${target}"
```


解析后变成这样：

```sh
sh zip_natural-resouces.sh 
        zip warning: name not matched: ./scst-natural-resources-cli3

zip error: Nothing to do! (try: zip -r scst-natural-resources-cli3-2020-07-24-09:45:23.zip . -i ./scst-natural-resources-cli3)
```

多了 . -i 导致压缩错误

如果直接使用，是正常的

```sh
 zip -r scst-natural-resources-cli3-$(date +"%Y-%m-%d-%H:%M:%S").zip scst-natural-resources-cli3
```
两点注意：
- 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
- 完整的表达式要被 ` ` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。
  
- [一篇文章让你彻底掌握 shell 语言](https://juejin.im/post/5c767884f265da2dcc8001ae#heading-64)
- [你明白 shell、bash 和 zsh 等词的真正含义吗？](https://zhuanlan.zhihu.com/p/34197680)