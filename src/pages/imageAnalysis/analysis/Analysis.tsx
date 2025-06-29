import './Analysis.less';
// import { getReport } from '../../../api/index'


export default function Analysis({ setHasReport }: { setHasReport: (v: boolean) => void }) {
  // 你可以在这里处理文件上传逻辑
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      // 这里可以做上传处理
      // const res = await getReport(e.target.files[0]);
      // console.log(res)
      setHasReport(true);
    }
  }

  return (
    <div className="analysis-page">
      <div className="analysis-main">
        <h1 className="analysis-title">形象美学分析</h1>
        <div className="analysis-subtitle">Analysis of Image Aesthetics</div>
        <div className="analysis-type-label">选择分析类型</div>
        <div className="analysis-type-list">
          <div className="analysis-type-card">
            <img src="/face-analysis-demo.png" alt="面部分析" />
            {/* <div className="type-card-label">面部分析</div> */}
          </div>
          <div className="analysis-type-card">
            <img src="/body-demo.png" alt="身材分析" />
            {/* <div className="type-card-label">身材分析</div> */}
          </div>
        </div>
        <label className="analysis-upload" style={{ cursor: 'pointer' }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
          <span className="upload-plus">+</span>
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
            {[
              { name: '林楚楚', date: '2025-06-23', img: '/avatar1.jpg' },
              { name: '林楚楚', date: '2025-06-22', img: '/avatar2.jpg' },
              { name: '林楚楚', date: '2025-06-15', img: '/avatar3.jpg' },
              { name: '林楚楚', date: '2025-06-01', img: '/avatar4.jpg' }
            ].map((item, idx) => (
              <div className="history-item" key={idx}>
                <img src={item.img} alt={item.name} />
                <div>
                  <div className="history-name">{item.name}</div>
                  <div className="history-date">{item.date}</div>
                  <div className="history-download">下载</div>
                </div>
              </div>
            ))}
          </div>
          <button className="history-more">查看更多</button>
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
    </div>
  );
}