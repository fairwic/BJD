import React, { useState, useEffect } from 'react';
import { useRouter } from '../router/RouteStack';
import api from '../data/apiMock';
import { ArrowLeft, RefreshCw, ChevronRight, Check } from 'lucide-react';

export default function BarterInitiate() {
    const { currentRoute, pop } = useRouter();
    const targetProduct = currentRoute.params?.product;

    const [serviceType, setServiceType] = useState('direct'); // 'direct', 'platform'
    const [myCreditScore, setMyCreditScore] = useState(750); // Mock score
    
    const [myProducts, setMyProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cashTopUp, setCashTopUp] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock current user ID
    const currentUserId = 'u1'; 

    useEffect(() => {
        // Load my products (in a real app this would be an API call)
        const loadMyProducts = async () => {
             // Simulating fetching "My Store" items
             const products = [
                 {
                     id: 101,
                     title: '闲置4分BJD素体',
                     image: 'https://img.kwcdn.com/product/open/b9aed2e34c41492885b740fd8b520bb1-goods.jpeg',
                     price: 120,
                     tags: ['4分', '二手']
                 },
                 {
                     id: 102,
                     title: '全新未拆封假发',
                     image: 'bg-gray-200',
                     price: 50,
                     tags: ['假发', '全新']
                 },
                 {
                     id: 103,
                     title: '手工娃衣三件套',
                     image: 'bg-pink-100',
                     price: 180,
                     tags: ['娃衣']
                 }
             ];
             setMyProducts(products);
        };
        loadMyProducts();
    }, []);

    const handleSubmit = async () => {
        // V1.5 Credit Threshold
        if (myCreditScore < 600) {
            alert('您的信用分过低，暂无法发起换物。请多参与团购积累信用。');
            return;
        }

        if (!selectedProduct) return;
        setLoading(true);
        try {
            const proposal = {
                initiatorId: currentUserId, 
                targetUserId: targetProduct.shopId || 'u2',
                initiatorProduct: selectedProduct,
                targetProduct: targetProduct,
                cashTopUp: Number(cashTopUp) || 0,
                serviceType // Direct or Platform
            };
            
            await api.barter.createProposal(proposal);
            
            alert('换物提议已发送！等待对方确认。');
            pop();
        } catch (error) {
            console.error(error);
            alert('发送失败');
        } finally {
            setLoading(false);
        }
    };

    if (!targetProduct) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm px-4 h-14 flex items-center justify-between">
                <button onClick={pop} className="p-2 -ml-2">
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-lg font-medium text-gray-900">发起以物换物</h1>
                <div className="w-8" />
            </div>

            <div className="p-4 space-y-6">
                
                {/* V1.5 Credit Score Banner */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg flex justify-between items-center shadow-md">
                     <span className="text-xs opacity-90">当前芝麻信用分</span>
                     <span className="font-bold text-lg">{myCreditScore}</span>
                </div>

                {/* Target Product (User B's Item) */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500">对方商品</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            参考价 ¥{targetProduct.price}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <div className={`w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative`}>
                            {targetProduct.image?.startsWith('http') ? (
                                <img src={targetProduct.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full ${targetProduct.image || 'bg-gray-200'}`} />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{targetProduct.title}</h3>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gray-200" />
                                <span className="text-xs text-gray-500">{targetProduct.shop || targetProduct.user?.name || '卖家'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exchange Icon */}
                <div className="flex justify-center -my-3 relative z-10">
                    <div className="bg-white p-2 rounded-full shadow-md border border-gray-100">
                        <RefreshCw className="w-6 h-6 text-rose-500" />
                    </div>
                </div>

                {/* My Product Selection */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500">选择我的置换物品</span>
                        <button className="text-xs text-rose-500 font-medium flex items-center">
                            更多物品 <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {myProducts.map(product => (
                            <div 
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                    selectedProduct?.id === product.id 
                                        ? 'border-rose-500 bg-rose-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0 relative`}>
                                     {product.image?.startsWith('http') ? (
                                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={`w-full h-full ${product.image || 'bg-gray-200'}`} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.title}</h4>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">估值 ¥{product.price}</span>
                                        {selectedProduct?.id === product.id && (
                                            <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* V2.0 Service Selection (Safe Mode) */}
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <h4 className="text-sm font-medium text-gray-500 mb-3">交换模式</h4>
                     <div className="grid grid-cols-2 gap-3">
                         <div 
                             onClick={() => setServiceType('direct')}
                             className={`p-3 rounded-lg border text-center cursor-pointer transition-all relative overflow-hidden ${
                             serviceType === 'direct' ? 'border-rose-500 bg-rose-50 shadow-sm' : 'border-gray-200 bg-gray-50'
                         }`}>
                             {serviceType === 'direct' && <div className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-bl-lg"><Check size={8} /></div>}
                             <div className="font-bold text-sm text-gray-800">互保直寄</div>
                             <div className="text-[10px] text-gray-500 mt-1">需付押金 · 视频存证</div>
                         </div>
                         <div 
                             onClick={() => setServiceType('platform')}
                             className={`p-3 rounded-lg border text-center cursor-pointer transition-all relative overflow-hidden ${
                             serviceType === 'platform' ? 'border-rose-500 bg-rose-50 shadow-sm' : 'border-gray-200 bg-gray-50'
                         }`}>
                             {serviceType === 'platform' && <div className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-bl-lg"><Check size={8} /></div>}
                              <div className="font-bold text-sm text-gray-800">平台验货 <span className="text-[8px] bg-yellow-100 text-yellow-700 px-1 rounded">推荐</span></div>
                             <div className="text-[10px] text-gray-500 mt-1">验货费 ¥49 · 100%安全</div>
                         </div>
                     </div>
                 </div>

                {/* Cash Top Up */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-500">补差价 (现金)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">我额外支付</span>
                        <div className="flex-1 relative">
                             <input 
                                type="number" 
                                value={cashTopUp}
                                onChange={e => setCashTopUp(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-6 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">¥</span>
                        </div>
                    </div>
                     <p className="mt-2 text-xs text-gray-400">
                        * 平台将担保资金安全，交易成功后转给卖家
                    </p>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom">
                 <button 
                    onClick={handleSubmit}
                    disabled={!selectedProduct || loading}
                    className={`w-full py-3.5 rounded-full font-medium text-white shadow-lg shadow-rose-500/20 active:scale-[0.98] transition-all flex items-center justify-center
                        ${(!selectedProduct || loading) ? 'bg-gray-300 shadow-none cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-pink-600'}
                    `}
                >
                    {loading ? '提交中...' : `提交置换提议 ${serviceType === 'platform' ? '(含验货)' : ''}`}
                </button>
            </div>
        </div>
    );
}
