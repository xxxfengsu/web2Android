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
 * 获取API基础URL（优先使用 Vite .env 注入的变量）
 */
const getApiBaseURL = (): string => {
  const envValue = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (envValue) return envValue;
  return 'http://localhost:8881';
};

/**
 * 创建 axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 如果需要携带 cookie
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-token"] = token;
      // config.headers.Authorization = `x-token ${token}`;
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