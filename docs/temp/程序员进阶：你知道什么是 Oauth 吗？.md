# 【译】程序员日常：你知道什么是 OAuth 吗？

<!-- 如果评论没回复，就尝试发邮件。 -->

> 原文链接：[What the hell is OAuth?](https://medium.com/@wdevon99/what-the-hell-is-oauth-6ba19f236612)
> 原文作者：[Devon Wijesinghe]()
> 译者：[Jecyu 森煜]()
> 校对：[Yolanda]()

<!-- 已经在 Facebook 获得作者认可。由于获取认可后没及时回复作者，误操作导致 facebook 账号被封，待解封或重新申请账号后再拿翻译好的文章链接跟作者道谢和说明回复延迟原因。 -->

![](https://miro.medium.com/max/700/1*pcljELly2on6AG2J7N5tfw.png)

大家好！**OAuth** 现在成为一个很时髦的词，但是对于初学者来说很难领悟，并不是因为 OAuth 本身很难，而是因为在网上搜到有关 OAuth 的资料让人很困惑。因此我写这篇文章就是为了解释 OAuth 为什么以及怎样被以一种非常简单的术语来使用的。

## 简单的登录

在进一步讲解前，让我们回顾用户是怎样登录系统的。最基本和简单的登录是，用户凭证存储在被管理的数据库（通常密码是以哈希值的方式）。当用户登录时，用户凭证被发送到后台，如果成功匹配，则 会话（session）将会被存储到浏览器中以便后续使用。

![](https://miro.medium.com/max/700/1*ODbaUuSDV-6vuOIXxylNIA.png)

### 弊端

- **安全问题**：你必须确保用户数据以一种安全的方式存储，并且是以 GDPR（[https://eugdpr.org/](https://eugdpr.org/)）编译。如果不遵循最佳实践，系统是脆弱易受攻击的。
- **维护成本**：确保系统是正常运作的（应该做好集群管理）
  <!-- 这块问下原作者的正确意思，让他再解释一下？ -->

虽然上面提到的简单登录跟 OAuth 的运作没什么关系，但是我提及它是为了大家对我们可以用来跟 OAuth 比较的东西有一个比较清楚的认识。

### 委托授权问题？

授权是给予第三方应用权利去访问数据。在没有用户凭证（credentials）的情况下去实现是个问题，它也是著名的委托授权问题。

举个在例子：如果让我们想想当前比较火的吃鸡游戏（**PUBG**），它想要访问你 Facebook 的朋友列表和个人面板信息。如果以下面的方式请求你的凭证是正确的吗？

![输入用户名和密码](https://miro.medium.com/max/700/1*2-E02l_qsRCAeTVDVE63Hw.png)

答案当然是不！你会信任该应用并把你的凭证告诉它，让它有能力去做更多的事情而不仅仅是获取你的朋友列表和个人面板信息？想想就知道了。

无论如何，OAuth 的出现就是为了接手这个局面并解决现在的问题。

![OAuth]()

## OAuth 是什么?

OAuth（开放授权）是互联网上基于 token 认证和授权的开放标准。**OAuth** 允许终端用户信息在不需要提供用户密码的情况被第三方服务使用，比如 Facebook。

![](https://miro.medium.com/max/471/1*3249FyOJ785-dr5pyM6G9Q.png)

如果你仍然 get 不到，无需担心，接下来我会一步步解读的！

![](https://miro.medium.com/max/700/1*aiskm3OoPeTqUT8EUdg3wQ.png)

如果你在网上搜索 OAuth，你看到的都是 OAuth 2.0。这是因为 1.0 版本已经废弃，也没什么人用了。所以从现在起我要讨论的都是 OAuth 2.0 版本。

![](https://miro.medium.com/max/700/1*Guf4916TAxgtG3BT9p-1Rw.png)

## 认证（Authentication）vs 授权（Authorization）

OAuth 2.0 主要是用来授权而不是认证的，因此很重要的是要清楚地明白这两者之间的区别。

你可以去 Google 搜索下这些术语的定义，但是你阅读后还是可能不太清楚它们的区别。

想象下你将要和女朋友飞去巴黎度过一个浪漫的假期。当你通过机场时，机场安检人员/移民官会检查你的护照和飞机票以确保你是本人（检查你的身份）。这就是**认证（authentication）**！

然后，当你们登机的时候，如果登机状态是头等舱，那么你享受的体验会比经济舱好很多。这就是**授权**。

![](https://miro.medium.com/max/700/1*E-79p00ZzTiFNvm-nueW9Q.png)

类似的，如果我们考虑一个真实的 Web 应用，使用应用追踪用户的身份的方式是认证。而用户拥有的权利是通过授权实现的（只是查看或者查看和编辑）。

## OAuth 2.0 术语

好吧！现在我们一步步来探索 OAuth 2.0！为了让你更好的理解文章剩下的部分，对 OAuth 2.0 使用的术语有些印象是很重要的。由于这些术语大多数都是以现存的术语命名的，因此理解起来不费劲。

- **资源拥有者（Resource owner）**：目标应用的用户，拥有其他应用想获取的数据。
- **客户端（Client）**：
- **授权服务器（Authorization server）**：可以用来回复和授权的系统。
- **资源服务器（Resource server）**：存储数据的系统。
- **授权（Authorization grant**：意味着用户准予应用访问数据。
- **重定向 URL（Redirect Uri）**：当授权成功后用户重定向的位置。
- **访问 token（Access Token）**：用来从资源服务器获取数据的钥匙。
- **作用域（Scope）**：定义了应用操作用户数据的权限等级。

## OAuth 工作流

如果你经历过下面展示的步骤顺序（任何移动或者 Web 应用），任何你授权访问你的数据的地方，那么你已经使用过 **OAuth 2.0**！

![](https://miro.medium.com/max/700/1*SLd_kpMU8PwczIIGKTG0Qg.png)

现在让我们拆开看看，在黑盒子这些流程能够走通并访问你的数据的过程到底发生了什么。

![](https://miro.medium.com/max/700/1*R06hbSc0yNm9E_qRyWFb8Q.png)

注意：每个步骤都用黄色标记，所以当你阅读下面的步骤的时候可以参考下。

### 步骤 1: 流程开始

当你把 app 注册到 Facebook 或者任何其他的 [OAuth 2.0 提供者](https://en.wikipedia.org/wiki/List_of_OAuth_providers)，你将会获得 客户端 id（**client id**） 和 客户端密钥（**client secret**）（客户端密钥应该安全地存储好且不要暴露出来。）

当用户在应用中单击 `Login with Facebook` 按钮时，将会跳转到 OAuth 2.0 提供者（在这个例子中是 Facebook 登录页）。通过携带 **client id**和一些其他属性作为参数发送 HTTPS 请求到授权服务端是可行的。类似下面这样：

```bash
https://www.facebook.com/v2.7/dialog/oauth?
`client_id=C_1`&
`redirect_uri`=com.app.pubg://callback&
`scope`=profile user_friends&
`response_type`=code
```

![](https://miro.medium.com/max/700/1*o_BFJgBkkACtO-erWXd52A.png)

正如前面所述，`redirect_uir` 是用户授权后跳转的位置，`client_id` 则是你从 OAuth 2.0 提供者提供的。

`scope` 定义了权限的等级，这些作用域（scopes）可以从 OAuth 2.0 提供者的文档查看。

比如，可以看看 Facebook 的作用域说明（图中圈红的地方就是上面的请求所用的）

![]()

### 步骤 2: 进行授权

在用户成功登录后，用户将会被提示准予 PUBG 访问他的数据！（朋友列表和个人信息）。

### 步骤 3: 回调

如果**用户拒绝授权访问**他/她的数据，回调看起来像下面这样：

用户将会跳转到请求的应用，跳转到它的登录界面后流程结束！在这种情况下 PUBG 不被授权访问用户的数据。

```bash
com.app.pubg://callback?
`error`=access_denied&
`error_description`=The user did not consent
```

相反，如果用户准许访问，回调看起来像下面这样：

回调将携带了授权码（**authorization code**）以便用于下一步。

```bash
com.app.pubg://callback?`code`=oMsCeLvIaQm6bTrgtp7
```

### 步骤 4: 用 code 交换 access token

一旦你从上一步获得授权码（**Authorization Code**），你可以把它发到授权服务器（authorization server）交换访问 token（**Access Token**）。

```bash
`POST`
www.facebookapi.com/oauth2/v4/token
`Content-Type`: application/x-www-form-urlencoded

`code`=oMsCeLvIaQm6bTrgtp7& 
`client_id`=C_1&
`client_secret`secret123&
`grant_type`=authorization_code
```

### 步骤 5: 进行访问数据

接收到 访问 token（access token）后就可以用来获取你的应用需要的信息了，在 PUBG 的例子中，用来访问朋友列表和用户基本信息。

## 更多的 OAuth 2.0 术语

你们可以会想，为什么需要通过两个步骤取获取访问 token（access token）（首先获得 code，然后把用 code 交换 access token）。这里有个原来解释为什么需要拆成两个步骤。为了明白它，你需要理解下面的术语：

- **后端（Back channel）**：服务端通信安全性更高。
- **前端（Front channel）**：浏览器端和移动端相对服务器端安全性较低。

鉴于后端的安全性更好，更加适合用于交换 access token。

![](https://miro.medium.com/max/700/1*7nfbeGQHY9iCXPWZat6WZg.png)

**注意**：上面描述的流程只是 OAuth（授权码流程**Authorization Code Flow**）几种中的一种，更多信息可以看：[https://www.drupal.org/node/1958718](https://www.drupal.org/node/1958718)

另外，记住我拿 PUBG 说明只是举个例子，实际上它实现 Auth 的方式可能不是这样的。

## 小结

希望你已经到 OAuth 是怎么运作和为什么我们需要它有一些理解。现在是时候让你探索并找出更多 OAuth 流程类型。祝好！

感谢你一步步阅读，希望你能获得收获。如果你需要帮忙，可以联系我：[%20wdevon99@gmail.com](%20wdevon99@gmail.com)

### 参考资料

- [OAuth 2.0 - OAuth](https://oauth.net/2/)
