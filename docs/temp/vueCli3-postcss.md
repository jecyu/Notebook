css 像素与物理像素

 {
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "字段名称",
      align: "center",
      key: "name",
      slot: "name"
    },
    {
      title: "类型",
      align: "center",
      width: this.typeWidth,
      key: "type",
      slot: "valueType"
    },
    {

iview 这里设置的 px，是否会被转为 rem。这里需要处理的。针对这种单单使用 rem2px 是不行的。这个 rem 必须动态获取 html 的 font-size 进行处理。