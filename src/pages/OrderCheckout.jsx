import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, MapPin, ChevronRight, CreditCard, ShieldCheck } from 'lucide-react';

const OrderCheckout = () => {
    const { pop, currentRoute, push, replace } = useRouter();
    const { currentUser } = useApp();
    const { product, sku } = currentRoute.params || {};

    const [paymentMethod, setPaymentMethod] = useState('alipay'); // alipay | wechat

    if (!product) return null;

    const handleSubmitOrder = () => {
        // Mock Order Creation
        const newOrder = {
            id: Date.now(),
            items: [{
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                sku: sku?.name || '默认规格',
                quantity: 1
            }],
            total: product.price,
            status: 'paid', // Simulate immediate payment success
            statusLabel: '待发货',
            time: new Date().toLocaleString()
        };

        // Save to LocalStorage (Mock Backend)
        const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        localStorage.setItem('user_orders', JSON.stringify([newOrder, ...existingOrders]));

        // Simulate Processing
        alert("支付成功！");
        
        // Navigate to MyOrders (User Order List)
        replace('MyOrders'); 
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
                <button onClick={pop} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-bold flex-1 text-center pr-8">确认订单</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Address (Mock) */}
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.99] transition-transform">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-lg">张三</span>
                            <span className="text-gray-500 font-medium">138****0000</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-snug">
                            浙江省 杭州市 余杭区 <br />
                            五常街道 亲橙里 1号楼
                        </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                </div>

                {/* Product Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-1 h-3 bg-gray-900 rounded-full"/>
                        商品信息
                    </h3>
                    <div className="flex gap-3">
                        <img src={product.image} className="w-20 h-20 rounded-xl object-cover bg-gray-100 border border-gray-100" />
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-relaxed">{product.title}</h4>
                                <span className="text-xs text-gray-500 mt-1 inline-block bg-gray-50 px-1.5 py-0.5 rounded">
                                    规格: {sku?.name || '默认'}
                                </span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="font-outfit font-bold text-lg text-rose-500">
                                    <span className="text-xs mr-0.5">¥</span>
                                    {product.price}
                                </span>
                                <span className="text-sm text-gray-400">x1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">商品总价</span>
                        <span className="font-medium text-gray-900">¥{product.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">运费</span>
                        <span className="font-medium text-gray-900">¥0.00</span>
                    </div>
                    {/* Discount Mock */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">优惠</span>
                        <span className="font-medium text-rose-500">-¥0.00</span>
                    </div>
                     <div className="border-t border-gray-50 pt-3 flex justify-end items-end gap-2">
                        <span className="text-sm text-gray-500">合计</span>
                        <span className="text-xl font-bold text-rose-500 font-outfit">¥{product.price}</span>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
                     <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                        <CreditCard size={16} />
                        支付方式
                    </h3>
                    <div className="space-y-3">
                        {['alipay', 'wechat'].map(method => (
                            <button 
                                key={method}
                                onClick={() => setPaymentMethod(method)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                                    paymentMethod === method 
                                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                    : 'border-gray-100 bg-white text-gray-600'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${method === 'alipay' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                         {/* Mock Icons */}
                                         <span className="text-white text-[10px] font-bold">{method === 'alipay' ? '支' : '微'}</span>
                                    </div>
                                    <span className="text-sm font-bold">
                                        {method === 'alipay' ? '支付宝支付' : '微信支付'}
                                    </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                    paymentMethod === method ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                }`}>
                                    {paymentMethod === method && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between safe-area-bottom fixed bottom-0 left-0 right-0 z-20 max-w-md mx-auto">
                 <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-500 font-bold">合计:</span>
                    <span className="text-rose-600 font-bold text-sm">¥</span>
                    <span className="text-rose-600 font-extrabold text-2xl font-outfit">{product.price}</span>
                </div>
                <button 
                    onClick={handleSubmitOrder}
                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-gray-200 active:scale-95 transition-transform flex items-center gap-2"
                >
                    <ShieldCheck size={18} />
                    立即支付
                </button>
            </div>
        </div>
    );
};

export default OrderCheckout;
