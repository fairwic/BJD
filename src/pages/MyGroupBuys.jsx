import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Search, Filter } from 'lucide-react';

const MyGroupBuys = () => {
    const { pop, push } = useRouter();
    const { currentUser, orders, groupBuys } = useApp();
    const [activeTab, setActiveTab] = useState('all');

    // Derive group buy participation from orders
    // In a real app, this might be a separate API, but here we can infer it from orders
    const myOrders = orders.filter(o => o.userId === currentUser.id);

    // Map orders to group buy details
    const myGroupBuys = myOrders.map(order => {
        const groupBuy = groupBuys.find(g => g.id === order.groupBuyId);
        return {
            ...order,
            groupBuyTitle: groupBuy?.title || order.title,
            groupBuyImage: groupBuy?.image || order.image,
            leader: groupBuy?.leader || '未知团长',
            progress: groupBuy?.progress || 0,
            status: order.status // Use order status as proxy for participation status
        };
    });

    const filteredList = activeTab === 'all'
        ? myGroupBuys
        : myGroupBuys.filter(item => {
            if (activeTab === 'ongoing') return ['待补款', '制作中'].includes(item.status);
            if (activeTab === 'completed') return ['已完成', '已发货'].includes(item.status);
            return true;
        });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">我的参团</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white px-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'all' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                    >
                        全部
                    </button>
                    <button
                        onClick={() => setActiveTab('ongoing')}
                        className={`py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ongoing' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                    >
                        进行中
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'completed' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                    >
                        已完成
                    </button>
                </div>
                <button className="text-gray-400"><Search size={20} /></button>
            </div>

            {/* List */}
            <div className="p-4 space-y-3">
                {filteredList.map(item => (
                    <div key={item.id} onClick={() => push('OrderDetail', { id: item.id })} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm active:scale-95 transition-transform">
                        <div className={`w-24 h-24 rounded-lg ${item.groupBuyImage} bg-gray-200 shrink-0 relative`}>
                            <div className="absolute top-0 left-0 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-br-lg rounded-tl-lg">
                                {item.leader}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800 line-clamp-2 text-sm">{item.groupBuyTitle}</h3>
                                    <span className="text-xs text-rose-500 font-medium shrink-0 ml-2">{item.status}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">规格: {item.skuName}</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-rose-400 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                    <span className="text-[10px] text-gray-400">进度 {item.progress}%</span>
                                </div>
                                <button className="text-xs border border-gray-200 px-3 py-1 rounded-full hover:border-rose-500 hover:text-rose-500 transition-colors">
                                    查看详情
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredList.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Filter size={48} className="mb-4 opacity-20" />
                        <p className="text-sm">暂无相关参团记录</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyGroupBuys;
