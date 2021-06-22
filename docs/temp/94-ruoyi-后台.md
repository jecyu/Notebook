# 若依-生成的后台代码

## 前言

## 系统部署

JDK >= 1.8 (推荐1.8版本)
Mysql >= 5.7.0 (推荐5.7版本)
Redis >= 3.0
Maven >= 3.0

### 安装 Mysql

1. 查询mysql

   docker search mysql

2. 安装 mysql

   docker pull mysql

3. 查看镜像 docker images，本机上初始化 mysql docker 的容器目录

   在opt下创建文件夹

   命令：cd /opt/

   命令：mkdir mysql_docker

   命令：cd mysql_docker/

   命令：echo $PWD

4. 启动 mysql 容器

```sh
docker run --name mysqlserver -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d -i -p 55000:3306 --restart=always mysql:latest
```

5. 查看 mysql 进程

```sh
docker ps -a
```

6. 进入 mysql 容器，并登录 mysql

   命令：docker exec -it mysqlserver bash

   命令：mysql -uroot -p

7. 开启远程访问权限

   命令：use mysql; // 使用 mysql 数据库

   命令：select host,user from user; // 选择用户

```js
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.01 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

```

8. 使用客户端进行连接
9. 创建一个数据库

10. 选择该数据库，运行对应的数据库脚本

<img src="../.vuepress/public/images/2021-03-31-23-03-45.png" style="zoom:50%;" />

11. 点击刷新，查看 table 

<img src="../.vuepress/public/images/2021-03-31-23-04-28.png" style="zoom:50%;" />

## 分析需求

## 设计实现

### 整体架构

#### 文件结构

#### 配置文件

#### 核心技术

### 项目运行

入口文件

### 数据库设计



## 问题总结

## 参考资料

- [安装docker并使用docker安装mysql](https://blog.csdn.net/JiuBingWei/article/details/112766458)
- 《自己动手设计数据库》

#