const apiPrefix = "/api";

/**
 * 获取完整地址url
 * @returns {string}
 * @param route
 */
export const getCompleteUrl = (route: string): string => {
  return process.env.VUE_APP_URL + route;
};

const api = {
  uploadFile: "/api/upload/file",
  weddingList: "/api/wedding/list",
  deleteWedding: "/api/wedding/delete",
  categoryGet: "/api/category/get",
  categoryUpdate: "/api/category/update",
  weddingAdd: "/api/wedding/add",
  weddingGet: "/api/wedding/get",
  weddingUpdate: "/api/wedding/update",
  userGet: "/api/user/get",
  userUpdate: "/api/user/update"
};

export default api;
