# docker 

## 操作容器

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