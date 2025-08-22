# 虚拟换装接口实现说明

## 接口信息

- **接口地址**: `/tryon/clothes/aliyun/basics`
- **请求方法**: POST
- **Content-Type**: application/json

## 请求参数

### 必需参数

- `personImageUrl` (string): 人物图片 URL
  - 大小限制: 5KB ~ 5MB
  - 尺寸限制: 150px ~ 4096px
  - 格式支持: jpg, png, jpeg, bmp, heic
  - 内容要求: 必须包含且仅包含一个完整的人物
  - 协议支持: HTTP/HTTPS 链接

### 可选参数

- `topGarmentUrl` (string): 上衣图片 URL

  - 与 `personImageUrl` 有相同的尺寸和格式限制
  - 要求: 必须是单件服装的平铺拍摄，主体完整
  - 注意: `topGarmentUrl` 和 `bottomGarmentUrl` 至少需要提供一个

- `bottomGarmentUrl` (string): 下装图片 URL

  - 与 `personImageUrl` 有相同的尺寸和格式限制
  - 注意: `topGarmentUrl` 和 `bottomGarmentUrl` 至少需要提供一个

- `dressOrJumpsuit` (boolean): 是否为连衣裙/连体衣

  - 默认值: false
  - 当为 true 时: 需要提供 `topGarmentUrl`，且 `bottomGarmentUrl` 必须为空
  - 行为: 后端会跳过图像分割，直接生成整体换装效果

- `preserveOtherClothes` (boolean): 是否保留其他衣物
  - 默认值: true
  - 当为 true 时: 未提供的部分会通过图像分割保留原始服装
  - 当为 false 时: 未提供的部分会由模型随机生成

## 响应格式

```typescript
interface VirtualTryOnResponse {
  code: number;
  data: {
    resultImageUrl: string; // 换装结果图片URL
  };
  msg: string;
}
```

## 实现逻辑

### 1. 参数构建

根据用户选择的服装类型自动构建请求参数：

- **连体衣 (cateId: 14)**:

  ```typescript
  {
    personImageUrl: uploadedImage,
    topGarmentUrl: selectedClothingItem.url,
    dressOrJumpsuit: true,
    preserveOtherClothes: true
  }
  ```

- **上衣 (cateId: 12)**:

  ```typescript
  {
    personImageUrl: uploadedImage,
    topGarmentUrl: selectedClothingItem.url,
    dressOrJumpsuit: false,
    preserveOtherClothes: true
  }
  ```

- **下装 (cateId: 13)**:
  ```typescript
  {
    personImageUrl: uploadedImage,
    bottomGarmentUrl: selectedClothingItem.url,
    dressOrJumpsuit: false,
    preserveOtherClothes: true
  }
  ```

### 2. 状态管理

- `tryOnLoading`: 控制换装过程中的加载状态
- `resultImage`: 存储换装结果图片 URL
- 换装成功后，结果图片会覆盖原上传图片显示

### 3. 错误处理

- API 调用失败时显示错误提示
- 网络错误或服务器错误都会捕获并提示用户重试

### 4. 用户体验

- 换装过程中按钮显示"换装中..."并禁用
- 换装成功后显示结果图片
- 提供"重新上传"按钮重置整个流程

## 使用流程

1. 用户上传人物图片
2. 选择服装分类（上衣/下装/连体）
3. 选择具体服装
4. 点击"开始换装"按钮
5. 等待 API 处理完成
6. 查看换装结果
7. 可选择重新上传进行新的换装

## 注意事项

- 上传的图片必须是公开可访问的 URL
- 图片格式和尺寸必须符合 API 要求
- 换装过程中会保留用户原始图片，失败时可重新尝试
- 不同服装类型使用不同的 API 参数配置
