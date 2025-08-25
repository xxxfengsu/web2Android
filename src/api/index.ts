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

/**
 * 历史记录项类型定义
 */
export interface AnalysisRecord {
  UpdatedAt: string;
  personId: string;
  imageUrl: string;
  fileUrl?: string;
  cateId?: number;
  rawData?: any;
}

/**
 * 历史记录响应类型
 */
export interface AnalysisRecordsResponse {
  code: number;
  data: {
    list: AnalysisRecord[];
  };
  msg: string;
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

/**
 * 获取素材参数
 */
export interface GetClothesParams {
  cateId?: number; // 服装分类ID (12: 上衣, 13: 下装, 14: 连体)
  gender?: 'male' | 'female'; // 性别
  page?: number; // 页码
  pageSize?: number; // 每页数量
}

/**
 * 服装项数据结构
 */
export interface ClothingItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  created_by: string;
  updated_by: string;
  cateId: number;
  key: string;
  md5: string;
  name: string;
  tag: string;
  url: string;
}

/**
 * 获取素材响应数据结构
 */
export interface GetClothesResponse {
  code: number;
  data: {
    list: ClothingItem[];
    total: number;
    page: number;
    pageSize: number;
  };
  msg: string;
}

/**
 * 获取素材 API
 */
export function getClothes(data: GetClothesParams) {
  return request({
    url: "/fileUploadAndDownload/getFileList",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * 虚拟换装请求参数
 */
export interface VirtualTryOnParams {
  personImageUrl: string; // 必需：人物图片URL
  topGarmentUrl?: string; // 可选：上衣图片URL
  bottomGarmentUrl?: string; // 可选：下装图片URL
  dressOrJumpsuit?: boolean; // 可选：是否为连衣裙/连体衣，默认false
  preserveOtherClothes?: boolean; // 可选：是否保留其他衣物，默认true
}

/**
 * 虚拟换装响应数据结构
 */
export interface VirtualTryOnResponse {
  code: number;
  data: {
    TryonType: string; // 试穿类型，如"试穿连衣裙/连体服"
    imageUrl: string; // 换装结果图片URL
    processTime: number; // 处理时间（毫秒）
    taskId: string; // 任务ID
  };
  msg: string;
}

/**
 * 虚拟换装 API
 */
export function virtualTryOn(data: VirtualTryOnParams) {
  return request({
    url: "/tryon/clothes/aliyun/basics",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * 虚拟换发请求参数
 */
export interface VirtualHairTryOnParams {
  personImageUrl: string; // 必需：人物图片URL
  hairStyleUrl: string; // 必需：发型图片URL
}

/**
 * 虚拟换发响应数据结构
 */
export interface VirtualHairTryOnResponse {
  code: number;
  data: {
    TryonType: string; // 试穿类型，如"虚拟换发"
    imageUrl: string; // 换发结果图片URL
    processTime: number; // 处理时间（毫秒）
    taskId: string; // 任务ID
  };
  msg: string;
}

/**
 * 虚拟换发 API
 */
export function virtualHairTryOn(data: VirtualHairTryOnParams) {
  return request({
    url: "/tryon/hair/aliyun/basics",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}