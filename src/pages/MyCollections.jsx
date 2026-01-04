import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { 
    ChevronLeft, 
    Home, 
    Grid, 
    Plus, 
    Share2, 
    MoreHorizontal,
    Heart,
    BadgeDollarSign,
    Palette,
    RefreshCw
} from 'lucide-react';

const MyCollections = () => {
    const { pop, push } = useRouter();
    const [activeTab, setActiveTab] = useState('dollhouse'); // 'dollhouse' | 'showcase'

    // Mock Data for Dolls
    const DOLLS = [
        {
            id: 'd1',
            name: '小鹿',
            brand: '自制特体',
            size: '1/3',
            image: 'bg-purple-100',
            daysOwned: 54,
            status: 'home' // home, maintenance, shipping
        },
        {
            id: 'd2',
            name: '爱丽丝',
            brand: 'AS',
            size: '1/4',
            image: 'bg-blue-100',
            daysOwned: 12,
            status: 'maintenance'
        }
    ];

    // Mock Data for Showcase (Itabag items)
    const SHOWCASE_ITEMS = [
        { id: 'i1', title: '散兵 吧唧', image: 'bg-blue-200', type: 'badge' },
        { id: 'i2', title: '万叶 立牌', image: 'bg-green-200', type: 'stand' },
        { id: 'i3', title: '钟离 色纸', image: 'bg-amber-100', type: 'card' },
        { id: 'i4', title: '雷电将军 玩偶', image: 'bg-purple-200', type: 'plush' },
        { id: 'i5', title: '神子 挂件', image: 'bg-pink-200', type: 'badge' },
        { id: 'i6', title: '夜兰 镭射票', image: 'bg-indigo-300', type: 'ticket' },
        { id: 'i7', title: '纳西妲 色纸', image: 'bg-green-100', type: 'card' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Immersive Header with Cover */}
            <div className="relative h-64 shrink-0">
                {/* Cover Image */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-gray-900 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2670&auto=format&fit=crop" 
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        alt="Cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                </div>

                {/* Navbar */}
                <div className="relative z-20 flex items-center justify-between p-4 text-white">
                    <button onClick={pop} className="p-2 -ml-2 hover:bg-white/10 rounded-full backdrop-blur-md transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                         <button className="p-2 hover:bg-white/10 rounded-full backdrop-blur-md transition-colors">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 -mr-2 hover:bg-white/10 rounded-full backdrop-blur-md transition-colors">
                            <MoreHorizontal size={24} />
                        </button>
                    </div>
                </div>

                {/* Curator Profile in Header */}
                <div className="absolute bottom-4 left-6 right-6 z-20 flex items-end justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-2xl">
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-200 to-purple-200" />
                        </div>
                        <div className="mb-2">
                            <h1 className="text-2xl font-bold text-white tracking-wide">吃土少女A</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/10">
                                    Lv.8 资深收藏家
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs - Glassmorphism Style */}
            <div className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-white/5 pt-2 pb-0 px-6 flex items-end gap-8 shadow-2xl">
                <button 
                    onClick={() => setActiveTab('dollhouse')}
                    className={`pb-3 relative transition-all ${
                        activeTab === 'dollhouse' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    <span className={`text-lg font-bold ${activeTab === 'dollhouse' ? 'scale-110' : ''} block transition-transform`}>娃屋</span>
                    {activeTab === 'dollhouse' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-t-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab('showcase')}
                    className={`pb-3 relative transition-all ${
                        activeTab === 'showcase' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    <span className={`text-lg font-bold ${activeTab === 'showcase' ? 'scale-110' : ''} block transition-transform`}>痛柜</span>
                    {activeTab === 'showcase' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-t-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                    )}
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-gray-900 pb-24">
                {activeTab === 'dollhouse' ? (
                    /* Doll House - Polaroid Style */
                    <div className="p-4 space-y-6">
                        {DOLLS.map((doll, index) => (
                            <div 
                                key={doll.id}
                                onClick={() => push('DollProfile', { id: doll.id })}
                                className="group relative bg-white p-3 pb-4 rounded-sm shadow-xl rotate-1 hover:rotate-0 transition-all duration-300 active:scale-95"
                                style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
                            >
                                {/* Photo Area */}
                                <div className={`aspect-[4/5] w-full ${doll.image} mb-3 bg-cover bg-center shadow-inner brightness-95 group-hover:brightness-100 transition-all`} />
                                
                                {/* Handwriting Label */}
                                <div className="flex justify-between items-baseline px-2">
                                    <h3 className="font-handwriting text-xl text-gray-800">{doll.name}</h3>
                                    <span className="font-serif text-xs text-gray-400 italic">{doll.brand} {doll.size}</span>
                                </div>
                                
                                {/* Status Stamps/Badges */}
                                <div className="absolute -top-2 -right-2 z-10">
                                    {doll.status === 'maintenance' ? (
                                        <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 shadow-lg -rotate-12 border-2 border-white">
                                            MAINTENANCE
                                        </div>
                                    ) : (
                                        <div className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 shadow-lg rotate-12 border-2 border-white flex items-center gap-1">
                                            <Heart size={10} fill="currentColor" />
                                            {doll.daysOwned} DAYS
                                        </div>
                                    )}
                                </div>

                               {/* Action Overlay (New) */}
                               <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2 z-20 pointer-events-none">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            push('CreateSecondHandListing', { 
                                                initialData: { 
                                                    category: 'bjd',
                                                    title: `${doll.brand} ${doll.size} ${doll.name}`,
                                                    brand: doll.brand, 
                                                    size: doll.size, 
                                                    skin: '白肌' // Mock derived data
                                                }
                                            })
                                        }}
                                        className="pointer-events-auto bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:bg-rose-50 hover:text-rose-500 transition-colors flex items-center gap-1"
                                    >
                                        <BadgeDollarSign size={12} />
                                        <span>回血</span>
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            push('CreateSecondHandListing', { 
                                                initialData: {
                                                    type: 'seek', // Buy/Commission Mode
                                                    category: 'service',
                                                    title: `求妆: ${doll.brand} ${doll.name}`,
                                                    description: `想给家里的${doll.brand} ${doll.name}约个妆...`
                                                }
                                            })
                                        }}
                                        className="pointer-events-auto bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:bg-gray-700 transition-colors flex items-center gap-1"
                                    >
                                        <Palette size={12} />
                                        <span>约妆</span>
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            push('CreateSecondHandListing', { 
                                                initialData: {
                                                    type: 'exchange', 
                                                    category: 'bjd',
                                                    title: `【换】出${doll.brand} ${doll.name} 求...`,
                                                    brand: doll.brand,
                                                    size: doll.size,
                                                    skin: '白肌'
                                                }
                                            })
                                        }}
                                        className="pointer-events-auto bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md hover:bg-purple-700 transition-colors flex items-center gap-1"
                                    >
                                        <RefreshCw size={12} />
                                        <span>换娃</span>
                                    </button>
                               </div>
                            </div>
                        ))}
                        
                        {/* More visual cues */}
                        <div className="text-center py-8">
                             <button className="text-gray-600 text-sm font-medium border border-gray-700 rounded-full px-6 py-2 hover:bg-gray-800 hover:text-gray-400 transition-colors">
                            + 接新娃回家 (Add Doll)
                        </button>
                        </div>
                    </div>
                ) : (
                    /* Showcase - Textured Itabag Style */
                    <div className="p-3 min-h-full bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]">
                        <div className="columns-2 gap-3 space-y-3">
                            {SHOWCASE_ITEMS.map((item) => (
                                <div 
                                    key={item.id}
                                    className="break-inside-avoid relative group"
                                >
                                    {/* Item Container - No Background, just the item popping out */}
                                    <div className={`w-full aspect-square rounded-xl ${item.image} shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/20 border-2 border-white/5`}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end p-2">
                                            <span className="text-white text-xs font-bold drop-shadow-md">{item.title}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Type Badge (Hanging Tag style) */}
                                    <div className="absolute -top-1 -left-1 bg-black/80 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded shadow-lg border border-white/10 uppercase tracking-widest">
                                        {item.type}
                                    </div>
                                </div>
                            ))}
                            
                             <div className="break-inside-avoid w-full aspect-square border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-white/30 hover:bg-white/5 hover:border-white/40 transition-colors cursor-pointer">
                                <Plus size={24} />
                                <span className="text-xs font-bold mt-1">ADD</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Floating Dynamic Action */}
            <div className="fixed bottom-6 right-6 z-40">
                 <button className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-full shadow-lg shadow-rose-500/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
                    <Grid size={24} />
                </button>
            </div>
        </div>
    );
};

export default MyCollections;
