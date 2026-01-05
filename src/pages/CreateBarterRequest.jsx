import React, { useState } from "react";
import { useRouter } from "../router/RouteStack";
import {
    ChevronLeft,
    Camera,
    RefreshCw,
} from "lucide-react";

const CreateBarterRequest = () => {
    const { pop } = useRouter();

    return (
        <div className="pb-20 bg-gray-50 min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 h-14 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <button onClick={() => pop()} className="p-2 -ml-2">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <span className="font-bold text-lg">发布交换</span>
                <button className="text-accent font-bold text-sm">提交</button>
            </div>

            <div className="flex-1 p-3 space-y-3">
                {/* Have Section */}
                <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">我持有</div>
                        <span className="text-sm font-bold text-gray-400">请详细描述你的物品</span>
                    </div>
                    <div className="flex gap-3 mb-3">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg border-dashed border-2 border-gray-200 flex flex-col items-center justify-center text-gray-400 shrink-0">
                            <Camera size={20} />
                        </div>
                        <input
                            className="flex-1 outline-none text-sm font-bold"
                            placeholder="物品名称 (例如: 原神 散兵 特典色纸)"
                        />
                    </div>
                    <textarea
                        placeholder="描述品相、由于是否正版、是否有瑕疵..."
                        className="w-full h-20 text-xs outline-none resize-none placeholder:text-gray-300 bg-gray-50 rounded-lg p-2"
                    ></textarea>
                </div>

                {/* Exchange Icon */}
                <div className="flex justify-center text-accent">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <RefreshCw size={24} />
                    </div>
                </div>

                {/* Want Section */}
                <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-xs font-bold">我想换</div>
                        <span className="text-sm font-bold text-gray-400">请描述你想要的物品</span>
                    </div>
                    <div className="mb-3">
                        <input
                            className="w-full outline-none text-sm font-bold border-b border-gray-100 pb-2"
                            placeholder="目标物品名称 (例如: 万叶 色纸)"
                        />
                    </div>
                    <textarea
                        placeholder="对品相的要求、可接受的贴钱范围..."
                        className="w-full h-20 text-xs outline-none resize-none placeholder:text-gray-300 bg-gray-50 rounded-lg p-2"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default CreateBarterRequest;
