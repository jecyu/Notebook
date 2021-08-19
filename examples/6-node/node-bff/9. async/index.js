// console.log(
//   (async function() {
//     return 4;
//   })()
// );

// console.log(
//   (function() {
//     return new Promise((resolve) => {
//       resolve(4);
//     });
//   })()
// );

// (function() {
//   const result = async function() {
//     var content = await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(6);
//       }, 500);
//     });
//     console.log(content);
//   };
// })();

// async
(async function() {
  try {
    // await interview(1);
    // await interview(2);
    // await interview(3);

    await Promise.all([interview[1], interview[2]]) // 并行
    console.log("smile");
  } catch (err) {
    console.log("cry at " + err.round + " round");
  }
})();

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve("success");
      } else {
        var error = new Error("fail");
        error.round = round;
        reject(error);
      }
    }, 500);
  });
}
