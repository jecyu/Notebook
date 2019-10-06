# Linux

## 服务器初始化

## 连接远程主机

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
