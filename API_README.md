# API 接口说明

## 获取素材接口

### 接口信息

- **接口名称**: `getClothes`
- **请求方法**: `POST`
- **接口地址**: `/fileUploadAndDownload/getFileList`
- **Content-Type**: `application/json`

### 请求参数

```typescript
interface GetClothesParams {
  category?: number; // 服装分类ID (12: 上衣, 13: 下装, 14: 连体)
  gender?: "male" | "female"; // 性别
  page?: number; // 页码，默认1
  pageSize?: number; // 每页数量，默认20
}
```

### 参数说明

| 参数名   | 类型   | 必填 | 说明                                                       |
| -------- | ------ | ---- | ---------------------------------------------------------- |
| category | number | 否   | 服装分类 ID：<br/>- 12: 上衣<br/>- 13: 下装<br/>- 14: 连体 |
| gender   | string | 否   | 性别：<br/>- 'male': 男性<br/>- 'female': 女性             |
| page     | number | 否   | 页码，从 1 开始                                            |
| pageSize | number | 否   | 每页数量，默认 20                                          |

### 使用示例

```typescript
import { getClothes } from "./api/index";

// 获取女性上衣
const getFemaleTops = async () => {
  try {
    const response = await getClothes({
      category: 12,
      gender: "female",
      page: 1,
      pageSize: 20,
    });
    console.log("服装数据:", response.data);
  } catch (error) {
    console.error("获取失败:", error);
  }
};

// 获取男性下装
const getMaleBottoms = async () => {
  try {
    const response = await getClothes({
      category: 10,
      gender: "male",
      page: 1,
      pageSize: 10,
    });
    console.log("服装数据:", response.data);
  } catch (error) {
    console.error("获取失败:", error);
  }
};
```

### 响应格式

```typescript
// 成功响应
{
  code: 0,
  data: {
    list: [
      {
        ID: 1924,
        CreatedAt: "2025-06-05T23:18:44.055+08:00",
        UpdatedAt: "2025-06-05T23:18:44.055+08:00",
        created_by: "3",
        updated_by: "3",
        cateId: 12,
        key: "uploads/2025-06-05/f98499d8cc42801e0b44f76239f98683.png",
        md5: "512bffb1ec4b8ea4182f49faac5d0368",
        name: "9521744947898_.pic_hd.png",
        tag: "png",
        url: "http://139.224.59.6:9000/aesthetica/uploads/2025-06-05/f98499d8cc42801e0b44f76239f98683.png"
      }
      // ... 更多服装数据
    ],
    total: 2,
    page: 1,
    pageSize: 20
  },
  msg: "获取成功"
}

// 错误响应
{
  code: 500,
  data: null,
  msg: "服务器错误"
}
```

## 服装分类字典

```typescript
const clothesTypeDic = {
  male: {
    9: "上衣",
    10: "下装",
    11: "连体",
  },
  female: {
    12: "上衣",
    13: "下装",
    14: "连体",
  },
};
```

## 在虚拟换装页面中的使用

虚拟换装页面已经集成了这个 API 接口：

1. **自动加载**: 页面加载时自动获取默认分类（女性上衣）的服装数据
2. **分类切换**: 当用户切换服装分类时，自动调用 API 获取对应分类的服装
3. **错误处理**: 如果 API 调用失败，会显示默认的占位符服装数据
4. **加载状态**: 在获取数据时显示 loading 动画

### 页面中的实现

```typescript
// 获取服装数据的函数
const fetchClothingData = async (category: number) => {
  setLoading(true);
  try {
    const params: GetClothesParams = {
      category,
      gender: 'female',
      page: 1,
      pageSize: 20
    };

    const response = await getClothes(params);
    if (response.data && Array.isArray(response.data)) {
      setClothingOptions(response.data);
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('获取服装数据失败:', error);
    // 使用默认数据作为fallback
    setClothingOptions([...]);
  } finally {
    setLoading(false);
  }
};

// 当分类改变时自动获取数据
useEffect(() => {
  fetchClothingData(activeCategory);
}, [activeCategory]);
```

## 数据字段说明

### 服装项字段

| 字段名     | 类型   | 说明              |
| ---------- | ------ | ----------------- |
| ID         | number | 服装项唯一标识    |
| name       | string | 服装名称          |
| url        | string | 服装图片 URL 地址 |
| cateId     | number | 服装分类 ID       |
| CreatedAt  | string | 创建时间          |
| UpdatedAt  | string | 更新时间          |
| created_by | string | 创建者 ID         |
| updated_by | string | 更新者 ID         |
| key        | string | 文件存储路径      |
| md5        | string | 文件 MD5 值       |
| tag        | string | 文件标签/类型     |

## 注意事项

1. **数据格式**: API 返回的数据结构为 `{ code, data: { list, total, page, pageSize }, msg }`
2. **图片字段**: 使用 `url` 字段获取服装图片地址，不是 `image`
3. **ID 字段**: 使用大写的 `ID` 字段作为唯一标识，不是 `id`
4. **错误处理**: 建议在调用 API 时添加适当的错误处理逻辑
5. **缓存**: 可以考虑添加缓存机制，避免重复请求相同的数据
6. **分页**: 当服装数据较多时，建议实现分页加载功能
