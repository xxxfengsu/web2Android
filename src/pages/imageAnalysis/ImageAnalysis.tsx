import './ImageAnalysis.less';
import Header from '../../compoents/Header/Header';
import ConactUs from '../../compoents/ConactUs/ConactUs';
import Report, { type ReportData } from './report/Report';
import Analysis from './analysis/Analysis';
import { useState } from 'react';

export default function ImageAnalysis() {
  const [hasReport, setHasReport] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  return <div className="image-analysis">
    <Header />
    {hasReport ? <Report reportData={reportData as ReportData} /> : <Analysis setHasReport={setHasReport} setReportData={setReportData} />}
    <ConactUs />
  </div>;
}