# Linux

## 目录分布

## 服务器初始化

## 连接远程主机

### 密钥文件

[PuTTY的ppk密钥与OpenSSH密钥之间的相互转换](https://www.jianshu.com/p/7818b3ad1d72)

### 连接登录

通过密钥文件 `.pem`，否则可能会出现格式不正确的问题。https://hostingwiki.cn/%E8%AE%BE%E7%BD%AE%E5%85%8D%E5%AF%86%E7%A0%81ssh%E5%90%8E%E5%87%BA%E7%8E%B0key_load_public-invalid-format/
    
```bash
sudo ssh -i 密钥地址 user@服务器地址 -p 端口号
```

查看 tomcat 启动状态
```bash
ps -ef|grep java
```
`ps -ef|grep java` 此条命令具体含义 ps:将某个进程显示出来

-A 　显示所有程序。

-e 　此参数的效果和指定"A"参数相同。

-f 　显示UID,PPIP,C与STIME栏位。

grep命令是查找

如果显示以下相似信息，说明Tomcat还没有关闭

```bash
root      7010

     1  0 Apr19 ?        00:30:13 /usr/local/java/bin/java
     ....
     ....
     g.apache.catalina.startup.Bootstrap start
```

如果出现以下信息，则表示Tomcat已经关闭

```bash
root      7010    1  0 Apr19 ?        00:30:30 [java]
```

### 生成 SSH

```bash
ssh-keygen -t rsa
```

### 把公钥粘贴到服务器面板

```bash
# 打印到命令行上
cat ~/.ssh/id_rsa.pub
```
### 连接服务器

```bash
sudo ssh -i /path/to/id_rsa user@romoteserver # 或者
sudo ssh remoteserver -l name
```

### SSH连接时出现Host key verification failed的原因及解决方法

#### 有关 .ssh/konw_hosts 的值

用`OpenSSH`的人都知`ssh`会把你每个你访问过计算机的公钥(public key)都记录在`~/.ssh/known_hosts`。当下次访问相同计算机时，`OpenSSH`会核对公钥。如果公钥不同，`OpenSSH`会发出警告，避免你受到`DNS Hijack`之类的攻击。
SSH对主机的public_key的检查等级是根据StrictHostKeyChecking变量来配置的。默认情况下，

1. 最不安全的级别，当然也没有那么多烦人的提示了，相对安全的内网测试时建议使用。如果连接server的key在本地不存在，那么就自动添加到文件中（默认是known_hosts），并且给出一个警告。
```bash
StrictHostKeyChecking=no  
```
2. 默认的级别，就是出现刚才的提示了。如果连接和key不匹配，给出提示，并拒绝登录。
```bash
StrictHostKeyChecking=ask
```
3. 最安全的级别，如果连接与key不匹配，就拒绝连接，不会提示详细信息。
```bash
StrictHostKeyChecking=yes
```

#### 解决方法

- **法一：为了方便，选择最低的安全级别。在.ssh/config（或者/etc/ssh/ssh_config）中配置：**
```bash
StrictHostKeyChecking no
UserKnownHostsFile /dev/null
```
（注：这里为了简便，将knownhostfile设为/dev/null，就不保存在known_hosts中了）

- **法二：删除对应ip的相关rsa信息**
```bash
vi ~/.ssh/known_hosts
```

- **法三：删除整个`known_hosts` 文件**
```bash
rm known_hosts
```

## **账户与安全**

### 文件及目录权限

修改文档属性

```bash
(1) chmod
描述：改变文件或目录权限
用法：chmod[选项] 权限 文件或目录
chmod 命令参数中，u 代表文档所有者，g 代表所属组，o 代表所有人。
chmod g+w,o+rw xxxx
```

### 本地上传文件到远程服务器

## 命令工具

### 目录及文件的基本操作

#### ls

描述：显示目录与文件信息
用法：`ls [选项] [文件/目录]`
```bash
ls
ls -a # 显示所有的信息，包括隐藏文件与目录
ls -h # 人性化显示容量信息
ls -d # 显示目录本身的信息，而非目录下的资料信息
ls -l # 长格式显示容量信息
ls -c # 显示文件或目录属性最后修改的时间
ls -u # 显示文件或目录最后被访问的时间
ls -t # 以修改时间排序，默认按文件名称排序
```

#### mv

描述：移动（重命名）文件或目录

```bash
mv hello.txt hello.doc
mv hello.doc /root/
```

#### cp

linux复制指定目录下的全部文件到另一个目录中
复制指定目录下的全部文件到另一个目录中
文件及目录的复制是经常要用到的。

linux下进行复制的命令为cp。

假设复制源目录 为 dir1 ,目标目录为dir2。怎样才能将dir1下所有文件复制到dir2下了
如果dir2目录不存在，则可以直接使用即可。

```bash
cp -r dir1 dir2
```

如果dir2目录已存在，则需要使用
```bash
cp -r dir1/. dir2
```

如果这时使用cp -r dir1 dir2,则也会将dir1目录复制到dir2中，明显不符合要求。
ps:dir1、dir2改成对应的目录路径即可。

```bash
cp -r /home/www/xxx/statics/. /home/www/statics
```

如果存在文件需要先删除

```bash
rm -rf /home/www/statics/*
```
否则会一个个文件提示你确认，使用cp -rf 也一样提示

--------------------------------------

linux下cp整个文件夹的文件到另一个文件夹
cp -ri A/B/* A1/B1/ 回车
若复制过程中询问是否覆盖，输入y按回车，若不想看到提示直接覆盖使用-rf
另外若A A1不在同一目录下，最好填绝对路径，就是/xxx/xxx/A/B/* /xxx/A1/B1/

实例：
```bash
cp -ri /home/server/tomcat/* /home/server/test/

cp: target `/home/server/test/' is not a directory
```
需要先创建目标文件夹
```bash
mkdir /home/server/test
```

copy命令的功能是将给出的文件或目录拷贝到另一文件或目录中，同MSDOS下的copy命令一样，功能十分强大。

语法： `cp [选项] 源文件或目录 目标文件或目录`

说明：该命令把指定的源文件复制到目标文件或把多个源文件复制到目标目录中。

该命令的各选项含义如下：
- a 该选项通常在拷贝目录时使用。它保留链接、文件属性，并递归地拷贝目录，其作用等于dpR选项的组合。
- d 拷贝时保留链接。
- f 删除已经存在的目标文件而不提示。
- i 和f选项相反，在覆盖目标文件之前将给出提示要求用户确认。回答y时目标文件将被覆盖，是交互式拷贝。
- p 此时cp除复制源文件的内容外，还将把其修改时间和访问权限也复制到新文件中。
- r 若给出的源文件是一目录文件，此时cp将递归复制该目录下所有的子目录和文件。此时目标文件必须为一个目录名。
- l 不作拷贝，只是链接文件。

需要说明的是，为防止用户在不经意的情况下用cp命令破坏另一个文件，如用户指定的目标文件名已存在，用cp命令拷贝文件后，这个文件就会被新源文件覆盖，因此，建议用户在使用cp命令拷贝文件时，最好使用i选项。

## 参考资料

- [Linux下如何查看tomcat是否启动/系统日志等](https://blog.csdn.net/colin_yu/article/details/77853506)