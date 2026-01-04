import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, MoreHorizontal, Trash2, Edit3, MessageSquare, Heart, Eye, ShoppingBag } from 'lucide-react';

const MyListings = () => {
    const { pop } = useRouter();
    const [activeTab, setActiveTab] = useState('on_sale');

    const [listings, setListings] = useState([
        {
            id: 101,
            title: "【退坑出】Volks SDGr 爱丽丝 2018版 全套",
            price: "¥4500",
            image: "bg-orange-100",
            views: 432,
            likes: 28,
            status: 'on_sale',
            timeAgo: "1天前"
        },
        {
            id: 102,
            title: "三分娃适用的复古洋装",
            price: "¥358",
            image: "bg-pink-100",
            views: 120,
            likes: 5,
            status: 'on_sale',
            timeAgo: "3天前"
        },
        {
            id: 105,
            title: "Gem 龙魂 70cm 素体",
            price: "¥1200",
            image: "bg-gray-200",
            views: 890,
            likes: 45,
            status: 'sold',
            timeAgo: "1周前"
        }
    ]);

    const handleDelete = (id) => {
        if (confirm('确定要删除这个商品吗？')) {
            setListings(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleMarkSold = (id) => {
        setListings(prev => prev.map(p => p.id === id ? { ...p, status: 'sold' } : p));
    };

    const filteredListings = listings.filter(p => p.status === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 pb-safe">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center px-4 h-12 gap-4">
                    <button onClick={pop} className="p-1 -ml-2 text-gray-800">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="font-bold text-lg flex-1 text-center pr-8">我的闲置</h1>
                </div>
                {/* Tabs */}
                <div className="flex">
                    <button 
                        onClick={() => setActiveTab('on_sale')}
                        className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'on_sale' ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500'}`}
                    >
                        发布中 ({listings.filter(l => l.status === 'on_sale').length})
                    </button>
                    <button 
                         onClick={() => setActiveTab('sold')}
                         className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'sold' ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500'}`}
                    >
                        已售/下架
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {filteredListings.map(item => (
                    <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm flex gap-3">
                        <div className={`w-28 aspect-square rounded-lg ${item.image} bg-cover bg-center flex-shrink-0 relative`}>
                            {item.status === 'sold' && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                    <span className="text-white font-bold border-2 border-white px-2 py-1 transform -rotate-12">SOLD</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">{item.title}</h3>
                                <p className="text-rose-500 font-bold font-display">{item.price}</p>
                            </div>
                            
                            <div className="flex items-end justify-between">
                                <span className="text-xs text-gray-400">{item.timeAgo} · {item.views}浏览</span>
                                
                                <div className="flex items-center gap-2">
                                    {item.status === 'on_sale' && (
                                        <button 
                                            onClick={() => handleMarkSold(item.id)}
                                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold active:bg-gray-200"
                                        >
                                            标记已出
                                        </button>
                                    )}
                                    <button className="p-1.5 text-gray-400 hover:text-gray-800">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                 {filteredListings.length === 0 && (
                     <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <ShoppingBag size={32} className="opacity-50" />
                        </div>
                        <p className="text-sm">暂无商品</p>
                    </div>
                )}
            </div>
             
             {/* FAB */}
            <div className="fixed bottom-8 right-1/2 translate-x-1/2">
                <button className="bg-rose-500 text-white px-6 py-2.5 rounded-full shadow-lg shadow-rose-200 font-bold flex items-center gap-2 active:scale-95 transition-transform">
                    <Edit3 size={16} /> 发布闲置
                </button>
            </div>
        </div>
    );
};

export default MyListings;
