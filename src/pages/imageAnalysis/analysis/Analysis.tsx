import './Analysis.less';
import { getReport, getBodyReport, getAnalysisRecords } from '../../../api/index'
import type { ReportData, BodyReportData, StreamerInfoData } from '../report/Report';

// 历史记录项类型定义
interface HistoryRecord {
  UpdatedAt: string;
  personId: string;
  imageUrl: string;
  fileUrl?: string;
}

// 接口返回数据类型
interface HistoryResponse {
  code: number;
  data: {
    list: HistoryRecord[];
  };
  msg: string;
}
import React, { useState, useEffect } from 'react';
import { getStreamerInfo } from '../../../api/index';
import BlurBlock from '../../../compoents/BlurBlock/BlurBlock';


export default function Analysis({
  setHasReport,
  setReportData,
  setStreamerInfo,
}: {
  setHasReport: (v: boolean) => void;
  setReportData: (data: ReportData | BodyReportData | null) => void;
  setStreamerInfo: (data: StreamerInfoData | null) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<'face' | 'body' | null>(() => {
    // 从本地存储恢复选择
    const saved = localStorage.getItem('selectedAnalysisType');
    return saved === 'face' || saved === 'body' ? saved : null;
  });
  const [streamerId, setStreamerId] = useState<string>('');

  // 历史记录相关状态
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 保存选择到本地存储
  React.useEffect(() => {
    if (selectedAnalysisType) {
      localStorage.setItem('selectedAnalysisType', selectedAnalysisType);
    } else {
      localStorage.removeItem('selectedAnalysisType');
    }
  }, [selectedAnalysisType]);

  // 加载历史记录
  const loadHistoryRecords = async (page: number, append: boolean = false) => {
    try {
      setHistoryLoading(true);
      const response = await getAnalysisRecords(page, 5);
      
      if (response.code === 0) {
        // 处理真实接口返回的数据
        const responseData = response as HistoryResponse;
        const newRecords = responseData.data?.list || [];
        
        if (append) {
          setHistoryRecords(prev => [...prev, ...newRecords]);
        } else {
          setHistoryRecords(newRecords);
        }
        
        // 判断是否还有更多数据
        setHasMore(newRecords.length === 5);
      }
    } catch (error) {
      console.error('加载历史记录失败:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  // 组件挂载时加载第一页历史记录
  useEffect(() => {
    loadHistoryRecords(1);
  }, []);

  // 加载更多历史记录
  const loadMoreHistory = () => {
    if (!historyLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadHistoryRecords(nextPage, true);
    }
  };

  // 下载文件
  const handleDownload = (fileUrl?: string) => {
    if (!fileUrl) {
      alert('没有文件可查看');
      return;
    }

    // 创建一个临时的 a 标签来触发下载
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `分析报告_${new Date().toISOString().split('T')[0]}.pdf`;
    link.target = '_blank';
    
    // 添加到 DOM 中并触发点击
    document.body.appendChild(link);
    link.click();
    
    // 清理 DOM
    document.body.removeChild(link);
  };



  // 处理文件上传逻辑
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!selectedAnalysisType) {
      alert('请先选择分析类型');
      return;
    }
    
    if (!streamerId.trim()) {
      alert('请输入主播ID');
      return;
    }
    
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true); // 开始 loading
      try {
        // 首先获取主播信息
        const streamerResponse = await getStreamerInfo(streamerId.trim());
        
        // 检查接口返回状态
        if (streamerResponse.code !== 0 || !streamerResponse.data) {
          alert(`获取主播信息失败：${streamerResponse.msg || '主播不存在或ID无效'}`);
          return;
        }
        
        // 设置主播信息
        setStreamerInfo(streamerResponse.data as StreamerInfoData);
        
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append("cateId", selectedAnalysisType === 'face' ? '32' : '33'); // 根据分析类型设置不同的cateId
        formData.append("personId", streamerId.trim());
        formData.append("analysisType", selectedAnalysisType); // 添加分析类型参数
        if (selectedAnalysisType !== 'face') { 
          formData.append("provider", "bailian");
        }
        
        // 根据分析类型选择不同的API
        const res = selectedAnalysisType === 'face' 
          ? await getReport(formData)
          : await getBodyReport(formData);
          
        if (res.code == 0) { 
          // 根据分析类型设置正确的数据类型
          if (selectedAnalysisType === 'face') {
            setReportData(res.data as ReportData);
          } else {
            setReportData(res.data as BodyReportData);
          }
          setHasReport(true);
        } else {
          alert(res.msg);
        }
      } catch (error) {
        console.error('获取主播信息或分析失败:', error);
        alert('获取主播信息失败，请检查主播ID是否正确');
      } finally {
        setLoading(false); // 结束 loading
      }
    }
  }

  return (
    <div className="analysis-page">
      <div className="analysis-main">
        <h1 className="analysis-title">形象美学分析</h1>
        <div className="analysis-subtitle">Analysis of Image Aesthetics</div>
                 <div className="analysis-type-label">
           选择分析类型
          {selectedAnalysisType && (
            <>
              <span className="selected-type-hint">
                （已选择：{selectedAnalysisType === 'face' ? '面部分析' : '身材分析'}）
              </span>
                             <button 
                 className="clear-selection-btn"
                 onClick={() => setSelectedAnalysisType(null)}
                 title="清除当前选择"
               >
                 清除选择
               </button>
            </>
          )}
        </div>
                 {selectedAnalysisType && (
           <div className="analysis-type-info">
             {selectedAnalysisType === 'face' ? 
               '面部分析：分析面部特征、五官比例、肤色等美学指标' : 
               '身材分析：分析身材比例、体型特征、姿态等美学指标'
             }
           </div>
         )}
        <div className="analysis-type-list">
                     <div 
             className={`analysis-type-card ${selectedAnalysisType === 'face' ? 'selected' : ''}`}
             onClick={() => setSelectedAnalysisType(selectedAnalysisType === 'face' ? null : 'face')}
           >
             <img src="/face-analysis-demo.png" alt="面部分析" />
             <div className="type-card-label">面部分析</div>
           </div>
                     <div 
             className={`analysis-type-card ${selectedAnalysisType === 'body' ? 'selected' : ''}`}
             onClick={() => setSelectedAnalysisType(selectedAnalysisType === 'body' ? null : 'body')}
           >
             <img src="/body-demo.png" alt="身材分析" />
             <div className="type-card-label">身材分析</div>
           </div>
        </div>
        
        {/* 主播ID输入框 */}
        {selectedAnalysisType && (
          <div className="streamer-input-section">
            <label className="streamer-input-label">主播ID</label>
            <input
              type="text"
              className="streamer-input"
              placeholder="请输入主播ID"
              value={streamerId}
              onChange={(e) => setStreamerId(e.target.value)}
            />
          </div>
        )}
        
        <label 
          className={`analysis-upload ${!selectedAnalysisType || !streamerId.trim() ? 'disabled' : ''}`} 
          style={{ cursor: (selectedAnalysisType && streamerId.trim()) ? 'pointer' : 'not-allowed' }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleUpload}
            disabled={!selectedAnalysisType || !streamerId.trim()}
          />
          <span className="upload-plus">
            {!selectedAnalysisType 
              ? '请先选择分析类型' 
              : !streamerId.trim() 
                ? '请输入主播ID' 
                : `上传图片进行${selectedAnalysisType === 'face' ? '面部分析' : '身材分析'}`
            }
          </span>
        </label>
        <div className="analysis-section-title">
          <span className="line" />
          智研资讯
          <span className="line" />
        </div>
        <div className="analysis-banner">
          <div className="banner-content">
            <div className="banner-title">虚拟换装 正式上线</div>
            <div className="banner-subtitle">REDEFINE YOUR STYLE VIRTUALLY</div>
            <button className="banner-btn">立即体验</button>
          </div>
        </div>
      </div>
      <div className="analysis-sidebar">
        <div className="sidebar-search">
          <input type="text" placeholder="主播姓名" />
          <span className="icon-search">🔍</span>
        </div>
        <div className="sidebar-history">
          <div className="sidebar-section-title">历史记录</div>
          <div className="history-list">
            {historyRecords.length > 0 ? (
              historyRecords.map((item, idx) => {
                // 格式化日期
                const date = new Date(item.UpdatedAt);
                const formattedDate = date.toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                });
                
                                 return (
                   <div className="history-item" key={`${item.personId}-${item.UpdatedAt}-${idx}`}>
                     <img src={item.imageUrl} alt={`分析记录 ${idx + 1}`} />
                     <div>
                       <div className="history-name">主播 {item.personId}</div>
                       <div className="history-date">{formattedDate}</div>
                       <div 
                         className="history-download"
                         onClick={() => handleDownload(item.fileUrl)}
                       >
                         查看
                       </div>
                     </div>
                   </div>
                 );
              })
            ) : (
              <div className="history-empty">
                {historyLoading ? '加载中...' : '暂无历史记录'}
              </div>
            )}
          </div>
          {hasMore && (
            <button 
              className={`history-more ${historyLoading ? 'loading' : ''}`}
              onClick={loadMoreHistory}
              disabled={historyLoading}
            >
              {historyLoading ? '加载中...' : '查看更多'}
            </button>
          )}
        </div>
        <div className="sidebar-divider"></div>
        <div className="sidebar-announcement">
          <div className="sidebar-section-title">信息公告</div>
          <ul className="announcement-list">
            <li>关于移动应用上传照片无法识别...</li>
            <li>关于因版权关系等变更的通知...</li>
            <li>关于用户端海报保存分享问题...</li>
            <li>关于照片格式支持大小问题...</li>
          </ul>
        </div>
      </div>
      {loading && (
        <div className="global-loading">
          <BlurBlock blurStrength={10} style={{ width: '50%', height: '340px' }}>
            <div className="loading-spinner"></div>
            <div className="loading-text">
              正在{selectedAnalysisType === 'face' ? '面部分析' : '身材分析'}中...
            </div>
          </BlurBlock>
        </div>
      )}
    </div>
  );
}