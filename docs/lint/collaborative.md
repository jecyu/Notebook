# Gitlab 协作开发

> **图文讲解 gitlab 团队协作开发及代码 code review**

> 在阅读本文之前，假设你已经理解 git 的简介、git 的原理，如果你还没理解，建议参考 [Git 手册](https://git-scm.com/book/zh/v2)。

> 推荐配合使用Git图形化客户端工具**Sourcetree**或者**Vscode**内置Git工具

![[图片]][1]

## 项目负责人

**第一步：首先在 gitlab 新建项目**

![image_1ckr7cqt41ulb1igo1aq61stccbkcc.png-319.7kB][2]

克隆到本地，然后先在master分支上搭建基础功能，如`README.md`等

执行以下命令

`git add .`

`git commit -m 'init'`

`git push origin -u master`

**第二步：新建 dev 分支推送到远程**

![image_1ckr7gjdvpism8u16ochgqpejdp.png-15.2kB][4]

![image_1ckr7hfnp1ghu1rh81g8e2c91gvqe6.png-127.3kB][5]

**第三步：这时 dev 功能开发完成，项目负责人进行合并到 master 分支下，并通知相关人员进行 code review。**

![image_1ckr82ajd11k86uk4grca2eqnf0.png-201.8kB][6]

团队成员会收到邮箱通知：
![image_1ckr88pgg1hhq4gi1pi51l4t1jpsfq.png-67.8kB][7]

code review 进行时:

![image_1ckr8ernibpr1g592ss1mg8a8e16.png-66.7kB][8]

![[图片]][9]

确认无问题后，合并到 master 分支：
![[图片]][11]

## 项目协作者

### 团队成员（不需要 fork）

首先需要项目负责人把你加入到项目团队中

**第一步：克隆项目到本地**

![image_1ckr4oac81ijoekk8dqqgalci21.png-55.4kB][12]

**第二步：新建开发分支，这里 dev 名字与远程分支一致**

![image_1ckr4sc0anj6t84udg12egvq73e.png-23.9kB][13]

**第三步：新增或修改代码，提交到远程分支（可以通过 git branch 查看当前所在分支）**

此时要先注意把远程最新的 dev 分支拉取下来，查看是否有冲突，有冲突则先解决冲突才能提交

![image_1ckr6e5au1gj81uo0lf81p9b164a3u.png-47.4kB][14]

解决冲突后，进行提交，例如这里修改了 README.md 文件

![image_1ckr6pn97f7d4n51j98omg13eg8r.png-13kB][15]

进行提交 git add . --> git commit -m "" --> git push origin dev

![image_1ckr706p01u4h1emo1osv1gh6lb1a8.png-80.5kB][16]

![image_1ckr73gvq1sq7to8162uj931o7lbi.png-49.5kB][17]

这时进入 gitlab 可以直接看到已经提交到远程的分支上了

**一些小坑**:

如果之前已经设了 github 的全局账号，应避免使用全局设置 github 账号覆盖，使用本地 set 的方法设置 gitlab 用户名，git config —local user.name ‘XXX’ git config —local user.email ‘xxx@dist.com.cn’

### 非团队成员（采用 fork 模式）

fork 目标仓库到自己的仓库 ➡️ git clone dev 开发分支到本地 ➡️ 进行修改 git push origin dev ➡️ gitlab 发起请求 merge request

[1]: http://static.zybuluo.com/linjiyu/ebkh31i7gag5k7b1ely8f936/5B03C450B0AACEAECF00378D98EF455C.jpg
[2]: http://static.zybuluo.com/linjiyu/k0lt3a81o1q8pbnpb6wl5uhq/image_1ckr7cqt41ulb1igo1aq61stccbkcc.png
[3]: http://static.zybuluo.com/linjiyu/z51oeqj3rlyb4i4qcnar6kcp/image_1ckr78dlp14bq847308p32dupbv.png
[4]: http://static.zybuluo.com/linjiyu/iofbf64p8lcy2n93vy442xj8/image_1ckr7gjdvpism8u16ochgqpejdp.png
[5]: http://static.zybuluo.com/linjiyu/bzykdxtkpdehj6td4o2axev0/image_1ckr7hfnp1ghu1rh81g8e2c91gvqe6.png
[6]: http://static.zybuluo.com/linjiyu/nqt7fh1zsstt25zgbweyvs1o/image_1ckr82ajd11k86uk4grca2eqnf0.png
[7]: http://static.zybuluo.com/linjiyu/vz5brmo8sezoiw6iyvx8rlwx/image_1ckr88pgg1hhq4gi1pi51l4t1jpsfq.png
[8]: http://static.zybuluo.com/linjiyu/a6ym42j81q3u6cancfixhbvd/image_1ckr8ernibpr1g592ss1mg8a8e16.png
[9]: http://static.zybuluo.com/linjiyu/738loqdiqn58dfoefhwi43r7/AC1942AEF5EBFB5984C77CF878EE76C0.jpg
[10]: http://static.zybuluo.com/linjiyu/k91za2cb3lbnzpnhbq3oh144/image_1ckr8vholktfk9i1r7f11bl1nf26d.png
[11]: http://static.zybuluo.com/linjiyu/h2fw3057kixyvpbp9wte8gt3/D316F467157D0A04F8ACCF1683C8BF3C.jpg
[12]: http://static.zybuluo.com/linjiyu/7qmylxv11wwkk0u0jlz8xafq/image_1ckr4oac81ijoekk8dqqgalci21.png
[13]: http://static.zybuluo.com/linjiyu/b775aqjan4wnflphke7l3g31/image_1ckr4sc0anj6t84udg12egvq73e.png
[14]: http://static.zybuluo.com/linjiyu/vro33sr928iof3h7hc8dgkib/image_1ckr6e5au1gj81uo0lf81p9b164a3u.png
[15]: http://static.zybuluo.com/linjiyu/eyo0444cycpxdqtoci9pyt2v/image_1ckr6pn97f7d4n51j98omg13eg8r.png
[16]: http://static.zybuluo.com/linjiyu/8he6pc58gcdjow1kb7gz7a5w/image_1ckr706p01u4h1emo1osv1gh6lb1a8.png
[17]: http://static.zybuluo.com/linjiyu/z30h8gih3j4nhjkfgnob2v2h/image_1ckr73gvq1sq7to8162uj931o7lbi.png
