import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const AccountSecurity = () => {
    const { pop } = useRouter();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [status, setStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            setStatus({ success: false, msg: '请填写所有字段' });
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setStatus({ success: false, msg: '两次输入的新密码不一致' });
            return;
        }
        if (formData.newPassword.length < 6) {
            setStatus({ success: false, msg: '密码长度不能少于6位' });
            return;
        }

        // Mock 提交
        setStatus({ success: true, msg: '密码修改成功' });
        setTimeout(() => {
            pop();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">账号安全</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* 安全等级 */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-700">安全等级</span>
                        <span className="text-sm font-bold text-orange-500">中</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="flex-1 h-1 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-1 bg-orange-500 rounded-full"></div>
                        <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">建议绑定手机号和邮箱，提升账号安全性</p>
                </div>

                {/* 修改密码 */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        <Lock size={16} className="text-rose-500" />
                        修改密码
                    </h2>

                    <div>
                        <label className="block text-xs text-gray-500 mb-2">当前密码</label>
                        <div className="relative">
                            <input
                                name="oldPassword"
                                type={showOldPassword ? 'text' : 'password'}
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                                placeholder="请输入当前密码"
                                className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200 pr-10"
                            />
                            <button
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-2">新密码</label>
                        <div className="relative">
                            <input
                                name="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder="请输入新密码（至少6位）"
                                className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200 pr-10"
                            />
                            <button
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-2">确认新密码</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="请再次输入新密码"
                            className="w-full p-3 bg-gray-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-rose-200"
                        />
                    </div>
                </div>

                {/* 其他安全设置 */}
                <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-50">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-gray-800">手机号绑定</h3>
                            <p className="text-xs text-gray-400 mt-0.5">138****8888</p>
                        </div>
                        <button className="text-xs text-rose-500">更换</button>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-gray-800">邮箱绑定</h3>
                            <p className="text-xs text-gray-400 mt-0.5">未绑定</p>
                        </div>
                        <button className="text-xs text-rose-500">绑定</button>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-gray-800">登录设备管理</h3>
                            <p className="text-xs text-gray-400 mt-0.5">查看登录记录</p>
                        </div>
                        <ChevronLeft size={16} className="text-gray-300 rotate-180" />
                    </div>
                </div>

                {/* 状态提示 */}
                {status && (
                    <div className={`p-3 rounded-xl flex items-center gap-2 text-sm ${status.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {status.success ? <CheckCircle2 size={16} /> : <Lock size={16} />}
                        <span>{status.msg}</span>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 shadow-md active:scale-95 transition-all"
                >
                    确认修改
                </button>
            </div>
        </div>
    );
};

export default AccountSecurity;
