/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-28 21:49:39
 * @LastEditTime: 2020-07-28 22:30:35
 * @LastEditors: Jecyu
 */


const parsedJSON = [
  {
    stepCode: "32668e374e74491a8e37cc6c4409263e",
    stepName: "代理地图服务",
    resultSet: [
      {
        name: "result",
        alias: "输出GDB数据",
        dataType: 41,
        dataTypeDesc: "GDB存储类型，file gdb，存储到文件系统",
        dataTypeCode: "TYPE_GDB",
        value: {
          name: "T80b248cdb8c94f89ac20767184b26ea3",
          source: {
            sysCode: null,
            type: "GDB",
            connection:
              '{"Type":4,"Path":"E:\\\\sstest\\\\dme-svrconf\\\\temp/c9e147fc4c8b486f960cf9a5ce084df8.gdb"}',
          },
        },
      },
    ],
  },
];

/**
 * 扁平化 JSONf
 * @param {}} parsedJSON 
 */
function flatparsedJSON(parsedJSON) {
  return flatValue();
  function flatValue() {
    const value = flatString() ?? flatNumber() ?? flatObject() ?? flatArray();
    return value;
  }

  function flatObject() {
    Object.keys()
  }
}

const list = flatparsedJSON(parsedJSON);
