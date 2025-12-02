import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ORDER_STATUS } from '../data/mock';
import { ChevronLeft, CheckCircle2, Truck, Filter, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';

const OrderManagement = () => {
    const { pop, push } = useRouter();
    const { orders, verifyOrder, shipOrder, updateProgress, groupBuys } = useApp();

    // Filter only orders managed by current leader (mock: assume current user is leader of all for demo)
    // In real app, filter by currentUser.id === order.leaderId

    const pendingOrders = orders.filter(o => o.status === ORDER_STATUS.WAIT_VERIFY);
    const productionOrders = orders.filter(o => o.status === ORDER_STATUS.PRODUCTION);
    const shipOrders = orders.filter(o => o.status === ORDER_STATUS.WAIT_SHIP);

    const handleExport = () => {
        // Flatten data for Excel
        const data = orders.map(o => ({
            '订单号': o.id,
            '商品': o.title,
            '规格': o.skuName,
            '买家ID': o.userId,
            '状态': o.status,
            '已付定金': o.paidDeposit,
            '已付尾款': o.paidFinal,
            '下单时间': o.createTime
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, `订单导出_${new Date().toLocaleDateString()}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">团长管理台</h1>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="text-green-600 flex items-center gap-1 text-xs bg-green-50 px-2 py-1 rounded-lg">
                        <FileDown size={16} /> 导出
                    </button>
                    <button><Filter size={20} className="text-gray-500" /></button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 p-4">
                <div
                    onClick={() => push('GroupBuyManagement')}
                    className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer"
                >
                    <div>
                        <p className="text-gray-500 text-xs mb-1">我的团购</p>
                        <p className="text-xl font-bold text-gray-900">{groupBuys.length}</p>
                    </div>
                    <div className="bg-rose-50 p-2 rounded-full text-rose-500">
                        <FileDown size={20} />
                    </div>
                </div>
                <div
                    onClick={() => push('ShippingManagement')}
                    className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer"
                >
                    <div>
                        <p className="text-gray-500 text-xs mb-1">待发货订单</p>
                        <p className="text-xl font-bold text-green-500">{shipOrders.length}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-full text-green-500">
                        <Truck size={20} />
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-2 px-4 mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                    <p className="text-xs text-gray-500">待审核</p>
                    <p className="text-xl font-bold text-rose-500">{pendingOrders.length}</p>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                    <p className="text-xs text-gray-500">制作中</p>
                    <p className="text-xl font-bold text-blue-500">{productionOrders.length}</p>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                    <p className="text-xs text-gray-500">总营收</p>
                    <p className="text-xl font-bold text-gray-900">¥12.5k</p>
                </div>
            </div>

            {/* Task List */}
            <div className="px-4 space-y-6">

                {/* Pending Verification */}
                {pendingOrders.length > 0 && (
                    <div>
                        <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-rose-500" /> 待审核定金
                        </h2>
                        <div className="space-y-3">
                            {pendingOrders.map(order => (
                                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{order.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">用户: {order.userId} | 规格: {order.skuName}</p>
                                        <p className="text-xs text-rose-500 font-bold mt-1">已付: ¥{order.paidDeposit}</p>
                                    </div>
                                    <button
                                        onClick={() => verifyOrder(order.id)}
                                        className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800"
                                    >
                                        确认收款
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pending Shipment */}
                {shipOrders.length > 0 && (
                    <div>
                        <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Truck size={18} className="text-green-500" /> 待发货
                        </h2>
                        <div className="space-y-3">
                            {shipOrders.map(order => (
                                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{order.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">用户: {order.userId}</p>
                                        <p className="text-xs text-green-500 font-bold mt-1">尾款已付</p>
                                    </div>
                                    <button
                                        onClick={() => shipOrder(order.id)}
                                        className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600"
                                    >
                                        发货
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Progress Update (Mock for first group buy) */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 text-sm mb-2">进度更新演示</h3>
                    <p className="text-xs text-blue-600 mb-3">点击下方按钮模拟工厂进度更新，触发尾款通知。</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => updateProgress(101, 50, '打磨中')}
                            className="bg-white text-blue-600 border border-blue-200 text-xs px-3 py-1.5 rounded-lg"
                        >
                            更新进度 50%
                        </button>
                        <button
                            onClick={() => updateProgress(101, 100, '已完成')}
                            className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg"
                        >
                            完工 (触发尾款)
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderManagement;
