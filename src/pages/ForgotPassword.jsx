import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { MessageCircle, Lock, Smartphone, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const { replace, pop } = useRouter();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = () => {
        if (!phone || !code || !newPassword || !confirmPassword) {
            alert('请填写完整信息');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }
        // Mock reset logic
        alert('密码重置成功，请重新登录');
        replace('Login');
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Background Image with Overlay (Reusing Login style) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80"
                    alt="BJD Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-purple-100/40 to-blue-100/40 mix-blend-overlay"></div>
            </div>

            {/* Animated Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Glassmorphism Card */}
            <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative z-10">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => pop()}
                        className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4"
                    >
                        <ChevronLeft size={20} />
                        <span className="text-sm font-medium">返回登录</span>
                    </button>
                    <h1 className="text-2xl font-serif font-bold text-gray-800 mb-1">重置密码</h1>
                    <p className="text-gray-500 text-xs">Reset Your Password</p>
                </div>

                {/* Inputs */}
                <div className="space-y-5">
                    <div className="group bg-white/50 focus-within:bg-white border border-gray-100 focus-within:border-rose-200 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-300 shadow-sm">
                        <Smartphone size={18} className="text-gray-400 group-focus-within:text-rose-400 transition-colors" />
                        <input
                            type="tel"
                            placeholder="请输入手机号"
                            className="bg-transparent flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="group bg-white/50 focus-within:bg-white border border-gray-100 focus-within:border-rose-200 rounded-2xl px-4 py-3 flex items-center gap-3 flex-1 transition-all duration-300 shadow-sm">
                            <MessageCircle size={18} className="text-gray-400 group-focus-within:text-rose-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="验证码"
                                className="bg-transparent flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                        </div>
                        <button className="px-4 rounded-2xl bg-rose-50 text-rose-500 text-xs font-bold hover:bg-rose-100 transition-colors whitespace-nowrap">
                            获取验证码
                        </button>
                    </div>

                    <div className="group bg-white/50 focus-within:bg-white border border-gray-100 focus-within:border-rose-200 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-300 shadow-sm">
                        <Lock size={18} className="text-gray-400 group-focus-within:text-rose-400 transition-colors" />
                        <input
                            type="password"
                            placeholder="请输入新密码"
                            className="bg-transparent flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="group bg-white/50 focus-within:bg-white border border-gray-100 focus-within:border-rose-200 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-300 shadow-sm">
                        <Lock size={18} className="text-gray-400 group-focus-within:text-rose-400 transition-colors" />
                        <input
                            type="password"
                            placeholder="请确认新密码"
                            className="bg-transparent flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-200 hover:shadow-rose-300 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-6"
                    >
                        <span>确认重置</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
