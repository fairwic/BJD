import React, { useState, useEffect } from "react";
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
    const [sortBy, setSortBy] = useState("default"); // default, price_asc, price_desc, likes
    const [filterCondition, setFilterCondition] = useState("all"); // all, new, used

    const CATEGORIES = [
        { id: "all", label: "全部" },
        { id: "swap", label: "✨ 交换/置换" }, 
        { id: "bjd", label: "BJD/特体" },
        { id: "commission", label: "约稿/劳务" },
        { id: "badge", label: "徽章(吧唧)" },
        { id: "stand", label: "立牌" },
        { id: "plush", label: "棉花娃" },
        { id: "card", label: "拍立得/纸片" },
        { id: "other", label: "其他周边" },
    ];

    const MOCK_ITEMS = [
        {
            id: 101,
            type: "goods",
            title: "【出】原神 散兵 模玩熊特典 色纸",
            price: 45.0,
            originalPrice: 60.0,
            image: "/images/stand.png", // Using Acrylic Stand image as placeholder for general goods
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
            id: 501, 
            type: "exchange",
            title: "【换】出原神散兵特典色纸 求万叶色纸/其他",
            price: "只换不售", 
            originalPrice: null,
            image: "/images/badge.png", // Using Badge image for swap item
            seller: {
                name: "吃土求回血",
                avatar: "bg-orange-200",
                credit: "极好",
            },
            tags: ["换物", "原神", "散兵"],
            likes: 5,
            time: "15分钟前",
            condition: "仅换",
        },
        {
            id: 102,
            type: "goods",
            title: "【通过】恋与制作人 李泽言 生日 吧唧 复数出",
            price: 18.0,
            originalPrice: 25.0,
            image: "/images/badge.png",
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
            id: 201,
            type: "bjd",
            title: "【AS华熙】自养4分男娃 普肌 单头/整娃",
            price: 850.0,
            originalPrice: 1200.0,
            image: "/images/bjd.png",
            seller: {
                name: "养娃大户",
                avatar: "bg-amber-200",
                credit: "极好",
            },
            tags: ["AS", "华熙", "4分"],
            likes: 156,
            time: "2小时前",
            condition: "85新",
        },
        {
            id: 301,
            type: "service",
            title: "【妆面接单】BJD/二次元面妆 仿官妆 自由妆",
            price: "200起",
            image: "/images/commission.png",
            seller: {
                name: "云墨妆坊",
                avatar: "bg-rose-300",
                credit: "认证妆师",
            },
            tags: ["妆面", "BJD", "接单中"],
            likes: 342,
            time: "刚刚",
            condition: "服务",
        },
        {
            id: 302,
            type: "service",
            title: "【手作】痛包扎板/排版接单 独家设计",
            price: "50起",
            image: "/images/plush.png", // Using Plush image as placeholder for handmade
            seller: {
                name: "手作娘",
                avatar: "bg-teal-300",
                credit: "优秀",
            },
            tags: ["痛包", "排版", "手工"],
            likes: 88,
            time: "5小时前",
            condition: "服务",
        },
    ];
    
    // State for Merged Items
    const [allItems, setAllItems] = useState(MOCK_ITEMS);

    // Load User Listings
    useEffect(() => {
        const userListings = JSON.parse(localStorage.getItem('user_listings') || '[]');
        if (userListings.length > 0) {
            setAllItems([...userListings, ...MOCK_ITEMS]);
        }
    }, []);

    // Filter Logic
    const filteredItems = allItems.filter(item => {
        // 1. Category Filter
        if (activeCategory !== "all") {
            if (activeCategory === "bjd") { if (item.type !== "bjd") return false; }
            else if (activeCategory === "commission") { if (item.type !== "service") return false; }
            else if (activeCategory === "swap") { if (item.type !== "exchange") return false; }
            else if (activeCategory === "other") { if (["bjd", "service", "exchange"].includes(item.type)) return false; } // Simplified 'other' logic
            else if (item.type !== "goods") return false; // Default to goods for specific categories like 'badge', 'stand' etc (mock simplified)
        }
        
        // 2. Condition Filter
        if (filterCondition !== "all") {
             if (filterCondition === "new" && !item.condition.includes("全新")) return false; 
             if (filterCondition === "used" && item.condition.includes("全新")) return false;
        }

        return true;
    }).sort((a, b) => {
        // 3. Sorting
        if (sortBy === "price_asc") {
            return parseFloat(a.price) - parseFloat(b.price);
        } else if (sortBy === "price_desc") {
            return parseFloat(b.price) - parseFloat(a.price);
        } else if (sortBy === "likes") {
            return b.likes - a.likes;
        }
        return 0; // Default (Time/Mock Order)
    });

    const togglePriceSort = () => {
        if (sortBy === "price_asc") setSortBy("price_desc");
        else setSortBy("price_asc");
    };

    return (
        <div className="pb-24 bg-gray-50 min-h-screen flex flex-col font-sans">
            {/* Header with Glassmorphism */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border-b border-white/50">
                <div className="flex-1 bg-gray-100/80 rounded-full flex items-center px-4 py-2.5 gap-2 border border-transparent focus-within:bg-white focus-within:border-primary-300 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜好价/找劳斯... (e.g. BJD/妆娘)"
                        className="bg-transparent text-sm w-full outline-none placeholder:text-gray-400 text-gray-700"
                    />
                </div>
                <button
                    onClick={() => push("CreateSecondHandListing")}
                    className="text-white font-bold text-sm bg-gradient-to-r from-primary-500 to-primary-400 px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary-200 active:scale-95 transition-transform"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>发布</span>
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
                    <button 
                        onClick={() => setSortBy("default")}
                        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${sortBy === 'default' ? 'text-gray-900 font-bold' : 'hover:bg-gray-100'}`}
                    >
                        <span>综合排序</span>
                        <ChevronDown size={14} />
                    </button>
                    <button 
                        onClick={togglePriceSort}
                        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${sortBy.includes('price') ? 'text-gray-900 font-bold' : 'hover:bg-gray-100'}`}
                    >
                        <span>价格</span>
                        <div className="flex flex-col -space-y-1">
                            {sortBy === 'price_asc' ? <span className="text-[8px] text-gray-900">▲</span> : <span className="text-[8px] text-gray-300">▲</span>}
                            {sortBy === 'price_desc' ? <span className="text-[8px] text-gray-900">▼</span> : <span className="text-[8px] text-gray-300">▼</span>}
                        </div>
                    </button>
                    <button 
                        onClick={() => setFilterCondition(filterCondition === 'all' ? 'new' : 'all')}
                        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${filterCondition !== 'all' ? 'text-gray-900 font-bold' : 'hover:bg-gray-100'}`}
                    >
                        <span>{filterCondition === 'new' ? '全新/仅拆' : (activeCategory === "commission" ? "类型" : "成色")}</span>
                        <Filter size={12} />
                    </button>
                    <button 
                         onClick={() => setSortBy("likes")}
                        className={`flex items-center gap-1 ${sortBy === 'likes' ? 'text-primary-600 font-bold bg-primary-50' : 'text-gray-500 bg-transparent'} px-2 py-1 rounded transition-colors`}
                    >
                        <Heart size={14} fill={sortBy === 'likes' ? "currentColor" : "none"} />
                         <span>热度</span>
                    </button>
                </div>
            </div>

            {/* Product Grid - Masonry-ish feel */}
            <div className="p-3 grid grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => push("ProductDetail", { id: item.id, type: item.type === "service" ? "service" : "secondhand" })}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="aspect-square relative overflow-hidden bg-gray-100">
                             <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-md flex items-center gap-1 font-medium z-10">
                                <Clock size={10} />
                                {item.time}
                            </div>
                            {/* Condition Tag */}
                            <div className="absolute bottom-2 left-2 z-10">
                                <span className={`text-[10px] px-2 py-0.5 rounded-md backdrop-blur shadow-sm font-bold ${
                                    item.type === "service" 
                                    ? "bg-purple-500/90 text-white"
                                    : "bg-white/90 text-primary-600"
                                }`}>
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
                                {item.type === 'exchange' ? (
                                     <span className="text-sm text-purple-600 font-bold">{item.price}</span>
                                ) : (
                                    <>
                                        <span className="text-xs text-rose-500 font-bold">¥</span>
                                        <span className="text-lg text-rose-500 font-extrabold font-outfit">{item.price}</span>
                                    </>
                                )}
                                {item.originalPrice && (
                                    <span className="text-[10px] text-gray-300 line-through ml-1">¥{item.originalPrice}</span>
                                )}
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
