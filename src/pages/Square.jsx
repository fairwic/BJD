
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
    Sparkles,
    Flame,
    Camera,
    Tag,
} from "lucide-react";
import PKCard from "../components/PKCard";
import AfterBeforeSlider from "../components/AfterBeforeSlider";

// Mock Data for Trending Topics
const TRENDING_TOPICS = [
    { id: 1, tag: "#BJD私养图", count: "2.4w" },
    { id: 2, tag: "#娃屋改造", count: "1.2w" },
    { id: 3, tag: "#今日穿搭", count: "8.5k" },
    { id: 4, tag: "#妆师推荐", count: "5.6k" },
    { id: 5, tag: "#新手提问", count: "3.2k" },
];

const Square = () => {
    const { push } = useRouter();
    const [posts, setPosts] = useState([
        {
            id: 201,
            type: 'normal',
            user: "养娃大户",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alice&backgroundColor=b6e3f4",
            content:
                "终于等到我的小可爱回家了！这种肤色真的绝美,自然光下通透感满分。 #BJD #私养图",
            image: "/images/mock/post-bjd-1.png",
            likes: 124,
            comments: 32,
            isLiked: false,
            distance: "1.2km",
            tags: ["资深玩家"],
            isVerified: true,
            timeAgo: "2小时前",
            dollModel: "Volks SDGr Alice",
        },
        {
            id: 204,
            type: 'pk',
            user: "选择困难症",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bob&backgroundColor=ffdfbf",
            content: "家人们，新接的崽配哪个假发更好看？左边是温柔风，右边是御姐风，纠结ing...",
            leftImage: "/images/mock/post-wig-pink.png",
            rightImage: "/images/mock/post-wig-purple.png",
            leftLabel: "温柔粉",
            rightLabel: "御姐紫",
            likes: 45,
            comments: 89,
            isLiked: false,
            distance: "2.0km",
            tags: ["求助"],
            isVerified: false,
            timeAgo: "30分钟前",
        },
        {
            id: 209,
            type: 'normal',
            user: "二次元观测站",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix&backgroundColor=c0aede",
            content:
                "今天的漫展返图！看到很多娃娘带着自家孩子来面基，这个角落的布景太适合拍照了！📸 #漫展 #二次元 #BJD",
            image: "/images/mock/post-anime-con.png",
            likes: 421,
            comments: 66,
            isLiked: true,
            distance: "50m",
            tags: ["漫展Live", "二次元"],
            isVerified: true,
            timeAgo: "刚刚",
        },
        {
            id: 205,
            type: 'compare',
            user: "神手妆师",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Daisy&backgroundColor=b6e3f4",
            content: "今日改妆作业交付。从原来的素头到现在的样子，赋予了灵魂。 #BJD妆面 #改妆",
            beforeImage: "/images/mock/post-bjd-before.png",
            afterImage: "/images/mock/post-bjd-after.png",
            likes: 312,
            comments: 56,
            isLiked: false,
            distance: "5.5km",
            tags: ["认证妆师"],
            isVerified: true,
            timeAgo: "5小时前",
        },
        {
            id: 210,
            type: 'normal',
            user: "手办收藏家",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Max&backgroundColor=ffd5dc",
            content:
                "新入手的蕾姆手办到了！细节简直无敌，这个做工对得起价格，摆在柜子里太养眼了。大家觉得怎么样？ #手办 #二次元 #Re0",
            image: "/images/mock/post-anime-figure.png",
            likes: 233,
            comments: 41,
            isLiked: false,
            distance: "3.2km",
            tags: ["手办", "开箱"],
            isVerified: false,
            timeAgo: "1小时前",
        },
        {
            id: 202,
            type: 'normal',
            user: "手作娘小B",
            avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Eliza&backgroundColor=c0aede",
            content:
                "新做的小裙子，还在打版中，大家喜欢长款还是短款？在线蹲一个建议~",
            image: "/images/mock/post-bjd-1.png",
            likes: 88,
            comments: 45,
            isLiked: false,
            distance: "500m",
            tags: ["手作娘"],
            isVerified: true,
            timeAgo: "4小时前",
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

    const handleTopicClick = (tag) => {
        push("CreatePost", { initialTags: tag + " " });
    };

    // Tribing user action
    const handleSameStyleClick = (dollModel) => {
        push("CreatePost", { initialTags: `#${dollModel} ` });
    };

    const PostCard = ({ post }) => (
        <div className="bg-white mb-3 mx-3 p-4 pb-2 rounded-2xl shadow-clay-sm border border-gray-100/50 hover:shadow-clay-md transition-all duration-300 group">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        push("PublicUserProfile", { name: post.user, avatar: post.avatar });
                    }}
                    className="w-11 h-11 rounded-full cursor-pointer relative ring-2 ring-rose-100 shadow-md overflow-hidden group-hover:ring-rose-200 transition-all duration-300"
                >
                    <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                    {post.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <ShieldCheck size={12} className="text-secondary-500 fill-secondary-100" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p
                            onClick={(e) => {
                                e.stopPropagation();
                                push("PublicUserProfile", { name: post.user, avatar: post.avatar });
                            }}
                            className="font-bold text-sm text-gray-900 truncate cursor-pointer"
                        >
                            {post.user}
                        </p>
                        {post.tags &&
                            post.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] bg-gradient-to-r from-rose-50 to-pink-50 text-rose-500 px-2 py-0.5 rounded-full font-semibold border border-rose-100/50"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span>{post.timeAgo}</span>
                        <span>·</span>
                        <div className="flex items-center gap-0.5">
                            <MapPin size={10} />
                            <span>{post.distance || "0.5km"}</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 p-1">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Content Text */}
            <p
                onClick={() => push("PostDetail", { id: post.id })}
                className="text-gray-800 text-sm leading-relaxed mb-3 cursor-pointer line-clamp-3"
            >
                {post.content}
            </p>

            {/* Dynamic Content Area */}
            {post.type === 'normal' && (
                <div
                    onClick={() => push("PostDetail", { id: post.id })}
                    className="w-full aspect-[4/3] rounded-xl mb-3 cursor-pointer overflow-hidden"
                >
                    <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                </div>
            )}

            {post.type === 'pk' && (
                <PKCard
                    leftImage={post.leftImage}
                    rightImage={post.rightImage}
                    leftLabel={post.leftLabel}
                    rightLabel={post.rightLabel}
                />
            )}

            {post.type === 'compare' && (
                <AfterBeforeSlider
                    beforeImage={post.beforeImage}
                    afterImage={post.afterImage}
                />
            )}

            {/* Tribal Connection Action */}
            {post.dollModel && (
                <div className="mb-3">
                    <button
                        onClick={() => handleSameStyleClick(post.dollModel)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-50 text-secondary-600 rounded-lg text-xs font-bold active:bg-secondary-100 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Tag size={14} />
                        我也养 {post.dollModel}！晒同款
                    </button>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 transition-all duration-200 ${post.isLiked ? "text-rose-500 scale-110" : "text-gray-400 hover:text-rose-400 active:scale-90"}`}
                    >
                        <Heart
                            size={22}
                            className={`transition-transform duration-200 ${post.isLiked ? "fill-current animate-bounce-soft" : ""}`}
                            strokeWidth={post.isLiked ? 0 : 1.8}
                        />
                        <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button
                        onClick={() => push("PostDetail", { id: post.id })}
                        className="flex items-center gap-1.5 text-gray-500 active:text-gray-900 transition-colors"
                    >
                        <MessageSquare size={20} />
                        <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                </div>
                <button
                    onClick={() => alert(`Sharing post ${post.id}`)}
                    className="text-gray-500 active:text-gray-900 transition-colors"
                >
                    <Share2 size={20} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="pb-20 bg-gradient-to-b from-rose-50/30 to-gray-50 min-h-screen relative">
            {/* Header with Glassmorphism */}
            <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl px-4 h-14 flex items-center border-b border-white/50 gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex-1 bg-gray-100/80 rounded-full px-4 py-2 flex items-center gap-2 border border-white/80 shadow-inner">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索娃圈动态/好物..."
                        className="bg-transparent text-sm w-full outline-none placeholder:text-gray-400"
                    />
                </div>
                <button className="relative p-1">
                    <MessageSquare size={24} className="text-gray-700" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </button>
            </div>

            {/* Quick Post Entry */}
            <div className="bg-white p-4 pb-2 mb-2">
                <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0" />
                    <div
                        onClick={() => push("CreatePost")}
                        className="flex-1 bg-gray-50 rounded-full px-4 flex items-center text-sm text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        今天有什么新鲜事分享？
                    </div>
                </div>

                {/* Trending Topics Carousel */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    <div className="flex items-center gap-1.5 pr-2 text-rose-500 font-bold text-xs flex-shrink-0">
                        <Flame size={14} className="fill-current animate-pulse" />
                        热议
                    </div>
                    {TRENDING_TOPICS.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => handleTopicClick(topic.tag)}
                            className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-white to-rose-50/50 rounded-full text-xs text-gray-600 font-semibold active:bg-rose-100 active:text-rose-500 transition-all duration-200 border border-rose-100/50 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            {topic.tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-3 pb-3 grid grid-cols-2 gap-3">
                <div
                    onClick={() => push("CreatePost", { initialTags: "#今日打卡 " })}
                    className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all duration-200 border border-indigo-100/50 shadow-clay-sm hover:shadow-clay-md group"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-500 group-hover:scale-110 transition-transform">
                            <Camera size={18} />
                        </div>
                        <span className="font-bold text-gray-800">每日打卡</span>
                    </div>
                    <p className="text-xs text-gray-500 pl-1">记录养娃日常 ✨</p>
                </div>

                <div
                    onClick={() => push("KnowledgeBase")}
                    className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all duration-200 border border-amber-100/50 shadow-clay-sm hover:shadow-clay-md group"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-amber-500 group-hover:scale-110 transition-transform">
                            <Book size={18} />
                        </div>
                        <span className="font-bold text-gray-800">新手指南</span>
                    </div>
                    <p className="text-xs text-gray-500 pl-1">入坑避雷必读 📖</p>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-0">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Floating Action Button (FAB) with Glow */}
            <button
                onClick={() => push("CreatePost")}
                className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 text-white rounded-full shadow-xl shadow-rose-300/50 flex items-center justify-center active:scale-90 transition-all duration-200 z-40 fab-glow"
            >
                <Plus size={28} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default Square;
