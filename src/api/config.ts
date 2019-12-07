import api from "./index";
import { post } from "@/services/request";

export const uploadImg = (params: any): Promise<any> => {
  return post(api.uploadFile, params);
};
export const getWeddingList = (): Promise<any> => {
  return post(api.weddingList);
};
export const deleteWedding = (param: any): Promise<any> => {
  return post(api.deleteWedding, param);
};
export const getCategoryList = (param: any): Promise<any> => {
  return post(api.categoryGet, param);
};
export const updateCategory = (param: any): Promise<any> => {
  return post(api.categoryUpdate, param);
};
export const addWedding = (param: any): Promise<any> => {
  return post(api.weddingAdd, param);
};
export const getWedding = (param: any): Promise<any> => {
  return post(api.weddingGet, param);
};
export const updateWedding = (param: any): Promise<any> => {
  return post(api.weddingUpdate, param);
};
export const getUserInfo = (param: any): Promise<any> => {
  return post(api.userGet, param);
};
export const updateUserInfo = (param: any): Promise<any> => {
  return post(api.userUpdate, param);
};
