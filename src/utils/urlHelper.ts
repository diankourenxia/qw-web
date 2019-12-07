/*
 * @Description:
 * @Author: Fan
 * @Date: 2019-08-13 10:00:48
 */
import utils from "./utils";

const toQueryString = (obj: { [key: string]: any }) => {
  return obj
    ? Object.keys(obj)
        .sort()
        .map((key: string) => {
          const val = obj[key];
          if (Array.isArray(val)) {
            return val
              .sort()
              .map(val2 => {
                return (
                  encodeURIComponent(key) +
                  "=" +
                  encodeURIComponent(utils.NVL(val2, ""))
                );
              })
              .join("&");
          }
          return (
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(utils.NVL(val, ""))
          );
        })
        .join("&")
    : "";
};

const connectUrlWithParams = (url: string, params: object) => {
  let paramStr = "";
  if (params) {
    paramStr = toQueryString(params);
    paramStr = (url.indexOf("?") > -1 ? "&" : "?") + paramStr;
  }
  return url + paramStr;
};

export const urlParamsReplace = (url: string, params: any): string => {
  Object.keys(params)
    .sort()
    .forEach(key => {
      const reg = new RegExp(":\\s*" + key, "gi");
      url = url.replace(reg, params[key]);
    });
  return url;
};

export default {
  connectUrlWithParams,
  toQueryString,
  urlParamsReplace
};
