/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-28 22:32:57
 * @LastEditTime: 2020-07-28 22:43:30
 * @LastEditors: Jecyu
 */

const parsedJSON = [
  {
    stepCode: "32668e374e74491a8e37cc6c4409263e",
    stepName: "代理地图服务",
    resultSet: [
      // {
      //   name: "result",
      //   alias: "输出GDB数据",
      //   dataType: 41,
      //   dataTypeDesc: "GDB存储类型，file gdb，存储到文件系统",
      //   dataTypeCode: "TYPE_GDB",
      //   value: {
      //     name: "T80b248cdb8c94f89ac20767184b26ea3",
      //     source: {
      //       sysCode: null,
      //       type: "GDB",
      //       connection:
      //         '{"Type":4,"Path":"E:\\\\sstest\\\\dme-svrconf\\\\temp/c9e147fc4c8b486f960cf9a5ce084df8.gdb"}',
      //     },
      //   },
      // },
    ],
  },
];
function formatRes(json) {
  const temp = [];
  let num = 0;
  const isArray = (test) =>
    Object.prototype.toString.call(test) === "[object Array]";
  const format = (data, pid) => {
    if (isArray(data)) {
      temp.push({ notation: "[" });
      data.forEach((item, index) => {
        const isJSON = isObjectOrArray(item);
        if (isJSON) {
          if (index === 0) {
            const t = {
              value: "",
              isJSON,
              key: "",
              isArray: true,
              index: -1,
              pId: pid,
              show: true,
            };
            temp.push(t);
          }
          num++;
          format(item, num);
        } else {
          const t = {
            value: JSON.stringify(item),
            isJSON,
            key: "",
            isArray: false,
            index,
            pId: pid,
            ArrayLast: index === data.length - 1,
            show: true,
          };
          temp.push(t);
        }
      });
      temp.push({ notation: "]" });
    } else {
      temp.push({ notation: "{" });
      Object.keys(data).forEach((key, index) => {
        // debugger
        const item = data[key];
        const isJSON = isObjectOrArray(item);
        if (isJSON) {
          const t = {
            value: "",
            isJSON,
            key,
            isArray: false,
            pId: pid,
            index: -1,
            show: true,
          };
          temp.push(t);
          num++;
          format(item, num);
        } else {
          const t = {
            value: JSON.stringify(item),
            isJSON,
            key,
            isArray: false,
            index,
            pId: pid,
            ObjectLast: index === Object.keys(data).length - 1,
            show: true,
          };
          temp.push(t);
        }
      });
      temp.push({ notation: "}" });
    }
  };
  format(json, num);
  return temp;
}
function isObjectOrArray(source) {
  const type = Object.prototype.toString.call(source);
  const res = type === "[object Array]" || type === "[object Object]";
  return res;
}

const list = formatRes(parsedJSON);
console.log(list);
