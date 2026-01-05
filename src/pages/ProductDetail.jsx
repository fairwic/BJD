import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Share2, Heart, ShoppingBag, ShieldCheck, Clock, Gift, Unlock, Lock, Trophy, MessageCircle, RefreshCw, Tag, X, Check } from 'lucide-react';
import { MOCK_BARTER_ITEMS as BARTER_ITEMS } from '../data/mock';

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
        },
        {
            id: 302, // Service Request (Client needs Artist)
            title: "【求妆】6分 DZ 莫纹",
            price: "预算300",
            originalPrice: null,
            image: "/images/doll_head.png", // Mock
            seller: { name: "富婆妹妹", avatar: "bg-purple-300", credit: "信用极好" },
            description: "求一位擅长古风/真人的劳斯。不需要太浓的妆面。甚至可以稍微淡一点。工期不急。",
            images: ["/images/doll_head.png"],
            tags: ["求妆", "DZ", "6分"],
            condition: "求购", // or 需求
            type: 'service_request'
        }
    ];



    // --- Data Resolution ---
    // --- Data Resolution ---

    // Priority: Check if it's a known Barter Item
    const barterItem = BARTER_ITEMS.find(i => i.id === Number(id));

    let product;
    if (barterItem) {
        product = barterItem;
    } else {
        // Search in Second Hand Items
        product = SECOND_HAND_ITEMS.find(i => i.id === Number(id));
        if (!product) {
            // Search in Group Buys
            product = groupBuys.find(g => g.id === id);
        }
    }

    if (!product) return <div className="p-10 text-center text-gray-400">商品不存在或已下架</div>;

    const isBarter = !!barterItem || type === 'barter';
    // Service Logic: detailed check
    // If ID is 301, it's an Offer. If 302, it's a Request. 
    // In real app, check product.category or type.
    const isService = product.tags?.includes('妆面') || product.tags?.includes('接单') || product.tags?.includes('求妆');
    const isServiceRequest = product.type === 'service_request' || product.title.includes('求');

    // Legacy flags
    const isSecondHand = !isBarter && !isService && (type === 'secondhand'); // basic goods
    const isGroupBuy = !isSecondHand && !isBarter && !isService;

    const handleAction = () => {
        if (isBarter) {
            push('BarterInitiate', { product });
        } else if (isService) {
            if (isServiceRequest) {
                // Artist applying to a request
                push('CommissionApply', { product });
            } else {
                // Client booking a service
                push('OrderCheckout', { product, sku: { name: '服务定金' } });
            }
        } else if (isSecondHand) {
            push('OrderCheckout', { product });
        } else {
            // Group Buy Logic
            if (!selectedSku) {
                alert('请选择规格');
                return;
            }
            if (product.type === 'spot') {
                push('OrderCheckout', { product, sku: selectedSku });
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
        <div className="h-full overflow-y-auto bg-gradient-to-b from-gray-50 to-white pb-24 scrollbar-hide">
            {/* Glassmorphism Header */}
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/70 backdrop-blur-xl border-b border-white/50">
                <button onClick={pop} className="p-2 bg-white/80 rounded-full hover:bg-white shadow-sm active:scale-95 transition-all">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-3">
                    <button className="p-2 bg-white/80 rounded-full hover:bg-white shadow-sm active:scale-95 transition-all"><Share2 size={20} /></button>
                    <button className="p-2 bg-white/80 rounded-full hover:bg-white shadow-sm active:scale-95 transition-all"><Heart size={20} /></button>
                </div>
            </div>

            {/* Image Section with Gradient Overlay */}
            <div className="w-full aspect-square relative bg-gray-100 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {isSecondHand && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md shadow-lg">
                        {product.condition}
                    </div>
                )}
                {isBarter && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        <RefreshCw size={14} />
                        只换不售
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title & Price */}
                <div className="flex justify-between items-start mb-3">
                    <h1 className="text-xl font-display font-bold text-gray-900 flex-1 mr-4 leading-tight">{product.title}</h1>
                    <div className="text-right">
                        {isBarter ? (
                            <span className="text-purple-500 font-bold text-lg">求交换</span>
                        ) : (
                            <>
                                <p className="text-rose-500 font-extrabold text-2xl">
                                    {typeof product.price === 'number' ? `¥${product.price}` : product.price}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {isService ? '参考价' : (isSecondHand ? (product.originalPrice ? `原价 ¥${product.originalPrice}` : '') : `定金 ¥${product.deposit}`)}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Seller / User Info - Claymorphism */}
                <div className="bg-white p-4 mt-3 flex items-center justify-between rounded-2xl shadow-clay-sm border border-gray-100/50 hover:shadow-clay-md transition-shadow">
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

            {/* Bottom Bar - Glassmorphism */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-white/50 flex items-center gap-4 max-w-md mx-auto z-20 safe-area-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-rose-500 transition-colors">
                    <ShoppingBag size={20} />
                    <span className="text-[10px] font-medium">{isBarter ? "广场" : "店铺"}</span>
                </div>

                {isBarter ? (
                    <button
                        onClick={handleAction}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200/50 hover:shadow-xl active:scale-[0.98] transition-all"
                    >
                        发起交换
                    </button>
                ) : (
                    <button
                        onClick={handleAction}
                        disabled={isGroupBuy && !selectedSku}
                        className={`flex-1 font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] ${isSecondHand
                            ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-300/50"
                            : "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            }`}
                    >
                        {isSecondHand || isService
                            ? (isService
                                ? (isServiceRequest ? "立即应征" : "立即预约")
                                : "我想要")
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
