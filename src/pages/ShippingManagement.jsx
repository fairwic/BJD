import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Truck, Search, Copy } from 'lucide-react';

const ShippingManagement = () => {
    const { pop } = useRouter();
    const { orders, shipOrder } = useApp();
    const [filter, setFilter] = useState('pending'); // pending, shipped

    // Filter orders ready to ship (paid final) or already shipped
    const shippingOrders = orders.filter(o => {
        if (filter === 'pending') return o.status === '待发货'; // In real app, check if final payment is done
        if (filter === 'shipped') return o.status === '已发货' || o.status === '已完成';
        return false;
    });

    const handleShip = (orderId) => {
        const tracking = prompt("请输入运单号:");
        if (tracking) {
            shipOrder(orderId); // In real app, pass tracking number
            alert(`订单 ${orderId} 已发货, 运单号: ${tracking}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">发货管理</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white px-4 border-b border-gray-100 flex">
                <button
                    onClick={() => setFilter('pending')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${filter === 'pending' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    待发货 ({orders.filter(o => o.status === '待发货').length})
                </button>
                <button
                    onClick={() => setFilter('shipped')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${filter === 'shipped' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    已发货
                </button>
            </div>

            {/* Search */}
            <div className="p-4">
                <div className="bg-white rounded-lg flex items-center px-3 py-2 text-gray-500">
                    <Search size={18} />
                    <input placeholder="搜索 订单号/收件人/手机号" className="ml-2 flex-1 outline-none text-sm" />
                </div>
            </div>

            {/* List */}
            <div className="px-4 space-y-3">
                {shippingOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
                            <div>
                                <p className="font-bold text-sm text-gray-800">订单号: {order.id}</p>
                                <p className="text-xs text-gray-500">{order.createTime}</p>
                            </div>
                            <span className="text-xs bg-rose-50 text-rose-500 px-2 py-1 rounded">{order.status}</span>
                        </div>

                        <div className="flex gap-3 mb-3">
                            <div className={`w-16 h-16 rounded bg-gray-100 shrink-0`} />
                            <div>
                                <p className="font-bold text-sm text-gray-800 line-clamp-1">{order.title}</p>
                                <p className="text-xs text-gray-500 mt-1">规格: {order.skuName}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-gray-800">收件人: 张三 <span className="font-normal text-gray-500">13800138000</span></p>
                                    <p className="text-xs text-gray-500 mt-1">北京市朝阳区建国路88号</p>
                                </div>
                                <button className="text-blue-500"><Copy size={16} /></button>
                            </div>
                        </div>

                        {filter === 'pending' && (
                            <button
                                onClick={() => handleShip(order.id)}
                                className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center justify-center gap-2"
                            >
                                <Truck size={16} /> 立即发货
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShippingManagement;
