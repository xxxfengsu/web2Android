import Header from '../../compoents/Header/Header.tsx';
import ConactUs from '../../compoents/ConactUs/ConactUs.tsx';
import Carousel from '../../compoents/Carousel/Carousel.tsx';
import SectionTitle from '../../compoents/SectionTitle/SectionTitle.tsx';
import './Home.less';

export default function Home() {
  // 轮播图数据
  const bannerImages = [
    '/bg/LargeBanner.png',
    // 你可以添加更多图片路径
    '/bg/login_bg.png',
    // '/bg/banner3.png',
  ];

  return <div className="main">
    <Header />
    <div className="content">
      {/* 轮播图 */}
      <Carousel 
        images={bannerImages}
        autoPlay={false}
        interval={5000}
        showDots={true}
        showArrows={true}
      />
      {/* 分析，艺人管理入口 */}
      <div className="center-content">
        <div className="feature-card">
          <div className="feature-left">
            <img src="/face-demo.png" alt="face" className="feature-img" />
          </div>
          <div className="feature-info">
            <h2>形象美学分析</h2>
            <p>
              形象美学分析系统是基于多维度美学理论与数据算法，针对个体特征评估（如五官比例、肤色等）及用户需求（如风格倾好、易通过率等）进行量化评估与风格定位的工具。
            </p>
            <a className="feature-link" href="/imageAnalysis">进入</a>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-info">
            <h2>艺人管理系统</h2>
            <p>
              艺人管理系统整合艺人信息、日程、作品及商业合作等核心数据，通过数字化工具实现全流程高效管理的平台，精准资源对接，优化艺人发展规划，提升管理协作效率与决策科学性。
            </p>
            <a className="feature-link" href="#">进入</a>
          </div>
          <div className="feature-right">
            <img src="/lamp-demo.png" alt="lamp" className="feature-img" />
          </div>
        </div>
      </div>
      {/* 培训管理 */}
      <SectionTitle title="培训管理" />
      <div className="training-content">
        <div className="training-item">
          <img src="/icon/icon_course.png" alt="预约课程" />
          <div className="training-label">预约课程</div>
        </div>
        <div className="training-item">
          <img src="/icon/icon_intro.png" alt="课程介绍" />
          <div className="training-label">课程介绍</div>
        </div>
        <div className="training-item">
          <img src="/icon/icon_teacher.png" alt="讲师介绍" />
          <div className="training-label">讲师介绍</div>
        </div>
        <div className="training-item">
          <img src="/icon/icon_level.png" alt="培训分级" />
          <div className="training-label">培训分级</div>
        </div>
        <div className="training-item">
          <img src="/icon/icon_category.png" alt="赛道分类" />
          <div className="training-label">赛道分类</div>
        </div>
        <div className="training-item">
          <img src="/icon/icon_community.png" alt="讨论社区" />
          <div className="training-label">讨论社区</div>
        </div>
      </div>
      {/* 案例展示 */}
      <SectionTitle title="案例展示" />
      <div className="case-content">
        <div className="case-item">
          <div className="case-fav">
            <img src="/icon/icon_heart.png" alt="收藏" />
          </div>
          <div className="case-img-placeholder"></div>
          <div className="case-label">妆造案例</div>
        </div>
        <div className="case-item">
          <div className="case-fav">
            <img src="/icon/icon_heart.png" alt="收藏" />
          </div>
          <div className="case-img-placeholder"></div>
          <div className="case-label">调试案例</div>
        </div>
        <div className="case-item">
          <div className="case-fav">
            <img src="/icon/icon_heart.png" alt="收藏" />
          </div>
          <div className="case-img-placeholder"></div>
          <div className="case-label">场景案例</div>
        </div>
        <div className="case-item">
          <div className="case-fav">
            <img src="/icon/icon_heart.png" alt="收藏" />
          </div>
          <div className="case-img-placeholder"></div>
          <div className="case-label">成长档案</div>
        </div>
      </div>
      {/* 视觉管理 */}
      <SectionTitle title="视觉管理" />
      <div className="visual-content">
        <div className="visual-img">
          <img src="/visual-demo.png" alt="视觉管理" />
        </div>
        <div className="visual-info">
          <h3>视觉部管理系统</h3>
          <p>
            视觉部管理系统是针对视觉内容创作、资源管理与团队协作需求设计的数字化工具，通过整合设备库、任务分配、进度追踪等功能，实现视觉项目从创意到交付的全流程标准化管理。
          </p>
          <a className="visual-link" href="#">进入</a>
        </div>
      </div>
      {/* 关于我们 */}
      <SectionTitle title="关于我们" />
      <div className="about-content">
        <div className="about-info">
          <h3>华星璀璨</h3>
          <p>
            华星璀璨是一家致力于综合性、新经济、新传媒优质服务型企业。公司整合多年来坚实发展，已成为相关行业全国知名品牌公司、垂直直播行业头部公司、MCN矩视行业头部公司。
          </p>
          <a className="about-link" href="#">进入</a>
        </div>
        <div className="about-img">
          <img src="/about-demo.png" alt="关于我们" />
        </div>
      </div>
    </div>
    {/* 联系我们 */}
      <ConactUs />
  </div>;
}