import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Award, Lock, Share2, Gift } from 'lucide-react';

const AchievementCenter = () => {
    const { pop } = useRouter();
    const { currentUser, orders } = useApp();

    // 成就数据
    const achievements = [
        {
            id: 'newbie_badge',
            category: '新手成就',
            name: '入坑徽章',
            description: '完成首次参团',
            icon: '🎉',
            progress: orders.filter(o => o.userId === currentUser.id).length,
            required: 1,
            reward: {
                badge: true,
                coupon: 10,
                credit: 5
            },
            unlocked: orders.filter(o => o.userId === currentUser.id).length >= 1,
            unlockedAt: '2023-10-01',
            rarity: 1,
            totalUnlocked: 12450
        },
        {
            id: 'real_name',
            category: '新手成就',
            name: '实名玩家',
            description: '完成实名认证',
            icon: '📝',
            progress: currentUser.isRealName ? 1 : 0,
            required: 1,
            reward: {
                badge: true,
                credit: 10
            },
            unlocked: currentUser.isRealName,
            unlockedAt: currentUser.isRealName ? '2023-10-05' : null,
            rarity: 1,
            totalUnlocked: 8230
        },
        {
            id: 'shopaholic',
            category: '购物成就',
            name: '剁手王',
            description: '参与5次团购',
            icon: '🛍️',
            progress: orders.filter(o => o.userId === currentUser.id).length,
            required: 5,
            reward: {
                badge: true,
                coupon: 50,
                credit: 15
            },
            unlocked: orders.filter(o => o.userId === currentUser.id).length >= 5,
            unlockedAt: null,
            rarity: 2,
            totalUnlocked: 3456
        },
        {
            id: 'rich',
            category: '购物成就',
            name: '壕无人性',
            description: '累计消费10,000元',
            icon: '💎',
            progress: 2500,
            required: 10000,
            reward: {
                badge: true,
                coupon: 200,
                credit: 30
            },
            unlocked: false,
            unlockedAt: null,
            rarity: 3,
            totalUnlocked: 567
        },
        {
            id: 'transfer_master',
            category: '购物成就',
            name: '转单达人',
            description: '成功转让3次订单',
            icon: '🔄',
            progress: 0,
            required: 3,
            reward: {
                badge: true,
                coupon: 30,
                credit: 10
            },
            unlocked: false,
            unlockedAt: null,
            rarity: 2,
            totalUnlocked: 1234
        },
        {
            id: 'social_butterfly',
            category: '社交成就',
            name: '晒图达人',
            description: '发布10条动态',
            icon: '📸',
            progress: 0,
            required: 10,
            reward: {
                badge: true,
                coupon: 20,
                credit: 10
            },
            unlocked: false,
            unlockedAt: null,
            rarity: 2,
            totalUnlocked: 2345
        },
        {
            id: 'popular',
            category: '社交成就',
            name: '人气王',
            description: '获得100个赞',
            icon: '❤️',
            progress: 0,
            required: 100,
            reward: {
                badge: true,
                coupon: 30,
                credit: 15
            },
            unlocked: false,
            unlockedAt: null,
            rarity: 2,
            totalUnlocked: 1890
        },
        {
            id: 'chatterbox',
            category: '社交成就',
            name: '话痨',
            description: '发表50条评论',
            icon: '💬',
            progress: 0,
            required: 50,
            reward: {
                badge: true,
                coupon: 15,
                credit: 8
            },
            unlocked: false,
            unlockedAt: null,
            rarity: 2,
            totalUnlocked: 3456
        }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    // 筛选成就
    const filteredAchievements = activeCategory === 'all'
        ? achievements
        : achievements.filter(a => a.category === activeCategory);

    // 统计
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const progressPercent = Math.round((unlockedCount / totalCount) * 100);

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 1: return 'from-gray-400 to-gray-600';
            case 2: return 'from-blue-400 to-blue-600';
            case 3: return 'from-purple-400 to-purple-600';
            default: return 'from-gray-400 to-gray-600';
        }
    };

    const getRarityLabel = (rarity) => {
        switch (rarity) {
            case 1: return '普通';
            case 2: return '稀有';
            case 3: return '史诗';
            default: return '普通';
        }
    };

    const AchievementCard = ({ achievement }) => (
        <div
            className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                achievement.unlocked
                    ? 'border-rose-200 shadow-rose-100'
                    : 'border-gray-100 opacity-60'
            }`}
        >
            <div className="flex items-start gap-4">
                {/* 图标 */}
                <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl relative ${
                        achievement.unlocked
                            ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}`
                            : 'bg-gray-200'
                    }`}
                >
                    {achievement.unlocked ? achievement.icon : '🔒'}
                    {achievement.unlocked && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                            <Award size={12} />
                        </div>
                    )}
                </div>

                {/* 信息 */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{achievement.name}</h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            achievement.rarity === 3 ? 'bg-purple-100 text-purple-600' :
                            achievement.rarity === 2 ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                        }`}>
                            {getRarityLabel(achievement.rarity)}
                        </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2">{achievement.description}</p>

                    {/* 进度条 */}
                    {!achievement.unlocked && (
                        <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">进度</span>
                                <span className="font-bold text-gray-700">
                                    {achievement.progress}/{achievement.required}
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full transition-all"
                                    style={{ width: `${Math.min((achievement.progress / achievement.required) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* 奖励 */}
                    <div className="flex flex-wrap gap-2 text-xs">
                        {achievement.reward.badge && (
                            <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-full">
                                🏆 虚拟徽章
                            </span>
                        )}
                        {achievement.reward.coupon && (
                            <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full">
                                🎁 {achievement.reward.coupon}元优惠券
                            </span>
                        )}
                        {achievement.reward.credit && (
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                ⭐ +{achievement.reward.credit}信用分
                            </span>
                        )}
                    </div>

                    {/* 解锁信息 */}
                    {achievement.unlocked && (
                        <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-gray-400">
                                解锁于 {achievement.unlockedAt}
                            </span>
                            <button className="text-rose-500 flex items-center gap-1">
                                <Share2 size={12} />
                                分享
                            </button>
                        </div>
                    )}

                    {/* 稀有度 */}
                    <div className="mt-2 text-xs text-gray-400">
                        {achievement.totalUnlocked.toLocaleString()} 人已解锁
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">成就中心</h1>
            </div>

            {/* 总体进度 */}
            <div className="p-4 bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100">
                <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {unlockedCount}/{totalCount}
                            </h2>
                            <p className="text-sm text-gray-500">已解锁成就</p>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            {progressPercent}%
                        </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-rose-400 via-purple-500 to-blue-500 h-full rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* 分类筛选 */}
            <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {['all', '新手成就', '购物成就', '社交成就'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                activeCategory === cat
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {cat === 'all' ? '全部成就' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 成就列表 */}
            <div className="p-4 space-y-3">
                {filteredAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>

            {/* 奖励说明 */}
            <div className="mx-4 mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                    <Gift size={20} className="text-orange-500" />
                    <h3 className="font-bold text-gray-800">奖励说明</h3>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 虚拟徽章可在个人主页展示</li>
                    <li>• 优惠券可在购物时使用</li>
                    <li>• 信用分影响账号权益</li>
                </ul>
            </div>
        </div>
    );
};

export default AchievementCenter;

