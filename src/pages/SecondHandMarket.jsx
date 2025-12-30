import React, { useState } from "react";
import { useRouter } from "../router/RouteStack";
import {
    Search,
    Filter,
    Plus,
    Heart,
    Clock,
    ChevronDown,
} from "lucide-react";

const SecondHandMarket = () => {
    const { push } = useRouter();
    const [activeCategory, setActiveCategory] = useState("all");

    const CATEGORIES = [
        { id: "all", label: "全部" },
        { id: "badge", label: "徽章(吧唧)" },
        { id: "stand", label: "立牌" },
        { id: "plush", label: "棉花娃" },
        { id: "card", label: "拍立得/纸片" },
        { id: "other", label: "其他周边" },
    ];

    const MOCK_ITEMS = [
        {
            id: 101,
            title: "【出】原神 散兵 模玩熊特典 色纸",
            price: 45.0,
            originalPrice: 60.0,
            image: "bg-blue-100",
            seller: {
                name: "吃土少女A",
                avatar: "bg-pink-200",
                credit: "极好",
            },
            tags: ["原神", "散兵", "全新未拆"],
            likes: 12,
            time: "10分钟前",
            condition: "全新",
        },
        {
            id: 102,
            title: "【通过】恋与制作人 李泽言 生日 吧唧 复数出",
            price: 18.0,
            originalPrice: 25.0,
            image: "bg-indigo-100",
            seller: {
                name: "李夫人",
                avatar: "bg-purple-200",
                credit: "优秀",
            },
            tags: ["恋与制作人", "李泽言", "仅拆封"],
            likes: 45,
            time: "25分钟前",
            condition: "99新",
        },
        {
            id: 103,
            title: "【退坑出】咒术回战 五条悟 趴趴玩偶",
            price: 120.0,
            originalPrice: 180.0,
            image: "bg-gray-200",
            seller: {
                name: "咒回退坑中",
                avatar: "bg-teal-200",
                credit: "良好",
            },
            tags: ["咒术回战", "五条悟", "有吊牌"],
            likes: 89,
            time: "1小时前",
            condition: "95新",
        },
        {
            id: 104,
            title: "光与夜之恋 查理苏 婚卡 拍立得",
            price: 8.0,
            originalPrice: 15.0,
            image: "bg-yellow-100",
            seller: {
                name: "未婚妻",
                avatar: "bg-rose-200",
                credit: "极好",
            },
            tags: ["光与夜之恋", "查理苏"],
            likes: 5,
            time: "2小时前",
            condition: "全新",
        },
    ];

    return (
        <div className="pb-24 bg-gray-50 min-h-screen flex flex-col font-sans">
            {/* Header with Glassmorphism */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border-b border-white/50">
                <div className="flex-1 bg-gray-100/80 rounded-full flex items-center px-4 py-2.5 gap-2 border border-transparent focus-within:bg-white focus-within:border-primary-300 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜好价吃谷... (e.g. 吧唧/立牌)"
                        className="bg-transparent text-sm w-full outline-none placeholder:text-gray-400 text-gray-700"
                    />
                </div>
                <button
                    onClick={() => push("CreateSecondHandListing")}
                    className="text-white font-bold text-sm bg-gradient-to-r from-primary-500 to-primary-400 px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary-200 active:scale-95 transition-transform"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>卖闲置</span>
                </button>
            </div>

            {/* Category Filter */}
            <div className="bg-white pb-4 px-4 pt-2">
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${activeCategory === cat.id
                                    ? "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105"
                                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-3 text-xs font-medium text-gray-500 bg-gray-50/50 p-2 rounded-lg">
                    <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                        <span>综合排序</span>
                        <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                        <span>价格</span>
                        <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                        <span>成色</span>
                        <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-1 text-primary-600 px-2 py-1 bg-primary-50 rounded transition-colors">
                        <Filter size={14} />
                        <span>筛选</span>
                    </button>
                </div>
            </div>

            {/* Product Grid - Masonry-ish feel */}
            <div className="p-3 grid grid-cols-2 gap-3">
                {MOCK_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => push("ProductDetail", { id: item.id, type: "secondhand" })}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className={`aspect-square ${item.image} relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-md flex items-center gap-1 font-medium">
                                <Clock size={10} />
                                {item.time}
                            </div>
                            {/* Condition Tag */}
                            <div className="absolute bottom-2 left-2">
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/90 text-primary-600 font-bold backdrop-blur shadow-sm">
                                    {item.condition}
                                </span>
                            </div>
                        </div>

                        {/* Info Content */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                                {item.title}
                            </h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-2.5">
                                {item.tags.slice(0, 2).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Price Row */}
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-xs text-rose-500 font-bold">¥</span>
                                <span className="text-lg text-rose-500 font-extrabold font-outfit">{item.price}</span>
                                <span className="text-[10px] text-gray-300 line-through ml-1">¥{item.originalPrice}</span>
                            </div>

                            {/* Seller Row */}
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                <div className={`w-5 h-5 rounded-full ${item.seller.avatar} border border-white shadow-sm shrink-0`} />
                                <span className="text-xs text-gray-500 truncate flex-1 scale-90 origin-left">{item.seller.name}</span>
                                <div className="flex items-center gap-0.5 text-gray-400 group-hover:text-rose-400 transition-colors">
                                    <Heart size={12} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-[10px]">{item.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecondHandMarket;
