import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, DollarSign, Users, Package, AlertCircle } from 'lucide-react';

const GroupBuyDetail = () => {
    const { pop, currentRoute, updateProgress } = useRouter();
    const { groupBuys, orders } = useApp();
    const { id } = currentRoute.params || {};

    const gb = groupBuys.find(g => g.id === id);
    const gbOrders = orders.filter(o => o.groupBuyId === id);

    if (!gb) return <div>Group Buy Not Found</div>;

    // Stats
    const totalRevenue = gbOrders.reduce((sum, o) => sum + o.paidDeposit + o.paidFinal, 0);
    const unpaidDeposits = gbOrders.filter(o => o.status === '待审核').length;
    const unpaidFinals = gbOrders.filter(o => o.status === '待补款').length;

    // SKU Breakdown
    const skuStats = {};
    gbOrders.forEach(o => {
        if (!skuStats[o.skuName]) skuStats[o.skuName] = 0;
        skuStats[o.skuName]++;
    });

    const handleStageUpdate = (newStage, progress) => {
        // Mock update via updateProgress context action if available, or just alert
        alert(`Updating stage to: ${newStage}, Progress: ${progress}%`);
        // In real app: updateProgress(gb.id, progress, newStage);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">团购详情</h1>
            </div>

            {/* Info Card */}
            <div className="bg-white p-4 mb-2">
                <div className="flex gap-4">
                    <div className={`w-24 h-24 rounded-lg ${gb.image} shrink-0`} />
                    <div>
                        <h2 className="font-bold text-gray-900 mb-1">{gb.title}</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-medium">{gb.status}</span>
                            <span className="text-xs text-gray-500">当前进度 {gb.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-400">开团时间: 2023-10-01</p>
                    </div>
                </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-2 p-2">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Users size={16} />
                        <span className="text-xs">总订单</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{gbOrders.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <DollarSign size={16} />
                        <span className="text-xs">总营收</span>
                    </div>
                    <p className="text-2xl font-bold text-rose-500">¥{totalRevenue}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <AlertCircle size={16} />
                        <span className="text-xs">待审核定金</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{unpaidDeposits}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <AlertCircle size={16} />
                        <span className="text-xs">待补尾款</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{unpaidFinals}</p>
                </div>
            </div>

            {/* SKU Breakdown */}
            <div className="bg-white mt-2 p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Package size={18} /> 规格统计
                </h3>
                <div className="space-y-3">
                    {Object.entries(skuStats).map(([sku, count]) => (
                        <div key={sku} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                            <span className="text-sm text-gray-600">{sku}</span>
                            <span className="font-bold text-gray-900">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stage Control */}
            <div className="bg-white mt-2 p-4">
                <h3 className="font-bold text-gray-800 mb-4">进度管理</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleStageUpdate('制作中', 30)} className="py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                        截团并制作 (30%)
                    </button>
                    <button onClick={() => handleStageUpdate('制作中', 80)} className="py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                        更新进度 (80%)
                    </button>
                    <button onClick={() => handleStageUpdate('待补款', 100)} className="py-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-sm font-medium">
                        完工/收尾款 (100%)
                    </button>
                    <button onClick={() => handleStageUpdate('已完成', 100)} className="py-3 bg-green-50 text-green-600 border border-green-100 rounded-xl text-sm font-medium">
                        全部完成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupBuyDetail;
