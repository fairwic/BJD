import React from "react";
import {
    ShoppingBag,
    Users,
    MessageCircle,
    User,
    ClipboardList,
    RefreshCw,
} from "lucide-react";
import { ROLES } from "../data/mock";

const TabBar = ({ activeTab, setActiveTab, role }) => {
    const tabs = [
        { id: "shop", label: "市集", icon: ShoppingBag, roles: [ROLES.USER] },
        {
            id: "home",
            label: "工作台",
            icon: ClipboardList,
            roles: [ROLES.LEADER, ROLES.MERCHANT],
        },
        // Exchange tab removed - merged into Market
        {
            id: "square",
            label: "广场",
            icon: Users,
            roles: [ROLES.USER, ROLES.LEADER],
        },
        {
            id: "messages",
            label: "消息",
            icon: MessageCircle,
            roles: [ROLES.USER, ROLES.LEADER, ROLES.MERCHANT],
        },
        {
            id: "me",
            label: "我的",
            icon: User,
            roles: [ROLES.USER, ROLES.LEADER, ROLES.MERCHANT],
        },
    ];

    const visibleTabs = tabs.filter((t) => t.roles.includes(role));

    return (
        <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-around shrink-0 pb-safe">
            {visibleTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === tab.id ? "text-primary-500" : "text-gray-400"
                        }`}
                >
                    <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default TabBar;
