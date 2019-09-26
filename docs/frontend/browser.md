# 浏览器

## 数据库

### cookies，sessionStorage 和 localStorage 的区别

`cookie` 是网站为了标识用户身份而储存在用户本地终端（Client Side） 上的数据（通常经过加密）。`cookie` 数据始终在同源的 http 请求中携带（即使不需要），它会在浏览器和服务器间来回传递。
`sessionStorage` 和 `localStorage` **不会自动把数据发给服务器**，仅在本地保存。

**存储大小：**`cookie` 数据大小不能超过4k。`sessionStorage` 和`localStorage` 虽然也有存储大小的限制，但比 `cookie` 大得多，可以达到 5M 或更大。

**有效期时间：**
- `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。（所以很多时候，需要在登录成功后，把旧的登录信息删掉）；
- `sessionStorage` 数据在当前浏览器关闭后自动删除，每个 tab 页独立。
- `cookie` 设置的 cookies 过期时间之前一直有效，即使窗口或浏览器关闭。


#### 应用

1. 尝试从cookie中获取session-key，如果有则继续判断是否具有用户信息和用户权限。如果无session-key则直接跳转到登录页。
2. 如果获取用户信息和用户权限的过程失败了，则清除session-key,并且跳转到登录页。 这个session-key是在用户登录成功后存入cookie的，过期时间为0.5天。

## Chrome 调试工具