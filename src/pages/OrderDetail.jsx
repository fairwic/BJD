import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ORDER_STATUS } from '../data/mock';
import { ChevronLeft, Copy, CheckCircle2, Truck, Clock, AlertCircle, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import TrustTimeline from '../components/TrustTimeline';

const OrderDetail = () => {
    const { currentRoute, pop } = useRouter();
    const { orders, payDeposit, payFinal, generateTransferCode } = useApp();
    const { id } = currentRoute.params;

    const order = orders.find(o => o.id === id);
    const [transferCode, setTransferCode] = useState(null);

    if (!order) return <div>Order not found</div>;

    const handleTransfer = () => {
        const code = generateTransferCode(order.id);
        setTransferCode(code);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(transferCode);
        alert('转单码已复制');
    };

    const timelineStages = [
        { type: 'modeling', name: '原型制作', date: '2023-10-05', photos: ['bg-gray-200', 'bg-gray-300'] },
        { type: 'mold', name: '翻模', date: '2023-11-12', photos: ['bg-orange-100'] },
        { type: 'casting', name: '树脂灌注', date: '2023-12-01', photos: [] },
        { type: 'polishing', name: '打磨', date: null, photos: [] },
        { type: 'makeup', name: '上妆', date: null, photos: [] },
        { type: 'shipping', name: '发货', date: null, photos: [] }
    ];

    // Calculate current stage based on status usually, here we mock it to 'casting' (index 2)
    // for demonstration if status is PRODUCTION
    const currentStageIndex = order.status === ORDER_STATUS.PRODUCTION ? 2 :
        order.status === ORDER_STATUS.WAIT_FINAL ? 4 :
            order.status === ORDER_STATUS.SHIPPED ? 6 : 0;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">订单详情</h1>
            </div>

            {/* Status Card */}
            <div className="m-4 bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                        {order.status === ORDER_STATUS.PRODUCTION ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">
                            {order.status === ORDER_STATUS.UNPAID_DEPOSIT && '等待支付定金'}
                            {order.status === ORDER_STATUS.WAIT_VERIFY && '等待团长审核'}
                            {order.status === ORDER_STATUS.PRODUCTION && '工厂制作中'}
                            {order.status === ORDER_STATUS.WAIT_FINAL && '等待支付尾款'}
                            {order.status === ORDER_STATUS.WAIT_SHIP && '等待发货'}
                            {order.status === ORDER_STATUS.SHIPPED && '卖家已发货'}
                            {order.status === ORDER_STATUS.TRANSFERRED && '订单已转让'}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">预计发货: 2024年5月</p>
                    </div>
                </div>

                {/* Trust Timeline */}
                <div className="mt-8 px-2 relative">
                    <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-800">
                        <ShieldCheck size={18} className="text-green-500" />
                        <span>生产全链路监控</span>
                    </div>
                    <TrustTimeline stages={timelineStages} currentStageIndex={currentStageIndex} />
                </div>
            </div>

            {/* Product Card */}
            <div className="m-4 bg-white p-4 rounded-2xl shadow-sm flex gap-4">
                <div className={`w-20 h-20 rounded-lg ${order.image} shrink-0`} />
                <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-800 line-clamp-2">{order.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">规格: {order.skuName}</p>
                    <div className="mt-2 flex justify-between items-end">
                        <span className="text-rose-500 font-bold">¥{order.price}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">x 1</span>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="m-4 bg-white p-4 rounded-2xl shadow-sm space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">定金 (需付)</span>
                    <span className="font-medium">¥{order.deposit}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">尾款 (待付)</span>
                    <span className="font-medium">¥{order.finalPayment}</span>
                </div>
                <div className="border-t border-gray-50 pt-3 flex justify-between text-sm font-bold">
                    <span>实付金额</span>
                    <span className="text-rose-500">¥{order.paidDeposit + order.paidFinal}</span>
                </div>
            </div>

            {/* Transfer Section */}
            {order.status === ORDER_STATUS.PRODUCTION && (
                <div className="m-4 bg-gradient-to-r from-purple-50 to-rose-50 p-4 rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold text-sm">
                        <ArrowRightLeft size={16} />
                        <span>一键转单</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">生成转单码分享给买家，对方支付后订单自动转移，无需联系团长改Excel。</p>

                    {!transferCode ? (
                        <button
                            onClick={handleTransfer}
                            className="w-full bg-white border border-purple-200 text-purple-600 font-bold py-2 rounded-xl text-sm hover:bg-purple-50 transition-colors"
                        >
                            生成转单码
                        </button>
                    ) : (
                        <div className="bg-white p-3 rounded-xl border border-purple-200 flex justify-between items-center">
                            <code className="text-sm font-mono font-bold text-gray-800">{transferCode}</code>
                            <button onClick={copyCode} className="text-purple-600 hover:bg-purple-50 p-1.5 rounded-lg">
                                <Copy size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 max-w-md mx-auto">
                {order.status === ORDER_STATUS.UNPAID_DEPOSIT && (
                    <button
                        onClick={() => payDeposit(order.id)}
                        className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600"
                    >
                        支付定金 ¥{order.deposit}
                    </button>
                )}
                {order.status === ORDER_STATUS.WAIT_FINAL && (
                    <button
                        onClick={() => payFinal(order.id)}
                        className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600"
                    >
                        支付尾款 ¥{order.finalPayment}
                    </button>
                )}
                {order.status === ORDER_STATUS.WAIT_VERIFY && (
                    <button disabled className="flex-1 bg-gray-100 text-gray-400 font-bold py-3 rounded-xl">
                        等待审核中...
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
