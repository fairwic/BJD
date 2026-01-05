import React from "react";
import { useRouter } from "../router/RouteStack";
import {
    Plus,
    ClipboardList,
    Truck,
    Package,
    Sparkles,
} from "lucide-react";

const LeaderDashboard = () => {
    const { push } = useRouter();

    return (
        <div className="pb-20 p-4">
            <h1 className="font-bold text-xl mb-4">团长工作台</h1>
            <div className="grid grid-cols-2 gap-3">
                <div
                    onClick={() => push("CreateGroupBuy")}
                    className="bg-purple-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-purple-600 active:scale-95 transition-transform"
                >
                    <Plus size={32} />
                    <span className="font-bold">发起团购</span>
                </div>
                <div
                    onClick={() => push("OrderManagement")}
                    className="bg-secondary-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-secondary-600 active:scale-95 transition-transform"
                >
                    <ClipboardList size={32} />
                    <span className="font-bold">订单管理</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-blue-600 active:scale-95 transition-transform">
                    <Truck size={32} />
                    <span className="font-bold">发货管理</span>
                </div>
                <div
                    onClick={() => push("SpotProductManagement")}
                    className="bg-orange-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-orange-600 active:scale-95 transition-transform"
                >
                    <Package size={32} />
                    <span className="font-bold">现货管理</span>
                </div>
                <div
                    onClick={() => push("CreateSpotProduct")}
                    className="bg-green-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-green-600 active:scale-95 transition-transform"
                >
                    <Plus size={32} />
                    <span className="font-bold">发布现货</span>
                </div>
                <div
                    onClick={() => push("WishPool")}
                    className="bg-amber-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-amber-600 active:scale-95 transition-transform"
                >
                    <Sparkles size={32} />
                    <span className="font-bold">许愿池选品</span>
                </div>
            </div>
        </div>
    );
};

export default LeaderDashboard;
