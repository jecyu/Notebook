/*
 * @Author: Jecyu
 * @Date: 2020-11-15 17:34:00
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-15 17:38:31
 * @FilePath: /examples/12-webpack/base/demo01/src/show.js
 * @Description:
 */
import _ from "lodash";
function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  return element;
}

export default { component };
