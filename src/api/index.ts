import request from "./request";

console.log(request)

/**
 * 登录参数
 */
export interface LoginParams {
  captchaId: string,
  username: string;
  password: string;
}


/**
 * 登录 API
 */
export function login(data: LoginParams) {
  return request({
    url: "/base/login",
    method: "post",
    data,
  });
}

export function getReport(data: unknown) {
  return request({
    url: "/analysis/face",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getStreamerInfo(person_id: string) {
  return request({
    url: `/feishu/StreamerInfo/${person_id}`,
    method: "get",
  });
}