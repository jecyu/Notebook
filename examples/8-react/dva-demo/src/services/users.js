/*
 * @Author: naluduo233
 * @Date: 2021-04-15 13:47:46
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-15 13:48:20
 * @FilePath: /dva-demo/src/services/users.js
 * @Description: 
 */
import request from "../utils/request";
import qs from "qs";
export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}