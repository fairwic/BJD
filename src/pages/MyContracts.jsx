import React from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, FileText, Download } from 'lucide-react';

const MyContracts = () => {
    const { pop } = useRouter();
    const { orders } = useApp();

    // Filter orders that have a contract (mock: all paid deposit orders have a contract)
    const contractOrders = orders.filter(o => o.paidDeposit > 0);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">我的合同</h1>
            </div>

            <div className="p-4 space-y-3">
                {contractOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">电子购买协议</h3>
                                <p className="text-xs text-gray-400 mt-0.5">编号: CT-{order.id}</p>
                            </div>
                            <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">已签署</span>
                        </div>

                        <div className="flex gap-3 mb-3">
                            <div className={`w-12 h-12 rounded bg-gray-100 shrink-0 ${order.image}`} />
                            <div>
                                <p className="font-bold text-sm text-gray-800 line-clamp-1">{order.title}</p>
                                <p className="text-xs text-gray-500 mt-1">签署时间: {order.createTime}</p>
                            </div>
                        </div>

                        <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50">
                            <Download size={16} /> 下载/查看合同
                        </button>
                    </div>
                ))}

                {contractOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p className="text-sm">暂无已签署的合同</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyContracts;
