import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Clock, Gift, Unlock, Lock, Trophy, MessageCircle, RefreshCw, Tag, X, Check } from 'lucide-react';

const ProductDetail = () => {
    const { currentRoute, pop, push } = useRouter();
    const { createOrder, groupBuys, currentUser } = useApp();
    const { id, type } = currentRoute.params || {};

    const [selectedSku, setSelectedSku] = useState(null);
    const [showBarterModal, setShowBarterModal] = useState(false);
    const [selectedMyItem, setSelectedMyItem] = useState(null);
    const [barterMessage, setBarterMessage] = useState('');

    // ... existing code ...
    const MY_ITEMS = [
        { id: 1001, title: "万叶 同款色纸", image: "/images/stand.png", condition: "全新无损" },
        { id: 1002, title: "流浪者 粘土人", image: "/images/plush.png", condition: "仅拆摆" },
    ];
    const SECOND_HAND_ITEMS = [
        {
            id: 101, // Goods
            title: "【出】原神 散兵 模玩熊特典 色纸",
            price: 45.0,
            originalPrice: 60.0,
            image: "/images/stand.png",
            seller: { name: "吃土少女A", avatar: "bg-pink-200", credit: "极好" },
            description: "全新未拆，默认初伤。走闲鱼验货宝，包邮。",
            images: ["/images/stand.png", "/images/badge.png"],
            skus: [{ id: 1, name: "现货" }],
            tags: ["原神", "散兵", "全新"],
            condition: "全新"
        },
        {
            id: 201, // BJD
            title: "【AS华熙】自养4分男娃 普肌 单头/整娃",
            price: 850.0,
            originalPrice: 1200.0,
            image: "/images/bjd.png",
            seller: { name: "养娃大户", avatar: "bg-amber-200", credit: "极好" },
            description: "自养AS华熙，普肌，无妆。身体状态良好，关节紧实。带出生证、官箱。",
            images: ["/images/bjd.png", "/images/bjd.png"],
            skus: [{ id: 1, name: "整娃" }],
            tags: ["AS", "华熙", "4分", "BJD"],
            condition: "85新"
        },
        {
            id: 301, // Service
            title: "【妆面接单】BJD/二次元面妆 仿官妆 自由妆",
            price: "200起", // Text price
            originalPrice: null,
            image: "/images/commission.png",
            seller: { name: "云墨妆坊", avatar: "bg-rose-300", credit: "认证妆师" },
            description: "接BJD各尺寸妆面，二次元风格为主。擅长仿官妆、自由妆。工期约2周。",
            images: ["/images/commission.png"],
            tags: ["妆面", "BJD", "接单"],
            condition: "服务"
        }
    ];

    const BARTER_ITEMS = [
        {
            id: 501,
            title: "原神 散兵 模玩熊特典 色纸", // Have
            want: "万叶 同款色纸", // Want
            image: "/images/badge.png",
            user: { name: "吃土求回血", avatar: "bg-orange-200" },
            description: "想换万叶的！只换不售！",
            tags: ["全新", "可补差价"],
            distance: "2.3km"
        }
    ];

    // --- Data Resolution ---
    let product;
    let isService = type === 'service';
    let isSecondHand = type === 'secondhand' || isService; // Reuse logic for now, but distinguish via flag
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
            setShowBarterModal(true);
        } else if (isService) {
            alert('模拟: 跳转约稿沟通/支付定金');
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
            <div className="w-full aspect-square relative bg-gray-100">
                 <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                />
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
                                <p className="text-rose-500 font-bold text-2xl">
                                    {typeof product.price === 'number' ? `¥${product.price}` : product.price}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {isService ? '参考价' : (isSecondHand ? (product.originalPrice ? `原价 ¥${product.originalPrice}` : '') : `定金 ¥${product.deposit}`)}
                                </p>
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
                            ? (isService ? "立即预约" : "我想要")
                            : (selectedSku
                                ? (product.type === 'spot' ? `立即购买 ¥${product.price}` : `支付定金 ¥${product.deposit}`)
                                : '请选择规格')
                        }
                    </button>
                )}
            </div>
            {/* Barter Modal */}
            {showBarterModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">发起交换</h3>
                                <p className="text-xs text-gray-500 mt-1">选择你持有的物品进行交换</p>
                            </div>
                            <button
                                onClick={() => setShowBarterModal(false)}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* My Items Selection */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-accent rounded-full"></span>
                                选择持有物品
                            </h4>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                {MY_ITEMS.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedMyItem(item)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                            selectedMyItem?.id === item.id
                                                ? "border-accent bg-accent/5 ring-1 ring-accent"
                                                : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                                        }`}
                                    >
                                        <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden bg-white">
                                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-sm text-gray-800 truncate">{item.title}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{item.condition}</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                            selectedMyItem?.id === item.id
                                                ? "bg-accent border-accent text-white"
                                                : "border-gray-300 bg-white"
                                        }`}>
                                            {selectedMyItem?.id === item.id && <Check size={12} strokeWidth={3} />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-3 py-2 text-xs font-bold text-accent border border-dashed border-accent/40 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors">
                                + 添加新物品
                            </button>
                        </div>

                        {/* Message Input */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-green-500 rounded-full"></span>
                                留言备注
                            </h4>
                            <textarea
                                value={barterMessage}
                                onChange={(e) => setBarterMessage(e.target.value)}
                                placeholder="向对方描述你的置换诚意，或者补充物品细节..."
                                className="w-full h-24 bg-gray-50 p-3 rounded-xl text-sm outline-none border border-transparent focus:border-accent/50 focus:bg-white transition-all resize-none placeholder:text-gray-400"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowBarterModal(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={() => {
                                    if (!selectedMyItem) {
                                        alert("请先选择一个用于交换的物品");
                                        return;
                                    }
                                    alert(`已发送交换请求！\n使用物品：${selectedMyItem.title}\n留言：${barterMessage}`);
                                    setShowBarterModal(false);
                                    setBarterMessage('');
                                    setSelectedMyItem(null);
                                }}
                                disabled={!selectedMyItem}
                                className="flex-[2] py-3 rounded-xl font-bold text-white bg-gradient-to-r from-accent to-accent-dark hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:shadow-none transition-all"
                            >
                                确认发起交换
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
