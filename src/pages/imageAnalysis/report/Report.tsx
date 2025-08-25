import { useEffect } from 'react';
import './Report.less';

export interface StyleReference {
  imageUrl: string;
  threePartRatio: string;
  fiveEyeRatio: string;
  stylePositioning: string;
  makeupFocus: string;
}

export interface SkinSubType {
  result: string;
  result_name: string;
  advice: string[];
  advice_image_url: string;
}

export interface SkinAnalysis {
  skin_type: SkinSubType;
  eyelid_type: SkinSubType;
  nasolabial_fold: SkinSubType;
  acne: SkinSubType;
  skin_spot: SkinSubType;
  result_image_url: string;
}

export interface PartAnalysis {
  length: string;
  ratio: string;
  result: string;
  result_name: string;
  advice: string[];
  advice_image_url: string;
}

export interface ThreePartAnalysis {
  ratios: string;
  advice: string[];
  normal_image_url: string;
  one_part: PartAnalysis;
  two_part: PartAnalysis;
  three_part: PartAnalysis;
  result_image_url: string;
}

export interface FiveEyesAnalysis {
  ratios: string;
  result: string;
  result_name: string;
  advice: string[];
  image_url: string;
  result_image_url: string;
}

export interface FacialDensity {
  value: string;
  result: string;
  result_name: string;
  advice: string[];
  result_image_url: string;
}

export interface FeatureTypeSub {
  result: string;
  result_name: string;
  advice: string[];
  advice_image_url: string;
}

export interface FeatureTypes {
  brows: FeatureTypeSub;
  eyes: FeatureTypeSub;
  nose: FeatureTypeSub;
  lip: FeatureTypeSub;
  face_shape: FeatureTypeSub;
}

export interface RawData {
  style_reference_list: StyleReference[];
  skin_analysis: SkinAnalysis;
  three_part_analysis: ThreePartAnalysis;
  five_eyes_analysis: FiveEyesAnalysis;
  facial_density: FacialDensity;
  feature_types: FeatureTypes;
}

export interface ReportData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  created_by: string;
  updated_by: string;
  imageUrl: string;
  personId: string;
  cateId: number;
  fileUrl: string;
  rawData: RawData;
}

// 身体分析相关接口
export interface BodyType {
  image_url: string;
  body_type: string;
  features: string[];
}

export interface BodyProportion {
  image_url: string;
  head_to_body: string;
  head_to_shoulders: string;
  upper_to_lower_body: string;
  waist_to_hip_ratio: string;
}

export interface BodyRawData {
  body_type: BodyType;
  body_proportion: BodyProportion;
  advice: string[];
}

export interface BodyReportData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  created_by: string;
  updated_by: string;
  imageUrl: string;
  personId: string;
  cateId: number;
  fileUrl: string;
  rawData: BodyRawData;
}

export interface StreamerInfoData {
  account_status: string; // 账号状态：线上/线下/...
  agent: string; // 经纪权
  ai_rating: string; // 扩展字段（来自飞书表格其他中文字段）
  avatar_url: string; // 头像链接
  contract: string; // 合约
  duration_score: number; // 时长评分
  height_cm: number; // 身高（cm）
  monthly_duration: string; // 本月时长（字符串，如 6天/25小时30分）
  monthly_valid_days: number; // 本月有效天（天数）
  nickname: string; // 主播昵称
  operation_group: string; // 运营组别
  operator: string; // 运营权（如：线下一组——某某某）
  real_name: string; // 真实姓名
  revenue_score: number; // 流水评分
  signing_score: number; // 签约评分
  streamer_id: string; // 主播ID
  tags: string[]; // 主播标签（多值）
  tenure: string; // 年限（字符串描述）
  total_score: number; // 综合总分
  track: string; // 主播赛道，如：唱歌(流行)
  training_score: number; // 培训评分
  weight_kg: number; // 体重（kg）
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="section-title">
      <span className="line" />
      {title}
      <span className="line" />
    </div>
  );
}

export default function Report({ reportData, streamerInfo }: { reportData: ReportData | BodyReportData, streamerInfo: StreamerInfoData }) {
  // 检查是否为身体分析数据
  const isBodyAnalysis = 'rawData' in reportData && reportData.rawData && 'body_type' in reportData.rawData;

  // 组件挂载时滚动到页面顶部
  useEffect(() => {
    // 延迟滚动，确保组件完全渲染
    setTimeout(() => {
      // 滚动 image-analysis 容器到顶部
      const container = document.querySelector('.image-analysis');
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 150);
  }, []);

  // 面部分析数据便捷引用（仅在非身体分析时使用）
  const faceRaw = !isBodyAnalysis ? (reportData as ReportData).rawData : undefined;
  const threePart = faceRaw?.three_part_analysis;
  const onePartUrl = threePart?.one_part?.advice_image_url;
  const twoPartUrl = threePart?.two_part?.advice_image_url;
  const threePartUrl = threePart?.three_part?.advice_image_url;
  const hasThreeGlobalAdvice = !!(threePart?.advice && threePart.advice.some(line => line && line.trim()));

  return (
    <div className="report-page">
      <h1 className="report-title">
        {isBodyAnalysis ? '身材美学分析报告' : '面部分析报告'}
      </h1>
      <div className="report-subtitle">
        {isBodyAnalysis ? 'Body Aesthetics Analysis Report' : 'Facial Analysis Report'}
      </div>
      
      <div className="report-card">
        <div className="report-info">
          <h2 className="info-title">基础信息</h2>
          <div className="info-row">
            <div className="infoColumn">
              <div className="info-label">昵称</div>
              <div className="info-value">{streamerInfo.nickname}</div>
            </div>
            <div className="infoColumn">
              <div className="info-label">系统ID</div>
              <div className="info-value">{streamerInfo.streamer_id}</div>
            </div>
          </div>
          <div className="info-row">
            <div className="infoColumn">
              <div className="info-label">主播评级</div>
              <div className="info-value">{streamerInfo.ai_rating}</div>
            </div>
            <div className="infoColumn">
              <div className="info-label">运营组</div>
              <div className="info-value">{streamerInfo.operation_group}</div>
            </div>
          </div>
          <div className="info-row">
            <div className="infoColumn">
              <div className="info-label">主播标签</div>
              <div className="info-tags">
                <span className="tag tag-active">{streamerInfo.contract}</span>
                <span className="tag">{streamerInfo.agent}</span>
              </div>
            </div>
          </div>
          <button className="info-btn">Send Now</button>
        </div>
        <div className="report-avatar">
          <img src={reportData?.imageUrl} alt="avatar" />
        </div>
      </div>
      
      {/* 风格参考 - 只在面部分析时显示 */}
      {!isBodyAnalysis && (reportData as ReportData).rawData?.style_reference_list && (
        <div className="report-card flex_column">
          <SectionTitle title="风格参考" />
                             {(reportData as ReportData).rawData?.style_reference_list?.map((item, idx) => (
            <div className="style-ref-card" key={idx}>
              <div className="style-ref-left">
                <img className="style-ref-img" src={item.imageUrl} alt="风格参考" />
              </div>
              <div className="style-ref-info">
                <div>三庭比例：{item.threePartRatio}</div>
                <div>五眼比例：{item.fiveEyeRatio}</div>
                <div>风格定位：{item.stylePositioning}</div>
                <div>妆容重点：
                  {item.makeupFocus && item.makeupFocus.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 身体分析内容 */}
      {isBodyAnalysis && (
        <div className="report-card flex_column">
          <SectionTitle title="身材分析" />
          <div className="body-analysis-content">
            <div className="body-analysis-item">
              <h3>体型类型</h3>
              <p>{(reportData as BodyReportData).rawData?.body_type?.body_type}</p>
              {(reportData as BodyReportData).rawData?.body_type?.features && (
                <ul>
                  {(reportData as BodyReportData).rawData?.body_type?.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
              {(reportData as BodyReportData).rawData?.body_type?.image_url && (
                <div className="body-analysis-image">
                  <img src={(reportData as BodyReportData).rawData?.body_type?.image_url} alt="体型类型" />
                </div>
              )}
            </div>
            
            <div className="body-analysis-item">
              <h3>身材比例</h3>
              <div className="body-proportion-details">
                <p>头身比：{(reportData as BodyReportData).rawData?.body_proportion?.head_to_body}</p>
                <p>头肩比：{(reportData as BodyReportData).rawData?.body_proportion?.head_to_shoulders}</p>
                <p>上下身比：{(reportData as BodyReportData).rawData?.body_proportion?.upper_to_lower_body}</p>
                <p>腰臀比：{(reportData as BodyReportData).rawData?.body_proportion?.waist_to_hip_ratio}</p>
              </div>
              {(reportData as BodyReportData).rawData?.body_proportion?.image_url && (
                <div className="body-analysis-image">
                  <img src={(reportData as BodyReportData).rawData?.body_proportion?.image_url} alt="身材比例" />
                </div>
              )}
            </div>
            
            <div className="body-analysis-item">
              <h3>穿搭建议</h3>
              {(reportData as BodyReportData).rawData?.advice && (
                <ul>
                                     {(reportData as BodyReportData).rawData?.advice?.map((advice, idx) => (
                    <li key={idx}>{advice}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* 面部分析内容 - 只在非身体分析时显示 */}
      {!isBodyAnalysis && (
        <>
          <div className="report-card flex_column">
            <SectionTitle title="皮肤分析" />
            <div className="flex_row skin-analysis-card">
              <div className="skin-analysis-img">
                <img src={(reportData as ReportData).rawData?.skin_analysis?.result_image_url} alt="皮肤分析" />
              </div>
              <div className="skin-analysis-info">
                <div>皮肤类型：{(reportData as ReportData).rawData?.skin_analysis?.skin_type?.result_name}</div>
                <div>有无斑点：{(reportData as ReportData).rawData?.skin_analysis?.skin_spot?.result_name}</div>
                <div>有无痘痘：{(reportData as ReportData).rawData?.skin_analysis?.acne?.result_name}</div>
                <div>有无法令纹：{(reportData as ReportData).rawData?.skin_analysis?.nasolabial_fold?.result_name}</div>
              </div>
            </div>
          </div>
          
          <div className="report-card flex_column">
            <SectionTitle title="比例分析" />
            {/* 三庭比例分析 */}
            <div className="proportion-block">
              <div className="proportion-row">
                <div className="proportion-img">
                  <img src={(reportData as ReportData).rawData?.three_part_analysis?.result_image_url} alt="三庭比例" />
                </div>
                <div className="proportion-info">
                  <div>三庭比例：{(reportData as ReportData).rawData?.three_part_analysis?.ratios}</div>
                  {/* 三庭分析建议内容（优先展示外层整体建议） */}
                  {hasThreeGlobalAdvice ? (
                    <div className="three-part-advice">
                      <div className="advice-title">三庭整体建议：</div>
                      {threePart!.advice.filter(line => line && line.trim()).map((line, i) => (
                        <div key={i} className="advice-line">{line}</div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {threePart?.one_part?.advice && threePart.one_part.advice.length > 0 && threePart.one_part.advice[0] && (
                        <div className="three-part-advice">
                          <div className="advice-title">上庭建议：</div>
                          {threePart.one_part.advice.filter(line => line.trim()).map((line, i) => (
                            <div key={i} className="advice-line">{line}</div>
                          ))}
                        </div>
                      )}
                      {threePart?.two_part?.advice && threePart.two_part.advice.length > 0 && threePart.two_part.advice[0] && (
                        <div className="three-part-advice">
                          <div className="advice-title">中庭建议：</div>
                          {threePart.two_part.advice.filter(line => line.trim()).map((line, i) => (
                            <div key={i} className="advice-line">{line}</div>
                          ))}
                        </div>
                      )}
                      {threePart?.three_part?.advice && threePart.three_part.advice.length > 0 && threePart.three_part.advice[0] && (
                        <div className="three-part-advice">
                          <div className="advice-title">下庭建议：</div>
                          {threePart.three_part.advice.filter(line => line.trim()).map((line, i) => (
                            <div key={i} className="advice-line">{line}</div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/* 三庭分部建议图（有图则展示） */}
              {(onePartUrl || twoPartUrl || threePartUrl) && (
                <div className="proportion-advice-images">
                  {onePartUrl && (
                    <div className="advice-image-item">
                      <div className="advice-image-title">{threePart?.one_part?.result_name || '上庭'}</div>
                      <img src={onePartUrl} alt="上庭建议图" />
                    </div>
                  )}
                  {twoPartUrl && (
                    <div className="advice-image-item">
                      <div className="advice-image-title">{threePart?.two_part?.result_name || '中庭'}</div>
                      <img src={twoPartUrl} alt="中庭建议图" />
                    </div>
                  )}
                  {threePartUrl && (
                    <div className="advice-image-item">
                      <div className="advice-image-title">{threePart?.three_part?.result_name || '下庭'}</div>
                      <img src={threePartUrl} alt="下庭建议图" />
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* 五眼比例分析 */}
            <div className="proportion-block">
              <div className="proportion-row">
                <div className="proportion-img">
                  <img src={(reportData as ReportData).rawData?.five_eyes_analysis?.result_image_url} alt="五眼比例" />
                </div>
                <div className="proportion-info">
                  <div>五眼比例：{(reportData as ReportData).rawData?.five_eyes_analysis?.ratios}</div>
                                     {(reportData as ReportData).rawData?.five_eyes_analysis?.advice && (reportData as ReportData).rawData?.five_eyes_analysis?.advice.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
              {/* 五眼画法示例已移除（后端不返回该字段） */}
            </div>
          </div>
          
          <div className="report-card flex_column">
            <SectionTitle title="五官量感" />
            <div className="facial-density-block">
              <div className="facial-density-img">
                <img src={(reportData as ReportData).rawData?.facial_density?.result_image_url} alt="五官量感" />
              </div>
              <div className="facial-density-info">
                <div className="density-name">{(reportData as ReportData).rawData?.facial_density?.result_name}</div>
                            <div className="density-advice">
                             {(reportData as ReportData).rawData?.facial_density?.advice && (reportData as ReportData).rawData?.facial_density?.advice.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
              </div>
            </div>
          </div>
          
          <div className="report-card flex_column">
            <SectionTitle title="五官类型" />
                         <div className="feature-types-block">
               {(reportData as ReportData).rawData?.feature_types && Object.entries((reportData as ReportData).rawData?.feature_types).map(([key, value]) => (
                <div className="feature-type-item" key={key}>
                  <div className="feature-type-title">{/* 可用映射将key转为中文，如"眉毛" */}</div>
                  <div className="feature-type-img">
                    {/* <img src={value.advice_image_url} alt={value.result_name} /> */}
                  </div>
                  <div className="feature-type-info">
                    {/* 仅展示中文名称，隐藏英文编码 */}
                    <div className="feature-type-name">{value.result_name}</div>
                    {value.advice && (
                      <div className="feature-type-advice">
                        {value.advice.map((line: string, i: number) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}