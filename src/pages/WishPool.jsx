import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ROLES } from '../data/mock';
import { ChevronLeft, Flame, Sparkles, ThumbsUp, Plus, Coins, Share2, Rocket, Briefcase } from 'lucide-react';

const WishPool = () => {
    const { pop } = useRouter();
    const { currentUser } = useApp();

    const [wishes, setWishes] = useState([
        { id: 1, title: 'Ringdoll 军阀 再贩', votes: 1250, hot: 98, status: 'negotiating', image: 'bg-red-100', requester: '小A' },
        { id: 2, title: 'Soom 柴郡猫 特体团', votes: 890, hot: 85, status: 'voting', image: 'bg-blue-100', requester: 'CatLover' },
        { id: 3, title: 'Volks 10周年纪念款 复刻', votes: 2300, hot: 100, status: 'success', image: 'bg-yellow-100', requester: 'OldMoney' },
        { id: 4, title: '3分 龙魂 汉风配件包', votes: 450, hot: 40, status: 'voting', image: 'bg-green-100', requester: 'HanFu' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showBoostModal, setShowBoostModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [activeWish, setActiveWish] = useState(null);
    const [newWishTitle, setNewWishTitle] = useState('');

    const handleVote = (id) => {
        setWishes(prev => prev.map(w => w.id === id ? { ...w, votes: w.votes + 1, hot: Math.min(100, w.hot + 1) } : w));
    };

    const openBoostModal = (wish) => {
        setActiveWish(wish);
        setShowBoostModal(true);
    };

    const confirmBoost = () => {
        if (!activeWish) return;
        setWishes(prev => prev.map(w => w.id === activeWish.id ? { ...w, votes: w.votes + 50, hot: Math.min(100, w.hot + 20) } : w));
        setShowBoostModal(false);
        // Maybe show a quick toast here in a real app
    };

    const openShareModal = (wish) => {
        setActiveWish(wish);
        setShowShareModal(true);
    };

    const copyShareText = () => {
        if (!activeWish) return;
        // In a real app, use navigator.clipboard.writeText
        setShowShareModal(false);
    };

    const handleLeaderAction = (id) => {
        setWishes(prev => prev.map(w => w.id === id ? { ...w, status: 'negotiating' } : w));
        // Use a simple custom confirming toast/modal logic if needed, but alert is okay for this distinct admin action for now, 
        // OR we could add a "Negotiate Modal" later. Let's stick to the user requests for now.
        alert('已接单！请尽快前往控制台联系工厂。');
    };

    const handleAddWish = () => {
        if (!newWishTitle.trim()) return;
        const newWish = {
            id: Date.now(),
            title: newWishTitle,
            votes: 1,
            hot: 1,
            status: 'voting',
            image: 'bg-indigo-100',
            requester: '我'
        };
        setWishes([newWish, ...wishes]);
        setNewWishTitle('');
        setShowModal(false);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'voting': return <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[10px]">投票中</span>;
            case 'negotiating': return <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px]">洽谈中</span>;
            case 'success': return <span className="bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded text-[10px]">开团成功</span>;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 pb-12 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={pop} className="hover:bg-white/20 p-1 rounded-lg transition-colors"><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">许愿池</h1>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">说出你的心愿 ✨</h2>
                        <p className="text-white/80 text-xs">票数越高，成团概率越大！团长会优先考虑热门心愿哦。</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 active:scale-95 transition-transform"
                    >
                        <Plus size={16} /> 我要许愿
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="-mt-6 px-4 space-y-3">
                {wishes.map((wish, index) => (
                    <div key={wish.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
                        <div className="flex flex-col items-center justify-center gap-1 min-w-[50px]">
                            <span className={`text-xl font-bold italic ${index < 3 ? 'text-amber-500' : 'text-gray-300'}`}>#{index + 1}</span>
                        </div>

                        <div className={`w-20 h-20 rounded-lg ${wish.image} shrink-0`} />

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-800 truncate pr-2">{wish.title}</h3>
                                {getStatusBadge(wish.status)}
                            </div>

                            <p className="text-xs text-gray-400 mb-3">
                                发起人: {wish.requester}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-orange-500 text-xs font-medium">
                                    <Flame size={14} fill="currentColor" />
                                    <span>热度 {wish.hot}℃</span>
                                </div>

                                <div className="flex gap-2">
                                    {/* Action Buttons */}
                                    <button
                                        onClick={() => openShareModal(wish)}
                                        className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-full"
                                    >
                                        <Share2 size={16} />
                                    </button>

                                    {currentUser?.role === ROLES.LEADER ? (
                                        <button
                                            onClick={() => handleLeaderAction(wish.id)}
                                            disabled={wish.status !== 'voting'}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${wish.status === 'voting'
                                                ? 'bg-gray-900 text-white shadow-md active:scale-95'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <Briefcase size={14} />
                                            <span>{wish.status === 'voting' ? '我有资源' : '已接单'}</span>
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => openBoostModal(wish)}
                                                className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-amber-100 transition-colors"
                                            >
                                                <Coins size={14} />
                                                <span>助燃</span>
                                            </button>
                                            <button
                                                onClick={() => handleVote(wish.id)}
                                                className="flex items-center gap-1.5 bg-rose-50 text-rose-500 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-rose-100 transition-colors"
                                            >
                                                <ThumbsUp size={14} />
                                                <span>{wish.votes}</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-3 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-400 to-rose-500 h-full rounded-full" style={{ width: `${Math.min(wish.hot, 100)}%` }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center py-8 text-gray-400 text-xs">
                没有更多了 ~
            </div>

            {/* Create Wish Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">许个愿吧 ✨</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">心愿内容</label>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="例如：Ringdoll 军阀再贩、Soom 柴郡猫..."
                                    value={newWishTitle}
                                    onChange={(e) => setNewWishTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                                <p className="text-xs text-gray-400 mt-2">描述越详细，越容易被团长看到哦！</p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={handleAddWish}
                                    className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
                                >
                                    提交心愿
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Boost Modal */}
            {showBoostModal && activeWish && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Rocket className="text-amber-500" />
                                    超级助燃
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">让 "{activeWish.title}" 冲上热榜！🔥</p>
                            </div>
                            <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-lg font-bold text-xs">
                                效果翻倍
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 text-sm">支付金额</span>
                                <span className="text-lg font-bold text-gray-900">50 金币</span>
                            </div>
                            <div className="flex justify-between items-center text-amber-600 text-sm font-medium">
                                <span>预计提升</span>
                                <span>热度+20 / 票数+50</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowBoostModal(false)}
                                className="py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm"
                            >
                                算了
                            </button>
                            <button
                                onClick={confirmBoost}
                                className="py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <Coins size={18} />
                                立即支付
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && activeWish && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200 p-8">
                    <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 relative">
                        {/* Card Preview */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-center text-white pb-12">
                            <Sparkles className="mx-auto mb-2 opacity-80" size={32} />
                            <h3 className="font-bold text-lg mb-1">帮我投一票！</h3>
                            <p className="text-white/80 text-xs px-8">"{activeWish.title}" 就差你的支持了</p>
                        </div>
                        <div className="-mt-8 px-6 pb-6">
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center mb-6">
                                <div className="text-xs text-gray-400 mb-1">长按复制口令</div>
                                <div className="font-mono bg-gray-50 py-2 rounded-lg text-rose-500 font-bold select-all">
                                    #BJD心愿#{activeWish.id}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setShowShareModal(false)} className="py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600">取消</button>
                                <button onClick={copyShareText} className="py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium shadow-lg active:scale-95 transition-transform">
                                    复制口令
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishPool;
