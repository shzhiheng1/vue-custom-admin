// 判断是否为外连接
export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/;
  return reg.test(path);
};
