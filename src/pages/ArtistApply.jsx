import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Palette, Upload, Camera, CheckCircle, Heart, Star, Brush, Sparkles, Scissors } from 'lucide-react';

const ArtistApply = () => {
    const { pop } = useRouter();
    const [step, setStep] = useState(1); // 1: 介绍, 2: 填写资料, 3: 提交成功
    const [form, setForm] = useState({
        artistName: '',
        artistType: '', // makeup, wig
        styles: [],
        bio: '',
        contact: '',
        wechat: '',
        portfolio: false,
        certificate: false,
        agree: false,
    });

    const benefits = [
        { icon: Star, title: '官方认证大师', desc: '获得认证标识，增加曝光' },
        { icon: Heart, title: '接单赚收益', desc: '自主接单，定价自由' },
        { icon: Sparkles, title: '展示作品集', desc: '专属主页展示精选作品' },
        { icon: Brush, title: '大师社区', desc: '加入大师群，交流技术' },
    ];

    const artistTypes = [
        { id: 'makeup', label: '妆师', icon: Palette, desc: '娃娃妆面绘制' },
        { id: 'wig', label: '毛娘', icon: Scissors, desc: '假发/植毛制作' },
    ];

    const styleOptions = {
        makeup: ['古风', '清冷', '日系', '病娇', '甜美', '暗黑', '写实', '其他'],
        wig: ['长直', '卷发', '古风', '现代', '染色', '植毛', '造型', '其他'],
    };

    const toggleStyle = (style) => {
        setForm(prev => ({
            ...prev,
            styles: prev.styles.includes(style)
                ? prev.styles.filter(s => s !== style)
                : [...prev.styles, style]
        }));
    };

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
                <h1 className="text-base font-bold text-gray-800 ml-2">成为妆师/毛娘</h1>
            </div>

            {step === 1 && (
                <div className="pb-24">
                    {/* Hero Banner */}
                    <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Palette size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">成为BJD大师</h2>
                                <p className="text-white/80 text-sm">用您的技艺为娃娃注入灵魂</p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                            <div className="flex justify-around text-center">
                                <div>
                                    <p className="text-2xl font-bold">500+</p>
                                    <p className="text-xs text-white/80">认证大师</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">¥800+</p>
                                    <p className="text-xs text-white/80">平均单价</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">98%</p>
                                    <p className="text-xs text-white/80">好评率</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 入驻权益 */}
                    <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-3">大师权益</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {benefits.map((b, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-2">
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
                                <span>提供至少3张作品照片</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>有一定的服务经验</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>同意《大师服务协议》</span>
                            </div>
                        </div>
                    </div>

                    {/* 底部按钮 */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">
                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-bold text-sm active:scale-95 transition-transform"
                        >
                            申请成为大师
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="pb-24">
                    <div className="p-4 space-y-4">
                        {/* 大师类型 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">选择类型 *</label>
                            <div className="grid grid-cols-2 gap-3">
                                {artistTypes.map(type => (
                                    <div
                                        key={type.id}
                                        onClick={() => setForm({ ...form, artistType: type.id, styles: [] })}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${form.artistType === type.id
                                            ? 'border-rose-400 bg-rose-50'
                                            : 'border-gray-100 bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${form.artistType === type.id ? 'bg-rose-400 text-white' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            <type.icon size={20} />
                                        </div>
                                        <p className="font-bold text-sm text-gray-800">{type.label}</p>
                                        <p className="text-xs text-gray-500">{type.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 大师名称 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">大师名称 *</label>
                            <input
                                type="text"
                                value={form.artistName}
                                onChange={e => setForm({ ...form, artistName: e.target.value })}
                                placeholder="您的大师名称/工作室名称"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none"
                            />
                        </div>

                        {/* 擅长风格 */}
                        {form.artistType && (
                            <div className="bg-white rounded-xl p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">擅长风格 *（可多选）</label>
                                <div className="flex flex-wrap gap-2">
                                    {styleOptions[form.artistType]?.map(style => (
                                        <button
                                            key={style}
                                            onClick={() => toggleStyle(style)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${form.styles.includes(style)
                                                ? 'bg-rose-500 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 个人简介 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">个人简介</label>
                            <textarea
                                value={form.bio}
                                onChange={e => setForm({ ...form, bio: e.target.value })}
                                placeholder="介绍一下您的技能、经验、特色..."
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-24 resize-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none"
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
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none"
                            />
                            <input
                                type="text"
                                value={form.wechat}
                                onChange={e => setForm({ ...form, wechat: e.target.value })}
                                placeholder="微信号"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none"
                            />
                        </div>

                        {/* 作品上传 */}
                        <div className="bg-white rounded-xl p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">作品上传</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    onClick={() => setForm({ ...form, portfolio: !form.portfolio })}
                                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer ${form.portfolio ? 'border-green-400 bg-green-50' : 'border-gray-200'
                                        }`}
                                >
                                    {form.portfolio ? (
                                        <CheckCircle size={24} className="text-green-500" />
                                    ) : (
                                        <Camera size={24} className="text-gray-400" />
                                    )}
                                    <span className="text-xs text-gray-500">作品照片 *</span>
                                    <span className="text-[10px] text-gray-400">至少3张</span>
                                </div>
                                <div
                                    onClick={() => setForm({ ...form, certificate: !form.certificate })}
                                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer ${form.certificate ? 'border-green-400 bg-green-50' : 'border-gray-200'
                                        }`}
                                >
                                    {form.certificate ? (
                                        <CheckCircle size={24} className="text-green-500" />
                                    ) : (
                                        <Upload size={24} className="text-gray-400" />
                                    )}
                                    <span className="text-xs text-gray-500">资质证书</span>
                                    <span className="text-[10px] text-gray-400">选填</span>
                                </div>
                            </div>
                        </div>

                        {/* 协议 */}
                        <div className="flex items-start gap-2 px-2">
                            <input
                                type="checkbox"
                                checked={form.agree}
                                onChange={e => setForm({ ...form, agree: e.target.checked })}
                                className="mt-1 w-4 h-4 text-rose-500"
                            />
                            <span className="text-xs text-gray-500">
                                我已阅读并同意 <span className="text-rose-500">《大师服务协议》</span> 和 <span className="text-rose-500">《平台服务规范》</span>
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
                            className="flex-1 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-bold text-sm active:scale-95 transition-transform"
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
                        className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold text-sm"
                    >
                        返回
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArtistApply;
