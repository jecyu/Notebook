# mogodb 

MongoDB 是一个面向文档，schema 无关（schema-less）（没有表、字段类型声明之类）的数据库，它非常适合于 Node.js 应用以及云端部署。

与 MySQL 及 PostgreSQL 是根据`固定的结构设计（schema）`将数据存储在表中不同，MongoDB 可以将任意类型的文档数据存储到集合中（schema 无关），这也是 MongoDB 最有意思的特性之一。（也就是非关系型，没有表与表之间的关联关系）。

例如，创建下面这张为 Web 应用保存用户信息的表 ：

|First|Last|Email|Twitter|
|--|--|--|--|
|Guillermo|Rauch|rauchg@gmail.com|rauchg|

在构建应用时，决定将用户信息按照上面这样的结构设计进行存储。需要如下这些信息 first name、last name、email 以及 Twitter ID。

随着应用的发展】需求发生了改变，或者随着时间的推移，又有了新的需求，可能需要增加或者删除表中的某些列。

然而，这样一个基础性问题，若要通过传统的 （SQL）数据库来实现，从操作上和性能来讲都需要耗费非常高的成本来修改表设计。

比如，在 MySQL 中，每一次修改表的设计结构，都需要运行如下这个命令才能实现添加一个新的列：

```sql
mysql> ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;
```

对于删除一列或多列的情况也是如此。

在 MongoDB 中，则可以将数据都看作文档，其设计非常灵活。当有数据存储后，这些文档就会以一种非常接近（或者说在绝大多数情况下就是 JSON 格式）JSON 格式的形式存储：

```json
{
	"name": "Guillermo",
	"last": "Rauch",
	"email": "rauchg@gmail.com",
	"age": 21,
	"twitter": "rauchg"
}
```

MongoDB 还有一个非常重要的特性，能够将其与其他`键——值`形式的 NoSQL 数据库区别开来，就是<u>文档可以是任意深度的。</u>

例如，可以将社交信息以如下结构进行存储，而不是全部将它们直接作为文档的键来存储：

```json
{
	"name": "Guillermo",
	"last": "Rauch",
	"email": "rauchg@gmail.com",
	"age": 21,
	"social_networks": {
		"twitter": "rauchg",
		"facebook": "rauchg@gmail.com",
		"linkedin": 27760647
	}
}
```

如上述代码所示，数据类型可以混用。这里，twitter 和 facebook 信息都是字符串类型的，而 linkedin 是数字类型。当通过 Node.js 获取到存储的文档数据后，拿到的数据类型也是和存储时一模一样的。

mongoDB 可以将任意类型的文档数据存储到集合中，这也是为什么会将二进制文件存到 mongoDB 数据库中，一些图片、文件、office 文件等。

MongoDB 更适合打辅助，MySQL 表之间的关联，查询起来更方便、也更加解耦。

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

## 参考资料

- 《了不起的 Node.js》