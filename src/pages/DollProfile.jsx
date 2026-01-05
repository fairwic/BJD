import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Edit2, Share2, Calendar, Package, FileText, Image as ImageIcon, Heart, Wrench, ShoppingBag, X, QrCode, Download } from 'lucide-react';

const DollProfile = () => {
    const { currentRoute, pop, push } = useRouter();
    const { id } = currentRoute.params || {};

    // Mock 娃娃数据
    const [doll] = useState({
        id: 'd1',
        name: '小鹿',
        brand: '自制特体',
        size: '1/3',
        skinColor: '白肌',
        birthday: '2023-10-15',
        weight: 200,
        height: 60,
        images: ['bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-50'],
        orderId: 'o1',
        contractId: 'CT-o1',
        makeup: '原厂妆',
        outfitCount: 12,
        photoCount: 89,
        maintenanceRecords: [
            { date: '2023-12-01', type: '维修', note: '左手关节松动，已加紧' }
        ],
        daysOwned: 54
    });

    const [showCertificate, setShowCertificate] = useState(false);

    const handleShare = () => {
        setShowCertificate(true);
    };

    // 电子出生证模态框
    if (showCertificate) {
        return (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    {/* Header Controls */}
                    <div className="flex justify-between p-4 bg-gray-900 text-white">
                        <button onClick={() => setShowCertificate(false)}><X size={24} /></button>
                        <button className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
                            <Download size={16} /> 保存图片
                        </button>
                    </div>

                    {/* Certificate Content */}
                    <div className="bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-amber-50 p-6 text-center relative">
                        {/* Decorative Borders */}
                        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-amber-800/20" />
                        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber-800/20" />
                        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-amber-800/20" />
                        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-amber-800/20" />

                        {/* Title */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-serif font-bold text-gray-800 tracking-widest">BIRTH CERTIFICATE</h2>
                            <p className="text-xs text-amber-800 uppercase tracking-[0.3em] mt-1">Authentic BJD Identity</p>
                        </div>

                        {/* Photo */}
                        <div className="mx-auto w-40 h-40 bg-white p-2 shadow-lg rotate-1 transform hover:rotate-0 transition-transform duration-500 mb-6">
                            <div className={`w-full h-full ${doll.images[0]} grayscale hover:grayscale-0 transition-all duration-500`} />
                        </div>

                        {/* Details */}
                        <div className="space-y-4 font-serif">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{doll.name}</h1>
                                <p className="text-sm text-gray-500 italic mt-1">{doll.brand} · {doll.size}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-left px-4 my-6">
                                <div className="border-b border-amber-800/10 pb-1">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Birthday</p>
                                    <p className="font-bold text-gray-800">{doll.birthday}</p>
                                </div>
                                <div className="border-b border-amber-800/10 pb-1">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Skin Color</p>
                                    <p className="font-bold text-gray-800">{doll.skinColor}</p>
                                </div>
                                <div className="border-b border-amber-800/10 pb-1">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Guardian</p>
                                    <p className="font-bold text-gray-800">当前用户</p>
                                </div>
                                <div className="border-b border-amber-800/10 pb-1">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">ID Number</p>
                                    <p className="font-bold text-gray-800 font-mono text-xs pt-1">{doll.id.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-end justify-between mt-8 pt-4 border-t border-amber-800/10">
                            <div className="text-left">
                                <QrCode size={40} className="text-gray-800 opacity-80" />
                            </div>
                            <div className="text-right">
                                <div className="font-handwriting text-xl text-gray-600 -rotate-2">
                                    Official Signed
                                </div>
                                <p className="text-[10px] text-gray-400 uppercase mt-1">Certified By GOMaster</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 flex items-center justify-between p-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <div className="flex gap-3">
                    <button onClick={() => push('AddDoll', { id: doll.id, mode: 'edit' })}>
                        <Edit2 size={20} className="text-gray-600" />
                    </button>
                    <button onClick={handleShare}>
                        <Share2 size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* 照片墙 */}
            <div className="bg-white p-4 mb-2">
                <div className="grid grid-cols-2 gap-2">
                    {doll.images.map((img, i) => (
                        <div
                            key={i}
                            className={`aspect-square ${img} rounded-xl ${i === 0 ? 'col-span-2' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {/* 基本信息 */}
            <div className="bg-white p-4 mb-2">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{doll.name}</h1>
                    <div className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-bold">
                        已养{doll.daysOwned}天 💖
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">品牌</span>
                        <span className="font-bold text-gray-800">{doll.brand}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">尺寸</span>
                        <span className="font-bold text-gray-800">{doll.size}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">肤色</span>
                        <span className="font-bold text-gray-800">{doll.skinColor}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">生日</span>
                        <span className="font-bold text-gray-800">{doll.birthday}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">体重</span>
                        <span className="font-bold text-gray-800">{doll.weight}g</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">身高</span>
                        <span className="font-bold text-gray-800">{doll.height}cm</span>
                    </div>
                </div>
            </div>

            {/* 关联数据 */}
            <div className="bg-white p-4 mb-2">
                <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Package size={18} className="text-rose-500" />
                    关联信息
                </h2>

                <div className="space-y-2">
                    <div
                        onClick={() => push('OrderDetail', { id: doll.orderId })}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg active:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <ShoppingBag size={20} className="text-gray-400" />
                            <div>
                                <p className="text-sm font-bold text-gray-800">购买订单</p>
                                <p className="text-xs text-gray-500">订单号: {doll.orderId}</p>
                            </div>
                        </div>
                        <ChevronLeft size={16} className="text-gray-300 rotate-180" />
                    </div>

                    <div
                        onClick={() => push('MyContracts')}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg active:bg-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-gray-400" />
                            <div>
                                <p className="text-sm font-bold text-gray-800">电子合同</p>
                                <p className="text-xs text-gray-500">合同号: {doll.contractId}</p>
                            </div>
                        </div>
                        <ChevronLeft size={16} className="text-gray-300 rotate-180" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Heart size={20} className="text-gray-400" />
                            <div>
                                <p className="text-sm font-bold text-gray-800">妆面</p>
                                <p className="text-xs text-gray-500">{doll.makeup}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 数据统计 */}
            <div className="bg-white p-4 mb-2">
                <h2 className="font-bold text-gray-800 mb-3">娃娃数据</h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 text-center">
                        <ImageIcon size={24} className="text-rose-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">{doll.photoCount}</p>
                        <p className="text-xs text-gray-500 mt-1">照片</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                        <ShoppingBag size={24} className="text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">{doll.outfitCount}</p>
                        <p className="text-xs text-gray-500 mt-1">衣服</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                        <Wrench size={24} className="text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">{doll.maintenanceRecords.length}</p>
                        <p className="text-xs text-gray-500 mt-1">保养</p>
                    </div>
                </div>
            </div>

            {/* 保养记录 */}
            <div className="bg-white p-4 mb-2">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <Wrench size={18} className="text-blue-500" />
                        保养记录
                    </h2>
                    <button className="text-sm text-rose-500 font-bold">+ 添加</button>
                </div>

                <div className="space-y-3">
                    {doll.maintenanceRecords.map((record, i) => (
                        <div key={i} className="border-l-2 border-rose-500 pl-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-xs text-gray-500">{record.date}</span>
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                    {record.type}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700">{record.note}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 分享卡片预览 */}
            <div className="bg-white p-4">
                <h2 className="font-bold text-gray-800 mb-3">电子身份证</h2>
                <div className="bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-20 h-20 rounded-full ${doll.images[0]}`} />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{doll.name}</h3>
                                <p className="text-sm text-gray-600">{doll.brand}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-white/50 backdrop-blur rounded-lg p-2">
                                <p className="text-gray-600 text-xs">尺寸</p>
                                <p className="font-bold text-gray-900">{doll.size}</p>
                            </div>
                            <div className="bg-white/50 backdrop-blur rounded-lg p-2">
                                <p className="text-gray-600 text-xs">肤色</p>
                                <p className="font-bold text-gray-900">{doll.skinColor}</p>
                            </div>
                            <div className="bg-white/50 backdrop-blur rounded-lg p-2 col-span-2">
                                <p className="text-gray-600 text-xs">已养</p>
                                <p className="font-bold text-gray-900">{doll.daysOwned}天 💖</p>
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="w-full mt-4 bg-gray-900 text-white font-bold py-2 rounded-lg"
                        >
                            分享到社交平台
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DollProfile;

