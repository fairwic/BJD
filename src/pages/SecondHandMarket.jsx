import React, { useState, useEffect } from "react";
import { useRouter } from "../router/RouteStack";
import {
    Search,
    Filter,
    Plus,
    Heart,
    Clock,
    ChevronDown,
    Sparkles,
    Zap,
    Palette,
    X
} from "lucide-react";

import { useApp } from "../context/AppContext";
import SCRAPED_DATA from "../data/scraped_data.json";

const SecondHandMarket = () => {
    const { push } = useRouter();
    const { currentUser, savePreferences } = useApp();
    const [activeCategory, setActiveCategory] = useState("all");

    // Zone Logic
    // Simplify: User preferences now has 'zones' array. If not, fallback to single 'zone'.
    const [myZones, setMyZones] = useState(currentUser?.preferences?.zones || [currentUser?.preferences?.zone || 'guzi']);
    const [activeZone, setActiveZone] = useState(myZones[0]);
    const [isZoneDrawerOpen, setIsZoneDrawerOpen] = useState(false);

    // Sync activeZone if myZones changes (e.g. adding a new one)
    useEffect(() => {
        if (!myZones.includes(activeZone)) {
            setActiveZone(myZones[0]);
        }
    }, [myZones]);

    const handleAddZone = (newZone) => {
        if (!myZones.includes(newZone)) {
            const newZones = [...myZones, newZone];
            setMyZones(newZones);
            // Persist
            savePreferences({ ...currentUser.preferences, zones: newZones });
        }
        setActiveZone(newZone);
        setIsZoneDrawerOpen(false);
    };

    const handleRemoveZone = (zoneToRemove) => {
        if (myZones.length <= 1) return;
        const newZones = myZones.filter(z => z !== zoneToRemove);
        setMyZones(newZones);
        savePreferences({ ...currentUser.preferences, zones: newZones });
        if (activeZone === zoneToRemove) {
            setActiveZone(newZones[0]);
        }
    };

    const [sortBy, setSortBy] = useState("default"); // default, price_asc, price_desc, likes

    // ... (Filter Logic remains the same, omitted for brevity if unchanged, but I need to be careful with REPLACE)
    // Actually, I should just replace the top part and header carefully.



    // Advanced Filter State
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedIPs, setSelectedIPs] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // Quick Filter State (单选，用于快速过滤器的 IP/品牌)
    const [activeQuickFilter, setActiveQuickFilter] = useState(null);

    const GUZI_FILTER_DATA = {
        ips: SCRAPED_DATA['Japanese IP']?.map(i => i.name) || ["原神", "恋与深空", "排球少年", "明日方舟", "初音未来", "鬼灭之刃"],
        characters: ["散兵", "钟离", "纳西妲", "万叶", "影山飞雄", "日向翔阳", "五条悟", "炭治郎", "阿尼亚"],
        categories: ["吧唧", "立牌", "色纸", "痛包", "手办", "挂件", "棉花娃娃"],
        conditions: ["全新", "仅拆", "99新", "95新", "85新"],
    };

    const BJD_FILTER_DATA = {
        brands: SCRAPED_DATA['BJD Brand']?.map(b => b.name) || ["龙魂人形社", "DollZone", "Soom", "Volks"],
        sizes: ["3分", "4分", "6分", "8分", "叔", "特体", "大叔", "巨婴"],
        types: ["整娃", "单头", "素体", "娃衣", "眼珠", "假发"],
        conditions: ["全新", "仅拆", "99新", "95新", "85新", "战损"],
    };

    // 兼容旧代码
    const FILTER_DATA = {
        sizes: BJD_FILTER_DATA.sizes,
        conditions: activeZone === 'bjd' ? BJD_FILTER_DATA.conditions : GUZI_FILTER_DATA.conditions,
        ips: GUZI_FILTER_DATA.ips,
        brands: BJD_FILTER_DATA.brands
    };

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

    const BANNERS = [
        { id: 1, title: "春日祭 · 踏青季", sub: "BJD外拍装备9折起", bg: "bg-gradient-to-r from-pink-100 to-rose-100", text: "text-pink-600", icon: <Sparkles size={16} /> },
        { id: 2, title: "急出回血专区", sub: "好价捡漏 每日更新", bg: "bg-gradient-to-r from-blue-100 to-indigo-100", text: "text-blue-600", icon: <Zap size={16} /> },
        { id: 3, title: "约稿 · 自由妆", sub: "认证妆师 在线接单", bg: "bg-gradient-to-r from-teal-100 to-emerald-100", text: "text-teal-600", icon: <Palette size={16} /> },
    ];

    const MOCK_ITEMS = [
        // ========== 谷子类商品 ==========
        { id: 101, type: "goods", title: "【出】原神 散兵 模玩熊特典 色纸", price: 45.0, originalPrice: 60.0, image: "/images/stand.png", seller: { name: "吃土少女A", avatar: "bg-pink-200", credit: "极好" }, tags: ["原神", "散兵"], likes: 12, time: "10分钟前", condition: "全新" },
        { id: 102, type: "goods", title: "【出】原神 钟离 Q版立牌", price: 35.0, originalPrice: 50.0, image: "/images/stand.png", seller: { name: "原批少女", avatar: "bg-amber-200", credit: "极好" }, tags: ["原神", "钟离"], likes: 28, time: "30分钟前", condition: "全新" },
        { id: 103, type: "goods", title: "【出】原神 纳西妲 官方吧唧", price: 25.0, originalPrice: 35.0, image: "/images/badge.png", seller: { name: "草神厨", avatar: "bg-green-200", credit: "优秀" }, tags: ["原神", "纳西妲"], likes: 45, time: "1小时前", condition: "99新" },
        { id: 104, type: "goods", title: "【出】鬼灭之刃 炭治郎 景品手办", price: 120.0, originalPrice: 180.0, image: "/images/stand.png", seller: { name: "鬼灭厨", avatar: "bg-red-200", credit: "极好" }, tags: ["鬼灭之刃", "炭治郎"], likes: 67, time: "2小时前", condition: "95新" },
        { id: 105, type: "goods", title: "【出】鬼灭之刃 �的豆子 吧唧套", price: 88.0, originalPrice: 120.0, image: "/images/badge.png", seller: { name: "豆子控", avatar: "bg-pink-300", credit: "优秀" }, tags: ["鬼灭之刃", "祢豆子"], likes: 89, time: "3小时前", condition: "全新" },
        { id: 106, type: "goods", title: "【出】排球少年 日向翔阳 生写真", price: 15.0, originalPrice: 20.0, image: "/images/badge.png", seller: { name: "乌野厨", avatar: "bg-orange-200", credit: "极好" }, tags: ["排球少年", "日向翔阳"], likes: 34, time: "4小时前", condition: "全新" },
        { id: 107, type: "goods", title: "【出】排球少年 影山飞雄 亚克力立牌", price: 55.0, originalPrice: 75.0, image: "/images/stand.png", seller: { name: "影山太太", avatar: "bg-blue-200", credit: "优秀" }, tags: ["排球少年", "影山飞雄"], likes: 56, time: "5小时前", condition: "99新" },
        { id: 108, type: "goods", title: "【出】咒术回战 五条悟 官方挂件", price: 68.0, originalPrice: 98.0, image: "/images/badge.png", seller: { name: "咒术厨", avatar: "bg-indigo-200", credit: "极好" }, tags: ["咒术回战", "五条悟"], likes: 123, time: "6小时前", condition: "全新" },
        { id: 109, type: "goods", title: "【出】文豪野犬 太宰治 痛包套装", price: 188.0, originalPrice: 280.0, image: "/images/plush.png", seller: { name: "太中厨", avatar: "bg-purple-200", credit: "优秀" }, tags: ["文豪野犬", "太宰治"], likes: 78, time: "1天前", condition: "95新" },
        { id: 110, type: "goods", title: "【出】间谍过家家 阿尼亚 棉花娃娃", price: 158.0, originalPrice: 220.0, image: "/images/plush.png", seller: { name: "阿尼亚厨", avatar: "bg-pink-100", credit: "极好" }, tags: ["间谍过家家", "阿尼亚"], likes: 234, time: "2天前", condition: "全新" },
        { id: 111, type: "exchange", title: "【换】出原神散兵色纸 求万叶/魈", price: "只换不售", originalPrice: null, image: "/images/badge.png", seller: { name: "吃土求回血", avatar: "bg-orange-200", credit: "极好" }, tags: ["换物", "原神", "散兵"], likes: 5, time: "15分钟前", condition: "仅换" },
        { id: 112, type: "goods", title: "【出】名侦探柯南 怪盗基德 周边套", price: 128.0, originalPrice: 168.0, image: "/images/stand.png", seller: { name: "基德厨", avatar: "bg-white", credit: "优秀" }, tags: ["名侦探柯南", "怪盗基德"], likes: 45, time: "3小时前", condition: "99新" },
        // ========== BJD 类商品 ==========
        { id: 201, type: "bjd", title: "【龙魂人形社】4分男娃头 自养 普肌", price: 850.0, originalPrice: 1200.0, image: "/images/bjd.png", seller: { name: "养娃大户", avatar: "bg-amber-200", credit: "极好" }, tags: ["龙魂人形社", "4分", "单头"], likes: 156, time: "2小时前", condition: "85新" },
        { id: 202, type: "bjd", title: "【DollZone】6分女娃整娃 白肌 官妆", price: 2800.0, originalPrice: 3500.0, image: "/images/bjd.png", seller: { name: "娃娘小A", avatar: "bg-rose-200", credit: "极好" }, tags: ["DollZone", "6分", "整娃"], likes: 89, time: "1天前", condition: "95新" },
        { id: 203, type: "bjd", title: "【Soom】叔体素体 蜜色肌 全新", price: 1500.0, originalPrice: 2000.0, image: "/images/bjd.png", seller: { name: "叔控", avatar: "bg-purple-200", credit: "优秀" }, tags: ["Soom", "叔", "素体"], likes: 67, time: "3天前", condition: "全新" },
        { id: 204, type: "bjd", title: "【Volks】SD13男 限定款 带官妆", price: 8500.0, originalPrice: 12000.0, image: "/images/bjd.png", seller: { name: "V厨", avatar: "bg-blue-200", credit: "极好" }, tags: ["Volks", "SD", "整娃"], likes: 234, time: "1周前", condition: "95新" },
        { id: 205, type: "bjd", title: "【龙魂人形社】3分女娃头 官妆 白肌", price: 650.0, originalPrice: 900.0, image: "/images/bjd.png", seller: { name: "龙娃控", avatar: "bg-pink-200", credit: "优秀" }, tags: ["龙魂人形社", "3分", "单头"], likes: 45, time: "5小时前", condition: "99新" },
        { id: 206, type: "bjd", title: "【RingDoll】成年男体 普肌 全套", price: 3200.0, originalPrice: 4200.0, image: "/images/bjd.png", seller: { name: "RD粉", avatar: "bg-gray-200", credit: "极好" }, tags: ["RingDoll", "叔", "素体"], likes: 78, time: "2天前", condition: "95新" },
        { id: 207, type: "bjd", title: "【Gem of Doll】4分娃衣套装 洛丽塔", price: 380.0, originalPrice: 520.0, image: "/images/bjd.png", seller: { name: "娃衣控", avatar: "bg-pink-300", credit: "优秀" }, tags: ["Gem of Doll", "4分", "娃衣"], likes: 56, time: "1天前", condition: "全新" },
        { id: 208, type: "bjd", title: "【Doll Chateau】8分萌娃 整娃出", price: 1800.0, originalPrice: 2500.0, image: "/images/bjd.png", seller: { name: "DC厨", avatar: "bg-yellow-200", credit: "极好" }, tags: ["Doll Chateau", "8分", "整娃"], likes: 123, time: "4天前", condition: "99新" },
        // ========== 服务类 ==========
        { id: 301, type: "service", title: "【妆面接单】BJD/二次元面妆 仿官妆 自由妆", price: "200起", image: "/images/commission.png", seller: { name: "云墨妆坊", avatar: "bg-rose-300", credit: "认证妆师" }, tags: ["妆面", "BJD", "接单中"], likes: 342, time: "刚刚", condition: "服务" },
        { id: 302, type: "service", title: "【手作】痛包扎板/排版接单 独家设计", price: "50起", image: "/images/plush.png", seller: { name: "手作娘", avatar: "bg-teal-300", credit: "优秀" }, tags: ["痛包", "排版", "手工"], likes: 88, time: "5小时前", condition: "服务" },
    ];

    // State for Merged Items
    const [allItems, setAllItems] = useState(MOCK_ITEMS);
    const [isLoading, setIsLoading] = useState(true);

    // Load User Listings with Simulation
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const userListings = JSON.parse(localStorage.getItem('user_listings') || '[]');
            if (userListings.length > 0) {
                setAllItems([...userListings, ...MOCK_ITEMS]);
            }
            setIsLoading(false);
        }, 800); // Simulate network
    }, []);

    // Filter Logic
    const filteredItems = allItems.filter(item => {
        // 0. Zone Filter
        if (activeZone === 'guzi') {
            // Guzi Zone: Exclude 'bjd' type, include 'goods', 'badge', etc.
            // Simplified logic: If it has BJD tags or type is BJD/Service(Doll), exclude.
            const isBJD = item.type === 'bjd' || item.tags.includes('BJD') || item.tags.includes('AS') || item.tags.includes('妆面');
            if (isBJD) return false;
        } else if (activeZone === 'bjd') {
            // BJD Zone: Only include BJD related
            const isBJD = item.type === 'bjd' || item.tags.includes('BJD') || item.tags.includes('AS') || item.tags.includes('妆面') || item.title.includes('娃');
            if (!isBJD) return false;
        }

        // 1. Category Filter
        if (activeCategory !== "all") {
            if (activeCategory === "bjd") { if (item.type !== "bjd") return false; }
            else if (activeCategory === "commission") { if (item.type !== "service") return false; }
            else if (activeCategory === "swap") { if (item.type !== "exchange") return false; }
            else if (activeCategory === "other") { if (["bjd", "service", "exchange"].includes(item.type)) return false; } // Simplified 'other' logic
            else if (item.type !== "goods") return false; // Default to goods for specific categories like 'badge', 'stand' etc (mock simplified)
        }

        // 2. Advanced Filters

        // Price Range
        if (priceRange.min && parseFloat(item.price) < parseFloat(priceRange.min)) return false;
        if (priceRange.max && parseFloat(item.price) > parseFloat(priceRange.max)) return false;

        // Size (Check tags)
        if (selectedSizes.length > 0) {
            const hasSize = selectedSizes.some(size => item.tags.includes(size));
            // Assuming BJD category items should have size tags. 
            // If item is 'goods' but user selected '3分', we strictly filter.
            if (!hasSize) return false;
        }

        // Condition
        if (selectedConditions.length > 0) {
            const hasCondition = selectedConditions.some(c => item.condition.includes(c));
            if (!hasCondition) return false;
        }

        // IP Filter (Check tags)
        if (selectedIPs.length > 0) {
            if (!selectedIPs.some(ip => item.tags.includes(ip))) return false;
        }

        // Brand Filter (Check tags)
        if (selectedBrands.length > 0) {
            if (!selectedBrands.some(brand => item.tags.some(tag => tag.includes(brand)))) return false;
        }

        // Quick Filter (单选过滤)
        if (activeQuickFilter) {
            const matchesFilter = item.tags.some(tag => tag.includes(activeQuickFilter));
            if (!matchesFilter) return false;
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
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}</style>

            {/* Header with Glassmorphism */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-3 flex flex-col gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border-b border-white/50 transition-all duration-300">
                {/* Conditional Zone Switcher (Only if multiple zones) - ABOVE Search */}
                {myZones.length > 1 && (
                    <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-[240px] self-center animate-slide-up" style={{ animationDuration: '0.3s' }}>
                        <button
                            onClick={() => setActiveZone('guzi')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeZone === 'guzi' ? 'bg-white text-rose-500 shadow-sm' : 'text-gray-400'}`}
                        >
                            谷子
                        </button>
                        <button
                            onClick={() => setActiveZone('bjd')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeZone === 'bjd' ? 'bg-white text-purple-500 shadow-sm' : 'text-gray-400'}`}
                        >
                            BJD
                        </button>
                    </div>
                )}

                <div className="flex items-center gap-3 w-full">
                    {/* Search Bar */}
                    <div className="flex-1 bg-gray-100/80 rounded-full flex items-center px-4 py-2.5 gap-2 border border-transparent focus-within:bg-white focus-within:border-primary-300 transition-all">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder={activeZone === 'guzi' ? "搜吧唧/立牌..." : "搜娃社/妆师..."}
                            className="bg-transparent text-sm w-full outline-none placeholder:text-gray-400 text-gray-700"
                        />
                    </div>

                    {/* Right Side: My Boards / Discovery */}
                    <button
                        onClick={() => setIsZoneDrawerOpen(true)}
                        className="flex flex-col items-center justify-center text-gray-600 active:scale-95 transition-transform"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-white shadow-sm">
                            {activeZone === 'guzi' ? <span className="text-lg">🍬</span> : <span className="text-lg">🩰</span>}
                        </div>
                        <span className="text-[10px] font-bold mt-0.5">岛屿</span>
                    </button>
                </div>
            </div>

            {/* Quick Context Filters (Horizontal Scroll) */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {activeZone === 'guzi' ? (
                    // Guzi: Show User Interests (IPs) + Popular IPs, sorted
                    (() => {
                        const myIPs = currentUser?.preferences?.interests || [];
                        const allIPs = FILTER_DATA.ips;
                        // specific logic: My IPs first, then others. Dedup.
                        const displayIPs = [...new Set([...myIPs, ...allIPs])];

                        return (
                            <>
                                {displayIPs.map(ip => {
                                    const ipInfo = SCRAPED_DATA['Japanese IP']?.find(i => i.name === ip);
                                    const imgSrc = ipInfo ? ipInfo.path : `https://ui-avatars.com/api/?name=${ip}&background=${myIPs.includes(ip) ? 'e11d48' : 'random'}&color=fff&rounded=true&bold=true&size=32`;

                                    return (
                                        <button
                                            key={ip}
                                            onClick={() => {
                                                setActiveQuickFilter(activeQuickFilter === ip ? null : ip);
                                            }}
                                            className={`flex-shrink-0 pl-1 pr-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap transition-all flex items-center gap-1.5 ${activeQuickFilter === ip
                                                ? "bg-rose-500 text-white border-rose-500 shadow-md scale-105"
                                                : myIPs.includes(ip)
                                                    ? "bg-rose-100 text-rose-600 border-rose-200"
                                                    : "bg-gray-50 text-gray-500 border-gray-100"
                                                }`}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt={ip}
                                                className="w-5 h-5 rounded-full object-cover"
                                            />
                                            {ip}
                                        </button>
                                    );
                                })}
                            </>
                        );
                    })()
                ) : (
                    // BJD: Show User Brands + All Brands, sorted
                    (() => {
                        const myBrands = currentUser?.preferences?.brands || [];
                        const allBrands = SCRAPED_DATA['BJD Brand']?.map(b => b.name) || [];
                        // specific logic: My Brands first, then others. Dedup.
                        const displayBrands = [...new Set([...myBrands, ...allBrands])];

                        return (
                            <>
                                {displayBrands.map(brand => {
                                    const brandInfo = SCRAPED_DATA['BJD Brand']?.find(b => b.name === brand);
                                    const imgSrc = brandInfo ? brandInfo.path : `https://ui-avatars.com/api/?name=${encodeURIComponent(brand)}&background=${myBrands.includes(brand) ? '9333ea' : 'random'}&color=fff&rounded=true&bold=true&size=32`;

                                    return (
                                        <button
                                            key={brand}
                                            onClick={() => {
                                                setActiveQuickFilter(activeQuickFilter === brand ? null : brand);
                                            }}
                                            className={`flex-shrink-0 pl-1 pr-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap transition-all flex items-center gap-1.5 ${activeQuickFilter === brand
                                                ? "bg-purple-500 text-white border-purple-500 shadow-md scale-105"
                                                : myBrands.includes(brand)
                                                    ? "bg-purple-100 text-purple-600 border-purple-200"
                                                    : "bg-gray-50 text-gray-500 border-gray-100"
                                                }`}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt={brand}
                                                className="w-5 h-5 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand)}&background=random&color=fff&rounded=true&size=20`;
                                                }}
                                            />
                                            {brand}
                                        </button>
                                    );
                                })}
                                <button onClick={() => setIsFilterOpen(true)} className="flex-shrink-0 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-bold border border-gray-100 flex items-center gap-1">
                                    <Filter size={10} /> 筛选
                                </button>
                            </>
                        );
                    })()
                )}
            </div>

            {/* Zone/Discovery Drawer */}
            {isZoneDrawerOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsZoneDrawerOpen(false)} />
                    <div className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl p-6 animate-slide-left flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-serif font-bold text-gray-900">我的岛屿</h2>
                            <button onClick={() => setIsZoneDrawerOpen(false)}><X size={24} className="text-gray-400" /></button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto min-h-0 -mx-6 px-6">
                            {/* Current Zone Info */}
                            <div className="mb-8 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">
                                        {activeZone === 'guzi' ? '🍬' : '🩰'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{activeZone === 'guzi' ? '谷子岛' : 'BJD岛'}</h3>
                                        <p className="text-xs text-gray-400">当前所在的岛屿</p>
                                    </div>
                                </div>
                            </div>

                            {/* Interests/Brands Selection - 根据岛屿类型显示 */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-900">
                                        {activeZone === 'guzi' ? '关注的IP' : '关注的娃社'}
                                    </h3>
                                    <span className="text-xs text-gray-400">
                                        已选 {activeZone === 'guzi'
                                            ? (currentUser?.preferences?.interests?.length || 0)
                                            : (currentUser?.preferences?.brands?.length || 0)} 个
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(activeZone === 'guzi'
                                        ? SCRAPED_DATA['Japanese IP']
                                        : SCRAPED_DATA['BJD Brand']
                                    )?.map(item => {
                                        const selectedList = activeZone === 'guzi'
                                            ? currentUser?.preferences?.interests
                                            : currentUser?.preferences?.brands;
                                        const isSelected = selectedList?.includes(item.name);
                                        const themeColor = activeZone === 'guzi' ? 'rose' : 'purple';

                                        return (
                                            <button
                                                key={item.name}
                                                onClick={() => {
                                                    const currentList = selectedList || [];
                                                    const key = activeZone === 'guzi' ? 'interests' : 'brands';
                                                    let newList;
                                                    if (isSelected) {
                                                        newList = currentList.filter(i => i !== item.name);
                                                    } else {
                                                        newList = [...currentList, item.name];
                                                    }
                                                    savePreferences({ ...currentUser.preferences, [key]: newList });
                                                }}
                                                className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isSelected
                                                    ? `bg-${themeColor}-500 text-white shadow-md transform scale-105`
                                                    : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                                                    }`}
                                            >
                                                <img
                                                    src={item.path}
                                                    alt={item.name}
                                                    className="w-5 h-5 rounded-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&color=fff&rounded=true&size=20`;
                                                    }}
                                                />
                                                <span>{item.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Switch Zone Action */}
                        <div className="pt-6 border-t border-gray-100 mt-auto">
                            <p className="text-xs text-gray-400 mb-3 text-center">
                                {myZones.includes(activeZone === 'guzi' ? 'bjd' : 'guzi') ? '切换到你的另一个岛屿' : '这也是你感兴趣的吗？'}
                            </p>

                            {/* Case 1: Already has both - Just Switch */}
                            {myZones.includes(activeZone === 'guzi' ? 'bjd' : 'guzi') ? (
                                <button
                                    onClick={() => {
                                        setActiveZone(activeZone === 'guzi' ? 'bjd' : 'guzi');
                                        setIsZoneDrawerOpen(false);
                                    }}
                                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-colors bg-gray-100 text-gray-700`}
                                >
                                    <span className="text-xl">{activeZone === 'guzi' ? '🩰' : '🍬'}</span>
                                    <span className="font-bold">前往 {activeZone === 'guzi' ? 'BJD岛' : '谷子岛'}</span>
                                </button>
                            ) : (
                                /* Case 2: Doesn't have it - Add it */
                                <button
                                    onClick={() => handleAddZone(activeZone === 'guzi' ? 'bjd' : 'guzi')}
                                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-colors ${activeZone === 'guzi'
                                        ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                                        : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                        }`}
                                >
                                    <span className="text-xl">{activeZone === 'guzi' ? '🩰' : '🍬'}</span>
                                    <span className="font-bold">开启 {activeZone === 'guzi' ? 'BJD岛' : '谷子岛'}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Banners */}
            <div className="px-4 pt-2 overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 w-max">
                    {BANNERS.map(banner => (
                        <div
                            key={banner.id}
                            onClick={() => {
                                // Simple logic mapping banners to filters
                                if (banner.id === 1) setActiveCategory('bjd');
                                if (banner.id === 2) setSortBy('price_asc'); // 'Sale' implies cheap prices
                                if (banner.id === 3) setActiveCategory('commission');
                            }}
                            className={`w-64 p-3 rounded-2xl ${banner.bg} relative overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer`}
                        >
                            <div className={`absolute top-0 right-0 p-2 opacity-10 ${banner.text}`}>
                                <Sparkles size={64} />
                            </div>
                            <div className="relative z-10">
                                <div className={`flex items-center gap-1 text-xs font-bold mb-1 ${banner.text} bg-white/40 w-max px-2 py-0.5 rounded-full`}>
                                    {banner.icon}
                                    {banner.title}
                                </div>
                                <div className={`text-sm font-bold text-gray-800`}>{banner.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-transparent pb-4 px-4 pt-2">
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${activeCategory === cat.id
                                ? "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 shadow-sm"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-3 text-xs font-medium text-gray-500 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
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
                        onClick={() => setIsFilterOpen(true)}
                        className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${(priceRange.min || priceRange.max || selectedSizes.length > 0 || selectedConditions.length > 0 || selectedIPs.length > 0 || selectedBrands.length > 0)
                            ? 'text-gray-900 font-bold bg-gray-100'
                            : 'hover:bg-gray-100 text-gray-700'
                            }`}
                    >
                        <span>筛选</span>
                        <Filter size={12} fill={(priceRange.min || priceRange.max || selectedSizes.length > 0 || selectedConditions.length > 0 || selectedIPs.length > 0 || selectedBrands.length > 0) ? "currentColor" : "none"} />
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
                {isLoading ? (
                    // Skeleton Loader
                    [1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-white p-2 space-y-2">
                            <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-xl" />
                            <div className="h-4 bg-gray-100 w-3/4 rounded animate-pulse" />
                            <div className="flex justify-between">
                                <div className="h-3 bg-gray-100 w-1/4 rounded animate-pulse" />
                                <div className="h-3 bg-gray-100 w-1/4 rounded animate-pulse" />
                            </div>
                        </div>
                    ))
                ) : (
                    filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => push("ProductDetail", { id: item.id, type: item.type === "service" ? "service" : "secondhand" })}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-gray-100 animate-slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
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
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md backdrop-blur shadow-sm font-bold ${item.type === "service"
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
                    ))
                )}
            </div>

            {/* Advanced Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsFilterOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative bg-white rounded-t-3xl p-6 pb-8 animate-slide-up shadow-2xl h-[70vh] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">筛选</h3>
                            <button onClick={() => setIsFilterOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-5 scrollbar-hide">
                            {/* Price Range - 通用 */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-gray-900">价格区间</h4>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="最低价"
                                        className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-100 transition-all text-center"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    />
                                    <span className="text-gray-300">-</span>
                                    <input
                                        type="number"
                                        placeholder="最高价"
                                        className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-100 transition-all text-center"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    />
                                </div>
                            </div>

                            {activeZone === 'guzi' ? (
                                /* ========== 谷子岛筛选 ========== */
                                <>
                                    {/* IP / 作品 */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-900">IP / 作品</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {GUZI_FILTER_DATA.ips.slice(0, 12).map(ip => (
                                                <button
                                                    key={ip}
                                                    onClick={() => setSelectedIPs(prev => prev.includes(ip) ? prev.filter(i => i !== ip) : [...prev, ip])}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedIPs.includes(ip)
                                                            ? "bg-rose-500 text-white shadow-md scale-105"
                                                            : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                                        }`}
                                                >
                                                    {ip}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 角色 */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-900">热门角色</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {GUZI_FILTER_DATA.characters.map(char => (
                                                <button
                                                    key={char}
                                                    onClick={() => setActiveQuickFilter(activeQuickFilter === char ? null : char)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeQuickFilter === char
                                                            ? "bg-orange-500 text-white shadow-md scale-105"
                                                            : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                                        }`}
                                                >
                                                    {char}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 类别 */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-900">商品类别</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {GUZI_FILTER_DATA.categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveQuickFilter(activeQuickFilter === cat ? null : cat)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeQuickFilter === cat
                                                            ? "bg-blue-500 text-white shadow-md scale-105"
                                                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* ========== BJD 岛筛选 ========== */
                                <>
                                    {/* 品牌 / 娃社 */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-900">品牌 / 娃社</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {BJD_FILTER_DATA.brands.slice(0, 12).map(brand => (
                                                <button
                                                    key={brand}
                                                    onClick={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedBrands.includes(brand)
                                                            ? "bg-purple-500 text-white shadow-md scale-105"
                                                            : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                                                        }`}
                                                >
                                                    {brand}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 尺寸 */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-900">尺寸 / 规格</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {BJD_FILTER_DATA.sizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedSizes.includes(size)
                                                            ? "bg-indigo-500 text-white shadow-md scale-105"
                                                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 类型 */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-gray-900">商品类型</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {BJD_FILTER_DATA.types.map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => setActiveQuickFilter(activeQuickFilter === type ? null : type)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeQuickFilter === type
                                                            ? "bg-teal-500 text-white shadow-md scale-105"
                                                            : "bg-teal-50 text-teal-600 hover:bg-teal-100"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* 成色 - 通用 */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-gray-900">成色</h4>
                                <div className="flex flex-wrap gap-2">
                                    {FILTER_DATA.conditions.map(cond => (
                                        <button
                                            key={cond}
                                            onClick={() => setSelectedConditions(prev => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond])}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedConditions.includes(cond)
                                                    ? "bg-gray-800 text-white shadow-md scale-105"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {cond}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-gray-50 mt-4">
                            <button
                                onClick={() => {
                                    setPriceRange({ min: '', max: '' });
                                    setSelectedSizes([]);
                                    setSelectedConditions([]);
                                    setSelectedIPs([]);
                                    setSelectedBrands([]);
                                }}
                                className="flex-1 py-3 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                重置
                            </button>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="flex-[2] py-3 rounded-full bg-gray-900 text-white font-bold shadow-lg shadow-gray-200 active:scale-95 transition-transform"
                            >
                                查看结果
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecondHandMarket;
