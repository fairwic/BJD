import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, MoreHorizontal, MapPin, MessageSquare, Heart, Share2 } from 'lucide-react';

const PublicUserProfile = () => {
    const { currentRoute, pop, push } = useRouter();
    const { id, name, avatar } = currentRoute.params || {};

    // Mock User Data
    const user = {
        id: id || 301,
        name: name || '养娃大户',
        avatar: avatar || 'bg-red-200',
        bio: '入坑三年，主要养三分/四分。',
        location: '北京',
        followers: 342,
        following: 56,
        likes: 1205
    };

    // Mock Posts for this user
    const userPosts = [
        { id: 201, content: '终于等到我的小可爱回家了！这种肤色真的绝美。', image: 'bg-orange-100', likes: 124, comments: 32 },
        { id: 205, content: '今天的阳光真好，带崽出来晒晒。', image: 'bg-yellow-100', likes: 56, comments: 8 },
    ];

    const [activeTab, setActiveTab] = useState('posts');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center p-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <button><MoreHorizontal size={24} /></button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="bg-white px-4 pb-6 mb-2">
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-20 h-20 rounded-full ${user.avatar} border-2 border-white shadow-sm`} />
                    <div className="flex gap-2">
                        <button className="px-6 py-1.5 bg-rose-500 text-white rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform">
                            关注
                        </button>
                        <button className="px-4 py-1.5 border border-gray-200 rounded-full text-sm font-bold active:bg-gray-50">
                            私信
                        </button>
                    </div>
                </div>

                <h1 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-sm text-gray-500 mb-3">{user.bio}</p>

                {user.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                        <MapPin size={12} />
                        <span>{user.location}</span>
                    </div>
                )}

                <div className="flex gap-6">
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-gray-900">{user.following}</span>
                        <span className="text-xs text-gray-500">关注</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-gray-900">{user.followers}</span>
                        <span className="text-xs text-gray-500">粉丝</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-gray-900">{user.likes}</span>
                        <span className="text-xs text-gray-500">获赞</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-100 flex mb-2">
                <button
                    onClick={() => setActiveTab('posts')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'posts' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    动态
                </button>
                <button
                    onClick={() => setActiveTab('likes')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'likes' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    喜欢
                </button>
            </div>

            {/* Content List */}
            <div className="space-y-2">
                {activeTab === 'posts' && userPosts.map(post => (
                    <div key={post.id} className="bg-white p-4">
                        <div className="flex gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full ${user.avatar}`} />
                            <div>
                                <p className="font-bold text-sm text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-400">2天前</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                        <div className={`w-full aspect-[4/3] ${post.image} rounded-lg mb-3`} />
                        <div className="flex items-center gap-6 text-gray-400">
                            <div className="flex items-center gap-1"><Heart size={18} /> <span className="text-xs">{post.likes}</span></div>
                            <div className="flex items-center gap-1"><MessageSquare size={18} /> <span className="text-xs">{post.comments}</span></div>
                            <div className="ml-auto"><Share2 size={18} /></div>
                        </div>
                    </div>
                ))}

                {activeTab === 'likes' && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        用户设置了喜欢列表不可见
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicUserProfile;
