import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { User, X, ChevronDown } from 'lucide-react';

const UserSwitcher = () => {
    const { currentUser, users, login } = useApp();
    const { reset } = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSwitch = (userId) => {
        login(userId);
        setIsOpen(false);
        reset('Home'); // 重置路由到首页
    };

    return (
        <>
            {/* 触发按钮 */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 z-40 bg-white/90 backdrop-blur shadow-lg rounded-full px-3 py-2 flex items-center gap-2 border border-gray-200 hover:bg-white transition-all text-sm"
            >
                <div className={`w-6 h-6 rounded-full ${currentUser.avatar} flex items-center justify-center text-white font-bold text-xs`}>
                    {currentUser.name[0]}
                </div>
                <span className="text-gray-700 font-medium max-w-[80px] truncate">{currentUser.name}</span>
                <ChevronDown size={14} className="text-gray-400" />
            </button>

            {/* 弹窗 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-gradient-to-r from-rose-100 to-purple-100 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-rose-600 font-bold">
                                <User size={20} />
                                <span>切换身份</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/50 rounded-full transition-colors">
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>

                        <div className="p-4 space-y-2">
                            {users.map(user => (
                                <button
                                    key={user.id}
                                    onClick={() => handleSwitch(user.id)}
                                    className={`w-full flex items-center p-3 rounded-xl border transition-all ${currentUser.id === user.id
                                            ? 'border-rose-500 bg-rose-50'
                                            : 'border-gray-100 hover:border-rose-200 hover:bg-rose-50'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center text-white font-bold text-lg`}>
                                        {user.name[0]}
                                    </div>
                                    <div className="ml-3 text-left flex-1">
                                        <h3 className="font-bold text-gray-800 text-sm">{user.name}</h3>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                    {currentUser.id === user.id && (
                                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserSwitcher;
