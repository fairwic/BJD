import React, { useState } from "react";
import { useRouter } from "../router/RouteStack";
import {
    ShieldCheck,
    MapPin,
    MoreHorizontal,
    Heart,
    MessageSquare,
    Share2,
    Search,
    Plus,
    Book,
    ChevronRight,
    Sparkles,
} from "lucide-react";

const Square = () => {
    const { push } = useRouter();
    const [posts, setPosts] = useState([
        {
            id: 201,
            user: "养娃大户",
            avatar: "bg-red-200",
            content:
                "终于等到我的小可爱回家了！这种肤色真的绝美,自然光下通透感满分。 #BJD #私养图",
            image: "bg-orange-100",
            likes: 124,
            comments: 32,
            isLiked: false,
            distance: "1.2km",
            tags: ["资深玩家"],
            isVerified: true,
        },
        {
            id: 202,
            user: "手作娘小B",
            avatar: "bg-green-200",
            content:
                "新做的小裙子，还在打版中，大家喜欢长款还是短款？在线蹲一个建议~",
            image: "bg-teal-100",
            likes: 88,
            comments: 45,
            isLiked: false,
            distance: "500m",
            tags: ["手作娘"],
            isVerified: true,
        },
        {
            id: 203,
            user: "摄影师C",
            avatar: "bg-blue-200",
            content: "周末的外拍聚会，带了三个崽，累并快乐着。",
            image: "bg-indigo-100",
            likes: 256,
            comments: 12,
            isLiked: false,
            distance: "3.5km",
            tags: ["摄影师"],
            isVerified: false,
        },
    ]);

    const handleLike = (postId) => {
        setPosts((prev) =>
            prev.map((p) => {
                if (p.id === postId) {
                    return {
                        ...p,
                        isLiked: !p.isLiked,
                        likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                    };
                }
                return p;
            }),
        );
    };

    const handleShare = (post) => {
        alert(`分享: ${post.content.substring(0, 20)}...`);
    };

    const PostCard = ({ post }) => (
        <div className="bg-white mb-3 pb-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3 p-4 pb-2">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        push("PublicUserProfile", { name: post.user, avatar: post.avatar });
                    }}
                    className={`w-10 h-10 rounded-full ${post.avatar} cursor-pointer relative`}
                >
                    {post.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <ShieldCheck size={12} className="text-primary-500 fill-primary-100" />
                        </div>
                    )}
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        push("PublicUserProfile", { name: post.user, avatar: post.avatar });
                    }}
                    className="cursor-pointer flex-1"
                >
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-gray-800">{post.user}</p>
                        {post.tags &&
                            post.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] bg-secondary-50 text-secondary-500 px-1.5 py-0.5 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span>2小时前</span>
                        <span>·</span>
                        <div className="flex items-center gap-0.5">
                            <MapPin size={10} />
                            <span>{post.distance || "0.5km"}</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400">
                    <MoreHorizontal size={18} />
                </button>
            </div>
            <div
                onClick={() => push("PostDetail", { id: post.id })}
                className={`w-full aspect-[4/3] ${post.image} mb-3 cursor-pointer`}
            />
            <div className="px-4">
                <p
                    onClick={() => push("PostDetail", { id: post.id })}
                    className="text-gray-700 text-sm leading-relaxed cursor-pointer"
                >
                    {post.content}
                </p>
                <div className="flex items-center gap-6 mt-3 text-gray-500">
                    <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 ${post.isLiked ? "text-secondary-500" : ""}`}
                    >
                        <Heart size={20} fill={post.isLiked ? "currentColor" : "none"} />
                        <span className="text-sm">{post.likes}</span>
                    </button>
                    <button
                        onClick={() => push("PostDetail", { id: post.id })}
                        className="flex items-center gap-1.5"
                    >
                        <MessageSquare size={20} />
                        <span className="text-sm">{post.comments}</span>
                    </button>
                    <button onClick={() => handleShare(post)} className="ml-auto">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="pb-20">
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur px-4 h-12 flex items-center border-b border-gray-100 gap-3">
                <div className="bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2 flex-1">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索娃圈动态..."
                        className="bg-transparent text-sm w-full outline-none"
                    />
                </div>
                <button onClick={() => push("CreatePost")} className="text-secondary-500">
                    <Plus size={24} />
                </button>
            </div>
            <div className="bg-gray-50 min-h-screen">
                <div className="p-3 space-y-2">
                    {/* 知识库快捷入口 */}
                    <div
                        onClick={() => push("KnowledgeBase")}
                        className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-3 flex items-center gap-3 cursor-pointer active:scale-98 transition-transform"
                    >
                        <div className="bg-white p-2 rounded-full shadow-sm text-primary-500">
                            <Book size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-gray-800">BJD新手指南</p>
                            <p className="text-xs text-gray-600">
                                入门必读 · 品牌大全 · 避坑攻略
                            </p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </div>

                    {/* AI文案助手 */}
                    <div
                        onClick={() => push("CreatePost")}
                        className="bg-gradient-to-r from-secondary-100 to-purple-100 rounded-xl p-3 flex items-center gap-3 cursor-pointer active:scale-98 transition-transform"
                    >
                        <div className="bg-white p-2 rounded-full shadow-sm text-secondary-500">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-gray-800">发帖没灵感？</p>
                            <p className="text-xs text-gray-600">让 AI 帮你写出神仙文案 ✨</p>
                        </div>
                    </div>
                </div>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
                {/* 重复显示更多内容 */}
                {posts.map((post) => (
                    <PostCard key={`dup-${post.id}`} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Square;
