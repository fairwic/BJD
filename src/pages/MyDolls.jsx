import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Plus, Search, Filter, Heart, Calendar } from 'lucide-react';

const MyDolls = () => {
    const { pop, push } = useRouter();
    const { currentUser } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSize, setFilterSize] = useState('all');

    // Mock 娃娃数据
    const [dolls, setDolls] = useState([
        {
            id: 'd1',
            name: '小鹿',
            brand: '自制特体',
            size: '1/3',
            skinColor: '白肌',
            image: 'bg-purple-100',
            birthday: '2023-10-15',
            daysOwned: 54,
            outfitCount: 12,
            photoCount: 89
        },
        {
            id: 'd2',
            name: '小兔',
            brand: 'VOLKS',
            size: '1/4',
            skinColor: '普肌',
            image: 'bg-yellow-100',
            birthday: '2023-08-20',
            daysOwned: 110,
            outfitCount: 8,
            photoCount: 56
        },
        {
            id: 'd3',
            name: '小猫',
            brand: 'Ringdoll',
            size: '1/3',
            skinColor: '烧肌',
            image: 'bg-pink-100',
            birthday: '2023-11-01',
            daysOwned: 37,
            outfitCount: 5,
            photoCount: 23
        }
    ]);

    // 筛选娃娃
    const filteredDolls = dolls.filter(doll => {
        const matchSearch = doll.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchSize = filterSize === 'all' || doll.size === filterSize;
        return matchSearch && matchSize;
    });

    const DollCard = ({ doll }) => (
        <div
            onClick={() => push('DollProfile', { id: doll.id })}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 active:scale-95 transition-transform"
        >
            {/* 封面图 */}
            <div className={`aspect-[3/4] ${doll.image} relative`}>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                    <Heart size={12} className="text-rose-500 fill-rose-500" />
                    <span className="text-xs font-bold text-gray-700">{doll.photoCount}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h3 className="text-white font-bold text-lg">{doll.name}</h3>
                    <p className="text-white/80 text-xs">{doll.size} · {doll.skinColor}</p>
                </div>
            </div>

            {/* 信息卡 */}
            <div className="p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar size={12} />
                    <span>已养{doll.daysOwned}天</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="text-gray-400">衣柜</p>
                        <p className="font-bold text-gray-800">{doll.outfitCount}套</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="text-gray-400">相册</p>
                        <p className="font-bold text-gray-800">{doll.photoCount}张</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">我的娃娃</h1>
                </div>
                <button 
                    onClick={() => push('AddDoll')}
                    className="flex items-center gap-1 bg-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-bold"
                >
                    <Plus size={16} />
                    <span>添加</span>
                </button>
            </div>

            {/* 搜索栏 */}
            <div className="bg-white p-4 border-b border-gray-100">
                <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索娃娃名称..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent flex-1 outline-none text-sm"
                    />
                </div>
            </div>

            {/* 筛选标签 */}
            <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {['all', '1/3', '1/4', '1/6', '1/8', '1/12'].map(size => (
                        <button
                            key={size}
                            onClick={() => setFilterSize(size)}
                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                                filterSize === size
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {size === 'all' ? '全部尺寸' : size}
                        </button>
                    ))}
                </div>
            </div>

            {/* 统计卡片 */}
            <div className="p-4 bg-gradient-to-r from-rose-100 to-purple-100">
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 flex justify-around">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{dolls.length}</p>
                        <p className="text-xs text-gray-500 mt-1">总娃娃数</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">
                            {dolls.reduce((sum, d) => sum + d.outfitCount, 0)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">衣服总数</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">
                            {dolls.reduce((sum, d) => sum + d.photoCount, 0)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">照片总数</p>
                    </div>
                </div>
            </div>

            {/* 娃娃网格 */}
            <div className="p-4">
                {filteredDolls.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredDolls.map(doll => (
                            <DollCard key={doll.id} doll={doll} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Filter size={48} className="mb-4 opacity-20" />
                        <p className="text-sm">没有找到相关娃娃</p>
                    </div>
                )}
            </div>

            {/* 空状态 */}
            {dolls.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Plus size={64} className="mb-4 opacity-20" />
                    <p className="text-sm mb-4">还没有添加娃娃哦~</p>
                    <button
                        onClick={() => push('AddDoll')}
                        className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold"
                    >
                        添加第一只娃娃
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyDolls;

