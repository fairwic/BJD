import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Clock } from 'lucide-react';

const ProductDetail = () => {
    const { currentRoute, pop, push } = useRouter();
    const { createOrder, groupBuys, currentUser } = useApp();
    const { id } = currentRoute.params;

    const product = groupBuys.find(g => g.id === id);
    const [selectedSku, setSelectedSku] = useState(null);

    if (!product) return <div>Product not found</div>;

    const handlePayDeposit = () => {
        if (!selectedSku) {
            alert('请选择规格');
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
        <div className="min-h-screen bg-white pb-24">
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
                        <p className="text-xs text-gray-400">定金 ¥{product.deposit}</p>
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
                        <span className="text-xs text-gray-500">工期保障</span>
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
                    {selectedSku ? `支付定金 ¥${product.deposit}` : '请选择规格'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
