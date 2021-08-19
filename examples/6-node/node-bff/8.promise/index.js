// (function() {
//   var promise = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//       resolve();
//     }, 500);
//   });

//   console.log(promise);

//   setTimeout(() => {
//     console.log(promise);
//   }, 800);
// })();

// (function() {
//   var promise = interview();
//   promise
//     .then((res) => {
//       console.log("smile");
//     })
//     .catch((err) => {
//       console.log("cry");
//     });
// });

// function interview() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() < 0.8) {
//         resolve("success");
//       } else {
//         reject(new Error("fail"));
//       }
//     }, 500);
//   });
// }

// Promise
// (function() {
//   var promise = interview(1)
//     .then(() => {
//       return interview(2);
//     })
//     .then(() => {
//       return interview(3);
//     })
//     .then(() => {
//       console.log("smile");
//     })
//     .catch((err) => {
//       console.log("cry at " + err.round + " round");
//     });
// })();

// function interview(round) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() < 0.8) {
//         resolve("success");
//       } else {
//         var error = new Error("fail");
//         error.round = round;
//         reject(error);
//       }
//     }, 500);
//   });
// }

// 并发异步
(function() {
  Promise.all([interview("geekbang"), interview("tencent")])
    .then(() => {
      console.log("smile");
    })
    .catch((err) => {
      console.log("cry for " + err.name);
    });
})();

function interview(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve("success");
      } else {
        var error = new Error("fail");
        error.name = name;
        reject(error);
      }
    }, 500);
  });
}
