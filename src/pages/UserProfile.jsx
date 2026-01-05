import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "../router/RouteStack";
import UserSwitcher from "../components/UserSwitcher";
import { MOCK_BARTERS } from "../data/mock";
import {
    ArrowRightLeft,
    Settings,
    Heart,
    Image as ImageIcon,
    CreditCard,
    Truck,
    MessageSquare,
    RotateCcw,
    ChevronRight,
    ShoppingBag,
    Sparkles,
    Palette,
    Package,
    Award,
    Book,
    FileText,
    MapPin,
    CheckCircle2,
    User,
    X,
    RefreshCw
} from "lucide-react";

const UserProfile = () => {
    const { currentUser, orders, login, users } = useApp();
    const { push } = useRouter();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const myBarters = MOCK_BARTERS.filter(b => b.initiatorId === currentUser.id || b.targetUserId === currentUser.id);



    return (
        <div className="pb-20 bg-gradient-to-b from-rose-50/50 to-gray-50 min-h-screen">
            <div className="bg-white pb-6 relative overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-br from-rose-300 via-pink-200 to-indigo-200 -z-10" />
                <div className="absolute top-0 left-0 right-0 h-52 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-0" />

                <div className="px-6 pt-14 pb-4 relative z-10" onClick={() => push("ProfileEdit")}>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            {/* Glowing ring effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
                            <div className={`relative w-20 h-20 rounded-full border-[4px] border-white shadow-xl shadow-rose-200/50 ${currentUser.avatar} group-active:scale-95 transition-transform`} />
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border-2 border-white text-rose-500">
                                <Settings size={14} />
                            </div>
                        </div>
                        <div className="flex-1 text-gray-800">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                                {currentUser.name}
                                <span className="text-[10px] bg-gradient-to-r from-rose-400 to-pink-500 text-white px-2 py-0.5 rounded-full shadow-sm shadow-rose-200">
                                    LV.3
                                </span>
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-gray-600 border border-white/50">
                                    ID: 9527001
                                </span>
                                <span className="text-xs text-gray-500">
                                    ✨ 养娃第 326 天
                                </span>
                            </div>
                        </div>
                        <ChevronRight className="text-gray-400" />
                    </div>
                </div>

                {/* Social Stats - Glassmorphism Card */}
                <div className="mx-4 mt-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-clay-sm border border-white/50">
                    <div className="flex justify-around">
                        <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer" onClick={() => push("MyFollowing")}>
                            <span className="font-bold text-xl text-gray-900">12</span>
                            <span className="text-xs text-gray-500 font-medium">关注</span>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer">
                            <span className="font-bold text-xl text-gray-900">8.6w</span>
                            <span className="text-xs text-gray-500 font-medium">粉丝</span>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer">
                            <span className="font-bold text-xl text-rose-500">1.2k</span>
                            <span className="text-xs text-gray-500 font-medium">获赞与收藏</span>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer" onClick={() => push("MyFootprint")}>
                            <span className="font-bold text-xl text-gray-900">128</span>
                            <span className="text-xs text-gray-500 font-medium">足迹</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Orders Row - Claymorphism */}
            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-clay-sm border border-gray-100/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-gray-800">我的订单</h3>
                    <span className="text-xs text-gray-400 flex items-center cursor-pointer hover:text-rose-500 transition-colors" onClick={() => push("MyOrders")}>
                        全部订单 <ChevronRight size={14} />
                    </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <div className="flex flex-col items-center gap-2.5 cursor-pointer active:scale-95 transition-all group" onClick={() => push("MyOrders", { tab: 'pending_payment' })}>
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-500 group-hover:shadow-md transition-shadow">
                            <CreditCard size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium">待付款</span>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 cursor-pointer active:scale-95 transition-all group" onClick={() => push("MyOrders", { tab: 'pending_shipment' })}>
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-500 group-hover:shadow-md transition-shadow">
                            <Package size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium">待发货</span>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 cursor-pointer active:scale-95 transition-all group" onClick={() => push("MyOrders", { tab: 'shipped' })}>
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 text-green-500 group-hover:shadow-md transition-shadow">
                            <Truck size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium">待收货</span>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 cursor-pointer active:scale-95 transition-all group" onClick={() => push("MyOrders", { tab: 'pending_review' })}>
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 text-purple-500 group-hover:shadow-md transition-shadow">
                            <MessageSquare size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium">待评价</span>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 cursor-pointer active:scale-95 transition-all group" onClick={() => push("MyOrders", { tab: 'refund' })}>
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 text-rose-500 group-hover:shadow-md transition-shadow">
                            <RotateCcw size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium">退款/售后</span>
                    </div>
                </div>
            </div>

            {/* Active Barters Card */}
            {myBarters.length > 0 && (
                <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm shadow-blue-50/50">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <RefreshCw size={16} className="text-accent" />
                            我的交换
                        </h3>
                        <span className="text-xs text-gray-400 cursor-pointer">全部记录</span>
                    </div>
                    <div className="space-y-3">
                        {myBarters.map(barter => {
                            const isInit = barter.initiatorId === currentUser.id;
                            const partnerName = isInit ? '对方' : '发起人'; // Simplify for now
                            return (
                                <div
                                    key={barter.id}
                                    onClick={() => push('BarterOrderDetail', { id: barter.id })}
                                    className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl active:scale-[0.99] transition-transform"
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center shrink-0">
                                        <RefreshCw size={20} className="text-gray-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-sm text-gray-800">
                                                {barter.serviceType === 'platform' ? '平台验货' : '互保直寄'}
                                            </span>
                                            <span className="text-[10px] bg-white border border-rose-100 text-rose-500 px-1.5 py-0.5 rounded-full">
                                                {barter.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">
                                            {isInit ? `您发起 vs ${partnerName}` : `${partnerName} 发起 vs 您`}
                                        </p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Verification Card */}
            <div className="px-4 mt-3">
                <div
                    onClick={() => push("ArtistApply")}
                    className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform text-white shadow-lg shadow-gray-200"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full flex items-center justify-center text-white shadow-md border-2 border-gray-800 shrink-0">
                        <Sparkles size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-amber-300">成为认证创作者</h3>
                            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white/90">Exclusive</span>
                        </div>
                        <p className="text-xs text-white/60">
                            开放妆面、手作、绘画等接单权限
                        </p>
                    </div>
                    <div className="bg-white/10 p-1.5 rounded-full text-white/80">
                        <ChevronRight size={18} />
                    </div>
                </div>
            </div>



            {/* 设置菜单 - Grouped */}
            <div className="px-4 space-y-3 mt-4">
                {/* 常用工具 */}
                <div className="bg-white rounded-xl divide-y divide-gray-50 overflow-hidden">
                    {/* Content Management Group */}
                    <div
                        onClick={() => push("MyPosts")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                            <Sparkles size={16} />
                        </div>
                        <span className="text-sm text-gray-800 flex-1 font-bold">我的动态</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    <div
                        onClick={() => push("MyListings")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                            <ShoppingBag size={16} />
                        </div>
                        <span className="text-sm text-gray-800 flex-1 font-bold">我的闲置</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>

                    {/* Collections */}
                    <div
                        onClick={() => push("MyCollections")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                            <Package size={16} />
                        </div>
                        <span className="text-sm text-gray-800 flex-1 font-bold">收藏中心</span>
                        <span className="text-xs text-gray-400">3只</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    {/* Achievements */}
                    <div
                        onClick={() => push("AchievementCenter")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                            <Award size={16} />
                        </div>
                        <span className="text-sm text-gray-800 flex-1 font-bold">成就中心</span>
                        <span className="text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    {/* Knowledge */}
                    <div
                        onClick={() => push("KnowledgeBase")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <Book size={16} />
                        </div>
                        <span className="text-sm text-gray-800 flex-1 font-bold">BJD 知识库</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </div>

                {/* 账号管理 */}
                <div className="bg-white rounded-xl divide-y divide-gray-50 overflow-hidden">
                    <div
                        onClick={() => push("AddressManagement")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <MapPin size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-700 flex-1">收货地址</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    <div
                        onClick={() => push("RealNameVerification")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <CheckCircle2 size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-700 flex-1">实名认证</span>
                        <span className="text-xs text-gray-400">未认证</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    <div
                        onClick={() => push("PaymentSettings")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <Package size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-700 flex-1">支付/钱包</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    <div
                        onClick={() => push("AccountSecurity")}
                        className="flex items-center gap-3 p-4 active:bg-gray-50"
                    >
                        <Settings size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-700 flex-1">账号安全</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4">
                <button
                    onClick={() => push("Login")}
                    className="w-full py-3 text-secondary-500 bg-white rounded-xl text-sm font-bold"
                >
                    退出登录
                </button>
            </div>
            {/* Temporary User Switcher Float Button & Menu */}
            <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
                {showUserMenu && (
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-48 animate-in slide-in-from-bottom-2 fade-in duration-200 mb-2">
                        <div className="text-xs font-bold text-gray-400 px-2 py-1 mb-1">切换用户</div>
                        {users.map(u => (
                            <button
                                key={u.id}
                                onClick={() => {
                                    login(u.id);
                                    setShowUserMenu(false);
                                }}
                                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${currentUser.id === u.id ? 'bg-rose-50 text-rose-600' : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-full ${u.avatar || 'bg-gray-200'} border border-gray-100`} />
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold truncate">{u.name}</div>
                                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                        {u.role === 'leader' && <span className="text-yellow-500">团长</span>}
                                        {u.role === 'merchant' && <span className="text-purple-500">商家</span>}
                                        {u.role === 'user' && <span>用户</span>}
                                        <span>· 信用{u.creditScore}</span>
                                    </div>
                                </div>
                                {currentUser.id === u.id && <CheckCircle2 size={12} />}
                            </button>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="bg-gray-900 text-white p-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold active:scale-95 transition-transform"
                >
                    <ArrowRightLeft size={16} />
                    <span>{currentUser.name}</span>
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
