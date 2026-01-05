import React, { useState } from "react";
import { useRouter } from "../router/RouteStack";
import {
    Search,
    Plus,
    RefreshCw,
    MapPin,
    ArrowRight,
    Filter,
} from "lucide-react";

const BarterSquare = () => {
    const { push } = useRouter();

    const MOCK_BARTERS = [
        {
            id: 501,
            user: "吃土求回血",
            avatar: "bg-orange-200",
            have: { name: "原神 散兵 模玩熊特典 色纸", tag: "全新" },
            want: { name: "万叶 同款色纸", tag: "无伤" },
            distance: "2.3km",
            time: "15分钟前",
            image: "bg-blue-100",
        },
        {
            id: 502,
            user: "全员推",
            avatar: "bg-indigo-300",
            have: { name: "光夜 查理苏 婚卡", tag: "仅拆" },
            want: { name: "萧逸 婚卡", tag: "任意" },
            distance: "500m",
            time: "1小时前",
            image: "bg-yellow-100",
        },
        {
            id: 503,
            user: "退坑出",
            avatar: "bg-green-200",
            have: { name: "FGO 玛修 手办", tag: "盒损" },
            want: { name: "明日方舟 阿米娅", tag: "全新" },
            distance: "5.1km",
            time: "3小时前",
            image: "bg-purple-100",
        },
    ];

    return (
        <div className="pb-24 bg-gray-50 min-h-screen flex flex-col font-sans">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 shadow-sm border-b border-white/50">
                <div className="flex-1 bg-gray-100/80 rounded-full flex items-center px-4 py-2.5 gap-2 border border-transparent focus-within:bg-white focus-within:border-accent transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜想要的/想换的..."
                        className="bg-transparent text-sm w-full outline-none placeholder:text-gray-400 text-gray-700"
                    />
                </div>
                <button
                    onClick={() => push("CreateBarterRequest")}
                    className="text-white font-bold text-sm bg-gradient-to-r from-accent to-purple-600 px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-purple-200 active:scale-95 transition-transform"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>去交换</span>
                </button>
            </div>

            {/* Intro Banner */}
            <div className="mx-4 mt-4 p-5 rounded-3xl bg-gradient-to-br from-accent-light via-accent to-purple-600 text-white shadow-xl shadow-purple-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                    <RefreshCw size={100} />
                </div>
                <div className="relative z-10">
                    <h2 className="font-bold text-xl mb-1 flex items-center gap-2">
                        以物换物 <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur">Beta</span>
                    </h2>
                    <p className="text-xs text-white/90 font-medium">让闲置流动起来 · 寻找你的梦中情谷</p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex items-center justify-end px-4 py-3 mt-1 text-xs font-medium text-gray-500 gap-3">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm active:bg-gray-50">
                    <span>距离最近</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm active:bg-gray-50">
                    <span>最新发布</span>
                </button>
                <button className="flex items-center gap-1 text-accent px-3 py-1.5 rounded-full bg-accent-light/10 border border-accent/20">
                    <Filter size={14} />
                    <span>筛选</span>
                </button>
            </div>

            {/* List */}
            <div className="px-4 space-y-4">
                {MOCK_BARTERS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => push("ProductDetail", { id: item.id, type: "barter" })}
                        className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] active:scale-[0.99] transition-all cursor-pointer border border-gray-100 relative overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full -z-0 opacity-50" />

                        {/* Header: User */}
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className={`w-10 h-10 rounded-full ${item.avatar} border-2 border-white shadow-sm`} />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-800">
                                        {item.user}
                                    </span>
                                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{item.time}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                                    <MapPin size={10} />
                                    <span>{item.distance}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content: Exchange Flow Card */}
                        <div className="relative z-10 bg-gray-50/50 rounded-2xl p-3 border border-gray-100">
                            <div className="flex items-stretch gap-3">
                                {/* Have Side (Image) */}
                                <div className={`w-24 h-24 rounded-xl shrink-0 ${item.image} shadow-sm relative overflow-hidden group`}>
                                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm z-10">
                                        持有
                                    </div>
                                </div>

                                {/* Exchange Logic */}
                                <div className="flex-1 flex flex-col justify-center gap-3 min-w-0">
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-800 truncate mb-1">{item.have.name}</h4>
                                        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">{item.have.tag}</span>
                                    </div>

                                    {/* Divider with Icon */}
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <div className="h-[1px] bg-gray-200 flex-1"></div>
                                        <RefreshCw size={14} className="text-accent" />
                                        <div className="h-[1px] bg-gray-200 flex-1"></div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">求换</span>
                                        <span className="text-sm text-gray-700 font-medium truncate">{item.want.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 mt-1 relative z-10">
                            <div className="flex gap-2">
                                <span className="text-[10px] bg-accent-light/10 text-accent-dark px-2 py-1 rounded-lg font-medium">只换不售</span>
                            </div>
                            <button className="flex items-center gap-1 text-xs font-bold text-gray-900 group">
                                <span>查看详情</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarterSquare;
