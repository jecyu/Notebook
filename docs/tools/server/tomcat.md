# Tomcat

Apache Tomcat 是由 Apache Software Foundation （ASF）开发的一个开源 Java WEB 应用服务器。

tomcat 端口设置

![](../.vuepress/public/images/2020-04-30-17-11-56-tomcat.png)

### Tomcat 是什么

#### Tomcat 与 Java

##### Tomcat 与 Java SE

Tomcat 是用 Java 语言编写的，需要运行在 Java 虚拟机上，所以一般需要先安装 JDK，以提供运行环境。

##### Tomcat 与 Java EE

Tomcat 实现了几个 Java EE 规范，包括 Java Servelt、Java Server Pages（JSP），Java Expression Language 和 Java WebSocket 等，这些都是下载 Tomcat 安装包默认提供的，可以在源码中看到相关 Java EE 规范 API 源码引用，如下：

此外，官网还提供了另外一些 Java EE 规范的实现，如 JMX Remote
、Web services，要使用的话需要另外下载，放到 Tomcat 安装目录 /lib 中。

可以说 Tomcat 是一个不完整的 Java EE 应用服务器。

#### Tomcat 与 Sevlet/编程开发

Tomcat 实现的几个 Java EE 规范最重的是 Servlet 规范，因为实现了 Servlet 规范，所以 Tomcat 也是一个 Servlet 容器，可以运行我们自己编写的 Servlet 应用程序处理动态请求。

平时用的 Struts2、SpringMVC 框架就是基于 Servlet，所以我们可以在这些框架的基础上进行快速开发，然后部署到 Tomcat 中运行。

另外，对于 JSP 规范实现：`可以混合 HTML 与 Java 开发在一个文件中（.jsp）`，这种文件在第一次调用之后会被 Tomcat 的 Jasper 组件编译成一个 servlet 类，在后续的操作中则可以直接使用此类。这种开发方式不灵活，一般少用。

#### Tomcat 与 Web/HTTP 请求

Tomcat 的 （HTTP 类型）Connector 组件实现了 HTTP 请求的解析，Tomcat 通过 Connector 组件接收 HTTP 请求并解析，然后把解析后的信息交给 Servlet 处理：

- 对于静态（html/js/jpg 等）请求，Tomcat 提供默认的 Servlet 来处理并响应；
- 对于动态请求，可以`映射`到自己编写的 Servlet 应用程序并处理。

类似 Node 也可以响应静态请求，并在另外一个 Node 程序提供动态接口处理。

#### Tomcat 与 Nginx/Apache 的应用架构

### Tomcat 安装目录

![](../../.vuepress/public/images/2020-07-15-08-19-44-category.png)

Tomcat 安装后根目录如上图，由环境变量 $ CATALINA_HOME 表示，可以手动设置，可以由 /bin/catalina.sh 命令脚本自动设置该环境变量，如果使用多个 Tomcat 实例，需要为每个实例定义 $ CATALINA_BASE 环境变量。

这些目录说明如下：

- `bin`：启动、关闭和其他脚本，`*.sh` 文件（对于 Unix 系统）是 *.bat 文件的功能重复（对于 Windows 系统）。
- `conf`：配置文件及相关数据文件存放目录，如 server.xml，tomcat-users.xml，web.xml；
- `logs`：默认的日志文件存放目录，如访问日志，可以通过 server.xml 文件配置到其他目录；
- `lib`：Tomcat 使用的库文件存放目录，如 Servlet 规范的 API；
- `temp`：临时文件的工作目录，`如上传大文件时的缓存数据会存储到这里；`
- `webapps`：我们的应用程序部署目录，可以通过 server.xml 文件配置`；
- `work`：Tomcat 工作目录，如存放 JSP 编译后的类文件。

### Tomcat 配置文件

Tomcat 的配置文件默认存放在 $CATALINA_HOME/conf 目录中，主要有以下几个：
- `server.xml`：Tomcat 核心配置文件，包含 Service，Connector，Engine，Readlm，Valve，Host 主组件的相关配置信息。
- `context.xml`
- `web.xml`：为部署与 Tomcat 实例上的所有 web 应用程序提供部署描述符，通常用于`为 webapp 提供默认的 servlet 定义`和基本的 MUIME 映射表。

### Web 应用部署目录结构
### Tomcat 基本框架及相关配置