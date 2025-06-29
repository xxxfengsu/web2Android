import axios from "axios"; 
import type { AxiosRequestConfig } from "axios";
import type { AxiosInstance } from "axios";

/**
 * 统一返回结构
 */
export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

/**
 * 创建 axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: "http://139.224.59.6:8882",
  timeout: 5000,
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `x-token ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求错误：", error);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    return response.data; // 这里返回的就是 ApiResponse<T>
  },
  (error) => {
    console.error("响应错误：", error);
    return Promise.reject(error);
  }
);

/**
 * 二次封装请求，增加泛型
 */
const request = <T = unknown>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  return service(config);
};

export default request;