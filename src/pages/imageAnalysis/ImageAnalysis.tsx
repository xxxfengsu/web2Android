import './ImageAnalysis.less';
import Header from '../../compoents/Header/Header';
import ConactUs from '../../compoents/ConactUs/ConactUs';
import Report, { type ReportData, type BodyReportData, type StreamerInfoData } from './report/Report';
import Analysis from './analysis/Analysis';
import { useState, useEffect } from 'react';

export default function ImageAnalysis() {
  const [hasReport, setHasReport] = useState(false);
  const [reportData, setReportData] = useState<ReportData | BodyReportData | null>(null);
  const [streamerInfo, setStreamerInfo] = useState<StreamerInfoData | null>(null);

  // 当切换到报告视图时滚动到顶部
  useEffect(() => {
    if (hasReport) {
      setTimeout(() => {
        // 滚动 image-analysis 容器到顶部
        const container = document.querySelector('.image-analysis');
        if (container) {
          container.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [hasReport]);

  return <div className="image-analysis">
    <Header />
    {hasReport && reportData ? <Report reportData={reportData} streamerInfo={streamerInfo as StreamerInfoData} /> : <Analysis setHasReport={setHasReport} setReportData={setReportData} setStreamerInfo={setStreamerInfo} />}
    <ConactUs />
  </div>;
}