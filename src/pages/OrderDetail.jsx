import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, MapPin, MessageCircle, Copy, Truck } from 'lucide-react';

const OrderDetail = () => {
    const { pop, currentRoute } = useRouter();
    const { orders } = useApp();
    const { id } = currentRoute.params;

    const order = orders.find(o => o.id === id);

    if (!order) return <div className="p-4">Order not found</div>;

    // Status logic helpers
    const getStatusText = (status) => {
        const map = {
            'pending_payment': '等待买家付款',
            'pending_shipment': '等待卖家发货',
            'shipped': '卖家已发货',
            'completed': '交易成功',
            'refund': '退款中',
            'unpaid_deposit': '等待支付定金', // Legacy fallback
        };
        return map[status] || status;
    };

    const getStatusDesc = (status) => {
        if (status === 'pending_payment') return '剩 23小时59分 自动关闭';
        if (status === 'pending_shipment') return '卖家正在打包中...';
        if (status === 'shipped') return '包裹正在飞速奔向你';
        if (status === 'completed') return '期待你的评价';
        return '';
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-rose-500 text-white p-6 pb-12">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <span className="font-bold text-lg">订单详情</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">{getStatusText(order.status)}</h1>
                <p className="text-white/80 text-sm">{getStatusDesc(order.status)}</p>
            </div>

            {/* Address (Mock) */}
            <div className="mx-4 -mt-6 bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                    <MapPin size={16} />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-gray-800 flex gap-2">
                        <span>张三</span>
                        <span className="text-gray-500 font-normal">138****8888</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        上海市 静安区 南京西路 1266号 恒隆广场
                    </p>
                </div>
            </div>

            {/* Product Info */}
            <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm">
                 <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-50">
                    <span className="font-bold text-sm text-gray-800">{order.leader || "卖家"}</span>
                    <ChevronLeft size={14} className="rotate-180 text-gray-400" />
                </div>
                <div className="flex gap-3">
                    <div className={`w-20 h-20 rounded-lg bg-gray-100 shrink-0 ${order.image}`} />
                    <div className="flex-1">
                        <h3 className="font-bold text-sm text-gray-800 line-clamp-2">{order.title}</h3>
                        <p className="text-xs text-gray-500 bg-gray-50 inline-block px-1.5 py-0.5 rounded mt-1">
                            {order.skuName}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-sm">¥{order.price}</p>
                        <p className="text-xs text-gray-400">x1</p>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                     <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium">
                        <MessageCircle size={12} /> 联系卖家
                     </button>
                </div>
            </div>

            {/* Order Info */}
            <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm space-y-3 text-xs text-gray-500">
                <div className="flex justify-between">
                    <span>订单编号</span>
                    <div className="flex items-center gap-1">
                        <span>{order.id}</span>
                        <span className="text-gray-400 underline decoration-dotted">复制</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span>下单时间</span>
                    <span>2024-01-04 12:30:45</span>
                </div>
                <div className="flex justify-between">
                    <span>支付方式</span>
                    <span>微信支付</span>
                </div>
            </div>

             {/* Price Summary */}
             <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">商品总额</span>
                    <span className="text-gray-900">¥{order.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">运费</span>
                    <span className="text-gray-900">¥0.00</span>
                </div>
                <div className="border-t border-gray-50 pt-2 flex justify-end items-end gap-2">
                    <span className="text-xs text-gray-500">实付款</span>
                    <span className="text-lg font-bold text-rose-500">¥{order.price}</span>
                </div>
            </div>

            {/* Standard Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 px-4 flex justify-end gap-3 max-w-md mx-auto">
                {order.status === 'pending_payment' ? (
                     <>
                        <button className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600">取消订单</button>
                        <button className="px-4 py-2 rounded-full bg-rose-500 text-white text-sm font-bold shadow-sm shadow-rose-200">立即支付</button>
                     </>
                ) : order.status === 'shipped' ? (
                    <>
                        <button className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600">查看物流</button>
                        <button className="px-4 py-2 rounded-full bg-rose-500 text-white text-sm font-bold shadow-sm shadow-rose-200">确认收货</button>
                    </>
                ) : (
                    <button className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600">申请售后</button>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
