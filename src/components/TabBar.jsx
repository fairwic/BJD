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
                        className="flex flex-col items-center justify-center -mt-6 group"
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
                            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 text-white shadow-lg shadow-rose-300/50 flex items-center justify-center active:scale-90 transition-all duration-200 border-4 border-white">
                                <Plus size={24} strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className="text-[10px] font-bold mt-1.5 text-gray-700">发布</span>
                    </button>
                );
            }
            const isActive = activeTab === tab.id;
            result.push(
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center w-full h-full gap-0.5 transition-all duration-200 ${isActive
                            ? "text-rose-500 scale-105"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                >
                    <div className={`p-1.5 rounded-xl transition-colors duration-200 ${isActive ? 'bg-rose-50' : ''}`}>
                        <tab.icon
                            size={20}
                            strokeWidth={isActive ? 2.5 : 1.8}
                            fill={isActive ? "currentColor" : "none"}
                            className="transition-all duration-200"
                        />
                    </div>
                    <span className={`text-[10px] transition-all duration-200 ${isActive ? 'font-bold' : 'font-medium'}`}>
                        {tab.label}
                    </span>
                </button>
            );
        });
        return result;
    };

    return (
        <div className="h-16 bg-white/80 backdrop-blur-md border-t border-gray-100/50 flex items-center justify-around shrink-0 pb-safe z-50 relative shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
            {renderTabs()}
        </div>
    );
};

export default TabBar;

