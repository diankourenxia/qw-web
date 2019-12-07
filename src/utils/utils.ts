/*
 * @Description: 通用工具
 * @Author: Fan
 * @Date: 2019-09-02 18:07:53
 */

"use strict";
export default {
  /**
   * 小数处理
   * @param fileName
   */
  numberFixed(num: number, fractionDigits?: number): string {
    return num.toFixed(fractionDigits || 2);
  },
  /**
   * 空值判断
   * @param params
   * @param strict 严格模式，为true将判断空数组[]，空对象{}是否为空
   */
  isEmpty(params: any, strict: boolean = false): boolean {
    if (params === undefined || params === null || params === "") {
      return true;
    }

    if (strict) {
      if (Array.isArray(params)) {
        return this.isEmptyArr(params);
      }
      if (typeof params === "object") {
        return this.isEmptyObject(params);
      }
    }

    return false;
  },
  isEmptyArr(arr: any[]): boolean {
    return !(arr && arr.length > 0);
  },
  isEmptyObject(obj: object): boolean {
    const arr = Object.keys(obj);
    return arr.length === 0;
  },
  /**
   * 日期format
   * @param date 时间戳
   * @param formatString 'YYYY-MM-DD HH:mm:ss'
   */

  /**
   * 字符串空值转换
   * @param str
   * @param defaultValue
   * @constructor
   */
  NVL(str: string, defaultValue: string): string {
    if (str === undefined || str === null || str === "") {
      return defaultValue;
    }
    return str;
  },
  browserCheck() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    }
    if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    }
    if (
      userAgent.indexOf("Safari") > -1 &&
      userAgent.indexOf("Chrome") === -1
    ) {
      return "Safari";
    }
    return "";
  },
  clearCacheUrl(url: string) {
    return `${url}?${Math.random()}`;
  },
  /* 检查手机号
   *@param phone
   */
  checkPhone(phone: string): boolean {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      return false;
    }
    return true;
  },
  /* 检查电话
   *@param tel
   */
  checkMobile(tel: string): boolean {
    if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
      return false;
    }
    return true;
  }
};
