import './Report.less';

export default function Report() {
  return (
    <div className="report-page">
      <h1 className="report-title">形象美学分析报告</h1>
      <div className="report-subtitle">Image Aesthetics Analysis Report</div>
      <div className="report-card">
        <div className="report-info">
          <h2 className="info-title">基础信息</h2>
          <div className="info-row">
            <div className="info-label">昵称</div>
            <div className="info-value">车车</div>
            <div className="info-label">系统ID</div>
            <div className="info-value">19980214</div>
          </div>
          <div className="info-row">
            <div className="info-label">主播评级</div>
            <div className="info-value">A</div>
            <div className="info-label">运营组</div>
            <div className="info-value">运营组</div>
          </div>
          <div className="info-row">
            <div className="info-label">主播标签</div>
            <div className="info-tags">
              <span className="tag tag-active">全能型</span>
              <span className="tag">唱歌</span>
            </div>
          </div>
          <button className="info-btn">Send Now</button>
        </div>
        <div className="report-avatar">
          <img src="/avatar-demo.jpg" alt="avatar" />
        </div>
      </div>
    </div>
  );
}