# docker 

- 为什么要有 docker
- 有 docker 和没有 docker 的区别
- 可以用 docker 来做什么

![](../.vuepress/public/images/2020-07-29-15-21-48-compose.png)

![](../.vuepress/public/images/2020-07-29-15-25-17-contianer.png)

![](../.vuepress/public/images/2020-07-29-15-31-03-docker.png)

![](../.vuepress/public/images/2020-07-29-15-34-48-docker.png)

![](../.vuepress/public/images/2020-07-29-15-37-26-docker.png)

## 基础使用

### 操作容器

### 进入容器

#### exec 命令

```bash
# docker exec -it mysql bash
docker exec -it `容器名` bash
```

### 退出容器

```bash
exit
```

### 终止容器

可以使用 `docker container stop` 来终止一个运行中的容器。此外，当 Docker 容器中指定的应用终结时，容器也自动终止。
```bash
docker container stop
```

终止状态的容器可以用 `docker container ls -a` 命令看到。处于终止状态的容器，可以通过`docker container start`命令重新启动。

此外，`docker container restart` 命令会将一个运行态的容器终止，然后再重新启动它。

## 实战

运行容器的时候指定本地的一个文件目录和容器中的一个文件目录的映射，通过这个可以做文件数据同步，两方无论哪一方有修改，另一方都会同步内容
```bash
docker run -d -v $(pwd):/usr/share/nginx/html -p 80:80 --name nginx nginx
```

这个时候`-v:`前面的参数是本机文件路径， `:`后面是docker容器文件目录， `$(pwd)`当前命令执行的路径（也就是本地机器的文件目录）

值得注意的是，使用bind Mounting方式做数据卷的映射时，首次docker run -v 运行，如果本机的文件夹是没有内容的，docker容器中的文件夹是有内容的，则本机的会覆盖dokcer容器中的，也就是容器中原本有内容的也会没有内容。

### 数据持久化之 bind Mounting

### docker文件夹映射的两种方式---主机卷映射和共享文件夹映射

- docker容器不保持任何数据
- 重要数据请使用外部卷存储（数据持久化）
- 容器可以挂载真实机目录或共享存储为卷

https://blog.csdn.net/zhydream77/article/details/81909706

![](../.vuepress/public/images/2020-07-29-16-05-38-docker.png)

## Docker compose

部署应用，通过声明式文件管理容器

## 卷与持久化数据

数据主要分为两类，持久化的与非持久化的。

持久化数据是需要保存的数据。例如客户信息、财务、预定、审计日志以及某些应用日志数据。非持久化数据是不需要保存的那些数据。

每个 Docker 容器都有自己的非持久化存储。非持久化存储自动创建，从属于容器，生命周期与容器相同。这意味着删除容器也会删除全部非持久化数据。

如果希望自己的容器数据保留下来（持久化），则需要将数据存储在**卷**上。卷与容器是解耦的，从而可以独立地创建并管理卷，并且卷饼未与任意容器生命周期绑定。最终效果即用户可以删除一个关联了卷的容器，但是卷并不会被删除。

### 容器与非持久数据

每个容器都被自己分配了本地存储。默认情况下，这是容器全部文件和文件系统保存的地方。非持久存储输入容器的一部分，并且与容器的生命周期一致——容器创建时时会创建非持久化存储，同时该存储也会随容器的删除而删除。

在 Linux 系统中，该存储的目录在 `/var/lib/docker/<storage-driver>/` 之下，是容器的一部分。在 `Windows` 系统中位于 `C\ProgramData\Docker\windowfiler\` 目录之下。 

## 参考资料

- 《Docker——从入门到实践》
- [Docker的持久化存储和数据共享（四）](https://juejin.im/post/5b6d4439f265da0f800e0d5a#heading-2)
- [从零搭建docker+jenkins+node.js自动化部署环境](https://juejin.im/post/5b8ddb70e51d45389153f288#heading-7)
- 《深入浅出 Docker》