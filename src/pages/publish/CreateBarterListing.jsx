
import React, { useState } from "react";
import { useRouter } from "../../router/RouteStack";
import { ChevronLeft, Camera, Repeat } from "lucide-react";

const CreateBarterListing = () => {
    const { pop } = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        wantItem: "",
        estimatedValue: ""
    });

    const theme = {
        gradient: 'from-fuchsia-50 to-purple-50',
        text: 'text-purple-600',
        bg: 'bg-purple-50',
        btn: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
    };

    const handlePublish = () => {
        if (!formData.title || !formData.wantItem) return alert("请填写完整信息");
        alert("发布交换成功！");
        pop();
    };

    return (
        <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.gradient}`}>
             <div className="px-4 h-14 flex items-center justify-between sticky top-0 z-30 bg-white/70 backdrop-blur-md">
                <button onClick={() => pop()} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <span className="font-bold text-lg text-gray-800">发布交换</span>
                <button onClick={handlePublish} className={`font-bold text-sm px-4 py-1.5 rounded-full text-white shadow-lg shadow-purple-500/30 active:scale-95 transition-all ${theme.btn}`}>
                    发布
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                 <div className="bg-white/60 backdrop-blur rounded-3xl p-4 border border-white/50 shadow-sm">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                         <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 flex flex-col items-center justify-center gap-2 shrink-0">
                            <Camera size={20} className="text-purple-400" />
                            <span className="text-[10px] font-bold text-purple-400">持有物图片</span>
                         </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-1 shadow-sm border border-gray-100">
                    <input 
                        className="w-full px-5 py-4 text-base font-bold bg-transparent outline-none" 
                        placeholder="我有... (e.g. 【换】出AS华熙)"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    <div className="h-px bg-gray-50 mx-4" />
                    <textarea 
                        className="w-full h-32 px-5 py-4 text-sm bg-transparent outline-none resize-none"
                        placeholder="描述持有物详情..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                
                {/* Specific Exchange Field */}
                <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-purple-700 flex items-center gap-2">
                            <Repeat size={16} />
                            我想换
                        </span>
                        <input 
                            className="text-right text-sm outline-none placeholder:text-purple-300/70 bg-transparent text-purple-700 font-bold w-2/3"
                            placeholder="如: 龙魂 盘古 (可补差价)"
                            value={formData.wantItem}
                            onChange={(e) => setFormData({...formData, wantItem: e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateBarterListing;
