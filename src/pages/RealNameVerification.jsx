    import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

const RealNameVerification = () => {
    const { pop } = useRouter();
    const { currentUser } = useApp();
    const [formData, setFormData] = useState({
        realName: '',
        idNumber: '',
        phone: currentUser.phone || '',
    });
    const [idCardFront, setIdCardFront] = useState(null);
    const [idCardBack, setIdCardBack] = useState(null);
    const [status, setStatus] = useState(null); // { success: boolean, msg: string }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (type, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (type === 'front') setIdCardFront(evt.target.result);
                else setIdCardBack(evt.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!formData.realName || !formData.idNumber || !formData.phone) {
            setStatus({ success: false, msg: '请填写所有必填项' });
            return;
        }
        if (!idCardFront || !idCardBack) {
            setStatus({ success: false, msg: '请上传身份证正反面照片' });
            return;
        }

        // Mock 提交
        setStatus({ success: true, msg: '实名认证提交成功，预计1-3个工作日审核完成' });
        setTimeout(() => {
            pop();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">实名认证</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* 提示信息 */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700">
                    <p className="font-bold mb-1">为什么需要实名认证？</p>
                    <p className="text-xs">根据相关法规要求，参与团购需要完成实名认证，保障交易安全。</p>
                </div>

                {/* 基本信息 */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm">基本信息</h2>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">真实姓名 *</label>
                        <input
                            name="realName"
                            value={formData.realName}
                            onChange={handleInputChange}
                            placeholder="请输入真实姓名"
                            className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">身份证号 *</label>
                        <input
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            placeholder="请输入18位身份证号"
                            maxLength={18}
                            className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">手机号 *</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="请输入手机号"
                            maxLength={11}
                            className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>
                </div>

                {/* 身份证上传 */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm">身份证照片</h2>

                    <div className="grid grid-cols-2 gap-3">
                        {/* 正面 */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">身份证正面</label>
                            <div className="relative border-2 border-dashed border-gray-200 rounded-xl aspect-[3/2] flex items-center justify-center bg-gray-50 overflow-hidden">
                                {idCardFront ? (
                                    <img src={idCardFront} alt="身份证正面" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <Upload size={24} className="mx-auto mb-1" />
                                        <p className="text-xs">点击上传</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload('front', e)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* 反面 */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">身份证反面</label>
                            <div className="relative border-2 border-dashed border-gray-200 rounded-xl aspect-[3/2] flex items-center justify-center bg-gray-50 overflow-hidden">
                                {idCardBack ? (
                                    <img src={idCardBack} alt="身份证反面" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <Upload size={24} className="mx-auto mb-1" />
                                        <p className="text-xs">点击上传</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload('back', e)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">请确保照片清晰，四角完整，信息可见</p>
                </div>

                {/* 状态提示 */}
                {status && (
                    <div className={`p-3 rounded-xl flex items-center gap-2 text-sm ${status.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {status.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span>{status.msg}</span>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 shadow-md active:scale-95 transition-all"
                >
                    提交认证
                </button>
            </div>
        </div>
    );
};

export default RealNameVerification;
