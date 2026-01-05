import React, { useState } from "react";
import { useRouter } from "../router/RouteStack";
import {
    ChevronLeft,
    Camera,
    ChevronRight,
    Info,
    BadgeDollarSign,
    Tag,
} from "lucide-react";

const CreateSecondHandListing = () => {
    const { pop } = useRouter();
    const [images, setImages] = useState([]);

    return (
        <div className="pb-20 bg-gray-50 min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 h-14 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <button onClick={() => pop()} className="p-2 -ml-2">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <span className="font-bold text-lg">发布闲置</span>
                <button className="text-primary-500 font-bold text-sm">发布</button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Image Upload */}
                <div className="bg-white p-4 mb-3">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        <div className="w-24 h-24 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200 flex flex-col items-center justify-center text-gray-400 shrink-0">
                            <Camera size={24} />
                            <span className="text-xs mt-1">上传照片</span>
                        </div>
                        {/* Mock uploaded image */}
                        {/* <div className="w-24 h-24 bg-gray-200 rounded-xl shrink-0" /> */}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        多角度拍摄宝贝细节，更有助于售出哦~
                    </p>
                </div>

                {/* Title & Desc */}
                <div className="bg-white p-4 mb-3 space-y-3">
                    <input
                        type="text"
                        placeholder="标题 品牌品类都是买家喜欢搜索的"
                        className="w-full text-base font-bold outline-none placeholder:text-gray-300 placeholder:font-normal"
                    />
                    <textarea
                        placeholder="描述一下宝贝的品牌型号、入手渠道、转手原因..."
                        className="w-full h-32 text-sm outline-none resize-none placeholder:text-gray-400"
                    ></textarea>
                </div>

                {/* Options */}
                <div className="bg-white rounded-xl mx-3 overflow-hidden divide-y divide-gray-50">
                    <div className="flex items-center justify-between p-4 active:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Tag size={18} className="text-gray-400" />
                            <span className="text-sm font-medium">成色</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <span className="text-sm">请选择</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 active:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <Info size={18} className="text-gray-400" />
                            <span className="text-sm font-medium">分类</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <span className="text-sm">请选择</span>
                            <ChevronRight size={16} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 active:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <BadgeDollarSign size={18} className="text-gray-400" />
                            <span className="text-sm font-medium">价格</span>
                        </div>
                        <div className="flex items-center gap-1 text-rose-500 font-bold">
                            <span className="text-sm">¥0.00</span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="p-4 text-xs text-gray-400 leading-relaxed">
                    发布即表示同意 <span className="text-blue-500">《闲置交易规则》</span>{" "}
                    ，平台严禁发布假冒伪劣商品。
                </div>
            </div>
        </div>
    );
};

export default CreateSecondHandListing;
