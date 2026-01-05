import React, { useState, useEffect } from 'react';
import { useRouter } from '../router/RouteStack';
import { Search, X, Clock, Flame, ChevronLeft, Trash2 } from 'lucide-react';

// Mock 热门搜索数据 - 带热度值和趋势
const HOT_SEARCHES = [
    { id: 1, text: 'BJD', heat: 9999, trend: 'up', isNew: false },
    { id: 2, text: '龙魂新款', heat: 8523, trend: 'up', isNew: true },
    { id: 3, text: '6分古风', heat: 7234, trend: 'stable', isNew: false },
    { id: 4, text: 'AS官妆', heat: 6891, trend: 'up', isNew: false },
    { id: 5, text: '3分娃娃', heat: 5432, trend: 'down', isNew: false },
    { id: 6, text: 'Volks限定', heat: 4876, trend: 'up', isNew: true },
    { id: 7, text: '娃衣汉服', heat: 3654, trend: 'stable', isNew: false },
    { id: 8, text: '白肌素体', heat: 2987, trend: 'down', isNew: false },
    { id: 9, text: '改妆定制', heat: 2345, trend: 'up', isNew: false },
    { id: 10, text: '眼珠树脂', heat: 1890, trend: 'stable', isNew: false },
];

// 筛选标签
const FILTER_TABS = [
    { id: 'all', label: '全部' },
    { id: 'merchant', label: '商家' },
    { id: 'leader', label: '团长' },
    { id: '3fen', label: '3分' },
    { id: '4fen', label: '4分' },
    { id: '6fen', label: '6分' },
];

// 分类列表
const CATEGORIES = [
    { id: 'full', name: '整娃', icon: '🎎', color: 'from-rose-100 to-pink-100', count: 128 },
    { id: 'outfit', name: '娃衣', icon: '👗', color: 'from-purple-100 to-violet-100', count: 256 },
    { id: 'eyes', name: '眼珠', icon: '👁️', color: 'from-blue-100 to-cyan-100', count: 89 },
    { id: 'wig', name: '假发', icon: '💇', color: 'from-amber-100 to-yellow-100', count: 134 },
    { id: 'shoes', name: '鞋子', icon: '👟', color: 'from-green-100 to-emerald-100', count: 67 },
    { id: 'accessory', name: '配件', icon: '💎', color: 'from-indigo-100 to-blue-100', count: 198 },
    { id: 'makeup', name: '改妆', icon: '💄', color: 'from-pink-100 to-rose-100', count: 45 },
    { id: 'body', name: '素体', icon: '🦴', color: 'from-gray-100 to-slate-100', count: 32 },
];

// 品牌列表
const BRANDS = [
    { id: 'longhun', name: '龙魂', logo: '🐲', hot: true, products: 156 },
    { id: 'as', name: 'AS', logo: '✨', hot: true, products: 89 },
    { id: 'volks', name: 'Volks', logo: '🌟', hot: true, products: 234 },
    { id: 'luts', name: 'Luts', logo: '🌸', hot: false, products: 178 },
    { id: 'dollmore', name: 'Dollmore', logo: '🎀', hot: false, products: 123 },
    { id: 'fairyland', name: 'Fairyland', logo: '🧚', hot: true, products: 145 },
    { id: 'soom', name: 'Soom', logo: '🌙', hot: false, products: 98 },
    { id: 'iplehouse', name: 'Iplehouse', logo: '🏠', hot: false, products: 87 },
    { id: 'ringdoll', name: 'Ringdoll', logo: '💍', hot: false, products: 76 },
    { id: 'dollshe', name: 'DollShe', logo: '👸', hot: false, products: 65 },
];

const SearchPage = () => {
    const { pop, push } = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [recentSearches, setRecentSearches] = useState([]);
    const [isFocused, setIsFocused] = useState(true);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);

    // 从 localStorage 加载历史搜索
    useEffect(() => {
        const saved = localStorage.getItem('bjd_recent_searches');
        if (saved) {
            try {
                setRecentSearches(JSON.parse(saved));
            } catch (e) {
                setRecentSearches([]);
            }
        }
    }, []);

    // 保存历史搜索
    const saveRecentSearch = (query) => {
        if (!query.trim()) return;
        const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
        setRecentSearches(updated);
        localStorage.setItem('bjd_recent_searches', JSON.stringify(updated));
    };

    // 清空历史
    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('bjd_recent_searches');
    };

    // 执行搜索
    const handleSearch = (query) => {
        if (!query.trim()) return;
        saveRecentSearch(query.trim());
        // 返回首页并传递搜索词
        pop();
        // 这里可以通过 context 或其他方式传递搜索词
    };

    // 点击标签搜索
    const handleTagClick = (text) => {
        setSearchQuery(text);
        handleSearch(text);
    };

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            {/* 顶部搜索栏 */}
            <div className="bg-white px-3 pt-3 pb-2 sticky top-0 z-20 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={pop} className="text-gray-600">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex-1 bg-gray-100 rounded-full flex items-center px-3 py-2 gap-2 ring-2 ring-rose-500/30">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                            placeholder="搜索商品、店铺、团长..."
                            className="bg-transparent border-none outline-none text-sm text-gray-800 w-full placeholder:text-gray-400"
                            autoFocus
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="bg-gray-300 rounded-full p-0.5">
                                <X size={12} className="text-white" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => handleSearch(searchQuery)}
                        className="text-rose-500 font-medium text-sm"
                    >
                        搜索
                    </button>
                </div>

                {/* 筛选标签 */}
                <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-hide">
                    {FILTER_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${activeFilter === tab.id
                                ? 'bg-rose-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 搜索内容区 - 可滚动 */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
                {/* 近期搜索 */}
                {recentSearches.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-gray-700 font-medium">
                                <Clock size={16} />
                                <span>近期搜索</span>
                            </div>
                            <button
                                onClick={clearRecentSearches}
                                className="text-gray-400 text-xs flex items-center gap-1"
                            >
                                <Trash2 size={12} />
                                清空
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTagClick(item)}
                                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 热门搜索 - 排行榜风格 */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-rose-500 rounded flex items-center justify-center">
                                <Flame size={12} className="text-white" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">热搜榜</span>
                        </div>
                        <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">实时更新</span>
                    </div>

                    {/* 双列排行榜布局 */}
                    <div className="grid grid-cols-2 gap-1">
                        {HOT_SEARCHES.map((item, index) => {
                            const rank = index + 1;
                            // 排名样式：前3名特殊处理
                            const getRankStyle = () => {
                                if (rank === 1) return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200';
                                if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
                                if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
                                return 'bg-gray-100 text-gray-500';
                            };

                            // 趋势图标
                            const getTrendIcon = () => {
                                if (item.trend === 'up') return <span className="text-rose-500 text-[10px]">↑</span>;
                                if (item.trend === 'down') return <span className="text-green-500 text-[10px]">↓</span>;
                                return <span className="text-gray-400 text-[10px]">-</span>;
                            };

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleTagClick(item.text)}
                                    className={`flex items-center gap-1.5 p-1.5 rounded-lg transition-all hover:bg-gray-50 active:scale-95 ${rank <= 3 ? 'bg-gradient-to-r from-rose-50/50 to-orange-50/50' : ''
                                        }`}
                                >
                                    {/* 排名数字 */}
                                    <span className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center flex-shrink-0 ${getRankStyle()}`}>
                                        {rank}
                                    </span>

                                    {/* 关键词 */}
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center gap-1">
                                            <span className={`text-xs truncate ${rank <= 3 ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                                                {item.text}
                                            </span>
                                            {item.isNew && (
                                                <span className="px-0.5 py-0 bg-rose-500 text-white text-[7px] rounded">NEW</span>
                                            )}
                                        </div>
                                        {/* 热度条 */}
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${rank === 1 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                                                        rank <= 3 ? 'bg-gradient-to-r from-rose-400 to-rose-500' :
                                                            'bg-gray-300'
                                                        }`}
                                                    style={{ width: `${Math.min((item.heat / 10000) * 100, 100)}%` }}
                                                />
                                            </div>
                                            {getTrendIcon()}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 分类快选 */}
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-gray-700 font-medium text-sm">
                            <span>📦</span>
                            <span>分类</span>
                        </div>
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="text-[10px] text-rose-500 flex items-center gap-0.5"
                        >
                            {showAllCategories ? '收起' : '展开'}
                            <span className={`transition-transform ${showAllCategories ? 'rotate-180' : ''}`}>∨</span>
                        </button>
                    </div>
                    <div className={`grid grid-cols-4 gap-2 overflow-hidden transition-all duration-300 ${showAllCategories ? 'max-h-96' : 'max-h-[72px]'
                        }`}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleTagClick(cat.name)}
                                className={`bg-gradient-to-br ${cat.color} rounded-lg p-2 flex flex-col items-center gap-0.5 hover:scale-105 transition-transform active:scale-95`}
                            >
                                <span className="text-lg">{cat.icon}</span>
                                <span className="text-[10px] font-medium text-gray-700">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 品牌专区 */}
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-gray-700 font-medium text-sm">
                            <span>🏷️</span>
                            <span>热门品牌</span>
                        </div>
                        <button
                            onClick={() => setShowAllBrands(!showAllBrands)}
                            className="text-[10px] text-rose-500 flex items-center gap-0.5"
                        >
                            {showAllBrands ? '收起' : '更多'}
                            <span className={`transition-transform ${showAllBrands ? 'rotate-180' : ''}`}>∨</span>
                        </button>
                    </div>
                    <div className={`flex flex-wrap gap-1.5 overflow-hidden transition-all duration-300 ${showAllBrands ? 'max-h-96' : 'max-h-[36px]'
                        }`}>
                        {BRANDS.map((brand) => (
                            <button
                                key={brand.id}
                                onClick={() => handleTagClick(brand.name)}
                                className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${brand.hot
                                    ? 'bg-rose-50 border-rose-200'
                                    : 'bg-white border-gray-200'
                                    }`}
                            >
                                <span className="text-sm">{brand.logo}</span>
                                <span className={`text-xs ${brand.hot ? 'text-rose-600' : 'text-gray-700'}`}>
                                    {brand.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 发现好物 - 推荐区域 */}
                <div className="mt-6">
                    <div className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                        <span>💡</span>
                        <span>猜你喜欢</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100 hover:shadow-md transition-shadow">
                            <p className="text-sm font-medium text-gray-700">龙魂新品</p>
                            <p className="text-xs text-gray-500 mt-1">限时预售中</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
                            <p className="text-sm font-medium text-gray-700">6分古风</p>
                            <p className="text-xs text-gray-500 mt-1">热门团购</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 hover:shadow-md transition-shadow">
                            <p className="text-sm font-medium text-gray-700">娃衣上新</p>
                            <p className="text-xs text-gray-500 mt-1">春季新款</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-md transition-shadow">
                            <p className="text-sm font-medium text-gray-700">配件专区</p>
                            <p className="text-xs text-gray-500 mt-1">眼珠假发</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
