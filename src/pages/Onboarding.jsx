import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Heart } from 'lucide-react';

const Onboarding = () => {
    const { replace } = useRouter();
    const { savePreferences, currentUser } = useApp();
    const [step, setStep] = useState(1);
    
    // Step 1: Zone Selection
    const [zone, setZone] = useState(''); // 'guzi' | 'bjd'

    // Step 2: Interest Selection
    const [selectedInterests, setSelectedInterests] = useState([]);

    const GUZI_IPS = [
        { id: 'ys', name: '原神', img: 'bg-blue-100' },
        { id: 'lds', name: '恋与深空', img: 'bg-indigo-100' },
        { id: 'buni', name: '蓝色监狱', img: 'bg-blue-200' },
        { id: 'hq', name: '排球少年', img: 'bg-orange-100' },
        { id: 'chiikawa', name: '吉伊卡哇', img: 'bg-pink-100' },
        { id: 'miku', name: '初音未来', img: 'bg-teal-100' }
    ];

    const BJD_CATS = [
        { id: 'whole', name: '整娃', img: 'bg-rose-100' },
        { id: 'head', name: '单头', img: 'bg-orange-100' },
        { id: 'body', name: '素体', img: 'bg-yellow-100' },
        { id: 'dress', name: '娃衣', img: 'bg-purple-100' },
        { id: 'makeup', name: '妆面', img: 'bg-pink-100' },
        { id: 'eyes', name: '眼珠', img: 'bg-blue-100' }
    ];

    const toggleInterest = (id) => {
        if (selectedInterests.includes(id)) {
            setSelectedInterests(prev => prev.filter(i => i !== id));
        } else {
            setSelectedInterests(prev => [...prev, id]);
        }
    };

    const handleNext = () => {
        if (step === 1 && zone) {
            setStep(2);
        } else if (step === 2) {
            // Save and Finish
            savePreferences({
                zone,
                interests: selectedInterests
            });
            replace('Home');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 point-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-teal-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 point-events-none" />

            {/* Progress */}
            <div className="absolute top-10 flex gap-2 w-full max-w-[100px] justify-center">
                <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 1 ? 'bg-rose-500' : 'bg-gray-200'}`} />
                <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 2 ? 'bg-rose-500' : 'bg-gray-200'}`} />
            </div>

            <div className="max-w-sm w-full z-10 flex flex-col h-[70vh]">
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 font-serif text-center">
                        {step === 1 ? "欢迎来到拼团大师" : "选择你感兴趣的内容"}
                    </h1>
                    <p className="text-gray-500 text-center mb-10 text-sm">
                        {step === 1 ? "首先，请告诉我们要为您打造哪个圈子的专属体验？" : "我们会根据您的选择推荐更精准的商品"}
                    </p>

                    {step === 1 ? (
                        <div className="space-y-4">
                            <button 
                                onClick={() => setZone('guzi')}
                                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                                    zone === 'guzi' 
                                    ? 'border-rose-500 bg-rose-50 shadow-lg shadow-rose-100' 
                                    : 'border-gray-100 bg-white hover:border-rose-200'
                                }`}
                            >
                                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-2xl">🍬</div>
                                <div className="text-left flex-1">
                                    <h3 className={`font-bold ${zone === 'guzi' ? 'text-rose-600' : 'text-gray-800'}`}>我是吃谷人</h3>
                                    <p className="text-xs text-gray-400 mt-1">二次元周边、排球少年、原神...</p>
                                </div>
                                {zone === 'guzi' && <Check size={20} className="text-rose-500" />}
                            </button>

                            <button 
                                onClick={() => setZone('bjd')}
                                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                                    zone === 'bjd' 
                                    ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-100' 
                                    : 'border-gray-100 bg-white hover:border-purple-200'
                                }`}
                            >
                                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-2xl">🩰</div>
                                <div className="text-left flex-1">
                                    <h3 className={`font-bold ${zone === 'bjd' ? 'text-purple-600' : 'text-gray-800'}`}>我是娃娘/爹</h3>
                                    <p className="text-xs text-gray-400 mt-1">BJD、OB11、棉花娃娃...</p>
                                </div>
                                {zone === 'bjd' && <Check size={20} className="text-purple-500" />}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-3">
                            {(zone === 'guzi' ? GUZI_IPS : BJD_CATS).map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => toggleInterest(item.name)}
                                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${
                                        selectedInterests.includes(item.name)
                                        ? (zone === 'guzi' ? 'border-rose-500 bg-rose-50' : 'border-purple-500 bg-purple-50')
                                        : 'border-transparent bg-gray-50'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full ${item.img}`} />
                                    <span className="text-xs font-bold text-gray-700">{item.name}</span>
                                    {selectedInterests.includes(item.name) && (
                                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${zone === 'guzi' ? 'bg-rose-500' : 'bg-purple-500'}`}>
                                            <Check size={12} className="text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleNext}
                    disabled={step === 1 && !zone}
                    className={`mt-8 w-full py-3.5 rounded-full font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                        step === 1 && !zone ? 'bg-gray-300 cursor-not-allowed' : 
                        (zone === 'bjd' ? 'bg-purple-500 shadow-purple-200' : 'bg-rose-500 shadow-rose-200')
                    }`}
                >
                    {step === 1 ? "下一步" : "开启旅程"}
                    <Sparkles size={18} />
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
