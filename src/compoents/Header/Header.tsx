import { useEffect, useState } from 'react';
import './Header.less';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function Header() { 
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    '/artistManagement',
    '',
    ''
  ], []);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const idx = menuRoutes.findIndex((route: string) => route && location.pathname === route);
    setActiveIndex(idx === -1 ? 0 : idx);
  }, [location.pathname, menuRoutes]);

  function setActive(idx: number) {
    if (menuRoutes[idx]) {
      navigate(menuRoutes[idx]);
      setIsDrawerOpen(false); // 点击菜单项后关闭抽屉
    }
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }
  return <>
    <div className="header">
      <div className="header-left">
        <img src="/logoWithTitle.png" alt="logo" className="logo" />
      </div>
      
      {/* 桌面端菜单 */}
      {!isMobile && (
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
      )}
      
      <div className="header-right">
        {!isMobile && (
          <>
            <i className="icon-user"></i>
            <i className="icon-heart"></i>
            <i className="icon-cart"></i>
          </>
        )}
        
        {/* 移动端汉堡菜单按钮 */}
        {isMobile && (
          <div className="hamburger-menu" onClick={toggleDrawer}>
            <div className={`hamburger-line ${isDrawerOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isDrawerOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isDrawerOpen ? 'open' : ''}`}></div>
          </div>
        )}
      </div>
    </div>
    
    {/* 移动端抽屉菜单 */}
    {isMobile && (
      <>
        {/* 遮罩层 */}
        <div 
          className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} 
          onClick={closeDrawer}
        ></div>
        
        {/* 抽屉内容 */}
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <h3>菜单</h3>
            <div className="close-btn" onClick={closeDrawer}>×</div>
          </div>
          
          <div className="drawer-content">
            {menuList.map((item, idx) => (
              <div
                key={item}
                className={`drawer-menu-item${activeIndex === idx ? ' active' : ''}`}
                onClick={() => setActive(idx)}
              >
                {item}
              </div>
            ))}
            
            <div className="drawer-icons">
              <div className="drawer-icon-item">
                <i className="icon-user"></i>
                <span>个人中心</span>
              </div>
              <div className="drawer-icon-item">
                <i className="icon-heart"></i>
                <span>我的收藏</span>
              </div>
              <div className="drawer-icon-item">
                <i className="icon-cart"></i>
                <span>购物车</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
}
