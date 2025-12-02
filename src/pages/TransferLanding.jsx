import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const TransferLanding = () => {
    const { pop, replace } = useRouter();
    const { claimTransfer } = useApp();
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);

    const handleClaim = () => {
        if (!code.trim()) return;
        const res = claimTransfer(code.trim());
        setResult(res);

        if (res.success) {
            setTimeout(() => {
                replace('Home'); // Go back to home to see the new order
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <ArrowRightLeft size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">接收转单</h1>
                    <p className="text-gray-500 mt-2">请输入转单码以接收订单</p>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="例如: TRANS-o1-ABCDE"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none font-mono text-center uppercase"
                    />

                    <button
                        onClick={handleClaim}
                        disabled={!code.trim()}
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                        确认接收
                    </button>

                    <button onClick={pop} className="w-full text-gray-400 text-sm py-2">
                        取消
                    </button>
                </div>

                {result && (
                    <div className={`mt-6 p-3 rounded-xl flex items-center gap-2 text-sm ${result.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {result.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span>{result.message}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferLanding;
