/**
 *
 * Created by Fan on 2019-03-28.
 *
 */
import axios from "axios";
import { Utils } from "@utils";
import { Message, MessageBox } from "element-ui";

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.timeout = 150000;
// 跨域携带cookie
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": "application/json"
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

let tokenWarning = false;
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.headers) {
      if (
        response.headers["content-type"] === "application/msexcel;charset=UTF-8"
      ) {
        return response.data;
      }
    }
    if (response.data.code !== "200") {
      return Promise.reject(response.data);
    }
    return response.data.data;
  },

  error => {
    Message.error({
      showClose: true,
      duration: 2000,
      message: "服务器繁忙，请稍后重试"
    });
    return Promise.reject(error);
  }
);

export const get = (url: string, params?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((response: any) => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const post = (url: string, params?: any, config?: any): any => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
