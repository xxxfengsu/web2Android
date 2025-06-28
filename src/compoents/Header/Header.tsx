import { useState } from 'react';
import './Header.less';
export default function Header() { 
  const [activeIndex, setActiveIndex] = useState(0);
  const menuList = [
    '首页',
    '形象分析',
    '艺人管理',
    '培训管理',
    '视觉管理'
  ];
  return <div className="header">
  <div className="header-left">
    <img src="/logoWithTitle.png" alt="logo" className="logo" />
   
  </div>
  <div className="header-center">
    {menuList.map((item, idx) => (
      <div
        key={item}
        className={`menu-item${activeIndex === idx ? ' active' : ''}`}
        onClick={() => setActiveIndex(idx)}
      >
        {item}
      </div>
    ))}
  </div>
  <div className="header-right">
    <i className="icon-user"></i>
    <i className="icon-heart"></i>
    <i className="icon-cart"></i>
  </div>
</div>
}
