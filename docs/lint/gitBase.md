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

### 删除全局设置

```sh
git config --global --unset <entry-name>
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

### 查看 git 配置

在项目的根目录下，输入 
```bash
# 打开 .git 目录
cd .git 

# 查看里面的文件

ls 

# 打开 config 文件
vi config
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

## 设定 SSH 连接

SSH key 可以让你在你的电脑和 Git 远程仓库之间建立安全的加密连接。

### Mac

```bash
ssh-keygen
```
接着会显示以下的内容输出，在有需要的地方输入设定验证密码的文字，然后按“Enter”键。

如果不设定验证密码，请不要输入任何文字，直接按“Enter”键即可。

执行下一个命令就可以确认形成SSH键公钥的内容。

```bash
cat ~/.ssh/id_rsa.pub
```

接下来，在远程数据库设定公钥。

### window 

先下载 cmder 命令行（linux）工具，之后跟 mac 一样的命令行操作即可。

### Git 配置多个 SSH-Key

一般公司用的是 gitlab 提交代码，使用的是公司的用户名和公司的邮箱，而在个人的开源项目中，我们托管于 github，那么这个时候就需要两个 SSH-Key 去登录。

#### 查看所有 SSH-Key

```bash
$ cd ~/.ssh/
$ ls
```

#### 公司的 GitLab 生成一个 SSH-Key 

在`~/.ssh/`目录会生成`gitlab_id-rsa`和`gitlab_id-rsa.pub`私钥和公钥。
```
$ ssh-keygen -t rsa -C "xxx@xxx.com" -f ~/.ssh/gitlab_id-rsa
```

查看你的public key，我们将`gitlab_id-rsa.pub`中的内容粘帖到公司`GitLab`服务器的`SSH-key`的配置中。
```bash
# 把文件内容打印到命令行工具上，方便复制
cat ~/.ssh/gitlab_id-rsa.pub 
```

#### Github 生成一个 SSH-Key 

在`~/.ssh/`目录会生成`github_id-rsa`和`github_id-rsa.pub`私钥和公钥。我们将`github_id-rsa.pub`中的内容粘帖到`github`服务器的`SSH-key`的配置中。
```bash
$ ssh-keygen -t rsa -C "xxxxx@xxxx.com” -f ~/.ssh/github_id-rsa
```

#### 在 ~/.ssh 目录下添加`config`配置文件用于区分多个 SSH-Key

添加 config 配置文件
```bash
vi ~/.ssh/config
```

设置文件内容如下：
```bash
# gitlab
Host gitlab.com
  HostName gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab_id-rsa

# github 
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/github_id-rsa
```

配置文件参数：
- Host：可以看作是一个你要识别的模式，对识别的模式，进行配置对应的`主机名`和 `ssh` 文件。
- HostName: 要登录主机的主机名。
- User: 登录名。
- IdentityFile: 知指明上面 User 对应的 identityFile 路径。
  
#### 测试

```bash
ssh -T git@github.com
```
输出：
```bash
Hi Jecyu! You've successfully authenticated, but GitHub does not provide shell access.
```
就表示成功的连上 github 了。也可以试试连接公司的 gitlab。

> 更进一步阅读，了解 SSH  知识：https://segmentfault.com/q/1010000000835302 和 《SSH，The Secure Shell》 书本。

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

在 git 中合并分支有三种方法，分别是 merge，rebase，cherry-pick，而其中 merge 又有三种区别
https://yanhaijing.com/git/2017/07/14/four-method-for-git-merge/

#### merge

如果添加 --no-ff 选项，就是 fast-forward 合并也可以建立合并提交。这是记录分支存在过的非常有用的选项。考虑一下“功能”分支上的一系列次要提交共同构成一个新功能的情况：如果你只是在没有--no-ff的情况下执行“git merge feature_branch”，那么就不可能从Git历史中看到哪一个 提交对象一起实现了一个功能 - 您必须手动读取所有日志消息。好处就是 GUI界面可以直观看到信息。

```bash
git merge <branch>
```

#### cherry-pick

这命令简直就是神器，给你自由，你想把那个节点 merge 过来就把那个节点 merge 过来，其合入的不是分支而是提交节点

```bash
git cherry-pick commitId
```

<!-- ### 排除合并某些文件

这个通常很有用，特别是针对 .env 文件时，每个人的本地配置不同

```bash

``` -->

#### rebase

> rebase 作用简要为：可以对某一段线性提交历史进行编辑、删除、赋值、 粘贴，合理适应 rebase 命令可以让我们的提交历史干净、简介
注意：不要通过rebase对任何已经提交到公共仓库中的commit进行修改（你自己一个人玩的分支除外）

##### 合并多个 commit 为一个完整的 commit

```bash
git rebase -i [startponit] [endpoint]
```
其中 -i 意思是 `--ineractive`，即弹交互式的界面让用户编辑完成合并操作，`[startponit]` `endpoint` 指定了一个编辑区间。如果不指定 `[endponit]` 则该区间的默认是当前分支 `HEAD` 所指向的 `commit`.

##### 将某一段 commit 粘贴到另外一个分支上

参考资料：[rebase 用法小结](https://www.jianshu.com/p/4a8f4af4e803)

#### 从其他分支合并指定文件或文件夹

功能分为2个分支，分别为A、B。
A上面有个列表页功能
B上面有个详情页功能，还有个系统消息功能

产品经理说先上列表功能，于是我们就开发A分支，列表功能很快开发完成。
第二天按常理开发B分支，开发到一半，产品经理说目前的系统消息功能需要急着上线，要和列表功能一起上线，当时就懵逼了，然后赶紧放下详情页的开发，立马去开发系统消息功能，开发完之后需要将列表功能和系统消息功能放在一个分支上提测，这时候分支合并就派上用场了。

使用git merge 命令进行分支合并是通用的做法，但是git merge 合并的时候会将两个分支的内容完全合并，如果想合并一部分肯定是不行的。那怎么办？

如何从其他分支merge指定文件到当前分支，git checkout 是个合适的工具。

```bash
git checkout source_branch <path>...
```

- 强制合并
```bash
git branch 当前位于 A 分支上
  * A  
    B
# 在使用git checkout某文件到当前分支时，会将当前分支的对应文件强行覆盖
git checkout B xxx.html xxx.js
```

- 智能合并
1. 使用git checkout 将根据A分支创建一个A_temp分支，避免影响A分支
```bash
git checkout -b A_temp
```
2. 将B分支合并到A_temp分支
```bash
git merge --no-ff B
```
3. 切换到A分支，并使用git checkout 将A_temp分支上的系统消息功能相关文件或文件夹覆盖到A分支
```bash
$ git checkout A
Switched to branch 'A'

$ git checkout A_temp message.html message.css message.js other.js
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

## stash

### 存储当前的修改，但不用提交 commit

详解可以参考[廖雪峰老师的 git 教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000)

```sh
git stash
```

### 展示所有 stashes

```sh
git stash list
```

### 回到某个 stash 的状态

```sh
git stash apply <stash@{n}>
```

### 保存当前状态，包括 untracked 的文件

untracked 文件：新建的文件

```sh
git stash -u
```

### 回到最后一个 stash 的状态，并删除这个 stash

```sh
git stash pop
```

### 删除所有的 stash

```sh
git stash clear
```

### 从 stash 中拿出某个文件的修改

```sh
git checkout <stash@{n}> -- <file-path>
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

### 恢复 git reset --hard 的误操作

有时候使用Git工作得小心翼翼，特别是涉及到一些高级操作，例如 reset, rebase 和 merge。甚至一些很小的操作，例如删除一个分支，我都担心数据丢失。

git的历史记录是不可修改的，也就是说你不能更 改任何已经发生的事情。你做的任何操作都只是在原来的操作上修改。也就是说，即使你删除了一个分支，修改了一个提交，或者强制重置，你仍然可以回滚这些操作。

但是 `reflog` 就是用来解决这个问题的。简单的说，它会记录所有HEAD的历史，也就是说当你做 reset，checkout等操作的时候，这些操作会被记录在reflog中。

如果你因为reset等操作丢失一个提交的时候，你总是可以把它找回来。除非你的操作已经被git当做垃圾处理掉了，一般是30天以后。

原文：[恢复 git reset --hard 的误操作](https://www.cnblogs.com/mliudong/archive/2013/04/08/3007303.html)

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
