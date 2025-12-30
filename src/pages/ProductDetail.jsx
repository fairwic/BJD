import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Clock, Gift, Unlock, Lock, Trophy, MessageCircle, RefreshCw, Tag } from 'lucide-react';

const ProductDetail = () => {
    const { currentRoute, pop, push } = useRouter();
    const { createOrder, groupBuys, currentUser } = useApp();
    const { id, type } = currentRoute.params || {};

    const [selectedSku, setSelectedSku] = useState(null);

    // --- Mock Data for New Types ---
    const SECOND_HAND_ITEMS = [
        {
            id: 101,
            title: "【出】原神 散兵 模玩熊特典 色纸",
            price: 45.0,
            originalPrice: 60.0,
            image: "bg-blue-100",
            seller: { name: "吃土少女A", avatar: "bg-pink-200", credit: "极好" },
            description: "全新未拆，默认初伤。走闲鱼验货宝，包邮。",
            images: ["bg-blue-100", "bg-blue-200"],
            skus: [{ id: 1, name: "现货" }],
            tags: ["原神", "散兵", "全新"],
            condition: "全新"
        },
        // Fallback or more items...
    ];

    const BARTER_ITEMS = [
        {
            id: 501,
            title: "原神 散兵 模玩熊特典 色纸", // Have
            want: "万叶 同款色纸", // Want
            image: "bg-blue-100",
            user: { name: "吃土求回血", avatar: "bg-orange-200" },
            description: "想换万叶的！只换不售！",
            tags: ["全新", "可补差价"],
            distance: "2.3km"
        }
    ];

    // --- Data Resolution ---
    let product;
    let isSecondHand = type === 'secondhand';
    let isBarter = type === 'barter';
    let isGroupBuy = !isSecondHand && !isBarter;

    if (isSecondHand) {
        product = SECOND_HAND_ITEMS.find(i => i.id === Number(id)) || SECOND_HAND_ITEMS[0]; // Fallback for demo
    } else if (isBarter) {
        product = BARTER_ITEMS.find(i => i.id === Number(id)) || BARTER_ITEMS[0];
    } else {
        product = groupBuys.find(g => g.id === id);
    }

    if (!product) return <div className="p-10 text-center text-gray-400">商品不存在或已下架</div>;

    const handleAction = () => {
        if (isBarter) {
            alert('模拟: 发起交换请求');
        } else if (isSecondHand) {
            alert('模拟: 跳转闲鱼支付');
        } else {
            // Group Buy Logic
            if (!selectedSku) {
                alert('请选择规格');
                return;
            }
            if (product.type === 'spot') {
                alert('模拟功能：已加入购物车/跳转支付');
                return;
            }
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
        }
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

            {/* Image Section */}
            <div className={`w-full aspect-square ${product.image} relative`}>
                {isSecondHand && (
                    <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md shadow-lg">
                        {product.condition}
                    </div>
                )}
                {isBarter && (
                    <div className="absolute bottom-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md shadow-lg flex items-center gap-1">
                        <RefreshCw size={14} />
                        只换不售
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title & Price */}
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-xl font-bold text-gray-900 flex-1 mr-4">{product.title}</h1>
                    <div className="text-right">
                        {isBarter ? (
                            <span className="text-accent font-bold text-lg">求交换</span>
                        ) : (
                            <>
                                <p className="text-rose-500 font-bold text-2xl">¥{product.price}</p>
                                <p className="text-xs text-gray-400">{isSecondHand ? `原价 ¥${product.originalPrice}` : `定金 ¥${product.deposit}`}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Seller / User Info */}
                <div className="bg-white p-4 mt-3 flex items-center justify-between border border-gray-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${isBarter ? product.user?.avatar : (isSecondHand ? product.seller?.avatar : "bg-gray-200")}`} />
                        <div>
                            <p className="font-bold text-sm text-gray-800">
                                {isBarter ? product.user?.name : (isSecondHand ? product.seller?.name : product.leader)}
                            </p>
                            <p className="text-xs text-gray-400">
                                {isBarter ? `距离 ${product.distance}` : (isSecondHand ? `信用 ${product.seller?.credit}` : '信用极好')}
                            </p>
                        </div>
                    </div>
                    <button className="text-gray-500 text-xs border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                        <MessageCircle size={12} />
                        私聊
                    </button>
                </div>

                {/* Barter Specific: Want Item */}
                {isBarter && (
                    <div className="mt-4 bg-rose-50 border border-rose-100 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded font-bold">求换</span>
                            <span className="font-bold text-gray-800">{product.want}</span>
                        </div>
                        <p className="text-xs text-gray-500">期望对方: {product.tags?.join(' / ')}</p>
                    </div>
                )}

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-4 mt-4 mb-6">
                    <h3 className="font-bold text-sm mb-2 text-gray-800">
                        {isBarter ? "交换说明" : "商品详情"}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* SKU for Group Buy */}
                {isGroupBuy && product.skus && (
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
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {(product.tags || []).map((tag, i) => (
                        <div key={i} className="flex items-center gap-1 bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs">
                            <Tag size={12} />
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex items-center gap-4 max-w-md mx-auto z-20">
                <div className="flex flex-col items-center gap-1 text-gray-400">
                    <ShoppingBag size={20} />
                    <span className="text-[10px]">{isBarter ? "广场" : "店铺"}</span>
                </div>

                {isBarter ? (
                    <button
                        onClick={handleAction}
                        className="flex-1 bg-gradient-to-r from-accent to-accent-dark text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
                    >
                        发起交换
                    </button>
                ) : (
                    <button
                        onClick={handleAction}
                        disabled={isGroupBuy && !selectedSku}
                        className={`flex-1 font-bold py-3 rounded-xl transition-colors ${isSecondHand
                                ? "bg-gray-900 text-white hover:bg-gray-800"
                                : "bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            }`}
                    >
                        {isSecondHand
                            ? "我想要"
                            : (selectedSku
                                ? (product.type === 'spot' ? `立即购买 ¥${product.price}` : `支付定金 ¥${product.deposit}`)
                                : '请选择规格')
                        }
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
