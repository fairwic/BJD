import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Search } from 'lucide-react';

const MyFollowing = () => {
    const { pop, push } = useRouter();
    const [activeTab, setActiveTab] = useState('leaders');

    // Mock Data
    const leaders = [
        { id: 1, name: 'BJD 制作工坊', avatar: 'bg-blue-100', followers: 1250, bio: '专注三分/四分娃衣制作' },
        { id: 2, name: '梦幻人偶社', avatar: 'bg-purple-100', followers: 890, bio: '原创BJD设计' },
    ];

    const users = [
        { id: 3, name: '养娃大户', avatar: 'bg-red-100', followers: 342, bio: '入坑三年，主要养三分' },
        { id: 4, name: '摄影师C', avatar: 'bg-green-100', followers: 567, bio: '接BJD私养拍摄' },
    ];

    const list = activeTab === 'leaders' ? leaders : users;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
                <button onClick={pop}><ChevronLeft size={24} /></button>
                <h1 className="font-bold text-lg">我的关注</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white px-4 border-b border-gray-100 flex">
                <button
                    onClick={() => setActiveTab('leaders')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'leaders' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    团长/店铺
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'users' ? 'border-rose-500 text-gray-900' : 'border-transparent text-gray-400'}`}
                >
                    用户
                </button>
            </div>

            {/* List */}
            <div className="p-4 space-y-3">
                {list.map(item => (
                    <div key={item.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3" onClick={() => push(activeTab === 'leaders' ? 'LeaderProfile' : 'PublicUserProfile', { name: item.name, avatar: item.avatar })}>
                            <div className={`w-12 h-12 rounded-full ${item.avatar}`} />
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{item.bio}</p>
                            </div>
                        </div>
                        <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            已关注
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFollowing;
