module.exports = {
  plugins: [
    'vuepress-plugin-zooming', {
      // 支持点击缩放的图片元素的选择器
      selector: 'img',
      // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
      delay: 1000,

      // medium-zoom 的 options
      // 默认值: {}
      options: {
        bgColor: 'black',
        zIndex: 10000,
      }
    }
  ],
  base: "/Notebook/",
  title: "Jecyu's Notebook",
  description: "📝每天记录一点点",
  head: [["link", { rel: "icon", href: "/images/logo.jpeg" }]],
  themeConfig: {
    nav: [
      { text: "📝日常记录", link: "/dailyRecord/" },
      {
        text: "开发者",
        items: [
          { text: "💻大前端", link: "/frontend/" },
          { 
            text: "️️🧘算法修炼", 
            items: [ 
              {text: "计算机基础", link: "/algorithm/computerBasics"},
              {text: "数据结构", link: "/algorithm/dataStructure"},
              {text: "算法分类", link: "/algorithm/algorithm"},
            ] 
          },
          { text: "☁️运维", link: "/devops/" },
          { text: "🚬测试", link: "/test/" },
          { text: "🌍GIS", link: "/gis/" },
          { text: "️️🖱️软件", link: "/software/" },
          { text: "️️🐛网络工程", link: "/network/",  },
        ]
      },
      { text: "设计", items: [
        { text: "🖌️UI", link: "/design/" }]
      },
      { text: "🏷书签整理", link: "/bookmark/" },
      { text: "✔️编码规范&协同开发", link: "/lint/" },
      {
        text: "📖知识脑图",
        link:
          "http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/index.html"
      },
      {
        text: "🔧个人博客",
        link: "https://jecyu.github.io/blog/"
      },
      {
        text: "🔗Github",
        link: "https://github.com/Jecyu"
      },
      {
        text: "英语学习",
        link: "https://github.com/Jecyu"
      }
    ],
    // sidebar: "auto",
    sidebar: {
      "/dailyRecord/": [
        {
          title: "日常记录",
          collapsable: true,
          children: ["", "2018", "table"]
        },
        {
          title: "TechnologyDevelopment",
          collapsable: false,
          children: ["TechnologyDevelopment"]
        }
      ],
      "/lint/": [
        {
          title: "代码审查",
          collapsable: true,
          children: ["codeReview"]
        },
        {
          title: "编码规范",
          collapsable: true,
          children: ["", "es6", "vue"]
        },
        {
          title: "协同开发",
          collapsable: true,
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
          children: ["linux", "window", "mac"]
        }
      ],
      "/software/": [
        {
          title: "软件",
          collapsable: false,
          children: ["excel", "ps"]
        }
      ],
      "/frontend/": [
        {
          title: "前端",
          collapsable: false,
          children: ["", "chrome", "browser", "noJQ", "css", 'js', "es6", "performance", "vue", "npm", "lodash"]
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
          children: ["computerBasics"]
        }
      ],
      "/gis/": [
        {
          title: "GIS",
          collapsable: false,
          children: ["", "layer", "handleFile"]
        }
      ]
    },
    lastUpdated: "Last Updated",
    sidebarDepth: 2
  },
 
};
