# Angular

Angular 的概览，实际上它已不仅仅是简单的框架，更像是个平台。不同的项目倾向的技术口味并不相同，技术选型时我们都希望性价比最大化，无论是React，还是Vue，抑或是Angular，都能解决我们的主要问题，而Angular提供更广泛的多端支持，一站式解决方案，加上精心的架构设计、成熟的 Angular 生态、对标准的拥抱，还有 Google 和微软的联手支持，这些都给了开发者足够的信心，Angular 将会是一个非常棒的平台，

- MVVM 模式
- 引入指令系统来扩展 HTML 的语义
- Service、Factory 和 Provider 等来为公共和数据逻辑提供抽象。
- 基于 ngModel 双向绑定的表单格式化和验证

作者：__ihhu
链接：https://juejin.cn/post/6844903475038388232
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## Angular 简介

![](../../.vuepress/public/images/2021-08-10-21-42-43.png)

![](../../.vuepress/public/images/2021-08-10-21-44-35.png)

![](../../.vuepress/public/images/2021-08-10-21-45-57.png)

## 创建项目

首先安装cli工具

```sh
npm install -g @angular/cli
```

## Angular 架构总览

### 核心模块

#### 依赖注入

依赖注入是一种帮助开发者管理模块依赖的设计模式。在 Angular 中，依赖注入与 TypeScript 相结合提供了更好的开发体验。**在 TypeScript 中，对象通常被明确赋予类型，通过类型匹配，组件类便可知道该用哪种类型实例取赋值变量**。

```js
// angular 12
import { LoggerService } from './logger-service';

@Component({
  selector: 'contact-list',
  providers: [LoggerService]
})
export class ContactListComponent {
  constructor(private logger: LoggerService) {
    
  }
  
  doSomething() {
    this.logger.info('xxx');
  }
}
```

`@Component` 装饰器中的 `providers` 属性是依赖注入操作的关键，它会为该组件创建一个注入器对象，并新建 LoggerService 实例存储到这个注入器里。**组件在需要引入 LoggerService 实例时，通过 TypeScript 的类型匹配即可从注入器取出相应的实例对象，无须再重复显式实例化。**

需要注意的是，服务的每一次注入（也就是使用 providers）声明，该服务都会被创建出新的实例，组件的所有子组件均默认继承父组件的注入器对象，复用该注入器存储的服务实例，这种机制可保证服务以单例模式运行，除非某个子组件再次注入（即通过 providers声明）。

这种灵活的注入方法可以适应多变的应用场景，既可配置全局单例服务（在应用的根组件注入即可），也可按需注入不同层级的服务，彼此数据状态不会相互影响。

![](../../.vuepress/public/images/2021-08-10-21-14-24.png)

### 应用模块

Angular 引入模块机制，是对某些特定功能特性的封装，可能包含若干组件、指令、服务等，甚至拥有独立的路由配置。

每个 Angular 应用至少有一个模块，一般需要有一个模块作为应用的入口，这个入口模块称为根模块（Root Module），通过引导运行根模块来启动 Angular 应用。

通常会根据应用功能分区设计，不同的功能特性由不同的独立模块负责。在 Angular 中，除了根模块外其他的模块类型有：封装某个完整功能的特性模块（Feature Module），封装一些公共构件的共享模块（Shared Module），以及存放应用级别核心构件的核心模块（Core Module）。

通过将特性模块导入到根模块里即可实现对该特性功能的引入，而模块间如何交互无须开发者去关心，Angular 已经处理好了。这种交互关系对于不同的模块构件各不相同。

- **路由**：当特性模块导入到根模块后，特性模块的路由配置会自动与根模块里的路由配置合并。
- **组件和指令**：默认情况下模块内的组件和指令是私有的，也就是说特性模块 A 被导入到根模块内后，根模块依然不能使用特性模块 A 内里的组件和指令，除非特性模块 A 里显示暴露出了某些组件或指令，这些暴露出来的组件或指令相当于模块的 API。
- **服务**：服务的处理则有些特殊，通过依赖注入机制，服务同样可以注入到模块里，但跟组件里的依赖追的作用域并不相同。注入到组件里的服务只能在该组件及其子组件上，而注入到模块里的服务在整个应用里均能使用，因为所有模块都共享着同一个应用级别的根注入器。

Angular 已经封装了不少常用的特性模块。

- CommonModule：封装一些常用的内置指令和内置管道等。
- BrowserModule：封装在浏览器平台运行时的一些工具库，同时将 CommonModule 和 ApplicationModule 打包导出，所以通常在使用时引入 BrowserModule 就可以了。
- RouterModule：封装路由相关的组件指令等。

```js
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

import { ShippingComponent } from './shipping/shipping.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent }
    ])
  ],
  declarations: [
    // 所有使用到的组件都需要在这里进行声明
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
```



## 组件编写

组件例子：

- https://stackblitz.com/edit/angular-25pxjj?file=src%2Fapp%2Fproduct-list%2Fproduct-list.component.html
- Guide https://angular.io/start#create-the-product-list


### **定义组件**

button.module.ts

button.component.ts|html|scss

```js
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world', // 组件名
  // 可以通过路径引入进来
  template: `
    <h2>{{ message }}</h2>
    <p>This is my first component!</p>
    `,
  styleUrls: ['./d-button.component.scss'], // 样式
})
export class HelloWorldComponent {
  message = 'Hello, World'
  // The code in this class drives the component's behavior.
}
```

### **组件的输入/输出**

```js
@Input() icon: string; // 输入，相当于 Vue 的 prop
@Output() btnClick = new EventEmitter<any>(); // 输出
```

### 模版

```html
<button
  [type]="type" // 绑定变量
  (click)="onClick($event)" // 绑定事件
>
  <span *ngIf="icon"></span> // if逻辑
  <ng-content></ng-content> // 内容插槽
</button>
<div [innerHTML]="data.tmw"></div> // 显示HTML内容
```

产品列表

product-list.component.html

```html
<h2>Products</h2>
<div *ngFor="let product of products">
  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>
  <button (click)="share()">Share</button>
</div>
```

### 管道

在 Angular 中，管道（Pipes）可以按照开发者指定的规则将模版内的数据进行转换。如日期类型（Date），默认会显示为 Mon Jun 06 2016 14:17:00 GMT+0800 (CST) 这样的形式，但不如 Jun 6, 2016 这样的形式直观，此时可以借助管道来实现这种转换效果。

#### 管道介绍

#### 内置管道

Angular 根据业务场景，封装了一些常用的内置管道。内置管道可以直接在任何模版表达式中被使用，不需要通过 import 导入和在模块中声明。

- [`DatePipe`](https://angular.io/api/common/DatePipe): Formats a date value according to locale rules.
- [`UpperCasePipe`](https://angular.io/api/common/UpperCasePipe): Transforms text to all upper case.
- [`LowerCasePipe`](https://angular.io/api/common/LowerCasePipe): Transforms text to all lower case.
- [`CurrencyPipe`](https://angular.io/api/common/CurrencyPipe): 将数值转成本地货币格式
- [`DecimalPipe`](https://angular.io/api/common/DecimalPipe): Transforms a number into a string with a decimal point, formatted according to locale rules.
- [`PercentPipe`](https://angular.io/api/common/PercentPipe): Transforms a number to a percentage string, formatted according to locale rules.

### **class/style 绑定**

### 组件通信

就是前面的输入与输出的具体细节。

#### 传数据到子组件

子组件

```js
// product-alerts.component.ts
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'; // 通过 Input 装饰器处理
import { Product } from '../../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  @Input() product!: Product; // 输入
  constructor() {}

  ngOnInit() {}
}
```

父组件

```html
<h2>Products</h2>

<div *ngFor="let product of products">
  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>

  <button (click)="share()">Share</button>

  <app-product-alerts [product]="product"></app-product-alerts>
</div>
```

注意的是， ProductAlertsComponent 需要到当前模块 app.module.ts 的 declarations 进行声明才能在上述父组件的 html 模版中使用。

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
```

#### 传数据到父组件

孩子组件 ts

```js
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'; // 传数据到父组件
import { Product } from '../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() notify = new EventEmitter();
}

```

孩子组件 html

```html
<p *ngIf="product && product.price > 700">
  <button (click)="notify.emit()">Notify Me</button>
</p>
```

在父组件 ts. In `product-list.component.ts`, define an `onNotify()` method

```js
export class ProductListComponent {
  products = products;
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
```

在父模版中接收数据，监听 notify 事件，然后调用回调函数。

```html
<app-product-alerts
  [product]="product" 
  (notify)="onNotify()"> 
</app-product-alerts>
```

#### 多个组件之间进行通信

可以通过组件间共享同一服务实例来实现通信。

### 生命周期

## 模板

### 表单

## 指令

## 服务与 RxJS

在 Angular 中，服务用于帮助开发者书写可重用的公共功能（如日志管理、权限管理等）和复杂业务逻辑，对于应用程序的模块化有很重要的意义。

### Angular 服务（管理数据）

> In Angular, **a service is an instance of a class** that you can make available to any part of your application using Angular's [dependency injection system](https://angular.io/guide/glossary#dependency-injection-di).

Angular  服务器一般是封装了某种特定功能的独立模块，它可以通过注入的方式供外部调用。服务在 Angular 中使用十分广泛，例如：

- 多个组件中出现重复代码时，把重复代码提取到服务中实现代码复用。
- 当组件中掺杂了大量的业务代码和数据处理逻辑时，把这些逻辑封装成服务供组件使用，组件只负责 UI 相关的逻辑，有利于后续的更新和维护。
- 把需要共享的数据存储在服务中，通过在多个组件中注入同一服务实例实现数据共享。

以下是 Angular 应用中常见的几种服务

- 和服务器通讯的数据服务。
- 检查用户输入的验证服务。
- 方便跟踪错误的日志服务。

（PS：很像 redux 每一个redux 做的东西。）

#### 使用场景

定义一个购物车服务

```js
import { Injectable } from '@angular/core';
import { Product } from './products';

@Injectable({ // 注入
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  constructor() {}

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
```

在 `cart.component.ts` 导入服务，再在组件的构造函数中引入服务的实例，接着就可以在逻辑代码中调用服务的方法了。

```ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  constructor(private cartService: CartService) {}

  ngOnInit() {}
}
```

### HTTP 服务

使用 Observable 处理异步操作是 Angular 推荐的方式，HTTP 服务的 API 接口返回的也是 Observable 对象。

### 响应式编程

#### 概述

**响应式编程（Reactive Programming）是一种面向数据流（Data Flows）和变化传播（the Propagation of Change）的编程范式。**

**面向变化传播就是看最初的数据是否会随着后续对应变量的变化而变化**，举一个例子，A + B = C。

比如在命令式编程中，当 B 的数值改变之后，C 的数值并没有随着 B 的数值改变而改变。而在响应式编程中，随着 B 的 改变，C 的数值也会随之变动。

同样，在 MVVM 中，存在一种 M（Model）到 V（View）的绑定关系

![](../../.vuepress/public/images/2021-08-10-23-26-01.png)

当 model1 由 model1 变为 model2 时，view 也随之进行了变化，由 view1 变为了view2.

**当监听一系列事件流并对这一系列事件流进行映射、过滤和合并等处理后，再响应整个事件流的回调，这过程便是属于面向数据流的编程**。比如 ReactiveX 的编程范式中，数据流被封装在一个叫做 Observable 的对象实例中，通过观察者模式，对数据流进行统一的订阅（Subscribe），并在中间插入像 filter() 这样的操作函数，从而对 Observable 所封装的数据流进行过滤处理。

```js
myObservable.filter(fn).subscribe(callback);
```

可以看到响应式编程清楚地表达了动态的异步数据流，而相关的计算模型也自动地将变化的值通过数据流的方式进行了传播。

#### ReactiveX

### RxJS

参考资料：

- [【第1340期】希望是最浅显易懂的RxJS教程](https://mp.weixin.qq.com/s/6RRK4Gb__cvCwg6CjykFrQ)

## 依赖注入

```js
import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // 注入到整个应用
})
export class CartService {
  items: Product[] = [];
  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }
}

```

## 路由

```js
// app.module.ts
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent}
    ])
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

然后在 `product-list.component.html` 定义路由

```html
  <a [title]="product.name + ' details'" [routerLink]="['/products', product.id]">
      {{ product.name }}
    </a>
```

- https://angular.io/start/start-routing

## 参考资料

- [半小时入门 Angular 2](https://juejin.cn/post/6844903475038388232)

