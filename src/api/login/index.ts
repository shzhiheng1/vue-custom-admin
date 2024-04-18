import request from "../../utils/request";
import type * as Login from "./types/login";

// export const postLoginToken = (data: login.LoginRequestData) => {
//   return request<login.LoginResponseData>({
//     url: "users/login",
//     method: "post",
//     data,
//   });
// };

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request({
    url: "users/login",
    method: "post",
    data,
  });
}
//用户信息(使用mock)
export function infoApi() {
  return request({
    baseURL: "/api",
    url: "/users/info",
    method: "get",
  });
}
