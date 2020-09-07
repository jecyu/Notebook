# 【译】程序员日常：你知道什么是 OAuth 吗？

> 原文链接：[What the hell is OAuth?](https://medium.com/@wdevon99/what-the-hell-is-oauth-6ba19f236612)
> 原文作者：[Devon Wijesinghe]()
> 译者：[Jecyu 森煜](https://juejin.im/user/1486195450470023/posts)
> 校对：[Yolanda]()

![](https://miro.medium.com/max/700/1*pcljELly2on6AG2J7N5tfw.png)

大家好！**OAuth** 成为一个时髦的词很长一段时间了，但是对于初学者来说还是很难领悟，并不是因为 OAuth 本身很难，而是因为在网上搜到有关 OAuth 的资料看完让人困惑。因此我写了这篇文章来解释 OAuth 被以一种非常简单的术语使用的原因和方式。（⚠️`<--help translate`）

## 简单的登录

在进一步讲解前，让我们回顾过去用户是怎样登录系统的。最基本和最简单的登录是，用户凭证存储在一个托管的数据库中（密码通常是以哈希值的方式存储）。当用户登录时，将发送用户凭证到后台，如果成功匹配，则会话（session）将会被存储到浏览器中以便后续使用。

![](https://miro.medium.com/max/700/1*ODbaUuSDV-6vuOIXxylNIA.png)

### 弊端

- **安全问题**：你必须确保用户数据以一种安全的方式存储，并且该数据符合 GDPR（[https://eugdpr.org/](https://eugdpr.org/)）。假若不遵循最佳实践，系统是容易受到攻击。
- **维护成本**：应该确保系统正常运行（应该做好服务器管理）
  <!-- 这块问下原作者的正确意思，让他再解释一下？ -->

虽然上面提到的简单登录跟 OAuth 的工作方式无关，但是我提到它是为了你们对于可以用来跟 OAuth 比较的东西有一个比较清楚的认识。

### 委托授权问题？

委托授权是给予当前应用有权限去访问第三方应用的数据。（⚠️<--`help translate`）在没有获取用户凭证（credentials）的情况下去实现这个操作是个问题，被称为委托授权问题。

举个例子：如果让我们想想当前比较火的吃鸡游戏（**PUBG**），它想要访问你 Facebook 的朋友列表和个人资料。如果以下面的方式请求你的凭证是正确的吗？

![输入用户名和密码](https://miro.medium.com/max/700/1*2-E02l_qsRCAeTVDVE63Hw.png)

答案当然是不！你会信任该应用并把你的凭证告诉它，让它有能力去做更多的事情而不仅仅是获取你的朋友列表和个人信息吗？想想就知道了。

无论如何，OAuth 的出现就是为了接手这个局面并解决现在的问题。（⚠️：`<--need help`）

![OAuth]()

## OAuth 是什么?

OAuth（开放授权）是互联网上基于令牌（token） 认证和授权的开放标准。**OAuth** 允许终端用户信息在不需要提供用户密码的情况被第三方服务使用，比如 Facebook。

![](https://miro.medium.com/max/471/1*3249FyOJ785-dr5pyM6G9Q.png)

如果你仍然 get 不到，无需担心，接下来我会一步步解读它的工作原理！

![](https://miro.medium.com/max/700/1*aiskm3OoPeTqUT8EUdg3wQ.png)

如果你在网上搜索 OAuth，你看到的都是 OAuth 2.0。这是因为 1.0 版本已经废弃，也没什么人用了。所以从现在起，我将讨论 OAuth 2.0 版本。

![](https://miro.medium.com/max/700/1*Guf4916TAxgtG3BT9p-1Rw.png)

## 认证（Authentication）vs 授权（Authorization）

OAuth 2.0 主要是用来授权而不是认证的，因此很重要的是要清楚地明白这两者之间的区别。

你可以去 Google 搜索下这些术语的定义，但是你阅读后还是可能不太清楚它们的区别。所以我会使用这个例子来阐述它的意思：

试想一下，你将与女友飞往巴黎度过一个浪漫的假期！当你经过机场时，机场安检人员/移民官员会检查你的护照和机票以确保你是本人（检查你的身份）。这就是**认证（authentication）**！

然后，当你们登机的时候，如果登机牌上写着你是头等舱乘客，那么你获得的特权会比经济舱多。这就是**授权**。

![](https://miro.medium.com/max/700/1*E-79p00ZzTiFNvm-nueW9Q.png)

类似的，如果我们考虑使用真实的 Web 应用程序，通过应用跟踪用户的身份的方式是认证。而用户拥有的特权是通过授权实现的（例如：只是查看或者查看和编辑）。

## OAuth 2.0 术语

好吧！现在我们一步步来探索 OAuth 2.0！为了让你更好的理解文章剩下的部分，对 OAuth 2.0 使用的术语有些印象是很重要的。由于这些术语大多数都是以现存的术语命名的，因此理解起来不费劲。

- **资源所有者（Resource owner）**：目标应用的用户，拥有其他应用想获取的数据。
- **客户端（Client）**：应用程序。
- **授权服务器（Authorization server）**：可以用来提示和授权的系统。
- **资源服务器（Resource server）**：保存数据的系统。
- **授权授予（Authorization grant**：证明用户已授予应用访问数据权限的事物。
- **重定向 URL（Redirect Uri）**：当授权后用户重定向的位置。
- **访问 token（Access Token）**：用于从资源服务器获取数据的密钥。
- **作用域（Scope）**：用于定义应用程序操作用户数据的权限级别。

## OAuth 工作流

如果你完成过下面展示的步骤顺序操作（任何移动或者 Web 应用），并在其中授权访问你的数据，那么你已经使用过 **OAuth 2.0**！

![](https://miro.medium.com/max/700/1*SLd_kpMU8PwczIIGKTG0Qg.png)

现在让我们拆开看看幕后这些流程能够走通并访问你的数据的过程，到底发生了什么。

![](https://miro.medium.com/max/700/1*R06hbSc0yNm9E_qRyWFb8Q.png)

注意：这些步骤用黄色标记，所以当你阅读下面的步骤的时候可以参考。

### 步骤 1: 流程开始

当你在 Facebook 或者任何其他的 [OAuth 2.0 提供者](https://en.wikipedia.org/wiki/List_of_OAuth_providers) 注册你的应用程序时，你会获得一个客户端 id（**client id**） 和一个客户端密钥（**client secret**）（客户端密钥应该安全地存储好且不要暴露出来。）

当 PUBG 用户在应用中单击 `Login with Facebook` 按钮时，将会跳转到 OAuth 2.0 提供者（在这个例子中是 Facebook 登录页）。通过携带 **client id**和一些其他属性作为参数发送 HTTPS 请求到授权服务端来实现申请特权操作。类似下面这样：

```bash
https://www.facebook.com/v2.7/dialog/oauth?
`client_id=C_1`&
`redirect_uri`=com.app.pubg://callback&
`scope`=profile user_friends&
`response_type`=code
```

![](https://miro.medium.com/max/700/1*o_BFJgBkkACtO-erWXd52A.png)

正如前面所述，`redirect_uir` 是用户授权后跳转的位置，`client_id` 则是你从 OAuth 2.0 提供者获得的内容。

`scope` 定义了权限的等级，这些作用域（scopes）可以从 OAuth 2.0 提供者的文档查看。

比如，可以看看 Facebook 的作用域说明（图中圈红的地方就是上面的请求所用的）

![](https://miro.medium.com/max/700/1*o_BFJgBkkACtO-erWXd52A.png)

### 步骤 2: 进行授权

用户成功登录后，系统将会提示用户准予 PUBG 访问他的数据！（朋友列表和个人资料）。

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

接收到访问 token（access token）后就可以用来获取应用所需的信息了，在 PUBG 的例子中，用来访问朋友列表和用户基本信息。

## 更多的 OAuth 2.0 术语

你们可以会想，为什么需要通过两个步骤取获取访问 token（access token）（首先获得 code，然后用 code 交换 access token）。将这个分解为两个步骤有原因的。为了弄明白它，你需要理解下面的术语：

- **后端（Back channel）**：服务端之间的通信安全性更高。
- **前端（Front channel）**：浏览器端和移动端相对服务器端安全性较低。

鉴于后端的安全性更好，更加适合用于交换 access token。

![](https://miro.medium.com/max/700/1*7nfbeGQHY9iCXPWZat6WZg.png)

**注意**：上面描述的流程只是 OAuth（授权码流程**Authorization Code Flow**）几种流程中的一种，更多信息可以看：[https://www.drupal.org/node/1958718](https://www.drupal.org/node/1958718)

另外，记住我拿 PUBG 说明只是举个例子，实际上它实现 Auth 的方式可能不是这样的。

## 小结

希望你对 OAuth 是怎么工作的以及为什么我们需要它有一些理解。现在是时候让你探索并找出更多 OAuth 流程类型。祝好！

感谢阅读本文，希望你有所收获。如果你需要帮助，可以联系我：[%20wdevon99@gmail.com](%20wdevon99@gmail.com)

### 参考资料

- [OAuth 2.0 - OAuth](https://oauth.net/2/)
