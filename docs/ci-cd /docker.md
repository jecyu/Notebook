# docker

## 头脑风暴

- docker 获取镜像失败
![](https://user-gold-cdn.xitu.io/2019/6/10/16b41fb1080fc1b2?w=1444&h=182&f=png&s=144491)
- 容器交流
- 运行容器
- docker commit 镜像构成，一层层构建，慎用，每层不影响其它层
- 容器的修改历史，放在存储层
- Dockerfile 定制镜像
- 镜像构建时，一定要确保每一层只添加真正需要添加的东西，任何无关的东西都应该清理掉。每一层构建的最后一定要清理掉无关文件。
- 镜像构建**上下文**，远程操作服务 docker 引擎。
- 如何管理 dockerfile 等文件目录，存放在哪里，目录规范是什么
- 端口映射
- 网路 Docker 允许通过外部访问容器或容器互联的方式来提供网络服务
- 容器有自己的内部网络和 ip 地址
- 应用场景：office-online，使用 docker 安装 window
- docker 相关文件放到哪个目录呢
- 对比传统的方式，有什么不同
- 可以导入、导出容器，这样就可以移动了。
- 针对 docker 官网介绍的Docker 作为轻量级虚拟化技术，拥有持续集成、版本控制、可移植性、隔离性和安全性等优势。都分别体现在哪里，作一一解读，实践。
- 挂载的方式来处理容器与主机的文件目录，进行映射。
- shell 脚本
- 自动化部署之后，如何快速把应用移动到另外一个服务器不用作任何的修改。实践。
- jenkins + node 自动化
- jenkins + nginxs/ tomcat 自动化不俗
- pieline 代替图形化
- 邮箱配置


![](https://user-gold-cdn.xitu.io/2019/6/11/16b471831738c223?w=1452&h=400&f=png&s=299508)

## 导语

好久之前写过一篇博客，内容是[网站线上部署](https://jecyu.github.io/blog/2018/04/30/2018-04-30-Website-Deployment/)，从连接数据库到上传项目文件，全部是人工手动完成。现在这些统统都可以通过自动化流程来替代。

## docker 简介

物理机：一栋楼一户人家
虚拟机：一套房
docker: 一套房隔成多个小间，胶囊式公寓


![](https://user-gold-cdn.xitu.io/2019/6/9/16b3ca8ef46024db?w=692&h=261&f=png&s=24790)
![](https://user-gold-cdn.xitu.io/2019/6/9/16b3ca8d1f228c9d?w=689&h=195&f=png&s=22346)

docker 解决了什么问题？
> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，该容器包含了应用程序的代码、运行环境、依赖库、配置文件等必需的资源，通过容器就可以实现方便快速并且与平台解耦的自动化部署方式，无论你部署时的环境如何，容器中的应用程序都会运行在同一种环境下。

作者：快狗打车前端团队
链接：https://juejin.im/post/6844903837774397447
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
- 最简单的，你部署一套自己的开发环境，可能这个开发环境要升级gcc，花了很长时间，然后结果换了一台设备，你又要重新部署一次。有了docker，你只需要commit一个镜像出来，然后在另外的机器上docker create就好了。又或者运行环境一致，你搭建的运行环境可以保持一致，不再会出现这个程序在这台设备上运行出问题了在那一台没出问题，排除运行环境的因素，安心调试代码

作者：Nov 23
链接：https://www.zhihu.com/question/45051507/answer/250408750
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



![](https://user-gold-cdn.xitu.io/2019/6/9/16b3c91e98dee5b0?w=1410&h=658&f=png&s=852642)

## 基础

### 基本概念

#### 镜像

Image 类似 root 文件系统，分层存储，一层层构建。镜像构建时，会一层层构建，前一层是后一层的基础。

#### 容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间

#### 仓库

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。

一个 Docker Registry 中可以包含多个 仓库（Repository）；每个仓库可以包含多个 标签（Tag）；每个标签对应一个镜像。

### docker 一些常见操作和命令


![](https://user-gold-cdn.xitu.io/2019/6/20/16b75061d91c12bc?w=2212&h=1252&f=png&s=677320)

### 容器操作

#### 进入容器

#### 容器开启

容器开启后，又重新被关闭了。Docker为什么刚运行就退出了?分析日志 docker logs
https://segmentfault.com/q/1010000007434058


![](https://user-gold-cdn.xitu.io/2019/6/16/16b5e89d395e6b56?w=1542&h=432&f=png&s=270745)

## 项目实战

### 使用 docker 安装 mysql



### 使用 docker 自动化部署

```bash
# 拉取最新的jenkins镜像
docker pull jenkins:latest

# 启动jenkins
sudo docker run -d -u 0 --privileged  --name jenkins_node1 -p 49003:8080 -v /root/jenkins_node1:/var/jenkins_home jenkins:latest

### jenkins + node
```

### Docker 容器中配置nginx后报403 Forbidden 解决办法

1、Docker挂载主机目录，访问相应的文件出现Premission denied的权限访问问题

问题原因及解决办法
   原因是CentOS7中的安全模块selinux把权限禁掉了，主要是挂载的目录没有权限的问题
2、添加`selinux`规则，改变要挂载的目录的安全性文本

chcon -Rt svirt_sandbox_file_t /home/hct/sample/

或者使用数据卷容器来代替挂载的目录，主要是可以导出给其他方使用

## docker 安装与卸载

### 安装

- 一、查看是否已安装了Docker软件包：
#查看是否已经安装的Docker软件包
sudo yum list installed | grep docker

- 二、如果已安装不想要的docker/docker-engine/docker-ce软件包，卸载掉
#如果已安装不想要docker、docker-engine、docker-ce相关的软件包，则卸载掉：
sudo yum -y remove docker docker-common docker-selinux docker-engine docker-engine-selinux container-selinux docker-ce

- #删除所有的镜像、容器、数据卷、配置文件等
sudo rm -rf /var/lib/docker


- 三、安装Docker-ce

```ba
#先安装yum-utils工具和device-mapper相关依赖包
sudo yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
 
#添加docker-ce stable版本的仓库
sudo yum-config-manager \
  --add-repo \
  https://download.docker.com/linux/centos/docker-ce.repo
 
#更新yum缓存文件
sudo yum makecache fast
 
#查看所有可安装的docker-ce版本
sudo yum list docker-ce --showduplicates | sort -r
 
#安装docker-ce-selinux-17.03.2.ce，否则安装docker-ce会报错
yum install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-selinux-17.03.2.ce-1.el7.centos.noarch.rpm 
 
#安装指定版本docker-ce,这里安装的是docker-ce-17.03.2.ce
sudo yum install docker-ce-17.03.2.ce-1.el7.centos 
 
#允许开机启动docker-ce服务
sudo systemctl enable docker.service
 
#启动Docker-ce服务
sudo systemctl start docker
 
#检查是否正常安装：
sudo yum list installed | grep docker
sudo docker info
#运行测试容器hello-world
sudo docker run --rm hello-world
```

## docker + jenkins 自动化部

问题：基于 nginx 镜像生成的容器，采用挂载在 jenkins 镜像映射后的目录，当该目录里面的文件更新时，会导致xxx-frontend 容器访问页面出现 403 错误。
原因是：jenkins_node1/workspace/ 更新时，love-story/dist 的目录权限被重设为不可读。

1、Docker挂载主机目录，访问相应的文件出现Premission denied的权限访问问题

问题原因及解决办法
   原因是CentOS7中的安全模块selinux把权限禁掉了，主要是挂载的目录没有权限的问题
2、添加selinux规则，改变要挂载的目录的安全性文本

chcon -Rt svirt_sandbox_file_t /home/hct/sample/

Selinux 详细介绍 https://cloud.tencent.com/developer/article/1077994
SELinux 主要作用就是最大限度地减小系统中服务进程可访问的资源（最小权限原则）。

在使用了 SELinux 的操作系统中，决定一个资源是否能被访问的因素除了文件权限和用户权限之外，还需要判断每一类进程是否拥有对某一类资源的访问权限。

```bash
docker run \
-p 49008:80 \
-d --name xxxx-frontend \
--mount type=bind,source=/var/www/jeyolan/nginx,target=/etc/nginx/conf.d \
--mount type=bind,source=/root/jenkins_node1/workspace/love-story/dist,target=/usr/share/nginx/html \
nginx
```
所以还是采用脚本自动删除镜像，和重建镜像

## 参考资料

- 官方权威文档 https://docs.docker.com/get-started/

- [Web前端开发的后端指南](https://ap.weixin.qq.com/s/tbJ-X3_zKi4vR_1ST5maTQ)
- [[手把手系列之]Docker 部署 vue 项目](https://juejin.im/post/6844903837774397447)
- [Docker 从入门到实践](https://yeasy.gitbooks.io/docker_practice/content/basic_concept/image.html)
- http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
- [CentOS7中Docker-ce的卸载和安装](https://blog.csdn.net/CSDN_duomaomao/article/details/78997138
)安装直接使用脚本安装，
- [jenkins](https://jenkins.io/zh/doc/#doc/pipeline/tour/getting-started#)
- [Jenkins插件下载失败两种处理办法](https://blog.csdn.net/tianhua79658788/article/details/78249908)
- [jenkins插件安装失败处理](https://stackoverflow.com/questions/41117989/jenkins-2-dependency-errors-loading-some-plugins)

