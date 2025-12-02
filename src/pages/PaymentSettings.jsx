import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, CreditCard, Plus, CheckCircle2, Trash2 } from 'lucide-react';

const PaymentSettings = () => {
    const { pop } = useRouter();
    const [cards, setCards] = useState([
        { id: 1, type: 'alipay', name: '支付宝', account: '138****8888', isDefault: true },
        { id: 2, type: 'wechat', name: '微信支付', account: 'wx_****1234', isDefault: false },
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCard, setNewCard] = useState({ type: 'alipay', account: '' });

    const handleSetDefault = (id) => {
        setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    };

    const handleDelete = (id) => {
        if (window.confirm('确定要删除这个支付方式吗？')) {
            setCards(prev => prev.filter(c => c.id !== id));
        }
    };

    const handleAddCard = () => {
        if (!newCard.account) return;

        const card = {
            id: Date.now(),
            type: newCard.type,
            name: newCard.type === 'alipay' ? '支付宝' : newCard.type === 'wechat' ? '微信支付' : '银行卡',
            account: newCard.account,
            isDefault: cards.length === 0
        };

        setCards(prev => [...prev, card]);
        setShowAddModal(false);
        setNewCard({ type: 'alipay', account: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">支付设置</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* 提示 */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700">
                    <p className="text-xs">绑定支付方式后，可以快速完成支付。您的支付信息将被加密保护。</p>
                </div>

                {/* 支付方式列表 */}
                <div className="space-y-3">
                    {cards.map(card => (
                        <div key={card.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.type === 'alipay' ? 'bg-blue-100 text-blue-600' :
                                    card.type === 'wechat' ? 'bg-green-100 text-green-600' :
                                        'bg-orange-100 text-orange-600'
                                }`}>
                                <CreditCard size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-800 text-sm">{card.name}</h3>
                                    {card.isDefault && (
                                        <span className="bg-rose-100 text-rose-600 text-[10px] px-2 py-0.5 rounded-full">默认</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{card.account}</p>
                            </div>
                            <div className="flex gap-2">
                                {!card.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(card.id)}
                                        className="text-xs text-rose-500 px-2 py-1 rounded hover:bg-rose-50"
                                    >
                                        设为默认
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(card.id)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 添加按钮 */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-400 hover:border-rose-200 hover:text-rose-500 transition-colors"
                >
                    <Plus size={20} />
                    <span className="text-sm font-medium">添加支付方式</span>
                </button>
            </div>

            {/* 添加支付方式弹窗 */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-gradient-to-r from-rose-100 to-purple-100 p-4 flex justify-between items-center">
                            <h2 className="font-bold text-gray-800">添加支付方式</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-600">✕</button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">支付类型</label>
                                <select
                                    value={newCard.type}
                                    onChange={(e) => setNewCard(prev => ({ ...prev, type: e.target.value }))}
                                    className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                                >
                                    <option value="alipay">支付宝</option>
                                    <option value="wechat">微信支付</option>
                                    <option value="bank">银行卡</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-2">账号</label>
                                <input
                                    value={newCard.account}
                                    onChange={(e) => setNewCard(prev => ({ ...prev, account: e.target.value }))}
                                    placeholder="请输入账号"
                                    className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                                />
                            </div>

                            <button
                                onClick={handleAddCard}
                                className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600"
                            >
                                确认添加
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSettings;
