
import React, { useState } from "react";
import { useRouter } from "../../router/RouteStack";
import { ChevronLeft, Camera, BadgeDollarSign } from "lucide-react";

const CreateBuyListing = () => {
    const { pop } = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "", // Budget
        isUrgent: false
    });

    const theme = {
        gradient: 'from-blue-50 to-indigo-50',
        text: 'text-blue-600',
        bg: 'bg-blue-50',
        btn: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    };

    const handlePublish = () => {
        if (!formData.title || !formData.price) return alert("请填写完整信息");
        alert("发布求购需求成功！");
        pop();
    };

    return (
        <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.gradient}`}>
             <div className="px-4 h-14 flex items-center justify-between sticky top-0 z-30 bg-white/70 backdrop-blur-md">
                <button onClick={() => pop()} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <span className="font-bold text-lg text-gray-800">发布求购</span>
                <button onClick={handlePublish} className={`font-bold text-sm px-4 py-1.5 rounded-full text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all ${theme.btn}`}>
                    发布
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                 <div className="bg-white/60 backdrop-blur rounded-3xl p-4 border border-white/50 shadow-sm">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                         <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 flex flex-col items-center justify-center gap-2 shrink-0">
                            <Camera size={20} className="text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-400">参考图</span>
                         </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-1 shadow-sm border border-gray-100">
                    <input 
                        className="w-full px-5 py-4 text-base font-bold bg-transparent outline-none" 
                        placeholder="想收什么? (e.g. 诚收AS华熙)"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    <div className="h-px bg-gray-50 mx-4" />
                    <textarea 
                        className="w-full h-32 px-5 py-4 text-sm bg-transparent outline-none resize-none"
                        placeholder="描述心理价位、成色要求..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
                    <span className="font-bold text-gray-700 flex items-center gap-2">
                        <BadgeDollarSign size={18} className="text-blue-500" />
                        心理预算
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-blue-600 font-bold">¥</span>
                        <input 
                            className="text-right text-xl font-bold text-blue-600 outline-none bg-transparent w-24 placeholder:text-gray-200"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateBuyListing;
