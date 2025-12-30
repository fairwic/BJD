import React from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "../router/RouteStack";
import UserSwitcher from "../components/UserSwitcher";
import {
    ArrowRightLeft,
    Settings,
    Heart,
    Image as ImageIcon,
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
            <div className="bg-white p-6 pb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className={`w-16 h-16 rounded-full border-2 border-white shadow-sm ${currentUser.avatar}`}
                    />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {currentUser.name}
                        </h2>
                        <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                                {currentUser.role}
                            </span>
                        </div>
                    </div>
                    <div className="ml-auto text-gray-400">
                        <UserSwitcher>
                            <div className="flex items-center gap-1 text-xs text-primary-500 bg-primary-50 px-2 py-1 rounded-full">
                                <ArrowRightLeft size={12} />
                                <span>切换身份</span>
                            </div>
                        </UserSwitcher>
                    </div>
                </div>

                {/* Order Stats */}
                <div className="flex justify-between px-2">
                    <div
                        className="flex flex-col items-center gap-2"
                        onClick={() => push("MyGroupBuys")}
                    >
                        <span className="font-bold text-lg">
                            {orders.filter((o) => o.userId === currentUser.id).length}
                        </span>
                        <span className="text-xs text-gray-500">我的参团</span>
                    </div>
                    <div
                        className="flex flex-col items-center gap-2"
                        onClick={() => push("MyFollowing")}
                    >
                        <span className="font-bold text-lg">12</span>
                        <span className="text-xs text-gray-500">关注</span>
                    </div>
                    <div
                        className="flex flex-col items-center gap-2"
                        onClick={() => push("MyLikes")}
                    >
                        <span className="font-bold text-lg">45</span>
                        <span className="text-xs text-gray-500">喜欢/收藏</span>
                    </div>
                    <div
                        className="flex flex-col items-center gap-2"
                        onClick={() => push("MyAlbum")}
                    >
                        <span className="font-bold text-lg">8</span>
                        <span className="text-xs text-gray-500">相册</span>
                    </div>
                </div>
            </div>

            {/* Order List */}
            <div className="mt-3 bg-white p-4">
                <h3 className="font-bold text-sm mb-3">我的订单</h3>
                <div className="space-y-3">
                    {orders
                        .filter((o) => o.userId === currentUser.id)
                        .map((order) => (
                            <div
                                key={order.id}
                                onClick={() => push("OrderDetail", { id: order.id })}
                                className="flex gap-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100"
                            >
                                <div
                                    className={`w-16 h-16 rounded-lg ${order.image} shrink-0`}
                                />
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold text-sm truncate">
                                            {order.title}
                                        </h4>
                                        <span className="text-xs text-primary-500">
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        规格: {order.skuName}
                                    </p>
                                </div>
                            </div>
                        ))}
                    {orders.filter((o) => o.userId === currentUser.id).length === 0 && (
                        <p className="text-center text-gray-400 text-sm py-4">暂无订单</p>
                    )}
                </div>
            </div>

            {/* ✨ 入驻入口区域 */}
            <div className="mt-3 bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm">开启创作者之旅</h3>
                    <span className="text-xs text-gray-400">轻松入驻 · 开始赚钱</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {/* 成为商家 - 卖现货 */}
                    <div
                        onClick={() => push("MerchantApply")}
                        className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform border border-orange-100"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200">
                            <ShoppingBag size={18} />
                        </div>
                        <span className="text-xs font-bold text-gray-800">成为商家</span>
                        <span className="text-[10px] text-gray-500">卖现货</span>
                    </div>

                    {/* 成为团长 - 开团商品 */}
                    <div
                        onClick={() => push("LeaderApply")}
                        className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform border border-purple-100"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-200">
                            <Sparkles size={18} />
                        </div>
                        <span className="text-xs font-bold text-gray-800">成为团长</span>
                        <span className="text-[10px] text-gray-500">开团商品</span>
                    </div>

                    {/* 成为妆师/毛娘 */}
                    <div
                        onClick={() => push("ArtistApply")}
                        className="bg-gradient-to-br from-secondary-50 to-pink-100 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform border border-secondary-100"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary-200">
                            <Palette size={18} />
                        </div>
                        <span className="text-xs font-bold text-gray-800">成为妆师</span>
                        <span className="text-[10px] text-gray-500">妆师/毛娘</span>
                    </div>
                </div>
            </div>

            {/* 设置菜单 */}
            <div className="mt-3 bg-white rounded-xl divide-y divide-gray-50">
                {/* ✨ 新增功能区（高亮显示） */}
                <div
                    onClick={() => push("MyDolls")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50 bg-gradient-to-r from-secondary-50/30 to-transparent"
                >
                    <Package size={20} className="text-secondary-500" />
                    <span className="text-sm text-gray-800 flex-1 font-medium">
                        我的娃娃
                    </span>
                    <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded-full font-bold">
                        3只
                    </span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("AchievementCenter")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50 bg-gradient-to-r from-accent-light/30 to-transparent"
                >
                    <Award size={20} className="text-accent" />
                    <span className="text-sm text-gray-800 flex-1 font-medium">
                        成就中心
                    </span>
                    <span className="text-xs bg-accent-light bg-opacity-20 text-accent-dark px-2 py-0.5 rounded-full font-bold">
                        NEW
                    </span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("KnowledgeBase")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50 bg-gradient-to-r from-primary-50/30 to-transparent"
                >
                    <Book size={20} className="text-primary-500" />
                    <span className="text-sm text-gray-800 flex-1 font-medium">
                        BJD知识库
                    </span>
                    <span className="text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-bold">
                        新手必读
                    </span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                {/* 原有功能区 */}
                <div
                    onClick={() => push("MyContracts")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <FileText size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">我的合同</span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>
                <div
                    onClick={() => push("AddressManagement")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <MapPin size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">收货地址</span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>
                <div
                    onClick={() => push("ProfileEdit")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <User size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">编辑资料</span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("RealNameVerification")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <CheckCircle2 size={20} className="text-gray-400" />
                    <div className="flex-1">
                        <span className="text-sm text-gray-700">实名认证</span>
                        <p className="text-xs text-gray-400 mt-0.5">提升账号安全性</p>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        未认证
                    </span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("PaymentSettings")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <Package size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">支付设置</span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("AccountSecurity")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <Settings size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">账号安全</span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("MyLikes")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <Heart size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">我的喜欢</span>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div
                    onClick={() => push("MyAlbum")}
                    className="flex items-center gap-3 p-4 active:bg-gray-50"
                >
                    <ImageIcon size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">我的相册</span>
                    <ChevronRight size={16} className="text-gray-300" />
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
