import { useEffect, useState } from 'react';
import './Header.less';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
export default function Header() { 
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const menuList = [
    '首页',
    '形象分析',
    '艺人管理',
    '培训管理',
    '视觉管理'
  ];
  const menuRoutes = useMemo(() => [
    '/',
    '/imageAnalysis',
    '',
    '',
    ''
  ], []);

  useEffect(() => {
    const idx = menuRoutes.findIndex((route: string) => route && location.pathname === route);
    setActiveIndex(idx === -1 ? 0 : idx);
  }, [location.pathname, menuRoutes]);

  function setActive(idx: number) {
    if (menuRoutes[idx]) {
      navigate(menuRoutes[idx]);
    }
  }
  return <div className="header">
  <div className="header-left">
    <img src="/logoWithTitle.png" alt="logo" className="logo" />
   
  </div>
  <div className="header-center">
    {menuList.map((item, idx) => (
      <div
        key={item}
        className={`menu-item${activeIndex === idx ? ' active' : ''}`}
        onClick={() => setActive(idx)}
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
