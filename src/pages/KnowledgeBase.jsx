import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { ChevronLeft, Search, Book, Lightbulb, ShieldAlert, Wrench, Play, MessageCircle, ChevronRight, TrendingUp, Clock, Palette } from 'lucide-react';

const KnowledgeBase = () => {
    const { pop, push } = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // 知识库内容
    const articles = [
        {
            id: 1,
            category: '新手指南',
            icon: <Book size={16} />,
            title: 'BJD入门指南：什么是BJD？',
            summary: '详细介绍BJD的历史、分类、尺寸等基础知识',
            views: 12500,
            likes: 450,
            type: 'article',
            difficulty: '入门',
            readTime: 5,
            tags: ['新手必读', '基础知识']
        },
        {
            id: 2,
            category: '新手指南',
            icon: <Book size={16} />,
            title: '如何选择第一只娃娃？',
            summary: '从预算、尺寸、风格等角度分析如何选购第一只娃娃',
            views: 10300,
            likes: 380,
            type: 'article',
            difficulty: '入门',
            readTime: 8,
            tags: ['新手必读', '购买建议']
        },
        {
            id: 3,
            category: '新手指南',
            icon: <Book size={16} />,
            title: 'BJD尺寸对照表完全版',
            summary: '详细对比叔/三分/四分/六分/八分/OB11等尺寸',
            views: 15200,
            likes: 520,
            type: 'article',
            difficulty: '入门',
            readTime: 3,
            tags: ['尺寸', '对照表']
        },
        {
            id: 4,
            category: '品牌大全',
            icon: <TrendingUp size={16} />,
            title: '国产BJD品牌全解析',
            summary: 'Ringdoll、DollZone、AS、GEM等国产品牌介绍',
            views: 8900,
            likes: 310,
            type: 'article',
            difficulty: '进阶',
            readTime: 12,
            tags: ['国产品牌', '品牌对比']
        },
        {
            id: 5,
            category: '品牌大全',
            icon: <TrendingUp size={16} />,
            title: '日韩系BJD品牌推荐',
            summary: 'VOLKS、Fairyland、Luts等日韩品牌特点分析',
            views: 7600,
            likes: 280,
            type: 'article',
            difficulty: '进阶',
            readTime: 10,
            tags: ['日韩品牌', '海外购买']
        },
        {
            id: 6,
            category: '术语解释',
            icon: <Lightbulb size={16} />,
            title: 'BJD圈常用术语大全',
            summary: '私养、出生证、工期、素体、单头等术语详解',
            views: 9500,
            likes: 340,
            type: 'article',
            difficulty: '入门',
            readTime: 6,
            tags: ['术语', '行话']
        },
        {
            id: 7,
            category: '避坑指南',
            icon: <ShieldAlert size={16} />,
            title: '如何识别假娃？',
            summary: '从出生证、做工、价格等方面辨别真假娃娃',
            views: 18500,
            likes: 680,
            type: 'article',
            difficulty: '进阶',
            readTime: 10,
            tags: ['防伪', '避坑']
        },
        {
            id: 8,
            category: '避坑指南',
            icon: <ShieldAlert size={16} />,
            title: '警惕！团购常见陷阱',
            summary: '低价团购、无实名团长、虚假进度等常见骗局',
            views: 14200,
            likes: 520,
            type: 'article',
            difficulty: '入门',
            readTime: 7,
            tags: ['避坑', '团购安全']
        },
        {
            id: 9,
            category: '保养教程',
            icon: <Wrench size={16} />,
            title: '娃娃关节松了怎么办？',
            summary: '手把手教你给娃娃关节加紧、上油、维护',
            views: 11200,
            likes: 420,
            type: 'video',
            difficulty: '进阶',
            readTime: 15,
            tags: ['保养', '维修', '视频教程']
        },
        {
            id: 10,
            category: '保养教程',
            icon: <Wrench size={16} />,
            title: '娃娃清洁保养完全指南',
            summary: '日常清洁、深度保养、妆面保护全流程',
            views: 9800,
            likes: 380,
            type: 'video',
            difficulty: '入门',
            readTime: 20,
            tags: ['清洁', '保养', '视频教程']
        }
    ];

    // 热门问答
    const hotQuestions = [
        { id: 1, question: '三分和四分哪个更适合新手？', answers: 23, views: 3400 },
        { id: 2, question: '如何选择娃娃的肤色？', answers: 18, views: 2800 },
        { id: 3, question: '团购一般要等多久？', answers: 35, views: 5200 },
        { id: 4, question: '娃娃的衣服可以水洗吗？', answers: 12, views: 1900 }
    ];

    // 分类
    const categories = ['all', '新手指南', '品牌大全', '术语解释', '避坑指南', '保养教程'];

    // 筛选
    const filteredArticles = articles.filter(article => {
        const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = activeCategory === 'all' || article.category === activeCategory;
        return matchSearch && matchCategory;
    });

    const ArticleCard = ({ article }) => (
        <div
            onClick={() => push('ArticleDetail', { id: article.id })}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-98 transition-transform"
        >
            <div className="flex items-start gap-3">
                {/* 图标 */}
                <div className={`p-3 rounded-xl ${article.category === '新手指南' ? 'bg-blue-50 text-blue-500' :
                        article.category === '品牌大全' ? 'bg-purple-50 text-purple-500' :
                            article.category === '术语解释' ? 'bg-yellow-50 text-yellow-600' :
                                article.category === '避坑指南' ? 'bg-red-50 text-red-500' :
                                    'bg-green-50 text-green-500'
                    }`}>
                    {article.icon}
                </div>

                {/* 内容 */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${article.difficulty === '入门' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                            {article.difficulty}
                        </span>
                        {article.type === 'video' && (
                            <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Play size={10} /> 视频
                            </span>
                        )}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{article.summary}</p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                        {article.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* 统计 */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <Clock size={12} /> {article.readTime}分钟
                        </span>
                        <span>{article.views.toLocaleString()} 阅读</span>
                        <span>{article.likes} 赞</span>
                    </div>
                </div>

                <ChevronRight size={16} className="text-gray-300" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">BJD知识库</h1>
                </div>

                {/* 搜索框 */}
                <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索教程、术语、问题..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent flex-1 outline-none text-sm"
                    />
                </div>
            </div>

            {/* 欢迎卡片 */}
            <div className="p-4 bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100">
                <div className="bg-white/80 backdrop-blur rounded-xl p-4">
                    <h2 className="font-bold text-gray-900 mb-1">欢迎来到BJD知识库 📚</h2>
                    <p className="text-sm text-gray-600">
                        这里有最全面的BJD入门教程、品牌介绍、保养指南。
                        新手玩家必看！
                    </p>
                </div>
            </div>

            {/* 工具箱 (New Feature) */}
            <div className="mx-4 -mt-6 mb-6 relative z-10">
                <div
                    onClick={() => push('SkinMatchStudio')}
                    className="bg-white rounded-xl p-4 shadow-lg border border-rose-100 flex items-center justify-between active:scale-98 transition-transform cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                            <Palette size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">肤色比对室</h3>
                            <p className="text-xs text-gray-500">跨品牌肤色匹配，避免色差翻车</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded-lg">
                        <span>立即试用</span>
                        <ChevronRight size={14} />
                    </div>
                </div>
            </div>

            {/* 分类筛选 */}
            <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {cat === 'all' ? '全部' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 热门问答 */}
            <div className="bg-white p-4 mb-2">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <MessageCircle size={18} className="text-rose-500" />
                        热门问答
                    </h2>
                    <button className="text-sm text-rose-500 font-medium">查看更多</button>
                </div>

                <div className="space-y-2">
                    {hotQuestions.map(q => (
                        <div
                            key={q.id}
                            className="p-3 bg-gray-50 rounded-lg active:bg-gray-100"
                        >
                            <p className="text-sm font-medium text-gray-800 mb-1">{q.question}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span>{q.answers} 回答</span>
                                <span>·</span>
                                <span>{q.views} 浏览</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 文章列表 */}
            <div className="p-4 space-y-3">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="text-sm">没有找到相关内容</p>
                    </div>
                )}
            </div>

            {/* 提示卡片 */}
            <div className="mx-4 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Lightbulb size={16} className="text-yellow-500" />
                    找不到你想要的内容？
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                    可以在社区广场提问，会有经验丰富的玩家为你解答！
                </p>
                <button
                    onClick={() => push('Square')}
                    className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg text-sm"
                >
                    前往社区提问
                </button>
            </div>
        </div>
    );
};

export default KnowledgeBase;

