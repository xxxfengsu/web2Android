import React from 'react';
import './SectionTitle.less';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => (
  <div className={`section-title-wrapper ${className || ''}`}>
    <div className="section-title-row">
      <span className="section-title-line" />
      <span className="section-title-text">{title}</span>
      <span className="section-title-line" />
    </div>
  </div>
);

export default SectionTitle;
