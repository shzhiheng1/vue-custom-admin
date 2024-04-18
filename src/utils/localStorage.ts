// 设置localStorage
export const setLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
export const removeLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};
// 清空全部
export const clearLocalStorage = () => {
  localStorage.clear();
};
