/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-19 10:46:26
 * @LastEditTime: 2020-05-19 10:51:13
 * @LastEditors: Jecyu
 */ 
const request = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = new Error("异常");
      reject(error)
    }, 0);
  })
}

(async function() {
  try {
    await request();
  } catch(err) {
    const error = err;
    console.log('错误 =>', err.message);
  }
})()