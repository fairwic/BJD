import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Star, MessageCircle, Calendar, Share2, Heart, Check, Clock, Phone } from 'lucide-react';

// 复用 ArtistHub 的数据（实际项目中应从 context 或 API 获取）
const MOCK_ARTISTS = [
    {
        id: 'artist_001',
        name: '云墨妆坊',
        type: 'makeup',
        avatar: 'bg-gradient-to-br from-purple-400 to-pink-500',
        verified: true,
        rating: 4.9,
        reviewCount: 128,
        serviceCount: 256,
        price: '¥300-800',
        status: 'available',
        waitTime: null,
        styles: ['古风', '清冷'],
        bio: '专注古风清冷系妆面，擅长龙魂/AS系列娃娃。5年妆面经验，作品多次被官方收录。提供全国顺丰包邮，全程录像可查。',
        services: [
            { name: '基础妆面', price: 300, desc: '眉眼唇腮基础妆' },
            { name: '精细妆面', price: 500, desc: '含睫毛+细节描绘' },
            { name: '大师妆面', price: 800, desc: '定制风格+全脸精修' },
        ],
        portfolio: [
            { id: 1, color: 'bg-gradient-to-br from-rose-200 to-pink-300', title: '古风仙侠', likes: 234 },
            { id: 2, color: 'bg-gradient-to-br from-purple-200 to-indigo-300', title: '清冷御姐', likes: 189 },
            { id: 3, color: 'bg-gradient-to-br from-blue-200 to-cyan-300', title: '病娇少女', likes: 156 },
            { id: 4, color: 'bg-gradient-to-br from-amber-200 to-yellow-300', title: '日系甜美', likes: 203 },
            { id: 5, color: 'bg-gradient-to-br from-gray-200 to-slate-300', title: '暗黑哥特', likes: 145 },
            { id: 6, color: 'bg-gradient-to-br from-green-200 to-emerald-300', title: '森系精灵', likes: 178 },
        ],
        reviews: [
            { user: '娃娃控', rating: 5, content: '妆面超级精致！细节处理太棒了', date: '2024-12-15' },
            { user: '古风爱好者', rating: 5, content: '完美还原了我想要的感觉，下次还来', date: '2024-12-10' },
        ]
    },
];

// 查找大师数据
const getArtistById = (id) => MOCK_ARTISTS.find(a => a.id === id) || MOCK_ARTISTS[0];

const ArtistProfile = () => {
    const { pop, currentRoute } = useRouter();
    const artistId = currentRoute?.params?.artistId || 'artist_001';
    const artist = getArtistById(artistId);

    const [activeTab, setActiveTab] = useState('portfolio'); // portfolio, services, reviews
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* 顶部导航 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <button onClick={pop} className="p-1">
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-base font-medium text-gray-800">大师主页</h1>
                <button className="p-1">
                    <Share2 size={20} className="text-gray-500" />
                </button>
            </div>

            {/* 头部信息卡 */}
            <div className="bg-white px-4 py-5">
                <div className="flex items-start gap-4">
                    <div className={`w-20 h-20 rounded-2xl ${artist.avatar} flex-shrink-0`} />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-800">{artist.name}</h2>
                            {artist.verified && (
                                <span className="flex items-center gap-0.5 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded">
                                    <Check size={10} /> 认证
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {artist.type === 'makeup' ? '🎨 妆师' : '👩‍🦰 毛娘'} · {artist.styles.join(' / ')}
                        </p>

                        {/* 状态 */}
                        <div className="flex items-center gap-1 mt-2">
                            <span className={`w-2 h-2 rounded-full ${artist.status === 'available' ? 'bg-green-500' :
                                    artist.status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'
                                }`} />
                            <span className="text-xs text-gray-600">
                                {artist.status === 'available' ? '接单中' :
                                    artist.status === 'busy' ? `排队中 (${artist.waitTime})` : '暂不接单'}
                            </span>
                        </div>

                        {/* 数据统计 */}
                        <div className="flex items-center gap-4 mt-3 text-xs">
                            <div className="text-center">
                                <p className="font-bold text-gray-800">{artist.serviceCount}</p>
                                <p className="text-gray-400">服务</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-800 flex items-center gap-0.5">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    {artist.rating}
                                </p>
                                <p className="text-gray-400">评分</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-800">{artist.reviewCount}</p>
                                <p className="text-gray-400">评价</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 简介 */}
                <p className="text-sm text-gray-600 mt-4 leading-relaxed">{artist.bio}</p>

                {/* 关注按钮 */}
                <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`w-full mt-4 py-2.5 rounded-full text-sm font-medium transition-all ${isFollowing
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-rose-500 text-white'
                        }`}
                >
                    {isFollowing ? '已关注' : '+ 关注'}
                </button>
            </div>

            {/* Tab切换 */}
            <div className="bg-white mt-2 px-4 pt-3 sticky top-12 z-10">
                <div className="flex border-b border-gray-100">
                    {[
                        { id: 'portfolio', label: '作品集' },
                        { id: 'services', label: '服务项目' },
                        { id: 'reviews', label: '评价' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === tab.id
                                    ? 'text-rose-500 border-rose-500'
                                    : 'text-gray-500 border-transparent'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab内容 */}
            <div className="px-4 pt-4">
                {/* 作品集 */}
                {activeTab === 'portfolio' && (
                    <div className="grid grid-cols-2 gap-3">
                        {artist.portfolio.map(item => (
                            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className={`aspect-square ${item.color}`} />
                                <div className="p-2">
                                    <p className="text-sm font-medium text-gray-700">{item.title}</p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        <Heart size={12} /> {item.likes}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 服务项目 */}
                {activeTab === 'services' && (
                    <div className="space-y-3">
                        {artist.services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">{service.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-rose-500">¥{service.price}</p>
                                        <button className="text-xs text-rose-500 mt-1">咨询</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 评价 */}
                {activeTab === 'reviews' && (
                    <div className="space-y-3">
                        {artist.reviews.map((review, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                        <span className="text-sm font-medium text-gray-700">{review.user}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{review.content}</p>
                                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 底部操作栏 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    私聊
                </button>
                <button className="flex-1 py-3 bg-rose-500 text-white rounded-full text-sm font-medium flex items-center justify-center gap-2">
                    <Calendar size={18} />
                    预约服务
                </button>
            </div>
        </div>
    );
};

export default ArtistProfile;
