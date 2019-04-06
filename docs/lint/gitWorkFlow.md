# Git 工作流

## Git 拉取远程分支

1. 在 master 分支，克隆自己团队分支或功能分支

```bash
git clone master-team
```

2. 基于 master-team 分支，建立自己的本地开发分支

```bash
git branch -b linjy origin/master-team
```

3. 开发完后，push 自己的分支到远程仓库

```bash
git push origin linjy
```

之后在本地切换到团队分支，再把 linjy 合并到 master-team，然后拉取 test 分支，检查是否有冲突，没有冲突则提交

```bash
git push origin master-team
```
