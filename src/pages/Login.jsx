import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { MessageCircle, Lock, Smartphone, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const Login = () => {
    const { login } = useApp();
    const { replace } = useRouter();
    const [loginMethod, setLoginMethod] = useState('code'); // 'code' or 'password'
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleLogin = () => {
        if (!agreed) {
            alert('请先阅读并同意用户协议');
            return;
        }
        login(1);
        replace('Home');
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80"
                    alt="BJD Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-purple-100/40 to-blue-100/40 mix-blend-overlay"></div>
            </div>

            {/* Animated Blobs (kept for extra atmosphere) */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Glassmorphism Card */}
            <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl shadow-lg shadow-rose-200 mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                        <Sparkles className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2 tracking-wide">拼团大师</h1>
                    <p className="text-gray-500 text-xs tracking-widest uppercase">BJD Group Buying Master</p>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-gray-100/50 rounded-xl mb-8 relative">
                    <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${loginMethod === 'code' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                    ></div>
                    <button
                        onClick={() => setLoginMethod('code')}
                        className={`flex-1 relative z-10 py-2 text-sm font-medium transition-colors duration-300 ${loginMethod === 'code' ? 'text-gray-800' : 'text-gray-400'}`}
                    >
                        验证码登录
                    </button>
                    <button
                        onClick={() => setLoginMethod('password')}
                        className={`flex-1 relative z-10 py-2 text-sm font-medium transition-colors duration-300 ${loginMethod === 'password' ? 'text-gray-800' : 'text-gray-400'}`}
                    >
                        密码登录
                    </button>
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

                    {loginMethod === 'code' ? (
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
                    ) : (
                        <>
                            <div className="group bg-white/50 focus-within:bg-white border border-gray-100 focus-within:border-rose-200 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-300 shadow-sm">
                                <Lock size={18} className="text-gray-400 group-focus-within:text-rose-400 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="请输入密码"
                                    className="bg-transparent flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end px-1">
                                <button
                                    onClick={() => replace('ForgotPassword')}
                                    className="text-[10px] text-gray-400 hover:text-rose-500 transition-colors"
                                >
                                    忘记密码？
                                </button>
                            </div>
                        </>
                    )}

                    {/* Agreement */}
                    <div className="flex items-start gap-2 pt-2 px-1">
                        <button
                            onClick={() => setAgreed(!agreed)}
                            className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${agreed ? 'bg-rose-500 border-rose-500' : 'border-gray-300 bg-white'}`}
                        >
                            {agreed && <CheckCircle2 size={12} className="text-white" />}
                        </button>
                        <p className="text-[10px] text-gray-400 leading-relaxed">
                            我已阅读并同意
                            <span className="text-rose-500 cursor-pointer hover:underline">《用户服务协议》</span>
                            和
                            <span className="text-rose-500 cursor-pointer hover:underline">《隐私政策》</span>
                        </p>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-200 hover:shadow-rose-300 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                    >
                        <span>立即登录</span>
                        <ArrowRight size={18} />
                    </button>
                </div>

                {/* Third Party Login */}
                <div className="mt-10">
                    <div className="relative flex justify-center text-[10px] text-gray-400 mb-6">
                        <span className="bg-white/0 px-2 z-10 backdrop-blur-sm">其他登录方式</span>
                    </div>
                    <div className="flex justify-center gap-6">
                        <button className="w-10 h-10 rounded-full bg-white shadow-sm text-green-500 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.6 19.5c-4.3 0-7.8-3.1-7.8-6.9 0-2.1 1.1-4 2.8-5.3.1-.1.2-.2.2-.4 0-.1 0-.3-.1-.4-.6-1.8-.8-2.4-.8-2.5 0-.1.1-.2.2-.2.6.1 2.2.5 3.5 1.5.2.1.4.1.6.1 1.4-.4 2.9-.6 4.4-.6 4.3 0 7.8 3.1 7.8 6.9 0 3.8-3.5 6.8-7.8 6.8zm11.3-9.9c0-3.3-3.3-6-7.3-6-4 0-7.3 2.7-7.3 6 0 3.3 3.3 6 7.3 6 .9 0 1.7-.1 2.5-.4.2-.1.5-.1.7 0 1.1.7 2.4 1 2.8 1.1.1 0 .2 0 .2-.1 0 0 0-.1-.1-.2-.2-.5-.5-1.4-1.1-2.9-.1-.2-.1-.5 0-.7 1.5-1.5 2.3-3.5 2.3-5.8z" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white shadow-sm text-blue-500 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2.2.2.3.5.2.8-.4 1.5-1 2.8-1.1 2.9-.1.2.1.4.3.4 1.3.1 3.1-.3 4.6-1.4.2-.1.5-.1.8 0 1 .4 2.1.6 3.3.6 5.5 0 10-4.1 10-9.2S17.5 2 12 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-[10px] text-gray-400/80">Mock Login System for Demo</p>
            </div>
        </div>
    );
};

export default Login;
