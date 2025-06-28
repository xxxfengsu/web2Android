import './ImageAnalysis.less';
import Header from '../../compoents/Header/Header';
import ConactUs from '../../compoents/ConactUs/ConactUs';
import Report from './report/Report';
import Analysis from './analysis/Analysis';
import { useState } from 'react';

export default function ImageAnalysis() {
  const [hasReport, setHasReport] = useState(true);

  return <div className="image-analysis">
    <Header />
    {hasReport ? <Report /> : <Analysis />}
    <ConactUs />
  </div>;
}