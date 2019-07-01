# Git 常用命令集合

![git 常用命令](../.vuepress/public/images/git-command.jpg)

> Git 常用命令集合，Fork 于[tips](https://github.com/521xueweihan/git-tips#%E6%9F%A5%E7%9C%8B%E6%9F%90%E6%AE%B5%E4%BB%A3%E7%A0%81%E6%98%AF%E8%B0%81%E5%86%99%E7%9A%84)项目

Git 是一个“分布式版本管理工具”，简单的理解版本管理工具：大家在写东西的时候都用过“回撤”这个功能，但是回撤只能回撤几步，假如想要找回我三天之前的修改，光用“回撤”是找不回来的。而“版本管理工具”能记录每次的修改，只要提交到版本仓库，你就可以找到之前任何时刻的状态（文本状态）。

下面的内容就是列举了常用的 Git 命令和一些小技巧，可以通过"页面内查找"的方式进行快速查询：`Ctrl/Command+f`。

## 开卷必读

如果之前未使用过 Git，可以学习[猴子都能懂的 GIT 入门](https://backlog.com/git-tutorial/cn/intro/intro1_1.html)

**统一概念:**

**工作区**：本地电脑存放项目文件的地方，比如 learnGitProject 文件夹；

**暂存区**：暂存区（Index/Stage）：在使用 git 管理项目文件的时候，其本地的项目文件会多出一个.git 的文件夹，将这个.git 文件夹称之为版本库。其中.git 文件夹中包含了两个部分，一个是暂存区（Index 或者 Stage）,顾名思义就是暂时存放文件的地方，通常使用 add 命令将工作区的文件添加到暂存区里；

**本地仓库(简称：本地)**：.git 文件夹里还包括 git 自动创建的 master 分支，并且将 HEAD 指针指向 master 分支。使用 commit 命令可以将暂存区中的文件添加到本地仓库中；。

**远程仓库(简称：远程)**：不是在本地仓库中，项目代码在远程 git 服务器上，比如项目放在 github 上，就是一个远程仓库，通常使用 clone 命令将远程仓库拷贝到本地仓库中，开发后推送到远程仓库中即可；

**commit-id**：输出命令：`git log`，最上面那行`commit xxxxxx`，后面的字符串就是 commit-id

## 基本操作

### 展示帮助信息

```sh
git help -g
```

### 创建数据库

```bash
git init
```

### 添加文件或目录到索引

在 filepattern 可以直接指定文件名。此外，也可以指令通配字符 ( 例如“\*.txt” )。如果指令 ".” , 可以将子目录里的所有文件添加到索引。

添加-p 选项，就可以只添加文件修改的其中一部分。 如果添加 -i 选项，那么可以选择用对话形式显示添加在索引的文件。

```bash
git add <filepattern>
```

### 提交追加到索引的文件

## GIS 设定

### 显示设定清单

```bash
git config --global --list
```

### 输出彩色

```bash
git config --global color.ui auto
```

### 设定 用户名/电子邮件地址

如果不添加--global 选项，此设定只对该数据库有效。

```sh
git config --global user.name "username"

git config --global user.email "email"
```

### 查看全局的用户名和邮箱

```bash
git config --global user.name

git config --global user.email
```

### 给 git 命令起别名

简化命令

```bash
git config --global alias.<handle> <command>

比如：git status 改成 git st，这样可以简化命令

git config --global alias.st status
```

### 把不需要用的文件归类到非管理对象

记录为.gitignore 的文件是 Git 的非管理对象，但是需要提交.gitignore 本身。

```bash
$ echo <filename> >> .gitignore
```

## 回到远程仓库的状态

抛弃本地所有的修改，回到远程仓库的状态。

```bash
git fetch --all && git reset --hard origin/master
```

## 展示工作区和暂存区的不同

输出**工作区**和**暂存区**的 different(不同)。

```bash
git diff
```

还可以展示本地仓库中任意两个 commit 之间的文件变动：

```bash
git diff <commit-id> <commit-id>
```

## 展示暂存区和最近版本的不同

输出**暂存区**和本地最近的版本(commit)的 different(不同)。

```bash
git diff --cached
```

## 展示暂存区、工作区和最近版本的不同

输出**工作区**、**暂存区** 和本地最近的版本(commit)的 different(不同)。

```bash
git diff HEAD
```

## 操作分支

### 快速切换分支

```bash
git checkout -
```

### 删除已经合并到 master 的分支

```bash
git branch --merged master | grep -v '^\*\|  master' | xargs -n 1 git branch -d
```

### 展示本地分支关联远程仓库的情况

```bash
git branch -vv
```

### 关联远程分支

关联之后，`git branch -vv`就可以展示关联的远程分支名了，同时推送到远程仓库直接：`git push`，不需要指定远程仓库了。

```bash
git branch -u origin/mybranch
```

或者在 push 时加上`-u`参数

```bash
git push origin/mybranch -u
```

### 列出所有远程分支

-r 参数相当于：remote

```bash
git branch -r
```

### 合并分支

```bash
在 git 中合并分支有三种方法，分别是 merge，rebase，cherry-pick，而其中 merge 又有三种区别
https://yanhaijing.com/git/2017/07/14/four-method-for-git-merge/
```

### 列出本地和远程分支

-a 参数相当于：all

```bash
git branch -a
```

### 创建并切换到本地分支

```bash
git checkout -b <branch-name>
```

### 创建并切换到远程分支

```bash
git checkout -b <branch-name> origin/<branch-name>
```

### 删除本地分支

```bash
git branch -d <local-branchname>
```

### 删除远程分支

```bash
git push origin --delete <remote-branchname>
```

或者

```bash
git push origin :<remote-branchname>
```

### 重命名本地分支

```bash
git branch -m <new-branch-name>
```

### 以最后提交的顺序列出所有 Git 分支

最新的放在最上面

```bash
git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/heads/
```

## 操作标签

### 本地创建标签

```bash
git tag <version-number>
```

默认 tag 是打在最近的一次 commit 上，如果需要指定 commit 打 tag：

```bash
$ git tag -a <version-number> -m "v1.0 发布(描述)" <commit-id>
```

### 删除本地标签

```bash
git tag -d <tag-name>
```

### 查看标签

```
git tag
```

展示当前分支的最近的 tag

```bash
git describe --tags --abbrev=0
```

### 推送标签到远程仓库

首先要保证本地创建好了标签才可以推送标签到远程仓库：

```bash
git push origin <local-version-number>
```

一次性推送所有标签，同步到远程仓库：

```bash
git push origin --tags
```

### 删除远程标签

删除远程标签需要**先删除本地标签**，再执行下面的命令：

```sh
git push origin :refs/tags/<tag-name>
```

### 切回到某个标签

一般上线之前都会打 tag，就是为了防止上线后出现问题，方便快速回退到上一版本。下面的命令是回到某一标签下的状态：

```sh
git checkout -b branch_name tag_name
```

## 放弃工作区的修改

```sh
git checkout <file-name>
```

放弃所有修改：

```sh
git checkout .
```

## 恢复删除的文件

```sh
git rev-list -n 1 HEAD -- <file_path> #得到 deleting_commit

git checkout <deleting_commit>^ -- <file_path> #回到删除文件 deleting_commit 之前的状态
```

## 改写提交

### 查看 commit 历史

```sh
git log
```

### 修改最近的提交

指定 amend 选项执行提交的话，可以修改同一个分支最近的提交内容和注解

主要使用的场合：

- 添加最近提交时漏掉的档案
- 修改最近提交的注解

```bash
git commit --amend
```

### 重设第一个 commit

也就是把所有的改动都重新放回工作区，并**清空所有的 commit**，这样就可以重新提交第一个 commit 了

```bash
git update-ref -d HEAD
```

### 以新增一个 commit 的方式还原某一个 commit 的修改

```bash
git revert <commit-id>
```

### 回到某个 commit 的状态，并删除后面的 commit

和 revert 的区别：reset 命令会抹去某个 commit id 之后的所有 commit

```bash
git reset <commit-id>  #默认就是-mixed参数。

git reset –mixed HEAD^  #回退至上个版本，它将重置HEAD到另外一个commit,并且重置暂存区以便和HEAD相匹配，但是也到此为止。工作区不会被更改。

git reset –soft HEAD~3  #回退至三个版本之前，只回退了commit的信息，暂存区和工作区与回退之前保持一致。如果还要提交，直接commit即可  

git reset –hard <commit-id>  #彻底回退到指定commit-id的状态，暂存区和工作区也会变为指定commit-id版本的内容
```

### 取消过去的提交

### 提取提交

### 查看某段代码是谁写的

blame 的意思为‘责怪’，你懂的。

```sh
git blame <file-name>
```

### 显示本地更新过 HEAD 的 git 命令记录

每次更新了 HEAD 的 git 命令比如 commint、amend、cherry-pick、reset、revert 等都会被记录下来（不限分支），就像 shell 的 history 一样。
这样你可以 reset 到任何一次更新了 HEAD 的操作之后，而不仅仅是回到当前分支下的某个 commit 之后的状态。

```
git reflog
```

### 修改作者名

```bash
git commit --amend --author='Author Name <email@address.com>'
```

### 把 A 分支的某一个 commit，放到 B 分支上

这个过程需要`cherry-pick`命令，[参考](http://sg552.iteye.com/blog/1300713#bc2367928)

```bash
git checkout <branch-name> && git cherry-pick <commit-id>
```

## 远程数据库

### 列出所有远程仓库

```sh
git remote
```

### 修改远程仓库的 url

```sh
git remote set-url origin <URL>
```

### 增加远程仓库

通常用于非 clone 的模式，如远程构建好仓库后，本地同时也构建本地的仓库，这时就需要通过下面命令进行关联

```sh
git remote add origin <remote-url>
```

## 查看两个星期内的改动

```sh
git whatchanged --since='2 weeks ago'
```

## 存储当前的修改，但不用提交 commit

详解可以参考[廖雪峰老师的 git 教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000)

```sh
git stash
```

## 保存当前状态，包括 untracked 的文件

untracked 文件：新建的文件

```sh
git stash -u
```

## 展示所有 stashes

```sh
git stash list
```

## 回到某个 stash 的状态

```sh
git stash apply <stash@{n}>
```

## 回到最后一个 stash 的状态，并删除这个 stash

```sh
git stash pop
```

## 删除所有的 stash

```sh
git stash clear
```

## 从 stash 中拿出某个文件的修改

```sh
git checkout <stash@{n}> -- <file-path>
```

## 展示所有 tracked 的文件

```sh
git ls-files -t
```

## 展示所有 untracked 的文件

```sh
git ls-files --others
```

## 展示所有忽略的文件

```sh
git ls-files --others -i --exclude-standard
```

## 强制删除 untracked 的文件

可以用来删除新建的文件。如果不指定文件文件名，则清空所有工作的 untracked 文件。`clean`命令，**注意两点**：

1. clean 后，删除的文件无法找回
2. 不会影响 tracked 的文件的改动，只会删除 untracked 的文件

```sh
git clean <file-name> -f
```

## 强制删除 untracked 的目录

可以用来删除新建的目录，**注意**:这个命令也可以用来删除 untracked 的文件。详情见上一条

```sh
git clean <directory-name> -df
```

## 展示简化的 commit 历史

```sh
git log --pretty=oneline --graph --decorate --all
```

## 把某一个分支到导出成一个文件

```sh
git bundle create <file> <branch-name>
```

## 从包中导入分支

新建一个分支，分支内容就是上面`git bundle create`命令导出的内容

```sh
git clone repo.bundle <repo-dir> -b <branch-name>
```

## 执行 rebase 之前自动 stash

```sh
git rebase --autostash
```

## 从远程仓库根据 ID，拉下某一状态，到本地分支

```bash
git fetch origin pull/<id>/head:<branch-name>
```

## 查看 git fetch 之后的文件更改

查看 commit j 记录

```bash
git log origin/master ^master
```

如果你只是想看看如果你使用 `git pull`，会修改哪些文件，那么就这样做

```bash
git diff HEAD @{u} --name-only
```

如果您想查看当前版本和即将到来的版本之间的所有差异，包括未提交的本地修改，请键入以下内容

```bash
git diff @{u} --name-only
```

## 详细展示一行中的修改

```sh
git diff --word-diff
```

## 清除 gitignore 文件中记录的文件

```sh
git clean -X -f
```

## 展示所有 alias 和 configs

**注意：** config 分为：当前目录（local）和全局（golbal）的 config，默认为当前目录的 config

```sh
git config --local --list (当前目录)
git config --global --list (全局)
```

## 展示忽略的文件

```sh
git status --ignored
```

## commit 历史中显示 Branch1 有的，但是 Branch2 没有 commit

```sh
git log Branch1 ^Branch2
```

## 在 commit log 中显示 GPG 签名

```sh
git log --show-signature
```

## 删除全局设置

```sh
git config --global --unset <entry-name>
```

## 新建并切换到新分支上，同时这个分支没有任何 commit

相当于保存修改，但是重写 commit 历史

```sh
git checkout --orphan <branch-name>
```

## 展示任意分支某一文件的内容

```sh
git show <branch-name>:<file-name>
```

## clone 下来指定的单一分支

```sh
git clone -b <branch-name> --single-branch https://github.com/user/repo.git
```

## 忽略某个文件的改动

关闭 track 指定文件的改动，也就是 Git 将不会在记录这个文件的改动

```
git update-index --assume-unchanged path/to/file
```

恢复 track 指定文件的改动

```
git update-index --no-assume-unchanged path/to/file
```

## 忽略文件的权限变化

不再将文件的权限变化视作改动

```sh
git config core.fileMode false
```

## 在 commit log 中查找相关内容

通过 grep 查找，given-text：所需要查找的字段

```sh
git log --all --grep='<given-text>'
```

## 把暂存区的指定 file 放到工作区中

不添加参数，默认是-mixed

```sh
git reset <file-name>
```

## 强制推送

```sh
git push -f <remote-name> <branch-name>
```

**[⬆ 返回顶部](#)**
