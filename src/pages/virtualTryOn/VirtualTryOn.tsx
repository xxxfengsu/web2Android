import { useState, useEffect } from 'react';
import Header from '../../compoents/Header/Header.tsx';
import ConactUs from '../../compoents/ConactUs/ConactUs.tsx';
import { getClothes, virtualTryOn, virtualHairTryOn } from '../../api/index.ts';
import type { GetClothesParams, ClothingItem, GetClothesResponse, VirtualTryOnParams, VirtualTryOnResponse, VirtualHairTryOnParams, VirtualHairTryOnResponse } from '../../api/index.ts';

// 定义分类数据的类型
interface CategoryItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  created_by: string;
  updated_by: string;
  name: string;
  pid: number;
  children: null;
}

interface CategoryResponse {
  code: number;
  data: CategoryItem[];
  msg: string;
}
import './VirtualTryOn.less';

export default function VirtualTryOn() {
  const [activeMode, setActiveMode] = useState<'clothing' | 'hair'>('clothing');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [itemOptions, setItemOptions] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processInfo, setProcessInfo] = useState<{
    processTime?: number;
    taskId?: string;
    tryonType?: string;
  } | null>(null);

  // 默认使用女性服装类型，默认选中连体(14)
  const [activeCategory, setActiveCategory] = useState(14);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; icon: string }>>([]);

  // 获取分类数据的函数
  const fetchCategories = async () => {
    try {
      const cateId = activeMode === 'clothing' ? 8 : 50; // 换装查8，换发查50
      const params: GetClothesParams = {
        cateId,
        gender: 'female',
        page: 1,
        pageSize: 20
      };
      
      const response = await getClothes(params) as CategoryResponse;
      if (response.code === 0 && response.data && Array.isArray(response.data)) {
        // 将API返回的分类数据转换为分类格式
        const categoryData = response.data.map((item: CategoryItem) => ({
          id: item.ID,
          name: item.name,
          icon: getCategoryIcon(item.ID, activeMode) // 根据分类ID和模式获取图标
        }));
        setCategories(categoryData);
        
        // 如果有分类数据，设置第一个为默认选中
        if (categoryData.length > 0) {
          setActiveCategory(categoryData[0].id);
        }
      } else {
        // 如果API调用失败，使用默认分类数据
        setDefaultCategories();
      }
    } catch (error) {
      console.error('获取分类失败:', error);
      // 如果API调用失败，使用默认分类数据
      setDefaultCategories();
    }
  };

  // 设置默认分类数据的函数
  const setDefaultCategories = () => {
    if (activeMode === 'clothing') {
      setCategories([
        { id: 14, name: '全身', icon: '👗' },
        { id: 12, name: '上衣', icon: '👕' },
        { id: 13, name: '下衣', icon: '👖' }
      ]);
    } else {
      setCategories([
        { id: 51, name: '长发', icon: '💇‍♀️' },
        { id: 52, name: '短发', icon: '💇‍♂️' },
        { id: 53, name: '卷发', icon: '👩‍🦱' }
      ]);
    }
  };

  // 根据分类ID和模式获取图标的函数
  const getCategoryIcon = (cateId: number, mode: 'clothing' | 'hair'): string => {
    if (mode === 'clothing') {
      switch (cateId) {
        case 14: // 全身
          return '👗';
        case 12: // 上衣
          return '👕';
        case 13: // 下衣
          return '👖';
        default:
          return '👕';
      }
    } else {
      // 换发模式
      switch (cateId) {
        case 51: // 长发
          return '💇‍♀️';
        case 52: // 短发
          return '💇‍♂️';
        case 53: // 卷发
          return '👩‍🦱';
        default:
          return '💇‍♀️';
      }
    }
  };

  // 获取选项数据的函数
  const fetchItemData = async (cateId: number) => {
    setLoading(true);
    try {
      const params: GetClothesParams = {
        cateId,
        gender: 'female',
        page: 1,
        pageSize: 20
      };
      
      const response = await getClothes(params) as GetClothesResponse;
      if (response.data && response.data.list && Array.isArray(response.data.list)) {
        setItemOptions(response.data.list);
      } else {
        // 如果返回的数据格式不正确，使用默认数据
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('获取选项数据失败:', error);
      // 如果API调用失败，使用默认数据
      setItemOptions([
        {
          ID: 1,
          name: '粉色上衣',
          url: 'https://via.placeholder.com/200x200/FFB6C1/FFFFFF?text=粉色上衣',
          cateId: 12,
          CreatedAt: '',
          UpdatedAt: '',
          created_by: '',
          updated_by: '',
          key: '',
          md5: '',
          tag: ''
        },
        {
          ID: 2,
          name: '白色上衣',
          url: 'https://via.placeholder.com/200x200/FFFFFF/000000?text=白色上衣',
          cateId: 12,
          CreatedAt: '',
          UpdatedAt: '',
          created_by: '',
          updated_by: '',
          key: '',
          md5: '',
          tag: ''
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时和模式切换时获取分类数据
  useEffect(() => {
    fetchCategories();
  }, [activeMode]);

  // 当分类改变时获取对应的选项数据
  useEffect(() => {
    if (activeCategory) {
      fetchItemData(activeCategory);
    }
  }, [activeCategory]);

  // 过滤当前分类的选项
  const filteredItems = itemOptions.filter((item: ClothingItem) => item.cateId === activeCategory);

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setResultImage(null); // 清除之前的结果
        setProcessInfo(null); // 清除处理信息
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理虚拟换装/换发
  const handleVirtualTryOn = async () => {
    if (!uploadedImage || !selectedItem) {
      return;
    }

    setTryOnLoading(true);
    try {
      // 获取选中的服装/发型信息
      const selectedItemData = itemOptions.find((item: ClothingItem) => item.ID === selectedItem);
      if (!selectedItemData) {
        throw new Error('未找到选中的项目');
      }

      if (activeMode === 'clothing') {
        // 换装逻辑
        const params: VirtualTryOnParams = {
          personImageUrl: uploadedImage,
          preserveOtherClothes: true
        };

        // 根据分类设置不同的参数
        if (activeCategory === 14) {
          // 全身
          params.topGarmentUrl = selectedItemData.url;
          params.dressOrJumpsuit = true;
        } else if (activeCategory === 12) {
          // 上衣
          params.topGarmentUrl = selectedItemData.url;
          params.dressOrJumpsuit = false;
        } else if (activeCategory === 13) {
          // 下衣
          params.bottomGarmentUrl = selectedItemData.url;
          params.dressOrJumpsuit = false;
        }

        const response = await virtualTryOn(params) as VirtualTryOnResponse;
        
        if (response.code === 0 && response.data?.imageUrl) {
          setResultImage(response.data.imageUrl);
          setProcessInfo({
            processTime: response.data.processTime,
            taskId: response.data.taskId,
            tryonType: response.data.TryonType
          });
          console.log('换装成功:', {
            tryonType: response.data.TryonType,
            processTime: response.data.processTime,
            taskId: response.data.taskId
          });
        } else {
          throw new Error(response.msg || '换装失败');
        }
      } else {
        // 换发逻辑
        const params: VirtualHairTryOnParams = {
          personImageUrl: uploadedImage,
          hairStyleUrl: selectedItemData.url
        };

        const response = await virtualHairTryOn(params) as VirtualHairTryOnResponse;
        
        if (response.code === 0 && response.data?.imageUrl) {
          setResultImage(response.data.imageUrl);
          setProcessInfo({
            processTime: response.data.processTime,
            taskId: response.data.taskId,
            tryonType: response.data.TryonType
          });
          console.log('换发成功:', {
            tryonType: response.data.TryonType,
            processTime: response.data.processTime,
            taskId: response.data.taskId
          });
        } else {
          throw new Error(response.msg || '换发失败');
        }
      }
    } catch (error: unknown) {
      console.error('虚拟换装/换发失败:', error);
      
      // 根据错误类型显示不同的提示信息
      let errorMessage = activeMode === 'clothing' ? '换装失败，请重试' : '换发失败，请重试';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const responseError = error as { response?: { data?: { msg?: string } } };
        if (responseError.response?.data?.msg) {
          errorMessage = responseError.response.data.msg;
        }
      }
      
      alert(errorMessage);
    } finally {
      setTryOnLoading(false);
    }
  };

  return (
    <div className="virtual-tryon">
      <Header />
      <div className="tryon-content">
        {/* 功能按钮 */}
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${activeMode === 'clothing' ? 'active' : ''}`}
            onClick={() => {
              setActiveMode('clothing');
              setSelectedItem(null); // 重置选中的项目
              setResultImage(null); // 清除结果图片
              setProcessInfo(null); // 清除处理信息
              setItemOptions([]); // 清空选项列表
            }}
          >
            虚拟换装
          </button>
          <button 
            className={`mode-btn ${activeMode === 'hair' ? 'active' : ''}`}
            onClick={() => {
              setActiveMode('hair');
              setSelectedItem(null); // 重置选中的项目
              setResultImage(null); // 清除结果图片
              setProcessInfo(null); // 清除处理信息
              setItemOptions([]); // 清空选项列表
            }}
          >
            虚拟换发
          </button>
        </div>

        {/* 主要显示区域 */}
        <div className="display-panel">
          <div className="panel">
            <div className="upload-area">
              {resultImage ? (
                <div className="result-image">
                  <img src={resultImage} alt="换装结果" />
                  {processInfo && (
                    <div className="process-info">
                      <p className="tryon-type">{processInfo.tryonType}</p>
                      {processInfo.processTime && (
                        <p className="process-time">处理耗时: {(processInfo.processTime / 1000).toFixed(2)}秒</p>
                      )}
                    </div>
                  )}
                  <button 
                    className="change-image-btn"
                    onClick={() => {
                      setResultImage(null);
                      setUploadedImage(null);
                      setProcessInfo(null);
                    }}
                  >
                    重新上传
                  </button>
                </div>
              ) : uploadedImage ? (
                <div className="uploaded-image">
                  <img src={uploadedImage} alt="上传的图片" />
                  <button 
                    className="change-image-btn"
                    onClick={() => setUploadedImage(null)}
                  >
                    更换图片
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <p>上传照片或选择模型</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-btn">
                    选择图片
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 分类选择器 */}
        <div className="category-selector">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>

        {/* 选项列表 */}
        <div className="clothing-options">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>加载中...</p>
            </div>
          ) : (
            filteredItems.map((item: ClothingItem) => (
              <div
                key={item.ID}
                className={`clothing-item ${selectedItem === item.ID ? 'selected' : ''}`}
                onClick={() => setSelectedItem(item.ID)}
              >
                <div className="clothing-image">
                  <img src={item.url} alt={item.name} />
                </div>
                {/* <div className="clothing-name">{item.name}</div> */}
              </div>
            ))
          )}
        </div>


        {/* 操作按钮 */}
        <div className="action-buttons">
          <button 
            className="try-on-btn"
            disabled={!uploadedImage || !selectedItem || tryOnLoading}
            onClick={handleVirtualTryOn}
          >
            {tryOnLoading 
              ? (activeMode === 'clothing' ? '换装中...' : '换发中...') 
              : (activeMode === 'clothing' ? '开始换装' : '开始换发')
            }
          </button>
        </div>

      
      </div>
      <ConactUs />
    </div>
  );
}
