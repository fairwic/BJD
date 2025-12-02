import React from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Star, Users, MessageCircle, Share2, ShieldCheck } from 'lucide-react';

const LeaderProfile = () => {
    const { currentRoute, pop, push } = useRouter();
    const { groupBuys } = useApp();
    const { id, name } = currentRoute.params || {};

    // Mock Leader Data (In real app, fetch by ID)
    const leader = {
        id: id || 101,
        name: name || '知名团长A',
        avatar: 'bg-rose-400',
        bio: '资深BJD玩家，专注三分/四分娃衣团购。',
        followers: 1250,
        rating: 4.9,
        joinedDays: 365,
        isVerified: true
    };

    // Filter group buys by this leader (Mock: filter by name for now as mock data uses names)
    const leaderGroupBuys = groupBuys.filter(g => g.leader === leader.name);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Image */}
            <div className="h-32 bg-gradient-to-r from-rose-200 to-purple-200 relative">
                <button onClick={pop} className="absolute top-4 left-4 bg-white/50 p-2 rounded-full backdrop-blur-sm text-gray-800">
                    <ChevronLeft size={20} />
                </button>
            </div>

            {/* Profile Info */}
            <div className="px-4 -mt-10 mb-4">
                <div className="bg-white rounded-xl shadow-sm p-4 relative">
                    <div className="absolute -top-10 left-4">
                        <div className={`w-20 h-20 rounded-full border-4 border-white ${leader.avatar} flex items-center justify-center text-white text-2xl font-bold shadow-md`}>
                            {leader.name[0]}
                        </div>
                    </div>

                    <div className="ml-24 flex justify-between items-start mb-2">
                        <div>
                            <h1 className="font-bold text-lg flex items-center gap-1">
                                {leader.name}
                                {leader.isVerified && <ShieldCheck size={16} className="text-blue-500" />}
                            </h1>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Star size={12} className="text-orange-400 fill-orange-400" />
                                <span className="font-bold text-gray-800">{leader.rating}</span>
                                <span>信用极好</span>
                            </div>
                        </div>
                        <button className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform">
                            关注
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 mb-4">{leader.bio}</p>

                    <div className="flex justify-around border-t border-gray-50 pt-3">
                        <div className="text-center">
                            <span className="block font-bold text-gray-800">{leader.followers}</span>
                            <span className="text-xs text-gray-400">粉丝</span>
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-gray-800">{leaderGroupBuys.length}</span>
                            <span className="text-xs text-gray-400">开团</span>
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-gray-800">{leader.joinedDays}</span>
                            <span className="text-xs text-gray-400">天加入</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 mb-4">
                <div className="flex gap-6 border-b border-gray-200">
                    <button className="pb-2 border-b-2 border-rose-500 font-bold text-gray-800">进行中</button>
                    <button className="pb-2 text-gray-400">历史团购</button>
                    <button className="pb-2 text-gray-400">评价 (128)</button>
                </div>
            </div>

            {/* Group Buy List */}
            <div className="px-4 space-y-3">
                {leaderGroupBuys.map(g => (
                    <div key={g.id} onClick={() => push('ProductDetail', { id: g.id })} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm active:scale-95 transition-transform">
                        <div className={`w-24 h-24 rounded-lg ${g.image} bg-gray-200 shrink-0`} />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-gray-800 line-clamp-2">{g.title}</h3>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{g.status}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-rose-500 font-bold">¥{g.price}</span>
                                <span className="text-xs text-gray-400">已售 {g.progress}%</span>
                            </div>
                        </div>
                    </div>
                ))}
                {leaderGroupBuys.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-sm">暂无进行中的团购</div>
                )}
            </div>
        </div>
    );
};

export default LeaderProfile;
