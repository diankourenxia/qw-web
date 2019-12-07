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
      if (
        response.data.code === "ul_530" &&
        process.env.NODE_ENV === "production" &&
        process.env.VUE_APP_EXTERNAL === "true"
      ) {
        if (!tokenWarning) {
          tokenWarning = true;
          MessageBox.alert("当前登录信息已过期", "登录过期", {
            confirmButtonText: "刷新信息",
            showClose: false,
            type: "warning",
            callback: () => {
              tokenWarning = false;
              window.location.href =
                "https://s.kwaishop.com/oauth2/authorize?app_id=ks702843018153803530&response_type=code&scope=user_info,merchant_item,merchant_order,merchant_refund&redirect_uri=https://ksdd.kuaixe.com/ISV/accessToken";
            }
          });
        }
        return Promise.reject(response.data);
      }

      if (!Utils.isEmpty(response.data)) {
        Message.error({
          showClose: true,
          duration: 2000,
          message: response.data.msg || response.data.message
        });
      }
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
