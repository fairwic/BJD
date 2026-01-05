import React from "react";
import {
    ShoppingBag,
    Users,
    MessageCircle,
    User,
    ClipboardList,
    Plus,
} from "lucide-react";
import { ROLES } from "../data/mock";

const TabBar = ({ activeTab, setActiveTab, role, onPublish }) => {
    // Basic Tabs configuration
    const items = [
        { id: "shop", label: "市集", icon: ShoppingBag, roles: [ROLES.USER] },
        { id: "home", label: "工作台", icon: ClipboardList, roles: [ROLES.LEADER, ROLES.MERCHANT] },
        { id: "square", label: "广场", icon: Users, roles: [ROLES.USER, ROLES.LEADER] },
        // Placeholder for Publish Button in iteration logic or handled separately
        { id: "messages", label: "消息", icon: MessageCircle, roles: [ROLES.USER, ROLES.LEADER, ROLES.MERCHANT] },
        { id: "me", label: "我的", icon: User, roles: [ROLES.USER, ROLES.LEADER, ROLES.MERCHANT] },
    ];

    const visibleTabs = items.filter((t) => t.roles.includes(role));

    // Insert Publish Button for USERS
    const renderTabs = () => {
        const result = [];
        visibleTabs.forEach((tab, index) => {
            // Insert Publish button in the middle (index 2) for standard users
            if (role === ROLES.USER && index === 2) {
                 result.push(
                    <button
                        key="publish"
                        onClick={onPublish}
                        className="flex flex-col items-center justify-center -mt-6"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg shadow-gray-900/40 flex items-center justify-center active:scale-95 transition-transform border-4 border-gray-50">
                            <Plus size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-gray-900">发布</span>
                    </button>
                );
            }
            result.push(
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === tab.id ? "text-primary-500" : "text-gray-400"}`}
                >
                    <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
            );
        });
        return result;
    };

    return (
        <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-around shrink-0 pb-safe z-50 relative">
            {renderTabs()}
        </div>
    );
};

export default TabBar;
