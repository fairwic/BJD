import React from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, MoreHorizontal, Clock, DollarSign, MapPin, Share2, ShieldCheck, AlertCircle } from 'lucide-react';

const RequirementDetail = () => {
    const { pop, currentRoute, push } = useRouter();
    const { requirements, takeRequirement, currentUser } = useApp();

    const reqId = currentRoute?.params?.id;
    // eslint-disable-next-line eqeqeq
    const item = requirements.find(r => r.id == reqId);

    if (!item) {
        return <div className="p-4 text-center text-gray-500 pt-20">需求不存在或已删除</div>;
    }

    const isOwner = currentUser.id === item.userId;
    const isTaken = item.status !== 'open';

    const handleTakeOrder = () => {
        if (isOwner) return;
        const chatId = takeRequirement(item.id);
        if (chatId) {
            // 接单成功后，返回上一页（通常是需求列表）
            // 实际应用中可能会跳转到聊天页面，但目前 Router 结构需要Tab切换，暂时先返回
            pop();
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
                <button onClick={pop} className="p-1 -ml-1">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.user.avatarBg}`}>
                        {item.user.avatarText}
                    </div>
                    <span className="font-bold text-sm text-gray-800">{item.user.name}</span>
                </div>
                <button className="p-1 -mr-1">
                    <MoreHorizontal size={24} className="text-gray-800" />
                </button>
            </div>

            <div className="p-4">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-rose-500">{item.price}</span>
                    <span className="text-xs text-gray-400">{item.time}发布</span>
                </div>

                {/* Title */}
                <h1 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                    {item.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                                tag.type === 'urgent'
                                    ? 'bg-rose-50 text-rose-500'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {tag.text}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <div className="text-sm text-gray-700 leading-relaxed space-y-4 mb-6">
                    <p>{item.desc || item.title}</p>
                    {/* Mock Description text if empty */}
                    {!item.desc && <p>（用户未填写详细描述，请参考标题或私聊沟通）</p>}
                </div>

                {/* Images */}
                {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 mb-6">
                        {item.images.map((img, idx) => (
                            <img key={idx} src={img} alt="" className="w-full rounded-xl bg-gray-100" />
                        ))}
                    </div>
                )}

                {/* Security Tip */}
                <div className="bg-gray-50 rounded-xl p-3 flex gap-3 items-start">
                    <ShieldCheck size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-500 leading-relaxed">
                        <p className="font-bold text-gray-700 mb-0.5">交易安全提示</p>
                        <p>请在平台内完成沟通与支付。引导私下交易可能存在风险，请谨防诈骗。</p>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
                <button className="flex flex-col items-center gap-0.5 text-gray-400 px-2">
                    <Share2 size={20} />
                    <span className="text-[10px]">分享</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-gray-400 px-2">
                    <AlertCircle size={20} />
                    <span className="text-[10px]">举报</span>
                </button>

                {isOwner ? (
                    <button className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-full font-bold text-sm cursor-not-allowed">
                        这是你发布的需求
                    </button>
                ) : isTaken ? (
                    <button className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-full font-bold text-sm cursor-not-allowed">
                        该需求已截单
                    </button>
                ) : (
                    <button
                        onClick={handleTakeOrder}
                        className="flex-1 bg-rose-500 text-white py-3 rounded-full font-bold text-sm shadow-lg shadow-rose-200 active:scale-95 transition-transform"
                    >
                        立即接单
                    </button>
                )}
            </div>
        </div>
    );
};

export default RequirementDetail;
