import React from 'react';
import './BlurBlock.less';

interface BlurBlockProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  blurStrength?: number | string; // 支持自定义模糊强度
}

const BlurBlock: React.FC<BlurBlockProps> = ({
  children,
  className = '',
  style = {},
  blurStrength = 16,
}) => {
  // 允许blurStrength传入数字或字符串
  const blurValue = typeof blurStrength === 'number' ? `${blurStrength}px` : blurStrength;
  return (
    <div
      className={`blurBlockContainer ${className}`}
      style={{ ...style, '--blur-strength': blurValue } as React.CSSProperties}
    >
      <div className="blurBlockContent">
        {children}
      </div>
    </div>
  );
};

export default BlurBlock; 