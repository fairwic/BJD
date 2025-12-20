import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Sparkles, Upload, Camera, CheckCircle, Users, Gift, TrendingUp, Shield, Crown } from 'lucide-react';

const LeaderApply = () => {
    const { pop } = useRouter();
    const [step, setStep] = useState(1); // 1: 介绍, 2: 填写资料, 3: 提交成功
    const [form, setForm] = useState({
        nickname: '',
        speciality: '',
        experience: '',
        contact: '',
        wechat: '',
        taobao: '',
        idCard: false,
        portfolio: false,
        agree: false,
    });

    const benefits = [
        { icon: Crown, title: '官方认证团长', desc: '获得团长徽章，提升信任度' },
        { icon: Gift, title: '发起团购活动', desc: '对接工厂，组团购买心仪商品' },
        { icon: TrendingUp, title: '佣金收益', desc: '成功开团可获得销售佣金' },
        { icon: Shield, title: '平台保障', desc: '资金担保，交易无忧' },
    ];

    const specialities = ['三分娃', '四分娃', '六分娃', '大娃', '娃衣', '眼珠/假毛', '其他'];

    const handleSubmit = () => {
        if (!form.agree) {
            alert('请先同意入驻协议');
            return;
        }
        setStep(3);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center sticky top-0 z-20 shadow-sm">
                <button onClick={pop} className="p-1">
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-base font-bold text-gray-800 ml-2">成为团长</h1>
            </div>

            {step === 1 && (
                <div className="pb-24">
                    {/* Hero Banner */}
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Sparkles size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">成为BJD团长</h2>
                                <p className="text-white/80 text-sm">开启您的团购事业，带领娃友上车</p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                            <div className="flex justify-around text-center">
                                <div>
                                    <p className="text-2xl font-bold">2000+</p>
                                    <p className="text-xs text-white/80">活跃团长</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">¥50万+</p>
                                    <p className="text-xs text-white/80">月交易额</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">3.5%</p>
                                    <p className="text-xs text-white/80">佣金比例</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 入驻权益 */}
                    <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-3">团长权益</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {benefits.map((b, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-2">
                                        <b.icon size={20} />
                                    </div>
                                    <p className="font-bold text-sm text-gray-800">{b.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 入驻条件 */}
                    <div className="p-4 bg-white mt-2">
                        <h3 className="font-bold text-gray-800 mb-3">入驻条件</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>完成实名认证</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>有BJD圈子相关经验</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>提供过往团购记录或作品</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>同意《团长服务协议》</span>
                            </div>
                        </div>
                    </div>

                    {/* 底部按钮 */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">
                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-bold text-sm active:scale-95 transition-transform"
                        >
                            申请成为团长
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="pb-24">
                    <div className="p-4 space-y-4">
                        {/* 团长昵称 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">团长昵称 *</label>
                            <input
                                type="text"
                                value={form.nickname}
                                onChange={e => setForm({ ...form, nickname: e.target.value })}
                                placeholder="您的团长名称"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                            />
                        </div>

                        {/* 擅长领域 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">擅长领域 *</label>
                            <div className="flex flex-wrap gap-2">
                                {specialities.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setForm({ ...form, speciality: cat })}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${form.speciality === cat
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 相关经验 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">相关经验 *</label>
                            <textarea
                                value={form.experience}
                                onChange={e => setForm({ ...form, experience: e.target.value })}
                                placeholder="请描述您的BJD购买经验、是否有过开团经历等..."
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-24 resize-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                            />
                        </div>

                        {/* 联系方式 */}
                        <div className="bg-white rounded-xl p-4 space-y-3">
                            <label className="block text-sm font-medium text-gray-700">联系方式 *</label>
                            <input
                                type="text"
                                value={form.contact}
                                onChange={e => setForm({ ...form, contact: e.target.value })}
                                placeholder="手机号"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                            />
                            <input
                                type="text"
                                value={form.wechat}
                                onChange={e => setForm({ ...form, wechat: e.target.value })}
                                placeholder="微信号"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                            />
                            <input
                                type="text"
                                value={form.taobao}
                                onChange={e => setForm({ ...form, taobao: e.target.value })}
                                placeholder="淘宝店铺链接 (选填)"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                            />
                        </div>

                        {/* 资质上传 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">资料上传</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    onClick={() => setForm({ ...form, idCard: !form.idCard })}
                                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer ${form.idCard ? 'border-green-400 bg-green-50' : 'border-gray-200'
                                        }`}
                                >
                                    {form.idCard ? (
                                        <CheckCircle size={24} className="text-green-500" />
                                    ) : (
                                        <Camera size={24} className="text-gray-400" />
                                    )}
                                    <span className="text-xs text-gray-500">身份证照片 *</span>
                                </div>
                                <div
                                    onClick={() => setForm({ ...form, portfolio: !form.portfolio })}
                                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer ${form.portfolio ? 'border-green-400 bg-green-50' : 'border-gray-200'
                                        }`}
                                >
                                    {form.portfolio ? (
                                        <CheckCircle size={24} className="text-green-500" />
                                    ) : (
                                        <Upload size={24} className="text-gray-400" />
                                    )}
                                    <span className="text-xs text-gray-500">历史开团截图</span>
                                </div>
                            </div>
                        </div>

                        {/* 协议 */}
                        <div className="flex items-start gap-2 px-2">
                            <input
                                type="checkbox"
                                checked={form.agree}
                                onChange={e => setForm({ ...form, agree: e.target.checked })}
                                className="mt-1 w-4 h-4 text-purple-500"
                            />
                            <span className="text-xs text-gray-500">
                                我已阅读并同意 <span className="text-purple-500">《团长服务协议》</span> 和 <span className="text-purple-500">《平台佣金规则》</span>
                            </span>
                        </div>
                    </div>

                    {/* 底部按钮 */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full font-bold text-sm"
                        >
                            上一步
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-bold text-sm active:scale-95 transition-transform"
                        >
                            提交申请
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">申请已提交</h2>
                    <p className="text-gray-500 text-sm mb-6">我们将在1-3个工作日内审核您的申请，审核结果将通过消息通知您。</p>
                    <button
                        onClick={pop}
                        className="px-8 py-3 bg-purple-500 text-white rounded-full font-bold text-sm"
                    >
                        返回
                    </button>
                </div>
            )}
        </div>
    );
};

export default LeaderApply;
