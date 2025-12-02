import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Heart, MessageSquare, Share2, MoreHorizontal, Send, MapPin, ShieldCheck } from 'lucide-react';

const PostDetail = () => {
    const { currentRoute, pop, push } = useRouter();
    const { currentUser } = useApp();
    const { id } = currentRoute.params || {};

    // Mock 数据
    const [post, setPost] = useState({
        id: id || 201,
        user: '养娃大户',
        avatar: 'bg-red-200',
        content: '终于等到我的小可爱回家了！这种肤色真的绝美，自然光下通透感满分。经过漫长的等待，看到实物的那一刻真的超级感动！工厂的做工非常精细，关节也很顺滑。强烈推荐这个娃社！ #BJD #私养图 #三分娃',
        images: ['bg-orange-100', 'bg-pink-100', 'bg-purple-100'],
        likes: 124,
        isLiked: false,
        comments: [],
        createTime: '2小时前',
        distance: '1.2km',
        tags: ['资深玩家'],
        isVerified: true
    });

    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: '手作娘小B', avatar: 'bg-green-200', content: '太美了！求链接！', time: '1小时前', likes: 5 },
        { id: 2, user: '摄影师C', avatar: 'bg-blue-200', content: '这个肤色确实绝了，拍照效果一定很好', time: '30分钟前', likes: 3 },
    ]);

    const handleLike = () => {
        setPost(prev => ({
            ...prev,
            isLiked: !prev.isLiked,
            likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
        }));
    };

    const handleComment = () => {
        if (!commentInput.trim()) return;

        const newComment = {
            id: Date.now(),
            user: currentUser.name,
            avatar: currentUser.avatar,
            content: commentInput,
            time: '刚刚',
            likes: 0
        };

        setComments(prev => [...prev, newComment]);
        setCommentInput('');
    };

    const handleShare = () => {
        alert('分享功能：可以分享到微信、QQ、微博等平台');
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3 flex items-center gap-4">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">动态详情</h1>
            </div>

            {/* 帖子内容 */}
            <div className="p-4">
                {/* 用户信息 */}
                <div className="flex items-center gap-3 mb-4">
                    <div
                        onClick={() => push('PublicUserProfile', { name: post.user, avatar: post.avatar })}
                        className={`w-12 h-12 rounded-full ${post.avatar} cursor-pointer relative`}
                    >
                        {post.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                <ShieldCheck size={14} className="text-blue-500 fill-blue-100" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p
                                onClick={() => push('PublicUserProfile', { name: post.user, avatar: post.avatar })}
                                className="font-bold text-gray-800 cursor-pointer"
                            >
                                {post.user}
                            </p>
                            {post.tags && post.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                            <span>{post.createTime}</span>
                            <span>·</span>
                            <div className="flex items-center gap-0.5">
                                <MapPin size={10} />
                                <span>{post.distance || '1.2km'}</span>
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-400">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                {/* 文字内容 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.content}</p>

                {/* 图片网格 */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {post.images.map((img, i) => (
                        <div key={i} className={`aspect-square ${img} rounded-lg`} />
                    ))}
                </div>

                {/* 互动栏 */}
                <div className="flex items-center gap-6 py-3 border-y border-gray-100">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 ${post.isLiked ? 'text-rose-500' : 'text-gray-500'}`}
                    >
                        <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
                        <span className="text-sm">{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MessageSquare size={20} />
                        <span className="text-sm">{comments.length}</span>
                    </div>
                    <button onClick={handleShare} className="ml-auto text-gray-500">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* 评论列表 */}
            <div className="px-4 pb-4">
                <h2 className="font-bold text-gray-800 mb-3">评论 ({comments.length})</h2>
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full ${comment.avatar} shrink-0`} />
                            <div className="flex-1">
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="font-bold text-sm text-gray-800">{comment.user}</p>
                                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                    <span>{comment.time}</span>
                                    <button className="flex items-center gap-1">
                                        <Heart size={12} />
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button>回复</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 评论输入框 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 max-w-md mx-auto">
                <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="说点什么..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-rose-200"
                />
                <button
                    onClick={handleComment}
                    disabled={!commentInput.trim()}
                    className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default PostDetail;
