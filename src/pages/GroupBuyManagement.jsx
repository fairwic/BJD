import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Plus, Users, Package, DollarSign } from 'lucide-react';

const GroupBuyManagement = () => {
    const { pop, push } = useRouter();
    const { groupBuys, orders } = useApp();

    // Mock: Filter group buys for current leader (assuming current user is leader of all for demo)
    const myGroupBuys = groupBuys;

    const getStats = (gbId) => {
        const gbOrders = orders.filter(o => o.groupBuyId === gbId);
        const totalRevenue = gbOrders.reduce((sum, o) => sum + o.paidDeposit + o.paidFinal, 0);
        return {
            orderCount: gbOrders.length,
            revenue: totalRevenue
        };
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">我的团购</h1>
                </div>
                <button onClick={() => push('CreateGroupBuy')} className="text-rose-500 flex items-center gap-1 text-sm font-bold">
                    <Plus size={18} /> 开团
                </button>
            </div>

            <div className="p-4 space-y-4">
                {myGroupBuys.map(gb => {
                    const stats = getStats(gb.id);
                    return (
                        <div
                            key={gb.id}
                            onClick={() => push('GroupBuyDetail', { id: gb.id })}
                            className="bg-white rounded-xl p-4 shadow-sm active:scale-95 transition-transform"
                        >
                            <div className="flex gap-4 mb-4">
                                <div className={`w-20 h-20 rounded-lg ${gb.image} shrink-0`} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-800 line-clamp-2 mb-1">{gb.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${gb.status === '进行中' ? 'bg-green-100 text-green-600' :
                                                gb.status === '制作中' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {gb.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400">进度: {gb.progress}%</p>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${gb.progress}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                                <div className="text-center">
                                    <p className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1"><Users size={12} /> 订单数</p>
                                    <p className="font-bold text-gray-800">{stats.orderCount}</p>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <p className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1"><DollarSign size={12} /> 营收</p>
                                    <p className="font-bold text-gray-800">¥{stats.revenue}</p>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <p className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1"><Package size={12} /> 待发货</p>
                                    <p className="font-bold text-gray-800">0</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GroupBuyManagement;
