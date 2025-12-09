import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Clock, Gift, Unlock, Lock, Trophy } from 'lucide-react';

const ProductDetail = () => {
    const { currentRoute, pop, push } = useRouter();
    const { createOrder, groupBuys, currentUser } = useApp();
    const { id } = currentRoute.params;

    const product = groupBuys.find(g => g.id === id);
    const [selectedSku, setSelectedSku] = useState(null);

    if (!product) return <div>Product not found</div>;

    const isSpot = product.type === 'spot';

    const handlePayDeposit = () => {
        if (!selectedSku) {
            alert('请选择规格');
            return;
        }

        if (isSpot) {
            alert('模拟功能：已加入购物车/跳转支付');
            return;
        }

        // Navigate to Contract Signing instead of direct payment
        push('ContractSigning', {
            orderData: {
                groupBuyId: product.id,
                skuId: selectedSku.id,
                title: product.title,
                userName: currentUser.name,
                leaderName: product.leader,
                deposit: product.deposit
            }
        });
    };

    return (
        <div className="h-full overflow-y-auto bg-white pb-24 scrollbar-hide">
            {/* Header */}
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/80 backdrop-blur">
                <button onClick={pop} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-3">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><Share2 size={20} /></button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><Heart size={20} /></button>
                </div>
            </div>

            {/* Image */}
            <div className={`w-full aspect-square ${product.image} relative`}>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                    {product.status}
                </div>
            </div>

            {/* Info */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-xl font-bold text-gray-900 flex-1 mr-4">{product.title}</h1>
                    <div className="text-right">
                        <p className="text-rose-500 font-bold text-2xl">¥{product.price}</p>
                        <p className="text-xs text-gray-400">{isSpot ? '现货速发' : `定金 ¥${product.deposit}`}</p>
                    </div>
                </div>

                {/* Leader Info */}
                <div className="bg-white p-4 mt-3 flex items-center justify-between" onClick={() => push('LeaderProfile', { name: product.leader })}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <div>
                            <p className="font-bold text-sm text-gray-800">{product.leader}</p>
                            <p className="text-xs text-gray-400">信用极好 · 1250 粉丝</p>
                        </div>
                    </div>
                    <button className="text-rose-500 text-xs border border-rose-500 px-3 py-1 rounded-full">
                        进店逛逛
                    </button>
                </div>

                {/* Unlock Map (Gamification) - ONLY for Group Buys */}
                {!isSpot && (
                    <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-2xl p-5 text-white mt-4 mb-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Trophy size={100} />
                        </div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Gift className="text-amber-400" />
                                    阶梯解锁奖励
                                </h3>
                                <p className="text-white/60 text-xs mt-1">当前团购份数: <span className="text-amber-400 font-bold text-lg">382</span> / 500</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-white/20 px-2 py-1 rounded text-xs">解锁进度 76%</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            {/* Progress Bar Background */}
                            <div className="h-2 bg-black/30 rounded-full mb-8 relative">
                                {/* Active Progress */}
                                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000" style={{ width: '76%' }} />

                                {/* Checkpoints */}
                                {[
                                    { count: 100, label: '成团', unlocked: true },
                                    { count: 300, label: '特典眼珠', unlocked: true },
                                    { count: 500, label: '特殊肤色', unlocked: false },
                                ].map((stage, idx) => (
                                    <div
                                        key={idx}
                                        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                                        style={{ left: `${(stage.count / 500) * 100}%` }}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${stage.unlocked
                                            ? 'bg-amber-400 border-amber-400 text-indigo-900'
                                            : 'bg-indigo-900 border-gray-600 text-gray-500'
                                            }`}>
                                            {stage.unlocked ? <Unlock size={14} strokeWidth={3} /> : <Lock size={14} />}
                                        </div>
                                        <span className={`text-[10px] mt-2 font-medium whitespace-nowrap ${stage.unlocked ? 'text-amber-400' : 'text-gray-400'
                                            }`}>
                                            {stage.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3 border border-white/10">
                                <div className="bg-indigo-800 p-2 rounded-lg">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-200">下一阶段: 特殊肤色开放</div>
                                    <div className="text-xs text-gray-400">还差 118 单解锁，快邀请好友吧！</div>
                                </div>
                                <button className="bg-amber-500 text-indigo-900 text-xs font-bold px-3 py-1.5 rounded-full">
                                    去邀请
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-sm mb-2 text-gray-800">商品详情</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* SKU Selection */}
                <div className="mb-8">
                    <h3 className="font-bold text-sm mb-3 text-gray-800">选择规格</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.skus.map(sku => (
                            <button
                                key={sku.id}
                                onClick={() => setSelectedSku(sku)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${selectedSku?.id === sku.id
                                    ? 'border-rose-500 bg-rose-50 text-rose-600'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {sku.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <ShieldCheck size={20} className="text-green-500" />
                        <span className="text-xs text-gray-500">实名认证</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <Clock size={20} className="text-blue-500" />
                        <span className="text-xs text-gray-500">{isSpot ? '极速发货' : '工期保障'}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <ShoppingBag size={20} className="text-purple-500" />
                        <span className="text-xs text-gray-500">售后无忧</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex items-center gap-4 max-w-md mx-auto">
                <div className="flex flex-col items-center gap-1 text-gray-400">
                    <ShoppingBag size={20} />
                    <span className="text-[10px]">店铺</span>
                </div>
                <button
                    onClick={handlePayDeposit}
                    disabled={!selectedSku}
                    className="flex-1 bg-gray-900 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                    {selectedSku
                        ? (isSpot ? `立即购买 ¥${product.price}` : `支付定金 ¥${product.deposit}`)
                        : '请选择规格'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
