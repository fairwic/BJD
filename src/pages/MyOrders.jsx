import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack'; // Assuming this exists or similar
import { ChevronLeft, Search, Filter } from 'lucide-react';

const MyOrders = ({ params }) => {
    const { pop, push } = useRouter();
    const { orders, currentUser } = useApp();
    const [activeTab, setActiveTab] = useState(params?.tab || 'all');

    const TABS = [
        { id: 'all', label: '全部' },
        { id: 'pending_payment', label: '待付款' },
        { id: 'pending_shipment', label: '待发货' },
        { id: 'shipped', label: '待收货' }, // 'Shipped' means waiting for receipt
        { id: 'pending_review', label: '待评价' },
        { id: 'refund', label: '退款/售后' },
    ];

    const filteredOrders = orders.filter(o => {
        if (o.userId !== currentUser.id) return false;
        if (activeTab === 'all') return true;
        // Mapping simple tab IDs to potentially complex statuses or keeping it simple
        // Assuming mock data uses these exact status strings or we map them.
        // Let's assume for now the mock data will use these keys or we map:
        if (activeTab === 'pending_payment') return o.status === 'pending_payment' || o.status === 'unpaid_deposit' || o.status === 'unpaid_final';
        if (activeTab === 'pending_shipment') return o.status === 'pending_shipment' || o.status === 'paid_deposit' || o.status === 'production' || o.status === 'wait_ship';
        if (activeTab === 'shipped') return o.status === 'shipped';
        if (activeTab === 'pending_review') return o.status === 'completed'; // Usually completed = reviewable
        if (activeTab === 'refund') return o.status === 'refund';
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white sticky top-0 z-10 px-4 py-3 flex items-center gap-3 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="搜索我的订单" className="bg-transparent text-sm outline-none flex-1" />
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white px-2 flex overflow-x-auto scrollbar-hide border-b border-gray-50 sticky top-[60px] z-10">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === tab.id ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="p-4 space-y-3">
                {filteredOrders.map(order => (
                    <div key={order.id} onClick={() => push('OrderDetail', { id: order.id })} className="bg-white rounded-xl p-4 shadow-sm active:scale-99 transition-transform">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-sm flex items-center gap-1">
                                {order.leader || "官方自营"} <ChevronLeft size={12} className="rotate-180 text-gray-400" />
                            </span>
                            <span className="text-sm text-rose-500 font-medium">
                                {order.status === 'pending_payment' && '等待付款'}
                                {order.status === 'pending_shipment' && '等待发货'}
                                {order.status === 'shipped' && '卖家已发货'}
                                {order.status === 'completed' && '交易成功'}
                                {order.status === 'refund' && '退款中'}
                                {/* Fallback */}
                                {!['pending_payment', 'pending_shipment', 'shipped', 'completed', 'refund'].includes(order.status) && order.status}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <div className={`w-20 h-20 rounded-lg bg-gray-100 shrink-0 ${order.image}`} />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">{order.title}</h3>
                                <p className="text-xs text-gray-500 bg-gray-50 w-max px-1.5 py-0.5 rounded">规格: {order.skuName}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">¥{order.price}</p>
                                <p className="text-xs text-gray-400">x1</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            {order.status === 'pending_payment' && (
                                <>
                                    <button className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium">取消订单</button>
                                    <button className="px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-medium border border-rose-500">立即支付</button>
                                </>
                            )}
                            {order.status === 'shipped' && (
                                <button className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium">查看物流</button>
                            )}
                             <button className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium">更多</button>
                        </div>
                    </div>
                ))}
                
                {filteredOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p>暂无相关订单</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
