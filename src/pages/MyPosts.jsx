import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, MoreHorizontal, Trash2, Edit3, MessageSquare, Heart, Eye } from 'lucide-react';

const MyPosts = () => {
    const { pop } = useRouter();
    const [activeTab, setActiveTab] = useState('published');

    const [posts, setPosts] = useState([
        {
            id: 201,
            content: "终于等到我的小可爱回家了！这种肤色真的绝美,自然光下通透感满分。 #BJD #私养图",
            image: "bg-orange-100",
            likes: 124,
            comments: 32,
            views: 1205,
            timeAgo: "2小时前",
            status: 'published'
        },
        {
            id: 204,
            content: "家人们，新接的崽配哪个假发更好看？左边是温柔风，右边是御姐风，纠结ing...",
            image: "bg-pink-100",
            likes: 45,
            comments: 89,
            views: 890,
            timeAgo: "昨天",
             status: 'published'
        },
        {
            id: 301,
            content: "草稿：关于BJD保养的几点心得...",
            image: null,
            timeAgo: "3天前",
            status: 'draft'
        }
    ]);

    const handleDelete = (id) => {
        if (confirm('确定要删除这条动态吗？')) {
            setPosts(prev => prev.filter(p => p.id !== id));
        }
    };

    const filteredPosts = posts.filter(p => p.status === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 pb-safe">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center px-4 h-12 gap-4">
                    <button onClick={pop} className="p-1 -ml-2 text-gray-800">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="font-bold text-lg flex-1 text-center pr-8">我的动态</h1>
                </div>
                {/* Tabs */}
                <div className="flex">
                    <button 
                        onClick={() => setActiveTab('published')}
                        className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'published' ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500'}`}
                    >
                        已发布
                    </button>
                    <button 
                        onClick={() => setActiveTab('draft')}
                         className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'draft' ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500'}`}
                    >
                        草稿箱
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {filteredPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex gap-3 mb-3">
                             <div className={`w-20 h-20 rounded-lg ${post.image || 'bg-gray-100'} flex-shrink-0 bg-cover bg-center`} />
                             <div className="flex-1 min-w-0 flex flex-col justify-between">
                                 <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed font-medium">
                                     {post.content}
                                 </p>
                                 <p className="text-xs text-gray-400">{post.timeAgo}</p>
                             </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                            <div className="flex items-center gap-4 text-gray-400 text-xs">
                                <span className="flex items-center gap-1"><Eye size={14} /> {post.views || 0}</span>
                                <span className="flex items-center gap-1"><Heart size={14} /> {post.likes || 0}</span>
                                <span className="flex items-center gap-1"><MessageSquare size={14} /> {post.comments || 0}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="text-gray-500 flex items-center gap-1 text-xs font-bold active:opacity-70">
                                    <Edit3 size={14} /> 编辑
                                </button>
                                <button 
                                    onClick={() => handleDelete(post.id)}
                                    className="text-gray-500 flex items-center gap-1 text-xs font-bold active:opacity-70 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={14} /> 删除
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {filteredPosts.length === 0 && (
                     <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MoreHorizontal size={32} className="opacity-50" />
                        </div>
                        <p className="text-sm">暂无内容</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPosts;
