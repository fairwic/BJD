import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "../router/RouteStack";
import {
  Search,
  Star,
  MessageCircle,
  Calendar,
  ChevronRight,
  Sparkles,
  Scissors,
  ArrowLeft,
  Plus,
  Filter,
} from "lucide-react";

// Mock 大师数据
const MOCK_ARTISTS = [
  {
    id: "artist_001",
    name: "云墨妆坊",
    type: "makeup",
    avatar: "bg-gradient-to-br from-purple-400 to-pink-500",
    verified: true,
    rating: 4.9,
    reviewCount: 128,
    serviceCount: 256,
    price: "¥300-800",
    status: "available",
    waitTime: null,
    styles: ["古风", "清冷"],
    portfolio: [
      "bg-gradient-to-br from-rose-200 to-pink-300",
      "bg-gradient-to-br from-purple-200 to-indigo-300",
      "bg-gradient-to-br from-blue-200 to-cyan-300",
    ],
    bio: "专注古风清冷系妆面，擅长龙魂/AS...",
  },
  {
    id: "artist_002",
    name: "樱落工作室",
    type: "makeup",
    avatar: "bg-gradient-to-br from-rose-400 to-orange-400",
    verified: true,
    rating: 4.8,
    reviewCount: 89,
    serviceCount: 167,
    price: "¥400-1200",
    status: "busy",
    waitTime: "约2周",
    styles: ["日系", "甜美"],
    portfolio: [
      "bg-gradient-to-br from-amber-200 to-yellow-300",
      "bg-gradient-to-br from-pink-200 to-rose-300",
      "bg-gradient-to-br from-orange-200 to-red-300",
    ],
    bio: "日系甜美风格专家，妆面透亮自然",
  },
  {
    id: "artist_003",
    name: "浮生若梦",
    type: "wigmaker",
    avatar: "bg-gradient-to-br from-amber-400 to-yellow-500",
    verified: true,
    rating: 4.95,
    reviewCount: 203,
    serviceCount: 412,
    price: "¥150-600",
    status: "available",
    waitTime: null,
    styles: ["古风", "盘发"],
    portfolio: [
      "bg-gradient-to-br from-gray-200 to-slate-300",
      "bg-gradient-to-br from-amber-200 to-orange-300",
      "bg-gradient-to-br from-stone-200 to-zinc-300",
    ],
    bio: "古风盘发大师，高温丝/羊毛定制",
  },
  {
    id: "artist_004",
    name: "星辰发艺",
    type: "wigmaker",
    avatar: "bg-gradient-to-br from-blue-400 to-indigo-500",
    verified: false,
    rating: 4.7,
    reviewCount: 56,
    serviceCount: 98,
    price: "¥100-400",
    status: "available",
    waitTime: null,
    styles: ["现代", "双马尾"],
    portfolio: [
      "bg-gradient-to-br from-blue-200 to-purple-300",
      "bg-gradient-to-br from-indigo-200 to-violet-300",
      "bg-gradient-to-br from-cyan-200 to-blue-300",
    ],
    bio: "现代风格假发，多色渐变专家",
  },
];

// 风格标签
const STYLE_TAGS = [
  "全部",
  "古风",
  "现代",
  "日系",
  "欧美",
  "甜美",
  "暗黑",
  "清冷",
  "写实",
];

// Banner数据
const BANNERS = [
  {
    id: 1,
    title: "本周热门作品",
    subtitle: "云墨妆坊 · 古风仙侠妆",
    color: "from-rose-400 to-purple-500",
  },
  {
    id: 2,
    title: "新晋认证大师",
    subtitle: "3位妆师通过平台认证",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: 3,
    title: "假发特惠季",
    subtitle: "精选毛娘 8折起",
    color: "from-amber-400 to-orange-500",
  },
];

// 状态徽章组件
const StatusBadge = ({ status, waitTime }) => {
  const config = {
    available: {
      color: "bg-green-500",
      text: "接单中",
      ring: "ring-green-200",
    },
    busy: {
      color: "bg-amber-500",
      text: waitTime || "排队中",
      ring: "ring-amber-200",
    },
    offline: { color: "bg-gray-400", text: "暂不接单", ring: "ring-gray-200" },
  };
  const { color, text, ring } = config[status] || config.offline;

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${ring} ring-1`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span className="text-gray-600">{text}</span>
    </span>
  );
};

// 大师卡片组件
const ArtistCard = ({ artist, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 active:scale-98 transition-transform mb-3"
  >
    {/* 头部：头像+基本信息 */}
    <div className="flex items-start gap-3">
      <div
        className={`w-12 h-12 rounded-full ${artist.avatar} flex-shrink-0`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-gray-800 text-sm truncate">
            {artist.name}
          </span>
          {artist.verified && (
            <span className="text-[10px] bg-blue-500 text-white px-1 rounded">
              认证
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-gray-500">
            {artist.type === "makeup" ? "🎨 妆师" : "👩‍🦰 毛娘"}
          </span>
          <StatusBadge status={artist.status} waitTime={artist.waitTime} />
        </div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {artist.styles.map((style) => (
            <span
              key={style}
              className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
            >
              {style}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* 作品预览 */}
    <div className="flex gap-1.5 mt-3">
      {artist.portfolio.map((img, idx) => (
        <div key={idx} className={`flex-1 aspect-square rounded-lg ${img}`} />
      ))}
    </div>

    {/* 底部：评分+价格+操作 */}
    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-0.5">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-gray-700 font-medium">{artist.rating}</span>
        </span>
        <span>服务{artist.serviceCount}人</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-rose-500 font-medium">
          {artist.price}
        </span>
      </div>
    </div>
  </div>
);

// 需求卡片组件
const RequirementCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-gray-50 active:scale-[0.99] transition-transform"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.user.avatarBg}`}
        >
          {item.user.avatarText}
        </div>
        <span className="text-sm text-gray-700 font-medium">
          {item.user.name}
        </span>
      </div>
      <span className="text-xs text-gray-400">{item.time}</span>
    </div>

    <h3 className="text-base text-gray-800 font-medium mb-3 leading-relaxed">
      {item.title}
    </h3>

    <div className="flex flex-wrap gap-2 mb-4">
      {item.tags.map((tag, idx) => (
        <span
          key={idx}
          className={`text-xs px-2 py-1 rounded ${
            tag.type === "urgent"
              ? "bg-rose-50 text-rose-500"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {tag.text}
        </span>
      ))}
    </div>

    <div className="flex justify-between items-center">
      <span className="text-lg font-bold text-rose-500">{item.price}</span>
      <button className="bg-rose-500 text-white text-sm px-6 py-1.5 rounded-full font-medium active:bg-rose-600 transition-colors shadow-sm shadow-rose-200">
        接单
      </button>
    </div>
  </div>
);

const ArtistHub = () => {
  const { push, pop } = useRouter();
  const { requirements } = useApp();
  const [activeTab, setActiveTab] = useState("requirements"); // 'requirements' | 'artists'
  const [activeArtistTab, setActiveArtistTab] = useState("all");
  const [activeStyle, setActiveStyle] = useState("全部");
  const [currentBanner, setCurrentBanner] = useState(0);

  // 筛选大师
  const filteredArtists = MOCK_ARTISTS.filter((artist) => {
    const matchType =
      activeArtistTab === "all" || artist.type === activeArtistTab;
    const matchStyle =
      activeStyle === "全部" || artist.styles.includes(activeStyle);
    return matchType && matchStyle;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 h-12 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button
          onClick={() => (pop ? pop() : window.history.back())}
          className="p-1 -ml-1 active:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>

        <div className="flex items-center gap-8 h-full">
          <button
            onClick={() => setActiveTab("requirements")}
            className={`relative h-full flex items-center font-medium transition-colors ${
              activeTab === "requirements"
                ? "text-gray-900 text-lg font-bold"
                : "text-gray-500 text-base"
            }`}
          >
            需求大厅
            {activeTab === "requirements" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`relative h-full flex items-center font-medium transition-colors ${
              activeTab === "artists"
                ? "text-gray-900 text-lg font-bold"
                : "text-gray-500 text-base"
            }`}
          >
            找妆师
            {activeTab === "artists" && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
        </div>

        <button
          onClick={() => push("CreateRequirement")}
          className="p-1 -mr-1 active:bg-gray-100 rounded-full"
        >
          <Plus size={24} className="text-gray-800" />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1">
        {activeTab === "requirements" ? (
          <div className="animate-fade-in">
            {/* 需求大厅 - 筛选栏 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-50 sticky top-12 z-20">
              <div className="flex gap-4">
                <button className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  综合排序
                </button>
                <button className="text-sm text-gray-500 flex items-center gap-1">
                  筛选 <Filter size={12} />
                </button>
              </div>
            </div>

            {/* 需求列表 */}
            <div className="p-4">
              {requirements.map((req) => (
                <RequirementCard
                  key={req.id}
                  item={req}
                  onClick={() => push("RequirementDetail", { id: req.id })}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* 找妆师 - 搜索栏 */}
            <div className="bg-white px-4 py-2 sticky top-12 z-20">
              <div className="bg-gray-100 rounded-full flex items-center px-3 py-2">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="搜索妆师/毛娘/风格"
                  className="bg-transparent border-none outline-none text-sm flex-1 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Banner轮播 */}
            <div className="px-4 pt-3">
              <div
                className={`bg-gradient-to-r ${BANNERS[currentBanner].color} rounded-xl p-4 text-white relative overflow-hidden`}
                onClick={() =>
                  setCurrentBanner((currentBanner + 1) % BANNERS.length)
                }
              >
                <p className="text-lg font-bold">
                  {BANNERS[currentBanner].title}
                </p>
                <p className="text-sm opacity-90 mt-1">
                  {BANNERS[currentBanner].subtitle}
                </p>
                <div className="absolute right-4 bottom-4 flex gap-1">
                  {BANNERS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full ${idx === currentBanner ? "bg-white" : "bg-white/40"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 分类Tab */}
            <div className="px-4 pt-4">
              <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                {[
                  { id: "all", label: "全部", icon: null },
                  { id: "makeup", label: "妆师", icon: <Sparkles size={14} /> },
                  {
                    id: "wigmaker",
                    label: "毛娘",
                    icon: <Scissors size={14} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveArtistTab(tab.id)}
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                      activeArtistTab === tab.id
                        ? "bg-white text-rose-500 shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 风格标签 */}
            <div className="px-4 pt-3 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 pb-1">
                {STYLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveStyle(tag)}
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                      activeStyle === tag
                        ? "bg-rose-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 大师列表 */}
            <div className="px-4 pt-4">
              {filteredArtists.length > 0 ? (
                filteredArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    onClick={() =>
                      push("ArtistProfile", { artistId: artist.id })
                    }
                  />
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p>暂无匹配的大师</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistHub;
