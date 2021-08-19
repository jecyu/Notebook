// 无法捕获错误
// try {
//   interview(function() {
//     console.log("smile");
//   });
// } catch (e) {
//   console.logZ("cry", e);
// }

// error 优先
// interview(function(err, res) {
//   if (err) {
//     return console.log("cry");
//   }
//   console.log("smile");
// });

// 异步流控制，回调地狱。
// interview(function(err) {
//   if (err) {
//     return console.log("cry at 1st round");
//   }
//   interview(function(err) {
//     if (err) {
//       return console.log("cry at 2st round");
//     }
//     interview(function(err) {
//       if (err) {
//         return console.log("cry at 3st round");
//       }
//       console.log("smile");
//     });
//   });
// });

function interview(callback) {
  setTimeout(() => {
    let err = null;
    if (Math.random() < 0.8) {
      callback(err, "success");
    } else {
      // throw new Error("fail");
      err = new Error("fail");
      callback(err);
    }
  }, 500);
}


// 并发
var count = 0;
interview(function(err) {
  if (err) {
    return 
  }
})