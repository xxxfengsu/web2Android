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

export function getBodyReport(data: unknown) {
  return request({
    url: "/analysis/body/provider",
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

export function getAnalysisRecords(page: number, pageSize: number = 5) {
  return request({
    url: "/analysis/record/getList",
    method: "get",
    params: {
      page,
      pageSize
    },
  });
}