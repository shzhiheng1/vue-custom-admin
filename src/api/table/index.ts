import request from "@/utils/request";

export const getTableList = (data: any) => {
  return request({
    baseURL: "/api",
    url: "/table/list",
    method: "GET",
    data,
  });
};
