import React from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "../router/RouteStack";
import UserSwitcher from "../components/UserSwitcher";
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
} from "lucide-react";

const UserProfile = () => {
    const { currentUser, orders } = useApp();
    const { push } = useRouter();

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <div className="bg-white pb-6 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-rose-200 via-pink-100 to-blue-50 -z-10" />
                <div className="absolute top-0 left-0 right-0 h-48 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10" />
                
                {/* Header Content */}
                <div className="px-6 pt-12 pb-4" onClick={() => push("ProfileEdit")}>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className={`w-20 h-20 rounded-full border-[3px] border-white shadow-lg shadow-rose-100 ${currentUser.avatar} group-active:scale-95 transition-transform`} />
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-50 text-rose-400">
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

                {/* Social Stats */}
                <div className="flex justify-around px-4 mt-2">
                    <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer" onClick={() => push("MyFollowing")}>
                        <span className="font-bold text-lg text-gray-900">12</span>
                        <span className="text-xs text-gray-500">关注</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer">
                        <span className="font-bold text-lg text-gray-900">8.6w</span>
                        <span className="text-xs text-gray-500">粉丝</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer">
                        <span className="font-bold text-lg text-gray-900">1.2k</span>
                        <span className="text-xs text-gray-500">获赞与收藏</span>
                    </div>
                     <div className="flex flex-col items-center gap-0.5 active:scale-95 transition-transform cursor-pointer" onClick={() => push("MyFootprint")}>
                        <span className="font-bold text-lg text-gray-900">128</span>
                        <span className="text-xs text-gray-500">足迹</span>
                    </div>
                </div>
            </div>

            {/* My Orders Row (Replaces List) */}
            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm shadow-indigo-50/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">我的订单</h3>
                    <span className="text-xs text-gray-400 flex items-center cursor-pointer" onClick={() => push("MyOrders")}>
                        全部订单 <ChevronRight size={14} />
                    </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => push("MyOrders", { tab: 'pending_payment' })}>
                        <CreditCard size={24} className="text-gray-700" strokeWidth={1.5} />
                        <span className="text-xs">待付款</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => push("MyOrders", { tab: 'pending_shipment' })}>
                        <Package size={24} className="text-gray-700" strokeWidth={1.5} />
                        <span className="text-xs">待发货</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => push("MyOrders", { tab: 'shipped' })}>
                        <Truck size={24} className="text-gray-700" strokeWidth={1.5} />
                        <span className="text-xs">待收货</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => push("MyOrders", { tab: 'pending_review' })}>
                        <MessageSquare size={24} className="text-gray-700" strokeWidth={1.5} />
                        <span className="text-xs">待评价</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => push("MyOrders", { tab: 'refund' })}>
                        <RotateCcw size={24} className="text-gray-700" strokeWidth={1.5} />
                        <span className="text-xs">退款/售后</span>
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default UserProfile;
