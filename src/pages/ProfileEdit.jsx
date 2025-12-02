import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Camera, CheckCircle2 } from 'lucide-react';

const ProfileEdit = () => {
    const { pop } = useRouter();
    const { currentUser } = useApp();
    const [formData, setFormData] = useState({
        name: currentUser.name,
        nickname: currentUser.nickname || '',
        bio: currentUser.bio || '',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        address: currentUser.address || '',
    });
    const [avatar, setAvatar] = useState(null);
    const [saved, setSaved] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                setAvatar(evt.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Mock 保存
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">编辑资料</h1>
                </div>
                <button onClick={handleSave} className="text-rose-500 font-bold text-sm">
                    保存
                </button>
            </div>

            <div className="p-4 space-y-4">
                {/* 头像 */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">头像</span>
                        <div className="relative">
                            <div className={`w-16 h-16 rounded-full ${currentUser.avatar} flex items-center justify-center overflow-hidden`}>
                                {avatar ? (
                                    <img src={avatar} alt="头像" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white font-bold text-2xl">{currentUser.name[0]}</span>
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Camera size={20} className="text-white" />
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* 基本信息 */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm">基本信息</h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                            <label className="text-sm text-gray-500 w-20">用户名</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="flex-1 text-right text-sm outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                            <label className="text-sm text-gray-500 w-20">昵称</label>
                            <input
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                                placeholder="设置昵称"
                                className="flex-1 text-right text-sm outline-none"
                            />
                        </div>

                        <div className="flex items-start justify-between border-b border-gray-50 pb-3">
                            <label className="text-sm text-gray-500 w-20 pt-2">个性签名</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="写点什么介绍自己..."
                                rows={3}
                                className="flex-1 text-right text-sm outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 联系方式 */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-800 text-sm">联系方式</h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                            <label className="text-sm text-gray-500 w-20">手机号</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="未绑定"
                                className="flex-1 text-right text-sm outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                            <label className="text-sm text-gray-500 w-20">邮箱</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="未绑定"
                                className="flex-1 text-right text-sm outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 保存成功提示 */}
                {saved && (
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg animate-in fade-in zoom-in">
                        <CheckCircle2 size={20} />
                        <span>保存成功</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileEdit;
