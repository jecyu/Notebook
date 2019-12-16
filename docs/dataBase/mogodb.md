# mogodb 

## Docker 安装 MongoDB

1. 查看可用的 MongoDB 版本
访问 MongoDB 镜像库地址： https://hub.docker.com/_/mongo?tab=tags&page=1。
我们还可以用 `docker search mongo` 命令来查看可用版本：

2. 取最新版的 MongoDB 镜像

```bash
$ docker pull mongo:latest
```

3. 查看本地影像

```bash
$ docker images
```

4. 运行容器
安装完成后，我们可以使用以下命令来运行 mongo 容器：

```bash
docker run -itd --name mongo -p 27017:27017 mongo --auth
```
参数说明：

-p 27017:27017 ：映射容器服务的 27017 端口到宿主机的 27017 端口。外部可以直接通过 宿主机 ip:27017 访问到 mongo 的服务。
--auth：需要密码才能访问容器服务。

5. 使用
  
```bash
$ docker exec -it mongo mongo admin
# 创建一个名为 admin，密码为 123456 的用户。
>  db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
# 尝试使用上面创建的用户信息进行连接。
> db.auth('admin', '123456')
```
```bash
Successfully added user: {
	"user" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
```

## 应用

### 场景

### 特征

- 适用于表结构容易变化，且不需要每个表都有主键。
- 文本查询、地位置查询。
