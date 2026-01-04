import React, { useState, useEffect } from "react";
import { useRouter } from "../router/RouteStack";
import {
    ChevronLeft,
    Camera,
    ChevronRight,
    Info,
    BadgeDollarSign,
    Tag,
    Shirt,
    Palette,
    Repeat,
    Image as ImageIcon,
    X,
    Sparkles,
    FileText,
    Calendar,
    CheckCircle
} from "lucide-react";

const CreateSecondHandListing = () => {
    const { pop, currentRoute } = useRouter();
    const [publishType, setPublishType] = useState('sell'); // 'sell' | 'seek' | 'exchange' | 'commission'
    const [commissionType, setCommissionType] = useState('request'); // 'request' (约) | 'offer' (接)
    const [category, setCategory] = useState("goods"); // goods | bjd | service (auto-set)
    const [images, setImages] = useState([]);
    
    // Unified Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",       // Used for Price or Budget
        condition: "",
        // Specific fields
        brand: "",     
        size: "",      
        skin: "",      
        ip: "",        
        role: "",      
        duration: "",  
        isUrgent: false, // For 'seek' mode
        wantItem: "",    // For 'exchange' mode
        originalPrice: "", // For 'sell' mode discount calculation
        deadline: "",      // For 'commission' mode
        tags: []         // Transaction tags: 'free_ship', 'negotiable', 'no_return'
    });

    // Handle Initial Data
    useEffect(() => {
        if (currentRoute.params?.initialData) {
            const data = currentRoute.params.initialData;
            if (data.type) setPublishType(data.type);
            if (data.category) setCategory(data.category);
            
            setFormData(prev => ({
                ...prev,
                ...data
            }));
        }
    }, [currentRoute.params]);

    const isSeekMode = publishType === 'seek';
    const isExchangeMode = publishType === 'exchange';
    const isCommissionMode = publishType === 'commission';

    const CATEGORIES = [
        { id: "goods", label: "二次元周边", icon: <Tag size={20} />, desc: "吧唧/立牌/挂件" },
        { id: "bjd", label: "BJD/特体", icon: <Shirt size={20} />, desc: "娃娃/衣物/配件" },
    ];

    // Auto-set Category logic
    useEffect(() => {
        if (isCommissionMode) {
            setCategory('service');
        } else {
             // If switching back from commission, default to goods if currently service
             if (category === 'service') setCategory('goods');
        }
    }, [publishType]);

    // Handle Auto-Save Drafts
    useEffect(() => {
        // Boostrap data from route
        if (currentRoute.params?.initialData) {
            return; // Don't load draft if explicitly passing data
        }

        // Load Draft
        const savedDraft = localStorage.getItem('listing_draft');
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                if (parsed.updatedAt && (Date.now() - parsed.updatedAt < 24 * 60 * 60 * 1000)) {
                    setFormData(prev => ({
                        ...prev,
                        ...parsed.data
                    }));
                    if (parsed.publishType) setPublishType(parsed.publishType);
                    if (parsed.category) setCategory(parsed.category);
                }
            } catch (e) {
                console.error("Failed to load draft");
            }
        }
    }, [currentRoute.params]);

    // Save Draft on Change
    useEffect(() => {
        const timer = setTimeout(() => {
            const draft = {
                data: formData,
                publishType,
                category,
                updatedAt: Date.now()
            };
            localStorage.setItem('listing_draft', JSON.stringify(draft));
        }, 1000);
        return () => clearTimeout(timer);
    }, [formData, publishType, category]);

    // Smart Paste Logic
    const handleSmartPaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (!text) return;

            // Simple heuristics
            let updates = {};
            
            // Extract Price
            const priceMatch = text.match(/(\d+)\s*(r|元|￥)/i);
            if (priceMatch && priceMatch[1]) {
                updates.price = priceMatch[1];
            }

            // Extract Size (Basic)
            const sizeMatch = text.match(/(3分|4分|6分|叔|sd|msd|yosd)/i);
            if (sizeMatch && sizeMatch[0]) {
                updates.size = sizeMatch[0];
            }

            // Extract Brand (Basic)
            const brandMatch = text.match(/(AS|Angell\s*Studio|龙魂|Loongsoul|鬼契|Spirit|Doll\s*Zone|DZ)/i);
            if (brandMatch && brandMatch[0]) {
                updates.brand = brandMatch[0];
            }

            // If we found anything
            if (Object.keys(updates).length > 0) {
                setFormData(prev => ({
                    ...prev,
                    ...updates,
                    description: prev.description ? prev.description + "\n" + text : text
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    description: prev.description ? prev.description + "\n" + text : text
                }));
            }
        } catch (err) {
            console.error("Clipboard access failed", err);
            // Fallback for demo
            alert("请允许剪贴板权限或手动粘贴");
        }
    };

    // Quick Chips Data
    const QUICK_CHIPS = {
        size: ["3分", "4分", "6分", "8分", "叔", "特体"],
        condition: ["全新", "仅拆", "99新", "95新", "8成新", "战损"] 
    };

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

    const insertTemplate = () => {
        const template = `【物品名称】：${formData.title || ''}\n【入手渠道】：\n【成色/瑕疵】：${formData.condition || ''}\n【包含物品】：\n【发货方式】：`;
        setFormData(prev => ({
            ...prev,
            description: prev.description ? prev.description + "\n" + template : template
        }));
    };

    const toggleTag = (tag) => {
        setFormData(prev => {
            const tags = prev.tags || [];
            if (tags.includes(tag)) {
                return { ...prev, tags: tags.filter(t => t !== tag) };
            } else {
                return { ...prev, tags: [...tags, tag] };
            }
        });
    };

    const getThemeConfig = () => {
        if (isExchangeMode) return {
            gradient: 'from-fuchsia-50 to-purple-50',
            text: 'text-purple-600',
            textLight: 'text-purple-400',
            bg: 'bg-purple-50',
            bgDark: 'bg-purple-100',
            border: 'border-purple-200',
            ring: 'ring-purple-200',
            btn: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
            shadow: 'shadow-purple-200/50',
            icon: 'purple'
        };
        if (isSeekMode) return {
            gradient: 'from-blue-50 to-indigo-50',
            text: 'text-blue-600',
            textLight: 'text-blue-400',
            bg: 'bg-blue-50',
            bgDark: 'bg-blue-100',
            border: 'border-blue-200',
            ring: 'ring-blue-200',
            btn: 'bg-gradient-to-r from-blue-500 to-indigo-500',
            shadow: 'shadow-blue-200/50',
            icon: 'blue'
        };
        if (isCommissionMode) return {
            gradient: 'from-teal-50 to-cyan-50',
            text: 'text-teal-600',
            textLight: 'text-teal-400',
            bg: 'bg-teal-50',
            bgDark: 'bg-teal-100',
            border: 'border-teal-200',
            ring: 'ring-teal-200',
            btn: 'bg-gradient-to-r from-teal-500 to-cyan-500',
            shadow: 'shadow-teal-200/50',
            icon: 'teal'
        };
        return {
            gradient: 'from-rose-50 to-orange-50',
            text: 'text-rose-600',
            textLight: 'text-rose-400',
            bg: 'bg-rose-50',
            bgDark: 'bg-rose-100',
            border: 'border-rose-200',
            ring: 'ring-rose-200',
            btn: 'bg-gradient-to-r from-rose-500 to-orange-500',
            shadow: 'shadow-rose-200/50',
            icon: 'rose'
        };
    };
    const theme = getThemeConfig();

    const handlePublish = () => {
        // 1. Validation
        if (!formData.title) {
            alert("请填写标题");
            return;
        }
        if (!isExchangeMode && !formData.price) {
            alert("请填写价格/预算");
            return;
        }

        // 2. Construct Item
        const newItem = {
            id: Date.now(),
            type: isCommissionMode ? 'service' : (isExchangeMode ? 'exchange' : (category === 'bjd' ? 'bjd' : 'goods')),
            title: formData.title,
            price: formData.price,
            originalPrice: formData.originalPrice,
            image: "/images/bjd.png", // Mock Image
            seller: {
                name: "我",
                avatar: "bg-gray-800",
                credit: "极好"
            },
            tags: [
                formData.condition,
                formData.brand,
                formData.ip,
                formData.role, 
                ...(formData.tags || [])
            ].filter(Boolean),
            likes: 0,
            time: "刚刚",
            condition: isCommissionMode ? (commissionType === 'offer' ? '接单' : '约稿') : (formData.condition || '二手'),
            publishType: publishType // Metadata
        };

        // 3. Save to LocalStorage
        const existing = JSON.parse(localStorage.getItem('user_listings') || '[]');
        const updated = [newItem, ...existing];
        localStorage.setItem('user_listings', JSON.stringify(updated));

        // 4. Clear Draft
        localStorage.removeItem('listing_draft');

        // 5. Success Feedback & Navigation
        alert("发布成功！"); // In a real app, use a Toast
        pop(); // Go back to feed
    };

    return (
        <div className={`min-h-screen flex flex-col transition-all duration-500 bg-gradient-to-br ${theme.gradient}`}>
            {/* Header */}
            <div className={`px-4 h-14 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-white/20`}>
                <button onClick={() => pop()} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5 transition-colors -ml-2">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-lg text-gray-800 tracking-tight">
                        {isExchangeMode ? '发布交换' : (isSeekMode ? '发布需求' : (isCommissionMode ? '发布服务/约稿' : '发布闲置'))}
                    </span>
                </div>
                <button 
                    onClick={handlePublish}
                    className={`font-bold text-sm px-4 py-1.5 rounded-full bg-white/50 backdrop-blur border border-white/50 shadow-sm ${theme.text} active:scale-95 transition-transform`}
                >
                    发布
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
                {/* Type Toggle */}
                <div className="px-4 py-3">
                    <div className="bg-white/60 p-1.5 rounded-2xl flex gap-1 shadow-sm backdrop-blur-sm border border-white/40">
                        {[
                            { id: 'sell', label: '我要出', sub: 'Sell' },
                            { id: 'seek', label: '我要收', sub: 'Buy' },
                            { id: 'exchange', label: '我要换', sub: 'Swap' },
                            { id: 'commission', label: '约稿', sub: 'Service' }
                        ].map((type) => (
                            <button 
                                key={type.id}
                                onClick={() => setPublishType(type.id)}
                                className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex flex-col items-center leading-none gap-0.5 ${
                                    publishType === type.id 
                                    ? 'bg-white shadow-md text-gray-800 scale-[1.02]' 
                                    : 'text-gray-400 hover:bg-white/40'
                                }`}
                            >
                                <span>{type.label}</span>
                                <span className="text-[10px] font-medium opacity-60 font-outfit uppercase">{type.sub}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Selection - Only for Non-Commission Modes */}
                {!isCommissionMode && (
                <div className="px-4 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`relative py-3 px-2 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 overflow-hidden group ${
                                    category === cat.id
                                        ? `bg-white border-transparent ring-2 ${theme.ring} shadow-lg scale-[1.02]`
                                        : "bg-white/40 border-white/40 text-gray-400 hover:bg-white/60"
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                    category === cat.id ? theme.bg : 'bg-gray-100 group-hover:bg-white'
                                }`}>
                                    <div className={`transition-colors duration-300 ${category === cat.id ? theme.text : 'text-gray-400'}`}>
                                        {cat.icon}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className={`block text-xs font-bold mb-0.5 ${category === cat.id ? 'text-gray-800' : 'text-gray-500'}`}>
                                        {cat.label}
                                    </span>
                                    {category === cat.id && (
                                        <span className={`block text-[10px] scale-90 ${theme.textLight}`}>
                                            {cat.desc}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                )}

                {/* Commission Type Toggle */}
                {isCommissionMode && (
                     <div className="px-4 mb-4">
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
                     </div>
                )}

                {/* Image Upload */}
                <div className="px-4 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 border border-white/40 shadow-sm">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <button className={`w-24 h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all group shrink-0 ${theme.border} ${theme.bg}`}>
                                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm ${theme.text}`}>
                                    <Camera size={20} />
                                </div>
                                <span className={`text-[10px] font-bold ${theme.textLight}`}>
                                    添加图片
                                </span>
                            </button>
                            {/* Mock uploaded images */}
                            {[1].map(i => (
                                <div key={i} className="w-24 h-24 rounded-2xl bg-gray-100 shrink-0 relative overflow-hidden group border border-white/50">
                                     <img src={`/images/bjd.png`} className="w-full h-full object-cover" alt="preview" />
                                     <button className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={12} />
                                     </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2 px-1">
                            {isSeekMode 
                                ? "💡 上传参考图能让卖家更懂你的需求哦~" 
                                : (isExchangeMode ? "💡 请拍摄持有物的细节图，确保换物诚意~" : "💡 多角度拍摄宝贝细节，更有助于售出哦~")}
                        </p>
                    </div>
                </div>

                {/* Main Content Fields */}
                <div className="px-4 space-y-3 mb-4">
                    <div className="bg-white rounded-3xl p-1 shadow-sm border border-gray-100 relative">


                        {/* Smart Paste & Template Buttons */}
                        <div className="absolute top-3 right-3 z-10 flex gap-2">
                             <button 
                                onClick={insertTemplate}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-gray-600 shadow-sm active:scale-95 transition-all text-xs font-bold border border-gray-100`}
                            >
                                <FileText size={12} className="text-gray-400" />
                                模板
                            </button>
                            <button 
                                onClick={handleSmartPaste}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg active:scale-95 transition-all text-xs font-bold border border-white/20`}
                            >
                                <Sparkles size={12} className="text-yellow-300" />
                                智能识别
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder={
                                    isSeekMode
                                    ? "一句话描述需求 (e.g. 诚收AS华熙 / 求约三分古风妆)" 
                                    : (isExchangeMode ? "标题 (e.g. 【换】出AS华熙 求 龙魂盘古)" : (isCommissionMode ? (commissionType === 'offer' ? "服务标题 (e.g. 擅长古风/二次元妆面)" : "需求标题 (e.g. 诚约6分古风手作娘)") : "标题，品牌品类都是买家喜欢搜索的"))
                                }
                                className="w-full px-5 py-4 text-base font-bold bg-transparent outline-none placeholder:text-gray-300 placeholder:font-medium pr-24"
                            />
                            {formData.title && (
                                <button onClick={() => setFormData({...formData, title: ''})} className="absolute top-1/2 -translate-y-1/2 right-4 p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200">
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                        <div className="h-px bg-gray-50 mx-4" />
                        <div className="relative">
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder={
                                    isSeekMode
                                    ? "详细描述你的心理价位、成色要求、交易方式等..."
                                    : (isExchangeMode ? "描述一下宝贝的品牌型号、入手渠道、转手原因..." : "粘贴宝贝描述... (点击右上角智能识别试试～)")
                                }
                                className="w-full h-32 px-5 py-4 text-sm bg-transparent outline-none resize-none placeholder:text-gray-400 leading-relaxed scrollbar-hide"
                            ></textarea>
                             {formData.description && (
                                <button onClick={() => setFormData({...formData, description: ''})} className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 z-10">
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Chips for Condition */}
                {!isSeekMode && (
                <div className="px-4 mb-4">
                     <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {QUICK_CHIPS.condition.map((cond) => (
                            <button 
                                key={cond}
                                onClick={() => setFormData({...formData, condition: cond})}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                                    formData.condition === cond 
                                    ? `bg-gray-800 text-white border-gray-800 shadow-md transform scale-105` 
                                    : 'bg-white text-gray-400 border-gray-100'
                                }`}
                            >
                                {cond}
                            </button>
                        ))}
                     </div>
                </div>
                )}

                {/* Specific Fields & Price */}
                <div className="px-4 space-y-4">
                    {/* Exchange Specific: Want Item */}
                    {isExchangeMode && (
                        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-purple-100 shadow-sm">
                             <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-purple-700 flex items-center gap-2">
                                    <Repeat size={16} />
                                    想换什么?
                                </span>
                                <input 
                                    className="text-right text-sm outline-none placeholder:text-purple-300/70 bg-transparent text-purple-700 font-bold w-1/2"
                                    placeholder="如: 龙魂 盘古"
                                    value={formData.wantItem}
                                    onChange={(e) => setFormData({...formData, wantItem: e.target.value})}
                                />
                            </div>
                        </div>
                    )}

                    {/* Meta Fields */}
                    <div className="bg-white/60 backdrop-blur rounded-2xl overflow-hidden border border-white/40 animate-fade-in">
                         {/* Dynamic Fields based on Category */}
                         {category === 'bjd' && (
                            <>
                                    <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                                        <span className="text-sm text-gray-600 font-medium">品牌/社</span>
                                        <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: AS/龙魂" value={formData.brand} onFocus={() => setFormData({...formData, activeField: 'brand'})} onBlur={() => setTimeout(() => setFormData(p=>({...p, activeField: null})), 200)} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
                                    </div>
                                    {/* Brand Suggestions: Show if empty OR focused */}
                                    {(!formData.brand || formData.activeField === 'brand') && (
                                        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                            {CASCADING_DATA.brands.map(b => (
                                                <button key={b} onClick={() => setFormData({...formData, brand: b.split(' ')[0]})} className="px-2 py-1 bg-gray-50 rounded-lg text-[10px] text-gray-600 border border-gray-100 whitespace-nowrap">
                                                    {b}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 font-medium">尺寸/配身</span>
                                        <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: 3分/4分" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
                                    </div>
                                    {/* Quick Chips for Size */}
                                    <div className="px-4 pb-3 flex gap-2 flex-wrap animate-fade-in">
                                        {QUICK_CHIPS.size.map((s) => (
                                            <button 
                                                key={s}
                                                onClick={() => setFormData({...formData, size: s})}
                                                className={`px-2 py-1 rounded bg-white/50 text-[10px] font-bold border transition-colors ${
                                                    formData.size === s ? theme.text + ' ' + theme.border : 'text-gray-400 border-transparent hover:bg-white'
                                                }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                            </>
                        )}
                        {category === 'goods' && (
                             <>
                                <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                                    <span className="text-sm text-gray-600 font-medium">IP/作品名</span>
                                    <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: 原神" value={formData.ip} onFocus={() => setFormData({...formData, activeField: 'ip'})} onBlur={() => setTimeout(() => setFormData(p=>({...p, activeField: null})), 200)} onChange={(e) => setFormData({...formData, ip: e.target.value})} />
                                </div>
                                 {/* IP Suggestions: Show if empty OR focused */}
                                 {(!formData.ip || formData.activeField === 'ip') && (
                                    <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                        {CASCADING_DATA.ips.map(ipData => (
                                            <button key={ipData.name} onClick={() => setFormData({...formData, ip: ipData.name})} className="px-2 py-1 bg-gray-50 rounded-lg text-[10px] text-gray-600 border border-gray-100 whitespace-nowrap">
                                                {ipData.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                                    <span className="text-sm text-gray-600 font-medium">角色名</span>
                                    <input className="text-right text-sm outline-none bg-transparent placeholder:text-gray-300 font-bold text-gray-700" placeholder="如: 散兵" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                                </div>
                                {/* Role Suggestions: Cascading */}
                                {formData.ip && CASCADING_DATA.ips.find(i => i.name === formData.ip) && (
                                     <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                        <div className="px-1 py-1 text-[10px] text-blue-500 font-bold whitespace-nowrap flex items-center">
                                            ✨ 推荐:
                                        </div>
                                        {CASCADING_DATA.ips.find(i => i.name === formData.ip).roles.map(r => (
                                            <button key={r} onClick={() => setFormData({...formData, role: r})} className="px-2 py-1 bg-blue-50 rounded-lg text-[10px] text-blue-600 border border-blue-100 whitespace-nowrap">
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                        
                        {/* Price Row */}
                        <div className="flex items-center justify-between p-4 bg-white/40">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.bg}`}>
                                    <BadgeDollarSign size={16} className={theme.text} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">
                                    {isExchangeMode ? '补差价/估值' : (isSeekMode ? '心理预算' : (isCommissionMode ? '预算/价格' : '价格'))}
                                </span>
                                {/* Discount Badge */}
                                {publishType === 'sell' && formData.originalPrice && formData.price && Number(formData.originalPrice) > Number(formData.price) && (
                                    <span className="text-[10px] bg-red-50 text-red-500 border border-red-100 px-1.5 py-0.5 rounded font-bold ml-1 animate-pulse">
                                        {(Number(formData.price) / Number(formData.originalPrice) * 10).toFixed(1)}折
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Commission Deadline */}
                                {isCommissionMode && (
                                    <div className="flex items-center bg-white/50 rounded-lg px-2 py-1 border border-teal-100">
                                         <Calendar size={14} className="text-teal-400 mr-1" />
                                         <input 
                                            className="w-16 bg-transparent text-xs text-teal-600 outline-none placeholder:text-teal-300"
                                            placeholder="工期/截稿"
                                            value={formData.deadline}
                                            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                                         />
                                    </div>
                                )}

                                {/* Sell Mode: Original Price */}
                                {publishType === 'sell' && (
                                     <div className="flex flex-col items-end mr-1">
                                         <span className="text-[9px] text-gray-300 line-through">
                                             ¥{formData.originalPrice || '原价'}
                                         </span>
                                         <input 
                                            className="text-right text-[10px] w-12 bg-transparent outline-none text-gray-400 placeholder:text-gray-200"
                                            placeholder="原价"
                                            value={formData.originalPrice}
                                            onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                                         />
                                     </div>
                                )}

                                <div className="flex items-center gap-1">
                                    <span className={`text-xs font-bold ${theme.text}`}>¥</span>
                                    <input 
                                        className={`text-right text-xl outline-none placeholder:text-gray-200 bg-transparent font-outfit font-bold w-24 ${theme.text}`}
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-4 text-[10px] text-gray-400 text-center leading-relaxed opacity-70">
                        发布即表示同意 <span className="underline">《平台交易规则》</span>
                        {/* Draft Status Indicator */}
                        <div className="mt-2 text-[9px] text-gray-300">
                            内容将自动保存至草稿箱
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSecondHandListing;
