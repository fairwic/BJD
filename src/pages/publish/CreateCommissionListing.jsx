
import React, { useState } from "react";
import { useRouter } from "../../router/RouteStack";
import { ChevronLeft, Camera, Brush } from "lucide-react";

const CreateCommissionListing = () => {
    const { pop } = useRouter();
    const [commissionType, setCommissionType] = useState('request'); // request | offer
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        deadline: ""
    });

    const theme = {
        gradient: 'from-teal-50 to-cyan-50',
        text: 'text-teal-600',
        bg: 'bg-teal-50',
        btn: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    };

    const handlePublish = () => {
        if (!formData.title) return alert("请填写完整信息");
        alert("发布服务成功！");
        pop();
    };

    return (
        <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.gradient}`}>
             <div className="px-4 h-14 flex items-center justify-between sticky top-0 z-30 bg-white/70 backdrop-blur-md">
                <button onClick={() => pop()} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-lg text-gray-800">发布约稿/服务</span>
                </div>
                <button onClick={handlePublish} className={`font-bold text-sm px-4 py-1.5 rounded-full text-white shadow-lg shadow-teal-500/30 active:scale-95 transition-all ${theme.btn}`}>
                    发布
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Type Toggle */}
                 <div className="bg-white/50 p-1 rounded-xl flex border border-teal-100/50">
                    {[
                        { id: 'request', label: '我是单主 (找劳斯)', icon: '🙋' },
                        { id: 'offer', label: '我是劳斯 (接单)', icon: '🎨' }
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setCommissionType(t.id)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                                commissionType === t.id 
                                ? 'bg-white text-teal-700 shadow-sm'
                                : 'text-teal-600/60 hover:bg-white/30'
                            }`}
                        >
                            <span className="mr-1">{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                 </div>

                 <div className="bg-white/60 backdrop-blur rounded-3xl p-4 border border-white/50 shadow-sm">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                         <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50 flex flex-col items-center justify-center gap-2 shrink-0">
                            <Camera size={20} className="text-teal-400" />
                            <span className="text-[10px] font-bold text-teal-400">例图/参考</span>
                         </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-1 shadow-sm border border-gray-100">
                    <input 
                        className="w-full px-5 py-4 text-base font-bold bg-transparent outline-none" 
                        placeholder={commissionType === 'offer' ? "服务标题 (e.g. 擅长古风/二次元妆面)" : "需求标题 (e.g. 诚约6分古风手作娘)"}
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    <div className="h-px bg-gray-50 mx-4" />
                    <textarea 
                        className="w-full h-32 px-5 py-4 text-sm bg-transparent outline-none resize-none"
                        placeholder="描述具体要求、工期等..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>
            </div>
        </div>
    );
};
export default CreateCommissionListing;
