import { useState } from 'react';
import Header from '../../compoents/Header/Header';
import ConactUs from '../../compoents/ConactUs/ConactUs';
import './ArtistManagement.less';

interface ArtistInfo {
  nickname: string;
  id: string;
  realName: string;
  height: string;
  weight: string;
  track: string;
  status: string;
  agent: string;
  operator: string;
  tags: string[];
  photo: string;
}

interface RecruitmentRecord {
  agent: string;
  interviewTime: string;
  liveExperience: string;
  joinTime: string;
  operator: string;
  position: string;
  isStudent: string;
  contract: string;
  auditionVideo: string;
  shootingRequirements: string[];
}

interface OperationRecord {
  operator: string;
  trialRoom: string;
  roomStyle: string;
  debugTeam: string;
  broadcastTime: string;
  roomContent: string;
  equipmentCheck: string;
  environmentPrep: string;
  cleaning: string;
  monthlyDays: string;
  monthlyHours: string;
  monthlyRevenue: string;
  trainingCourses: string;
  followRecord: string;
  reviewRecord: string;
  modificationRecord: string;
  shootingRecord: string;
  statusRecord: string;
  makeupReference: string;
  broadcastScreenshot: string;
  broadcastVideo: string;
}

interface ShootingRecord {
  director: string;
  shootingTime: string;
  shots: string;
  production: string;
  postProduction: string;
  platform: string;
  benchmarkContent: string;
  videoLinks: string[];
}

interface TrainingRecord {
  operator: string;
  trainingTime: string;
  trainer: string;
  course: string;
  feedback: string[];
}

interface AnalysisRecord {
  records: Array<{
    avatar: string;
    name: string;
    date: string;
    time: string;
  }>;
}

interface MakeupRecord {
  records: Array<{
    photo: string;
    makeupArtist: string;
    date: string;
    time: string;
    type: string;
  }>;
}

export default function ArtistManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('basicInfo');

  // 模拟艺人数据
  const artistInfo: ArtistInfo = {
    nickname: '车车',
    id: '19980214',
    realName: '江林倩',
    height: '170cm',
    weight: '48kg',
    track: '唱歌(流行)',
    status: '线下',
    agent: '杨思远',
    operator: '线下一组——————某某某',
    tags: ['全能型(有天赋+有颜值)'],
    photo: '/icon/icon_profile.png'
  };

  const recruitmentRecord: RecruitmentRecord = {
    agent: '杨思远',
    interviewTime: '2025-03-24',
    liveExperience: '无',
    joinTime: '2025-03-30',
    operator: '线下一组——某某某',
    position: '主播',
    isStudent: '否',
    contract: '2025-04-02/三年/45%/8000',
    auditionVideo: '/icon/icon_profile.png',
    shootingRequirements: [
      '2025-04-20 拍摄民国旗袍风格视频',
      '2025-04-27 拍摄古风清汉女风格视频'
    ]
  };

  const operationRecord: OperationRecord = {
    operator: '线下一组——————某某某',
    trialRoom: '714',
    roomStyle: '简约居家',
    debugTeam: '王寿兴',
    broadcastTime: '14:00-18:00',
    roomContent: '颜值聊天类型',
    equipmentCheck: '完好',
    environmentPrep: '完好',
    cleaning: '14:00-18:00',
    monthlyDays: '25天',
    monthlyHours: '140小时',
    monthlyRevenue: '10w',
    trainingCourses: '',
    followRecord: '',
    reviewRecord: '',
    modificationRecord: '',
    shootingRecord: '',
    statusRecord: '转线上(原因)',
    makeupReference: '/icon/icon_profile.png',
    broadcastScreenshot: '/icon/icon_profile.png',
    broadcastVideo: '/icon/icon_profile.png'
  };

  const shootingRecord: ShootingRecord = {
    director: '李山',
    shootingTime: '2025-03-24',
    shots: '2条',
    production: '卢倩',
    postProduction: '某某某',
    platform: '抖音',
    benchmarkContent: '/icon/icon_profile.png',
    videoLinks: [
      '2.51 复制打开抖音,看看【林趑墨的图文作品】♥一生使我动情是你~#张学友#真情流露 https://v.douyin.com/_Lkq-XEHVVg/fOX:/02/11 G@v.sr'
    ]
  };

  const trainingRecord: TrainingRecord = {
    operator: '线下一组——某某某',
    trainingTime: '2025-07-10 13:00-15:00',
    trainer: '王昭昭',
    course: '<一句话拿捏镜头背后的人>',
    feedback: ['1', '2']
  };

  const analysisRecord: AnalysisRecord = {
    records: [
      { avatar: '/icon/icon_profile.png', name: '林越墨', date: '2025-06-23', time: '14:51:09' },
      { avatar: '/icon/icon_profile.png', name: '林越墨', date: '2025-06-22', time: '12:31:12' },
      { avatar: '/icon/icon_profile.png', name: '林越墨', date: '2025-06-15', time: '12:31:12' },
      { avatar: '/icon/icon_profile.png', name: '林越墨', date: '2025-06-01', time: '12:31:12' }
    ]
  };

  const makeupRecord: MakeupRecord = {
    records: [
      { photo: '/icon/icon_profile.png', makeupArtist: '何洋玲', date: '2025/07/14', time: '07:00', type: '直播妆容' }
    ]
  };

  const menuItems = [
    { key: 'basicInfo', label: '基础信息' },
    { key: 'recruitment', label: '招募记录' },
    { key: 'operation', label: '运营记录' },
    { key: 'shooting', label: '拍摄记录' },
    { key: 'training', label: '培训记录' },
    { key: 'analysis', label: '分析记录' },
    { key: 'makeup', label: '妆造记录' },
    { key: 'transfer', label: '流转记录' }
  ];


  return (
    <div className="artistManagement">
      <Header />
      <div className="artistManagementContent">
        {/* 主要内容区域 */}
        <div className="mainContent">
          {/* 左侧导航 */}
          <div className="leftNav">
             {/* 搜索栏 */}
            <div className="searchBar">
              <div className="searchIcon">🔍</div>
              <input
                type="text"
                placeholder="主播ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />
              {searchTerm && (
                <div className="clearIcon" onClick={() => setSearchTerm('')}>✕</div>
              )}
            </div>
            {menuItems.map((item) => (
              <a
                key={item.key}
                className={`navItem ${activeTab === item.key ? 'active' : ''}`}
                href={`#${item.key}`}
                onClick={() => setActiveTab(item.key)}
              >
                <div className="navDot"></div>
                {item.label}
              </a>
            ))}
          </div>

          {/* 右侧内容区域 */}
          <div className="rightContent">
            <div className="contentCard">
              {/* 基础信息 */}
              <div id="basicInfo" className="contentSection">
                <div className="contentTitle">基础信息</div>
                <div className="basicInfoContent">
                  <div className="infoSection">
                    <div className="infoLeft">
                      <div className="infoItem">
                        <label>主播昵称:</label>
                        <span>{artistInfo.nickname}</span>
                      </div>
                      <div className="infoItem">
                        <label>主播ID:</label>
                        <span>{artistInfo.id}</span>
                      </div>
                      <div className="infoItem">
                        <label>真实姓名:</label>
                        <span>{artistInfo.realName}</span>
                      </div>
                      <div className="infoItem">
                        <label>身高/体重:</label>
                        <span>{artistInfo.height}/{artistInfo.weight}</span>
                      </div>
                      <div className="infoItem">
                        <label>主播赛道:</label>
                        <span>{artistInfo.track}</span>
                      </div>
                      <div className="infoItem">
                        <label>账号状态:</label>
                        <span>{artistInfo.status}</span>
                      </div>
                      <div className="infoItem">
                        <label>经纪权:</label>
                        <span>{artistInfo.agent}</span>
                      </div>
                      <div className="infoItem">
                        <label>运营权:</label>
                        <span>{artistInfo.operator}</span>
                      </div>
                      <div className="infoItem">
                        <label>主播标签:</label>
                        <div className="tagsContainer">
                          {artistInfo.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="infoRight">
                      <img src={artistInfo.photo} alt="艺人照片" className="artistPhoto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 招募记录 */}
              <div id="recruitment" className="contentSection">
                <div className="contentTitle">招募记录</div>
                <div className="recruitmentContent">
                  <div className="infoSection">
                    <div className="infoLeft">
                      <div className="infoItem">
                        <label>对接经纪:</label>
                        <span>{recruitmentRecord.agent}</span>
                      </div>
                      <div className="infoItem">
                        <label>面试时间:</label>
                        <span>{recruitmentRecord.interviewTime}</span>
                      </div>
                      <div className="infoItem">
                        <label>有无直播经验:</label>
                        <span>{recruitmentRecord.liveExperience}</span>
                      </div>
                      <div className="infoItem">
                        <label>入会时间:</label>
                        <span>{recruitmentRecord.joinTime}</span>
                      </div>
                    </div>
                    <div className="infoRight">
                      <div className="infoItem">
                        <label>承接运营:</label>
                        <span>{recruitmentRecord.operator}</span>
                      </div>
                      <div className="infoItem">
                        <label>面试岗位:</label>
                        <span>{recruitmentRecord.position}</span>
                      </div>
                      <div className="infoItem">
                        <label>是否为在校大学生:</label>
                        <span>{recruitmentRecord.isStudent}</span>
                      </div>
                      <div className="infoItem">
                        <label>签约信息:</label>
                        <span>{recruitmentRecord.contract}</span>
                      </div>
                      <div className="auditionVideo">
                        <label>试镜视频:</label>
                        <img src={recruitmentRecord.auditionVideo} alt="试镜视频" />
                      </div>
                    </div>
                  </div>
                  <div className="shootingRequirements">
                    <label>内容拍摄提需记录:</label>
                    <div className="requirementsList">
                      {recruitmentRecord.shootingRequirements.map((req, index) => (
                        <div key={index} className="requirementItem">{req}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 运营记录 */}
              <div id="operation" className="contentSection">
                <div className="contentTitle">运营记录</div>
                <div className="operationContent">
                  <div className="infoSection">
                    <div className="infoLeft">
                      <div className="infoItem">
                        <label>运营权:</label>
                        <span>{operationRecord.operator}</span>
                      </div>
                      <div className="infoGroup">
                        <h4>试播记录</h4>
                        <div className="infoItem">
                          <label>直播间位置:</label>
                          <span>{operationRecord.trialRoom}</span>
                        </div>
                        <div className="infoItem">
                          <label>直播间风格:</label>
                          <span>{operationRecord.roomStyle}</span>
                        </div>
                        <div className="infoItem">
                          <label>调试组人员:</label>
                          <span>{operationRecord.debugTeam}</span>
                        </div>
                      </div>
                      <div className="infoGroup">
                        <h4>开播前</h4>
                        <div className="infoRow">
                          <div className="infoColumn">
                            <div className="infoItem">
                              <label>直播间位置:</label>
                              <span>{operationRecord.trialRoom}</span>
                            </div>
                            <div className="infoItem">
                              <label>直播间风格:</label>
                              <span>{operationRecord.roomStyle}</span>
                            </div>
                            <div className="infoItem">
                              <label>直播时间段:</label>
                              <span>{operationRecord.broadcastTime}</span>
                            </div>
                            <div className="infoItem">
                              <label>直播间内容:</label>
                              <span>{operationRecord.roomContent}</span>
                            </div>
                          </div>
                          <div className="infoColumn">
                            <div className="infoItem">
                              <label>设备检查:</label>
                              <span>{operationRecord.equipmentCheck}</span>
                            </div>
                            <div className="infoItem">
                              <label>环境准备:</label>
                              <span>{operationRecord.environmentPrep}</span>
                            </div>
                            <div className="infoItem">
                              <label>卫生打扫:</label>
                              <span>{operationRecord.cleaning}</span>
                            </div>
                            <div className="infoItem">
                              <label>直播间内容:</label>
                              <span>{operationRecord.roomContent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="infoGroup">
                        <h4>开播中</h4>
                        <div className="infoItem">
                          <label>月直播天数:</label>
                          <span>{operationRecord.monthlyDays}</span>
                        </div>
                        <div className="infoItem">
                          <label>月直播时长:</label>
                          <span>{operationRecord.monthlyHours}</span>
                        </div>
                        <div className="infoItem">
                          <label>月直播流水:</label>
                          <span>{operationRecord.monthlyRevenue}</span>
                        </div>
                        <div className="infoItem">
                          <label>月培训课程:</label>
                          <span>{operationRecord.trainingCourses}</span>
                        </div>
                        <div className="infoItem">
                          <label>跟播记录:</label>
                          <span>{operationRecord.followRecord}</span>
                        </div>
                      </div>
                      <div className="infoGroup">
                        <h4>开播后</h4>
                        <div className="infoItem">
                          <label>复盘记录:</label>
                          <span>{operationRecord.reviewRecord}</span>
                        </div>
                        <div className="infoItem">
                          <label>修改记录:</label>
                          <span>{operationRecord.modificationRecord}</span>
                        </div>
                        <div className="infoItem">
                          <label>拍摄记录:</label>
                          <span>{operationRecord.shootingRecord}</span>
                        </div>
                        <div className="infoItem">
                          <label>状态记录:</label>
                          <span>{operationRecord.statusRecord}</span>
                        </div>
                      </div>
                    </div>
                    <div className="infoRight">
                      <div className="imageSection">
                        <label>妆造对标图:</label>
                        <img src={operationRecord.makeupReference} alt="妆造对标图" />
                      </div>
                      <div className="imageSection">
                        <label>开播截图:</label>
                        <img src={operationRecord.broadcastScreenshot} alt="开播截图" />
                      </div>
                      <div className="imageSection">
                        <label>开播视频:</label>
                        <img src={operationRecord.broadcastVideo} alt="开播视频" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 拍摄记录 */}
              <div id="shooting" className="contentSection">
                <div className="contentTitle">拍摄记录</div>
                <div className="shootingContent">
                  <div className="infoSection">
                    <div className="infoLeft">
                      <div className="infoItem">
                        <label>编导:</label>
                        <span>{shootingRecord.director}</span>
                      </div>
                      <div className="infoItem">
                        <label>拍摄时间:</label>
                        <span>{shootingRecord.shootingTime}</span>
                      </div>
                      <div className="infoItem">
                        <label>拍摄条数:</label>
                        <span>{shootingRecord.shots}</span>
                      </div>
                      <div className="infoItem">
                        <label>摄制:</label>
                        <span>{shootingRecord.production}</span>
                      </div>
                      <div className="infoItem">
                        <label>后期:</label>
                        <span>{shootingRecord.postProduction}</span>
                      </div>
                      <div className="infoItem">
                        <label>发布平台:</label>
                        <span>{shootingRecord.platform}</span>
                      </div>
                    </div>
                    <div className="infoRight">
                      <div className="benchmarkContent">
                        <label>对标内容:</label>
                        <img src={shootingRecord.benchmarkContent} alt="对标内容" />
                      </div>
                    </div>
                  </div>
                  <div className="videoLinks">
                    <label>内容拍摄视频链接:</label>
                    <div className="linksList">
                      {shootingRecord.videoLinks.map((link, index) => (
                        <div key={index} className="linkItem">{link}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 培训记录 */}
              <div id="training" className="contentSection">
                <div className="contentTitle">培训记录</div>
                <div className="trainingContent">
                  <div className="infoSection">
                    <div className="infoLeft">
                      <div className="infoItem">
                        <label>运营权:</label>
                        <span>{trainingRecord.operator}</span>
                      </div>
                      <div className="infoItem">
                        <label>培训时间:</label>
                        <span>{trainingRecord.trainingTime}</span>
                      </div>
                    </div>
                    <div className="infoRight">
                      <div className="infoItem">
                        <label>培训老师:</label>
                        <span>{trainingRecord.trainer}</span>
                      </div>
                      <div className="infoItem">
                        <label>培训课程:</label>
                        <span>{trainingRecord.course}</span>
                      </div>
                    </div>
                  </div>
                  <div className="feedbackSection">
                    <label>培训反馈:</label>
                    <div className="feedbackInputs">
                      {trainingRecord.feedback.map((item, index) => (
                        <input key={index} type="text" value={item} readOnly className="feedbackInput" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 分析记录 */}
              <div id="analysis" className="contentSection">
                <div className="contentTitle">分析记录</div>
                <div className="analysisContent">
                  <div className="recordsGrid">
                    {analysisRecord.records.map((record, index) => (
                      <div key={index} className="recordItem">
                        <img src={record.avatar} alt={record.name} className="recordAvatar" />
                        <div className="recordInfo">
                          <div className="recordName">{record.name}</div>
                          <div className="recordDate">{record.date}</div>
                          <div className="recordTime">{record.time}</div>
                          <div className="recordDownload">下载</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 妆造记录 */}
              <div id="makeup" className="contentSection">
                <div className="contentTitle">妆造记录</div>
                <div className="makeupContent">
                  <div className="makeupGrid">
                    {makeupRecord.records.map((record, index) => (
                      <div key={index} className="makeupCard">
                        <img src={record.photo} alt="妆造照片" className="makeupPhoto" />
                        <div className="makeupInfo">
                          <div className="makeupArtist">化妆师: {record.makeupArtist}</div>
                          <div className="makeupDateTime">{record.date} {record.time}</div>
                        </div>
                        <button className="makeupTypeBtn">{record.type}</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 流转记录 */}
              <div id="transfer" className="contentSection">
                <div className="contentTitle">流转记录</div>
                <div className="transferContent">
                  <div className="transferInfo">
                    <p>流转记录功能开发中...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConactUs />
    </div>
  );
} 