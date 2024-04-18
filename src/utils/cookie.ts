import Cookies from "js-cookie";

// 存储token
const Token = "token";
export function setToken(token: string) {
  Cookies.set(Token, token);
}
export function getToken() {
  return Cookies.get(Token);
}
export function removeToken() {
  Cookies.remove(Token);
}
