import React from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Star, MapPin, ShoppingBag, Search } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mock';

const MerchantProfile = () => {
    const { currentRoute, pop } = useRouter();
    const { id, name } = currentRoute.params || {};

    const merchant = {
        id: id || 201,
        name: name || '爱丽丝的衣橱',
        avatar: 'bg-orange-400',
        banner: 'bg-orange-100',
        desc: '专注BJD娃衣制作5年，原创设计，手工制作。',
        location: '上海',
        rating: 4.8,
        sales: 5000
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Banner */}
            <div className={`h-40 ${merchant.banner} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <button onClick={pop} className="absolute top-4 left-4 text-white">
                    <ChevronLeft size={24} />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className={`w-16 h-16 rounded-lg border-2 border-white ${merchant.avatar} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                        {merchant.name[0]}
                    </div>
                    <div className="text-white">
                        <h1 className="font-bold text-lg">{merchant.name}</h1>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                            <span className="bg-orange-500 px-1.5 py-0.5 rounded">金牌商家</span>
                            <span>{merchant.sales}+ 销量</span>
                        </div>
                    </div>
                </div>
                <button className="absolute bottom-4 right-4 bg-white text-orange-500 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform">
                    收藏店铺
                </button>
            </div>

            {/* Shop Info */}
            <div className="bg-white p-4 flex items-center justify-between text-xs text-gray-500 border-b border-gray-50">
                <div className="flex items-center gap-1">
                    <Star size={14} className="text-orange-400 fill-orange-400" />
                    <span className="font-bold text-gray-800">{merchant.rating}</span>
                    <span>店铺评分</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{merchant.location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <ShoppingBag size={14} />
                    <span>{MOCK_PRODUCTS.length} 商品</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-3 bg-white sticky top-0 z-10">
                <div className="bg-gray-100 rounded-full px-3 py-2 flex items-center gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="搜索店内商品" className="bg-transparent text-sm w-full outline-none" />
                </div>
            </div>

            {/* Product Grid */}
            <div className="p-3 grid grid-cols-2 gap-3">
                {MOCK_PRODUCTS.map(p => (
                    <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <div className={`aspect-square ${p.image} relative`}>
                            {p.tags && (
                                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                                    {p.tags[0]}
                                </span>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-gray-800 text-sm line-clamp-2 h-10">{p.title}</h3>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-rose-500 font-bold text-base">¥{p.price}</span>
                                <button className="p-1.5 bg-rose-50 text-rose-500 rounded-lg">
                                    <ShoppingBag size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MerchantProfile;
