// 如何追踪变化
function defineProperty(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true, // grant delete or change property
    get: function() {
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
    },
  });
}
 