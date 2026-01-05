import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Send, Clock, Quote } from 'lucide-react';

const CommissionApply = () => {
    const { pop, currentRoute, push } = useRouter();
    const { product } = currentRoute.params || {};

    const [form, setForm] = useState({
        price: '',
        duration: '',
        message: ''
    });

    if (!product) return null;

    const handleSubmit = () => {
        if (!form.price || !form.duration) return alert("请填写报价和工期");
        
        // Mock Success
        alert("应征成功！已向单主发送您的报价。");
        
        // Redirect to Message or Back
        // In real app: create a chat room
        pop();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
                <button onClick={pop} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-bold">应征接单</h1>
            </div>

            <div className="flex-1 p-4 space-y-4">
                {/* Request Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex gap-3 mb-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0" />
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{product.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">预算: {product.price}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600 leading-relaxed">
                        <Quote size={12} className="inline mr-1 text-gray-400" />
                        {product.description}
                    </div>
                </div>

                {/* Application Form */}
                <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-800 mb-2 block">您的报价 (¥)</label>
                        <input 
                            type="number" 
                            className="w-full bg-gray-50 rounded-xl px-4 py-3 text-lg font-bold text-teal-600 outline-none focus:ring-2 focus:ring-teal-100"
                            placeholder="0.00"
                            value={form.price}
                            onChange={e => setForm({...form, price: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-bold text-gray-800 mb-2 block">预计工期 (天)</label>
                        <div className="relative">
                            <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="number" 
                                className="w-full bg-gray-50 rounded-xl pl-10 pr-4 py-3 font-bold text-gray-800 outline-none focus:ring-2 focus:ring-teal-100"
                                placeholder="例如: 15"
                                value={form.duration}
                                onChange={e => setForm({...form, duration: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-800 mb-2 block">给单主的留言</label>
                        <textarea 
                            className="w-full h-32 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-100 resize-none"
                            placeholder="介绍一下您的优势，或上传更多作品链接..."
                            value={form.message}
                            onChange={e => setForm({...form, message: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-4 bg-white border-t border-gray-100 safe-area-bottom">
                <button 
                    onClick={handleSubmit}
                    className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-full shadow-lg shadow-teal-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Send size={18} />
                    确认应征
                </button>
            </div>
        </div>
    );
};

export default CommissionApply;
