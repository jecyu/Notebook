/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-27 16:01:52
 * @LastEditTime: 2020-05-27 17:50:42
 * @LastEditors: Jecyu
 */ 
const treeData = [{
  title: '业务热点', id: '0', folder: false
},
{
  title: '资源监测', id: '1', folder: true, expand: true,
  children: [
    {
      title: '供应计划', id: '2', folder: true, expand: true,
      children: [
        {
          title: '土地储备', id: '3'
        },
        {
          title: '土地供应', id: '4'
        },
        {
          title: '用地建设', id: '5'
        },
      ]
    },
    {
      title: '土地储备', id: '3'
    },
    {
      title: '土地供应', id: '4'
    },
    {
      title: '用地建设', id: '5'
    },

  ]
},
{
  title: '资源监测', id: '1', folder: true, expand: true,
  children: [
    {
      title: '供应计划', id: '2', folder: true, expand: true,
      children: [
        {
          title: '资源监测', id: '1', folder: true, expand: true,
          children: [
            {
              title: '土地供应', id: '5'
            },
            {
              title: '用地建设', id: '6'
            },
          ]
        },
        {
          title: '土地储备', id: '3'
        }
      ]
    },
    {
      title: '土地储备', id: '3'
    },
    {
      title: '土地供应', id: '4'
    },
    {
      title: '用地建设', id: '5'
    },

  ]
}
];
// const new 