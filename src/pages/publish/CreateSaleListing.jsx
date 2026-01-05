
import React, { useState, useEffect } from "react";
import { useRouter } from "../../router/RouteStack";
import { ChevronLeft, Camera, X, BadgeDollarSign, Tag, Shirt, Sparkles, FileText, Info } from "lucide-react";

const CreateSaleListing = () => {
    const { pop } = useRouter();
    const [category, setCategory] = useState("goods");
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        originalPrice: "",
        condition: "全新",
        brand: "",
        size: "",
        ip: "",
        role: "",
        tags: []
    });

    const CASCADING_DATA = {
        ips: [
            { name: "原神", roles: ["散兵", "钟离", "那维莱特", "芙宁娜", "雷电将军", "魈"] },
            { name: "恋与深空", roles: ["沈星回", "黎深", "祁煜", "秦彻"] },
            { name: "排球少年", roles: ["日向翔阳", "影山飞雄", "及川彻", "孤爪研磨"] },
            { name: "明日方舟", roles: ["阿米娅", "陈", "银灰", "史尔特尔"] },
            { name: "初音未来", roles: ["Miku", "镜音双子", "巡音"] }
        ],
        brands: [
            "AS (Angell Studio)", "龙魂 (Loongsoul)", "DZ (Doll Zone)", "GEM", "Telesthesia", "Doll Chateau"
        ]
    };

    const QUICK_CHIPS = {
        size: ["3分", "4分", "6分", "8分", "叔", "特体"],
        condition: ["全新", "仅拆", "99新", "95新", "8成新", "战损"] 
    };

    const theme = {
        gradient: 'from-rose-50 to-orange-50',
        text: 'text-rose-600',
        bg: 'bg-rose-50',
        btn: 'bg-gradient-to-r from-rose-500 to-orange-500',
    };

    const insertTemplate = () => {
        const template = `【物品名称】：${formData.title || ''}\n【入手渠道】：\n【成色/瑕疵】：${formData.condition || ''}\n【包含物品】：\n【发货方式】：`;
        setFormData(prev => ({
            ...prev,
            description: prev.description ? prev.description + "\n" + template : template
        }));
    };

    const handleSmartPaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (!text) return;
            // Simple heuristics
            let updates = {};
            // Extract Price
            const priceMatch = text.match(/(\\d+)\\s*(r|元|￥)/i);
            if (priceMatch && priceMatch[1]) updates.price = priceMatch[1];
            // If we found anything
            if (Object.keys(updates).length > 0) {
                setFormData(prev => ({ ...prev, ...updates, description: prev.description ? prev.description + "\n" + text : text }));
            } else {
                setFormData(prev => ({ ...prev, description: prev.description ? prev.description + "\n" + text : text }));
            }
        } catch (err) {
            console.error("Clipboard access failed", err);
            alert("请允许剪贴板权限或手动粘贴");
        }
    };

    const handlePublish = () => {
        if (!formData.title || !formData.price) return alert("请填写完整信息");
        // Logic to save/publish
        alert("发布闲置成功！");
        pop();
    };

    return (
        <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.gradient}`}>
             {/* Header */}
             <div className="px-4 h-14 flex items-center justify-between sticky top-0 z-30 bg-white/70 backdrop-blur-md">
                <button onClick={() => pop()} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <span className="font-bold text-lg text-gray-800">发布闲置</span>
                <div className="w-10" /> {/* Spacer to balance title */}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Image Upload */}
                <div className="bg-white/60 backdrop-blur rounded-3xl p-4 border border-white/50 shadow-sm">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                         <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50 flex flex-col items-center justify-center gap-2 shrink-0">
                            <Camera size={20} className="text-rose-400" />
                            <span className="text-[10px] font-bold text-rose-400">添加图片</span>
                         </button>
                    </div>
                </div>

                {/* Main Fields */}
                <div className="bg-white rounded-3xl p-1 shadow-sm border border-gray-100 relative">
                    {/* Smart Paste & Template Buttons */}
                    <div className="absolute top-3 right-3 z-10 flex gap-2">
                            <button 
                            onClick={insertTemplate}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-gray-600 shadow-sm active:scale-95 transition-all text-xs font-bold border border-gray-100 z-20`}
                        >
                            <FileText size={12} className="text-gray-400" />
                            模板
                        </button>
                        <button 
                            onClick={handleSmartPaste}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg active:scale-95 transition-all text-xs font-bold border border-white/20 z-20`}
                        >
                            <Sparkles size={12} className="text-yellow-300" />
                            智能识别
                        </button>
                    </div>

                    <input 
                        className="w-full px-5 py-4 text-base font-bold bg-transparent outline-none" 
                        placeholder="标题 (e.g. 品牌/型号/新旧程度)"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                    <div className="h-px bg-gray-50 mx-4" />
                    <textarea 
                        className="w-full h-32 px-5 py-4 text-sm bg-transparent outline-none resize-none"
                        placeholder="描述宝贝细节，转手原因..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                
                {/* Condition Chips */}
                <div className="px-1">
                     <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
                        {QUICK_CHIPS.condition.map((cond) => (
                            <button 
                                key={cond}
                                onClick={() => setFormData({...formData, condition: cond})}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                                    formData.condition === cond 
                                    ? 'bg-gray-800 text-white border-gray-800 shadow-md' 
                                    : 'bg-white text-gray-400 border-gray-100'
                                }`}
                            >
                                {cond}
                            </button>
                        ))}
                     </div>
                </div>

                {/* Specific Fields (IP/Role/Brand/Size) */}
                <div className="bg-white rounded-3xl overflow-hidden border border-white/50 shadow-sm">
                    {/* Switch Category (Mock for logic simplicity: Goods vs Doll) */}
                    <div className="flex p-1 bg-gray-50 border-b border-gray-100">
                        <button onClick={() => setCategory('goods')} className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${category === 'goods' ? 'bg-white shadow text-rose-500' : 'text-gray-400'}`}>周边/小物</button>
                        <button onClick={() => setCategory('bjd')} className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${category === 'bjd' ? 'bg-white shadow text-rose-500' : 'text-gray-400'}`}>BJD/特体</button>
                    </div>

                    {category === 'goods' ? (
                       <>
                            <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                                <span className="text-sm text-gray-600 font-medium">IP/作品名</span>
                                <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: 原神" value={formData.ip} onChange={(e) => setFormData({...formData, ip: e.target.value})} />
                            </div>
                             {/* IP Suggestions */}
                             {!formData.ip && (
                                <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                    {CASCADING_DATA.ips.map(ipData => (
                                        <button key={ipData.name} onClick={() => setFormData({...formData, ip: ipData.name})} className="px-2 py-1 bg-gray-50 rounded-lg text-[10px] text-gray-600 border border-gray-100 whitespace-nowrap">
                                            {ipData.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center justify-between p-4">
                                <span className="text-sm text-gray-600 font-medium">角色名</span>
                                <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: 散兵" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                            </div>
                            {/* Role Suggestions */}
                            {formData.ip && CASCADING_DATA.ips.find(i => i.name === formData.ip) && (
                                 <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                    {CASCADING_DATA.ips.find(i => i.name === formData.ip).roles.map(r => (
                                        <button key={r} onClick={() => setFormData({...formData, role: r})} className="px-2 py-1 bg-blue-50 rounded-lg text-[10px] text-blue-600 border border-blue-100 whitespace-nowrap">
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            )}
                       </>
                    ) : (
                        <>
                             <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                                <span className="text-sm text-gray-600 font-medium">品牌/社</span>
                                <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: AS/龙魂" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
                            </div>
                             <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                    {CASCADING_DATA.brands.map(b => (
                                        <button key={b} onClick={() => setFormData({...formData, brand: b.split(' ')[0]})} className="px-2 py-1 bg-gray-50 rounded-lg text-[10px] text-gray-600 border border-gray-100 whitespace-nowrap">
                                            {b}
                                        </button>
                                    ))}
                            </div>
                            <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                                <span className="text-sm text-gray-600 font-medium">尺寸/配身</span>
                                <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: 3分" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
                            </div>
                             <div className="px-4 pb-3 flex gap-2 flex-wrap animate-fade-in">
                                {QUICK_CHIPS.size.map((s) => (
                                    <button 
                                        key={s}
                                        onClick={() => setFormData({...formData, size: s})}
                                        className={`px-2 py-1 rounded bg-white/50 text-[10px] font-bold border transition-colors ${
                                            formData.size === s ? 'text-rose-600 border-rose-200' : 'text-gray-400 border-transparent hover:bg-white'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                
                {/* Price */}
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
                    <span className="font-bold text-gray-700 flex items-center gap-2">
                        <BadgeDollarSign size={18} className="text-rose-500" />
                        想卖多少钱
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-rose-600 font-bold">¥</span>
                        <input 
                            className="text-right text-xl font-bold text-rose-600 outline-none bg-transparent w-24 placeholder:text-gray-200"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 bg-white border-t border-gray-100 pb-safe z-50">
                <button 
                    onClick={handlePublish}
                    className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${theme.btn} shadow-rose-500/20`}
                >
                    立即发布
                </button>
            </div>
        </div>
    );
};
export default CreateSaleListing;
