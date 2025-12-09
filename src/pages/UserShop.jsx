import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { CATEGORY_CONFIG, MOCK_PRODUCTS } from '../data/mock';
import { Search, ShoppingBag, Heart, MessageSquare, Sparkles, Star, Flame, Zap } from 'lucide-react';

const ProductCard = ({ item, onClick, isMasonry }) => (
    <div onClick={onClick} className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group active:scale-95 transition-transform break-inside-avoid mb-3 ${isMasonry ? '' : ''}`}>
        <div className={`w-full ${item.image} relative h-auto`}>
            {/* Aspect Ratio Simulator using padding-bottom if images were real, here we use different heights for mock bg */}
            <div className={`${item.category === 'full' ? 'h-64' : 'h-40'} w-full`}></div>
            <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md">
                {item.tags[0]}
            </span>
            {item.type === 'spot' && (
                <span className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg">
                    现货
                </span>
            )}
        </div>
        <div className="p-3">
            <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{item.title}</h3>
            <div className="mt-2 flex items-center justify-between">
                <div>
                    <span className="text-rose-500 font-bold text-base">¥{item.price}</span>
                    <span className="text-[10px] text-gray-400 ml-1">起</span>
                </div>
                <button className="w-6 h-6 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-colors">
                    <ShoppingBag size={12} />
                </button>
            </div>
            {/* Social Proof */}
            <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-0.5"><Heart size={8} /> {Math.floor(Math.random() * 200)}</span>
                <span className="border-l border-gray-200 pl-2">{item.shop}</span>
            </div>
        </div>
    </div>
);

const UserShop = () => {
    const { push } = useRouter();
    const { groupBuys } = useApp();
    const [activeSubTab, setActiveSubTab] = useState('merchant'); // 'merchant' or 'leader'
    const [activeCategory, setActiveCategory] = useState('all');

    // 筛选逻辑
    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchCategory = activeCategory === 'all' || p.category === activeCategory;
        return matchCategory;
    });

    return (
        <div className="pb-20 h-full flex flex-col bg-gray-50">
            {/* Header: Immersive & Search */}
            <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2 text-gray-400 gap-2">
                        <Search size={16} />
                        <span className="text-sm">搜索你心仪的崽...</span>
                    </div>
                    <button onClick={() => push('WishPool')} className="p-2 text-gray-600 relative">
                        <Sparkles size={24} className="text-amber-500" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                    </button>
                </div>

                {/* Visual Categories (Story Style) */}
                <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide pb-2">
                    {[
                        { id: 'all', label: '推荐', icon: Star, color: 'bg-rose-100 text-rose-500' },
                        { id: 'full', label: '整娃', icon: Sparkles, color: 'bg-indigo-100 text-indigo-500' },
                        { id: 'outfit', label: '娃衣', icon: ShoppingBag, color: 'bg-orange-100 text-orange-500' },
                        { id: 'eyes', label: '眼珠', icon: Zap, color: 'bg-blue-100 text-blue-500' },
                    ].map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex flex-col items-center gap-1 min-w-[50px] transition-all ${activeCategory === cat.id ? 'scale-110' : 'opacity-60'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.color} text-lg shadow-sm border-2 ${activeCategory === cat.id ? 'border-white ring-2 ring-gray-100' : 'border-transparent'}`}>
                                <cat.icon size={20} />
                            </div>
                            <span className={`text-[10px] font-bold ${activeCategory === cat.id ? 'text-gray-800' : 'text-gray-400'}`}>
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                {/* Hero Banner (Only on 'all' category) */}
                {activeCategory === 'all' && (
                    <div className="mb-6 relative overflow-hidden rounded-2xl h-48 bg-gray-900 group cursor-pointer" onClick={() => push('ProductDetail', { id: 101 })}>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-90" />
                        <div className="absolute top-0 right-0 p-6 opacity-20">
                            <Flame size={120} className="text-rose-500" />
                        </div>
                        <div className="relative z-10 p-5 h-full flex flex-col justify-center text-white">
                            <div className="bg-rose-500 w-fit px-2 py-1 rounded text-[10px] font-bold mb-2 animate-pulse">🔥 本周热团</div>
                            <h2 className="text-2xl font-bold mb-1">鹿神·特体二样</h2>
                            <p className="text-white/60 text-xs mb-4 line-clamp-1">神性与野性的完美结合，关节可动性大幅提升...</p>
                            <div className="flex items-center gap-2 mt-auto">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-400 border-2 border-indigo-900" />)}
                                </div>
                                <span className="text-xs text-indigo-200">382人已上车</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sub-Tabs Switch */}
                <div className="flex justify-center mb-4">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100 flex">
                        <button
                            onClick={() => setActiveSubTab('merchant')}
                            className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${activeSubTab === 'merchant' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500'}`}
                        >
                            现货市集
                        </button>
                        <button
                            onClick={() => setActiveSubTab('leader')}
                            className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${activeSubTab === 'leader' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-500'}`}
                        >
                            开团广场
                        </button>
                    </div>
                </div>

                {/* Content Feed */}
                {activeSubTab === 'merchant' ? (
                    <div className="columns-2 gap-3 space-y-3">
                        {filteredProducts.map(p => (
                            <ProductCard key={p.id} item={p} onClick={() => push('ProductDetail', { id: p.id })} isMasonry={true} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 pb-10">
                        {groupBuys.map(g => (
                            <div key={g.id} onClick={() => push('ProductDetail', { id: g.id })} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-95 transition-transform">
                                <div className={`h-48 w-full ${g.image} relative`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="font-bold text-lg">{g.title}</h3>
                                        <p className="text-xs text-white/80">{g.leader} · {g.status}</p>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-white border border-white/30">
                                        进度 {g.progress}%
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <div className="flex gap-4 text-gray-500 text-xs font-medium">
                                        <span className="flex items-center gap-1 text-rose-500"><Flame size={14} /> 热度 2.4k</span>
                                        <span className="flex items-center gap-1"><MessageSquare size={14} /> 45</span>
                                    </div>
                                    <button className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full">立即上车</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Wish Pool Floating Action Button (Enhanced) */}
            <button
                onClick={() => push('WishPool')}
                className="fixed bottom-24 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-lg shadow-indigo-200 active:scale-90 transition-transform flex items-center gap-2 z-40 border-2 border-white/20"
            >
                <Sparkles size={18} className="animate-pulse" />
                <span className="font-bold text-sm">许愿池</span>
            </button>
        </div>
    );
};

export default UserShop;
