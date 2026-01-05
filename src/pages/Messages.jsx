import React, { useState } from "react";
import { MessageSquare, Heart } from "lucide-react";

const Messages = () => {
    const [activeTab, setActiveTab] = useState("chat");
    const [notificationFilter, setNotificationFilter] = useState("all");

    const MOCK_CHATS = [
        {
            id: 301,
            name: "爱丽丝的衣橱 (商家)",
            lastMsg: "亲，这款现货今天就可以发顺丰哦~",
            time: "10:23",
            unread: 2,
            avatar: "bg-orange-400",
        },
        {
            id: 302,
            name: "【鹿神】进度通知群",
            lastMsg: "团长: 工厂回复说下周开始打磨了，大家稍安勿躁。",
            time: "昨天",
            unread: 0,
            avatar: "bg-blue-400",
        },
        {
            id: 303,
            name: "兔兔团长",
            lastMsg: "好的，尾款链接已经发你了。",
            time: "周一",
            unread: 0,
            avatar: "bg-secondary-400",
        },
    ];

    const MOCK_NOTIFICATIONS = [
        {
            id: 1,
            type: "comment",
            title: "新团开团通知",
            content: "一加 - 原神神里绫华定制机 | 12月3日正式发布",
            time: "7小时前",
            unread: 11,
            avatar: "bg-blue-200",
        },
        {
            id: 2,
            type: "comment",
            title: "补款通知",
            content: "8.6 版本维护通知，新活动预告",
            time: "8小时前",
            unread: 17,
            avatar: "bg-purple-200",
        },
        {
            id: 3,
            type: "follow",
            title: "参团成功通知",
            content: "绝区零FES 2025 情报公开",
            time: "9小时前",
            unread: 38,
            avatar: "bg-yellow-200",
        },
        {
            id: 4,
            type: "like",
            title: "参团失败通知",
            content: "3.8 前瞻特别节目预告",
            time: "12-01",
            unread: 20,
            avatar: "bg-pink-200",
        },
        {
            id: 5,
            type: "comment",
            title: "参团结束通知",
            content: "米游币抽神抽-绝区零专场现已开启！",
            time: "11-28",
            unread: 2,
            avatar: "bg-green-200",
        },
    ];

    const totalUnread =
        activeTab === "chat"
            ? MOCK_CHATS.reduce((sum, chat) => sum + chat.unread, 0)
            : MOCK_NOTIFICATIONS.reduce((sum, notif) => sum + notif.unread, 0);

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            {/* Header with Tabs */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
                <div className="flex items-center justify-center gap-8 h-14">
                    <button
                        onClick={() => setActiveTab("chat")}
                        className={`text-base font-bold pb-1 transition-colors ${activeTab === "chat" ? "text-gray-900 border-b-2 border-secondary-500" : "text-gray-400"}`}
                    >
                        聊天
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`text-base font-bold pb-1 transition-colors relative ${activeTab === "notifications" ? "text-gray-900 border-b-2 border-secondary-500" : "text-gray-400"}`}
                    >
                        通知
                        {totalUnread > 0 && activeTab === "notifications" && (
                            <span className="absolute -top-1 -right-4 bg-secondary-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                                {totalUnread > 99 ? "99+" : totalUnread}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Notification Filters */}
            {activeTab === "notifications" && (
                <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-4">
                    <button
                        onClick={() => setNotificationFilter("all")}
                        className={`flex items-center gap-1 text-sm ${notificationFilter === "all" ? "text-gray-900 font-bold" : "text-gray-500"}`}
                    >
                        <span>全部</span>
                    </button>
                    <button
                        onClick={() => setNotificationFilter("comment")}
                        className={`flex items-center gap-1 text-sm ${notificationFilter === "comment" ? "text-gray-900 font-bold" : "text-gray-500"}`}
                    >
                        <MessageSquare size={16} />
                        <span>评论和@</span>
                    </button>
                    <button
                        onClick={() => setNotificationFilter("follow")}
                        className={`flex items-center gap-1 text-sm ${notificationFilter === "follow" ? "text-gray-900 font-bold" : "text-gray-500"}`}
                    >
                        <Heart size={16} />
                        <span>新增关注</span>
                    </button>
                    <button
                        onClick={() => setNotificationFilter("like")}
                        className={`flex items-center gap-1 text-sm ${notificationFilter === "like" ? "text-gray-900 font-bold" : "text-gray-500"}`}
                    >
                        <Heart size={16} fill="currentColor" />
                        <span>收到的赞</span>
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="bg-white">
                {activeTab === "chat" ? (
                    <div className="divide-y divide-gray-50">
                        {MOCK_CHATS.map((chat) => (
                            <div key={chat.id} className="flex gap-3 p-4 active:bg-gray-50">
                                <div
                                    className={`w-12 h-12 rounded-full ${chat.avatar} flex items-center justify-center text-white font-bold shrink-0`}
                                >
                                    {chat.name[0]}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-gray-800 text-sm truncate">
                                            {chat.name}
                                        </h3>
                                        <span className="text-xs text-gray-400 shrink-0 ml-2">
                                            {chat.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">
                                        {chat.lastMsg}
                                    </p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="flex items-center">
                                        <span className="bg-secondary-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1.5">
                                            {chat.unread}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {MOCK_NOTIFICATIONS.map((notif) => (
                            <div key={notif.id} className="flex gap-3 p-4 active:bg-gray-50">
                                <div
                                    className={`w-12 h-12 rounded-full ${notif.avatar} flex items-center justify-center shrink-0`}
                                >
                                    <span className="text-2xl">📢</span>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-800 text-sm">
                                            {notif.title}
                                        </h3>
                                        <span className="text-xs text-gray-400 shrink-0 ml-2">
                                            {notif.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-2">
                                        {notif.content}
                                    </p>
                                </div>
                                {notif.unread > 0 && (
                                    <div className="flex items-center">
                                        <span className="bg-primary-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1.5 font-bold">
                                            {notif.unread}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
