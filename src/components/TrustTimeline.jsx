import React from 'react';
import { Check, Camera, Clock, Package, PenTool, Hammer } from 'lucide-react';

const TrustTimeline = ({ stages, currentStageIndex }) => {
  // 定义预设的制作阶段图标和描述
  const STAGE_CONFIG = {
    'modeling': { icon: PenTool, label: '3D建模/打样', desc: '原型师精修细节' },
    'mold': { icon: Hammer, label: '翻模制作', desc: '制作硅胶模具' },
    'casting': { icon: Package, label: '树脂灌注', desc: '真空脱泡成型' },
    'polishing': { icon: Hammer, label: '打磨修整', desc: '去除合模线' },
    'makeup': { icon: PenTool, label: '妆面绘制', desc: '画师手绘妆面' },
    'assembly': { icon: Package, label: '组装质检', desc: '穿筋组装测试' },
    'shipping': { icon: Package, label: '打包发货', desc: '顺丰护航' },
  };

  return (
    <div className="py-2">
      <div className="relative">
        {/* 连接线 */}
        <div className="absolute top-6 left-6 bottom-6 w-0.5 bg-gray-100" />

        {stages.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const config = STAGE_CONFIG[stage.type] || { icon: Clock, label: stage.name, desc: '' };
          const Icon = config.icon;

          return (
            <div key={index} className="relative pl-14 pb-8 last:pb-0 group">
              {/* 状态节点圆圈 */}
              <div 
                className={`absolute left-0 top-0 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all bg-white z-10
                  ${isCompleted ? 'border-rose-100 text-rose-500' : 
                    isCurrent ? 'border-rose-500 text-rose-500 shadow-lg shadow-rose-200' : 
                    'border-gray-100 text-gray-300'}`}
              >
                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
              </div>

              {/* 内容区域 */}
              <div className={`transition-opacity ${index > currentStageIndex ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className={`font-bold text-base ${isCurrent ? 'text-rose-600' : 'text-gray-800'}`}>
                      {stage.customLabel || config.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{stage.desc || config.desc}</p>
                  </div>
                  {stage.date && (
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full font-mono">
                      {stage.date}
                    </span>
                  )}
                </div>

                {/* 证据照片墙 - 增强信任感的核心 */}
                {stage.photos && stage.photos.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide py-1">
                    {stage.photos.map((photo, pIndex) => (
                      <div key={pIndex} className="relative shrink-0">
                        <div className={`w-20 h-20 rounded-lg ${photo} bg-gray-100 border border-gray-100`} />
                        <div className="absolute bottom-1 right-1 bg-black/50 text-white p-0.5 rounded text-[10px] flex items-center gap-1">
                          <Camera size={10} />
                          <span>实拍</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 当前阶段的高亮提示 */}
                {isCurrent && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-medium animate-pulse">
                    <Clock size={12} />
                    <span>当前生产进度进行中...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustTimeline;
