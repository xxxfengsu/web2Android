import { useState, useEffect } from 'react';
import Header from '../../compoents/Header/Header.tsx';
import ConactUs from '../../compoents/ConactUs/ConactUs.tsx';
import { getClothes, virtualTryOn } from '../../api/index.ts';
import type { GetClothesParams, ClothingItem, GetClothesResponse, VirtualTryOnParams, VirtualTryOnResponse } from '../../api/index.ts';
import './VirtualTryOn.less';

export default function VirtualTryOn() {
  const [activeMode, setActiveMode] = useState<'clothing' | 'hair'>('clothing');
  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [clothingOptions, setClothingOptions] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processInfo, setProcessInfo] = useState<{
    processTime?: number;
    taskId?: string;
    tryonType?: string;
  } | null>(null);

  // 默认使用女性服装类型，默认选中上衣(12)
  const [activeCategory, setActiveCategory] = useState(14);

  // 服装分类数据 - 使用女性服装类型
  const categories = [
    { id: 14, name: '连体', icon: '👗' },
    { id: 12, name: '上衣', icon: '👕' },
    { id: 13, name: '下装', icon: '👖' }
  ];

  // 获取服装数据的函数
  const fetchClothingData = async (cateId: number) => {
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
        setClothingOptions(response.data.list);
      } else {
        // 如果返回的数据格式不正确，使用默认数据
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('获取服装数据失败:', error);
      // 如果API调用失败，使用默认数据
      setClothingOptions([
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

  // 当分类改变时获取对应的服装数据
  useEffect(() => {
    fetchClothingData(activeCategory);
  }, [activeCategory]);

  // 过滤当前分类的服装
  const filteredClothing = clothingOptions.filter(item => item.cateId === activeCategory);

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

  // 处理虚拟换装
  const handleVirtualTryOn = async () => {
    if (!uploadedImage || !selectedClothing) {
      return;
    }

    setTryOnLoading(true);
    try {
      // 获取选中的服装信息
      const selectedClothingItem = clothingOptions.find(item => item.ID === selectedClothing);
      if (!selectedClothingItem) {
        throw new Error('未找到选中的服装');
      }

      // 根据服装类型确定参数
      const params: VirtualTryOnParams = {
        personImageUrl: uploadedImage,
        preserveOtherClothes: true
      };

      // 根据分类设置不同的参数
      if (activeCategory === 14) {
        // 连体衣
        params.topGarmentUrl = selectedClothingItem.url;
        params.dressOrJumpsuit = true;
      } else if (activeCategory === 12) {
        // 上衣
        params.topGarmentUrl = selectedClothingItem.url;
        params.dressOrJumpsuit = false;
      } else if (activeCategory === 13) {
        // 下装
        params.bottomGarmentUrl = selectedClothingItem.url;
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
    } catch (error: unknown) {
      console.error('虚拟换装失败:', error);
      
      // 根据错误类型显示不同的提示信息
      let errorMessage = '换装失败，请重试';
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
            onClick={() => setActiveMode('clothing')}
          >
            虚拟换装
          </button>
          <button 
            className={`mode-btn ${activeMode === 'hair' ? 'active' : ''}`}
            onClick={() => setActiveMode('hair')}
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

        {/* 服装分类 */}
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

        {/* 服装选项 */}
        <div className="clothing-options">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>加载中...</p>
            </div>
          ) : (
            filteredClothing.map(item => (
              <div
                key={item.ID}
                className={`clothing-item ${selectedClothing === item.ID ? 'selected' : ''}`}
                onClick={() => setSelectedClothing(item.ID)}
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
            disabled={!uploadedImage || !selectedClothing || tryOnLoading}
            onClick={handleVirtualTryOn}
          >
            {tryOnLoading ? '换装中...' : '开始换装'}
          </button>
        </div>

      
      </div>
      <ConactUs />
    </div>
  );
}
