module.exports = {
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
          { text: "💻前端", link: "/frontend/" },
          { text: "☁️运维", link: "/devops/" },
          { text: "🚬测试", link: "/test/" },
          { text: "🌍GIS", link: "/gis/" }
        ]
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
          children: ["gitBase", "gitWorkFlow", "collaborative"]
        }
      ],
      "/bookmark/": [
        {
          title: "网站书签整理",
          collapsable: false,
          children: ["", "backend", "tool"]
        }
      ],
      "/devops/": [
        {
          title: "运维",
          collapsable: false,
          children: ["", "linux", "window"]
        }
      ],
      "/frontend/": [
        {
          title: "前端",
          collapsable: false,
          children: ["", "css", 'js', "performance", "vue", "npm"]
        }
      ]
    },
    lastUpdated: "Last Updated",
    sidebarDepth: 2
  }
};
