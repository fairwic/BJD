import React from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { User, ShoppingBag, ClipboardList } from 'lucide-react';

const Login = () => {
    const { users, login } = useApp();
    const { replace } = useRouter();

    const handleLogin = (userId) => {
        login(userId);
        replace('Home');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">欢迎来到 拼团大师</h1>
                    <p className="text-gray-500 mt-2">请选择您的身份登录</p>
                </div>

                <div className="space-y-4">
                    {users.map(user => (
                        <button
                            key={user.id}
                            onClick={() => handleLogin(user.id)}
                            className="w-full flex items-center p-4 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-full ${user.avatar} flex items-center justify-center text-gray-700 font-bold text-lg group-hover:scale-110 transition-transform`}>
                                {user.name[0]}
                            </div>
                            <div className="ml-4 text-left flex-1">
                                <h3 className="font-bold text-gray-800">{user.name}</h3>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                            <div className="text-gray-300 group-hover:text-rose-500">
                                <User size={20} />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-8 text-center text-xs text-gray-400">
                    Mock Login System for Demo
                </div>
            </div>
        </div>
    );
};

export default Login;
