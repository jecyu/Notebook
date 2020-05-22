module.exports = {
  plugins: [
    "vuepress-plugin-zooming",
    {
      // 支持点击缩放的图片元素的选择器
      selector: "img",
      // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
      delay: 1000,

      // medium-zoom 的 options
      // 默认值: {}
      options: {
        bgColor: "black",
        zIndex: 10000
      }
    },
    "vuepress-plugin-smooth-scroll",
    "vuepress-plugin-table-of-contents"
  ],
  base: "/Notebook/",
  title: "Jecyu's Notebook",
  description: "📝每天记录一点点",
  head: [["link", { rel: "icon", href: "/images/logo.jpeg" }]],
  themeConfig: {
    nav: [
      { text: "📝日常记录", link: "/dailyRecord/" },
      // { text: "技术分享", link: "/dailyRecord/" },
      {
        text: "开发者",
        items: [
          { text: "💻大前端", link: "/frontend-web/" },
          { text: "🐂web 框架", link: "/web-framework/" },
          { text: "🤔复盘", link: "/rethink/" },
          {
            text: "️️🧘算法修炼",
            items: [
              { text: "计算机基础", link: "/algorithm/computerBasics" },
              { text: "数据结构", link: "/algorithm/dataStructure" },
              { text: "算法分类", link: "/algorithm/algorithm" },
              { text: "数据库", link: "/dataBase/index" }
            ]
          },
          { text: "☁️运维", link: "/devops/" },
          { text: "🚬测试", link: "/test/" },
          { text: "🌍GIS", link: "/gis/" },
          { text: "️️🖱️工具", link: "/tools/" },
          { text: "️️🐛网络工程", link: "/network/" },
          { text: "️️🎮游戏开发", link: "/game-development/" },
          { text: "🚶编程语言", link: "/programming-language/" }
        ]
      },
      { text: "✔️编码规范&协同开发", link: "/lint/" },
      { text: "𝜋数学", link: "/math/" },
      { text: "设计", items: [{ text: "🖌️UI", link: "/design/" }] },
      { text: "🏷书签整理", link: "/bookmark/" },
      {
        text: "📖知识脑图",
        link:
          "http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/index.html"
      },
      {
        text: "🔧个人博客",
        link: "http://www.jecyu.com/"
      },
      {
        text: "🔗Github",
        items: [
          {
            text: "Jecyu github",
            link: "https://github.com/Jecyu"
          },
          {
            text: "英语学习",
            link: "https://jecyu.github.io/language-learning/"
          },
          {
            text: "前端自动化测试",
            link: "https://jecyu.github.io/Fe-Auto-Testing/"
          },
          {
            text: "JS 事件循环机制",
            link: "https://jecyu.github.io/JS-Event-Loop/"
          }
        ]
      }
    ],
    // sidebar: "auto",
    sidebar: {
      "/dailyRecord/": [
        {
          title: "日常记录",
          collapsable: true,
          children: ["", "2019", "2018", "friends",]
        },
        {
          title: "TechnologyDevelopment",
          collapsable: false,
          children: ["TechnologyDevelopment"]
        }
      ],
      "/lint/": [
        {
          title: "代码回顾",
          collapsable: false,
          children: ["codeReview"]
        },
        {
          title: "编码规范",
          collapsable: false,
          children: ["", "es6", "vue"]
        },
        {
          title: "协同开发",
          collapsable: false,
          children: ["gitBase", "gitWorkFlow", "collaborative", "gitCommit"]
        }
      ],
      "/bookmark/": [
        {
          title: "网站书签整理",
          collapsable: false,
          children: ["", "backend", "tool", "network"]
        }
      ],
      "/design/": [
        {
          title: "设计",
          collapsable: false,
          children: ["layout", "animate"]
        }
      ],
      "/devops/": [
        {
          title: "运维",
          collapsable: false,
          children: ["linux", "window", "mac", "docker"]
        }
      ],
      "/tools/": [
        {
          title: "工具",
          collapsable: false,
          children: ["excel", "ps", "webpack", "curl", "vscode"]
        }
      ],
      "/frontend-web/": [
        {
          title: "前端",
          collapsable: false,
          children: [
            "browser",
            "css",
            "js",
            "es6",
            "ts",
            "react",
            "vue",
            "regex",
            "",
            "architecture",
            "authentication",
            "chrome",
            "noJQ",
            "performance",
            "npm",
            "lodash"
          ]
        }
      ],
      "/game-development/": [
        {
          title: "游戏开发",
          collapsable: false,
          children: ["design-prototype-development", "", "unity"]
        }
      ],
      "/programming-language/": [
        {
          title: "🚶不止前端",
          collapsable: false,
          children: ["", "node", "java"]
        }
      ],
      "/rethink/": [
        {
          title: "思维",
          collapsable: false,
          children: [""]
        }
      ],
      "/network/": [
        {
          title: "网络",
          collapsable: false,
          children: ["", "http"]
        }
      ],
      "/algorithm/": [
        {
          title: "算法",
          collapsable: false,
          children: [
            "computerBasics",
            "dataStructure",
            "algorithm",
            "design-principles",
            "patterns",
            "c",
          ]
        }
      ],
      "/dataBase/": [
        {
          title: "数据库",
          collapsable: false,
          children: ["", "mysql"]
        }
      ],

      "/gis/": [
        {
          title: "GIS",
          collapsable: false,
          children: [
            "",
            "arcgis-for-js",
            "layer",
            "argis-server",
            "handleFile",
            "supermap"
          ]
        }
      ],
      "/web-framework/": [
        {
          title: "web 框架",
          collapsable: false,
          children: ["", "koa"]
        }
      ],
      "/math/": [
        {
          title: "数学之美",
          collapsable: false,
          children: [""]
        }
      ]
    },
    lastUpdated: "Last Updated",
    sidebarDepth: 6
  }
};
