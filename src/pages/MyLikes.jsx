import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Heart, MessageSquare } from 'lucide-react';

const MyLikes = () => {
    const { pop, push } = useRouter();
    const [activeTab, setActiveTab] = useState('products');

    // Mock Data
    const products = [
        { id: '1', title: '三分BJD 洛丽塔洋装', price: 328, image: 'bg-pink-200', status: '进行中' },
        { id: '2', title: '四分BJD 休闲卫衣套装', price: 158, image: 'bg-blue-200', status: '制作中' },
    ];

    const posts = [
        { id: 201, user: '养娃大户', content: '终于等到我的小可爱回家了！', image: 'bg-orange-100', likes: 124 },
        { id: 203, user: '摄影师C', content: '周末的外拍聚会，带了三个崽。', image: 'bg-indigo-100', likes: 256 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">我的喜欢</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white px-4 border-b border-gray-100 flex">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'products' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    商品
                </button>
                <button
                    onClick={() => setActiveTab('posts')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'posts' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    动态
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {activeTab === 'products' ? (
                    <div className="grid grid-cols-2 gap-3">
                        {products.map(item => (
                            <div key={item.id} onClick={() => push('ProductDetail', { id: item.id })} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className={`aspect-square ${item.image} relative`}>
                                    <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 text-rose-500">
                                        <Heart size={14} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.title}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-rose-500 font-bold text-sm">¥{item.price}</span>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{item.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {posts.map(item => (
                            <div key={item.id} onClick={() => push('PostDetail', { id: item.id })} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm">
                                <div className={`w-24 h-24 rounded-lg ${item.image} shrink-0`} />
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <p className="text-sm text-gray-800 line-clamp-2">{item.content}</p>
                                        <p className="text-xs text-gray-400 mt-1">@{item.user}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-400 text-xs">
                                        <div className="flex items-center gap-1 text-rose-500">
                                            <Heart size={12} fill="currentColor" />
                                            <span>{item.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLikes;
