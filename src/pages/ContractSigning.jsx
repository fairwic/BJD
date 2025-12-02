import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, FileText, PenTool, CheckCircle2 } from 'lucide-react';

const ContractSigning = () => {
    const { currentRoute, pop, replace } = useRouter();
    const { payDeposit } = useApp();
    const { orderData } = currentRoute.params || {}; // Expecting order data to be passed

    const [agreed, setAgreed] = useState(false);
    const [signed, setSigned] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSign = () => {
        // Mock signature action
        setSigned(true);
    };

    const handleConfirm = async () => {
        if (!agreed || !signed) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // Proceed to pay deposit (or create order directly if deposit logic is handled there)
            // For this flow, we assume we call payDeposit from here or return to ProductDetail to pay
            // Let's assume we call payDeposit here for a seamless flow

            if (orderData) {
                payDeposit(orderData.groupBuyId, orderData.skuId);
                replace('OrderDetail', { id: Date.now() }); // Mock ID, in real app payDeposit should return ID
                // Note: In our mock AppContext, payDeposit doesn't return the new order ID directly in a way we can grab easily without async, 
                // but let's assume for demo we redirect to the latest order or just 'Home'
                // Actually, let's just go back to Home or OrderList for safety in this mock
                alert('合同签署成功，定金支付成功！');
                replace('Home');
            } else {
                alert('订单数据丢失');
                pop();
            }

            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">签署购买协议</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* Contract Content */}
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 h-[60vh] overflow-y-auto border border-gray-100">
                    <h2 className="font-bold text-center text-lg mb-4">BJD 团购定金协议</h2>
                    <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                        <p><strong>甲方（买家）：</strong> {orderData?.userName || '当前用户'}</p>
                        <p><strong>乙方（团长）：</strong> {orderData?.leaderName || '知名团长'}</p>

                        <p>一、商品信息</p>
                        <p>买家自愿参与乙方发起的 "{orderData?.title || '商品'}" 团购活动，并支付定金。</p>

                        <p>二、定金约定</p>
                        <p>1. 定金金额为人民币 {orderData?.deposit || 0} 元。</p>
                        <p>2. <span className="text-rose-500 font-bold">定金支付后不可退还</span>，请买家谨慎下单。</p>
                        <p>3. 若因官方流团（未达到起团数量），定金将全额原路退回。</p>

                        <p>三、尾款及发货</p>
                        <p>1. 制作完成后，乙方将通知买家补款。</p>
                        <p>2. 买家需在通知发出后 30 天内补齐尾款，逾期视为跑单，定金不退。</p>
                        <p>3. 乙方承诺在收到尾款后 7 个工作日内发货。</p>

                        <p>四、售后条款</p>
                        <p>1. 本商品为定制类商品，不支持七天无理由退换。</p>
                        <p>2. 若出现严重质量问题（如断裂、错件），请在签收后 24 小时内联系团长处理。</p>

                        <p className="text-xs text-gray-400 mt-8 text-center">--- 协议结束 ---</p>
                    </div>
                </div>

                {/* Action Area */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-4 h-4 text-rose-500 rounded focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700">我已阅读并同意上述协议条款</span>
                    </label>

                    {!signed ? (
                        <button
                            onClick={handleSign}
                            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-rose-300 hover:text-rose-500 transition-colors"
                        >
                            <PenTool size={24} />
                            <span className="text-sm">点击此处签名</span>
                        </button>
                    ) : (
                        <div className="w-full border-2 border-solid border-rose-500 bg-rose-50 rounded-xl p-4 flex items-center justify-center gap-2 text-rose-600">
                            <span className="font-handwriting text-2xl font-bold italic pr-2">{orderData?.userName || 'User'}</span>
                            <CheckCircle2 size={20} />
                            <span className="text-sm font-bold">已签名</span>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={!agreed || !signed || isSubmitting}
                        className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        {isSubmitting ? '处理中...' : '签署并支付定金'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContractSigning;
