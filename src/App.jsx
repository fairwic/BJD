import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RouterProvider, useRouter } from './router/RouteStack';
import { ROLES, CATEGORY_CONFIG, MOCK_PRODUCTS } from './data/mock';

// Pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ProductDetail from './pages/ProductDetail';
import OrderDetail from './pages/OrderDetail';
import OrderManagement from './pages/OrderManagement';
import TransferLanding from './pages/TransferLanding';
import CreateGroupBuy from './pages/CreateGroupBuy';
import RealNameVerification from './pages/RealNameVerification';
import ProfileEdit from './pages/ProfileEdit';
import PaymentSettings from './pages/PaymentSettings';
import AccountSecurity from './pages/AccountSecurity';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import ContractSigning from './pages/ContractSigning';
import LeaderProfile from './pages/LeaderProfile';
import MerchantProfile from './pages/MerchantProfile';
import MyGroupBuys from './pages/MyGroupBuys';
import PublicUserProfile from './pages/PublicUserProfile';
import MyFollowing from './pages/MyFollowing';
import MyLikes from './pages/MyLikes';
import MyAlbum from './pages/MyAlbum';
import GroupBuyManagement from './pages/GroupBuyManagement';
import GroupBuyDetail from './pages/GroupBuyDetail';
import ShippingManagement from './pages/ShippingManagement';
import MyContracts from './pages/MyContracts';
import AddressManagement from './pages/AddressManagement';
// 新增页面
import MyDolls from './pages/MyDolls';
import DollProfile from './pages/DollProfile';
import AchievementCenter from './pages/AchievementCenter';
import KnowledgeBase from './pages/KnowledgeBase';
import SkinMatchStudio from './pages/SkinMatchStudio';
import UserShop from './pages/UserShop';
import WishPool from './pages/WishPool';
import CreateSpotProduct from './pages/CreateSpotProduct';
import SpotProductManagement from './pages/SpotProductManagement';

// Components
import UserSwitcher from './components/UserSwitcher';

// Icons
import { Home, ShoppingBag, Users, MessageCircle, User, Plus, Sparkles, ClipboardList, CheckCircle2, Truck, Package, Search, Bell, Settings, ChevronRight, Heart, Image as ImageIcon, MoreHorizontal, Share2, MessageSquare, ArrowRightLeft, ShieldCheck, MapPin, FileText, Award, Book, Flame } from 'lucide-react';

// --- Main Layout Components (Refactored from original App.jsx) ---

const TabBar = ({ activeTab, setActiveTab, role }) => {
  const tabs = [
    { id: 'shop', label: '养娃', icon: ShoppingBag, roles: [ROLES.USER] },
    { id: 'home', label: '工作台', icon: ClipboardList, roles: [ROLES.LEADER, ROLES.MERCHANT] },
    { id: 'square', label: '广场', icon: Users, roles: [ROLES.USER, ROLES.LEADER] },
    { id: 'messages', label: '消息', icon: MessageCircle, roles: [ROLES.USER, ROLES.LEADER, ROLES.MERCHANT] },
    { id: 'me', label: '我的', icon: User, roles: [ROLES.USER, ROLES.LEADER, ROLES.MERCHANT] },
  ];

  const visibleTabs = tabs.filter(t => t.roles.includes(role));

  return (
    <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-around shrink-0 pb-safe">
      {visibleTabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === tab.id ? 'text-rose-500' : 'text-gray-400'
            }`}
        >
          <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Page Components (Simplified versions of original App.jsx logic) ---

// 商品卡片组件

const UserProfile = () => {
  const { currentUser, orders } = useApp();
  const { push } = useRouter();

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-full border-2 border-white shadow-sm ${currentUser.avatar}`} />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{currentUser.role}</span>
            </div>
          </div>
          <div className="ml-auto text-gray-400">
            <UserSwitcher>
              <div className="flex items-center gap-1 text-xs text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                <ArrowRightLeft size={12} />
                <span>切换身份</span>
              </div>
            </UserSwitcher>
          </div>
        </div>

        {/* Order Stats */}
        <div className="flex justify-between px-2">
          <div className="flex flex-col items-center gap-2" onClick={() => push('MyGroupBuys')}>
            <span className="font-bold text-lg">{orders.filter(o => o.userId === currentUser.id).length}</span>
            <span className="text-xs text-gray-500">我的参团</span>
          </div>
          <div className="flex flex-col items-center gap-2" onClick={() => push('MyFollowing')}>
            <span className="font-bold text-lg">12</span>
            <span className="text-xs text-gray-500">关注</span>
          </div>
          <div className="flex flex-col items-center gap-2" onClick={() => push('MyLikes')}>
            <span className="font-bold text-lg">45</span>
            <span className="text-xs text-gray-500">喜欢/收藏</span>
          </div>
          <div className="flex flex-col items-center gap-2" onClick={() => push('MyAlbum')}>
            <span className="font-bold text-lg">8</span>
            <span className="text-xs text-gray-500">相册</span>
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="mt-3 bg-white p-4">
        <h3 className="font-bold text-sm mb-3">我的订单</h3>
        <div className="space-y-3">
          {orders.filter(o => o.userId === currentUser.id).map(order => (
            <div key={order.id} onClick={() => push('OrderDetail', { id: order.id })} className="flex gap-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100">
              <div className={`w-16 h-16 rounded-lg ${order.image} shrink-0`} />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between">
                  <h4 className="font-bold text-sm truncate">{order.title}</h4>
                  <span className="text-xs text-rose-500">{order.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">规格: {order.skuName}</p>
              </div>
            </div>
          ))}
          {orders.filter(o => o.userId === currentUser.id).length === 0 && (
            <p className="text-center text-gray-400 text-sm py-4">暂无订单</p>
          )}
        </div>
      </div>

      {/* 设置菜单 */}
      <div className="mt-3 bg-white rounded-xl divide-y divide-gray-50">
        {/* ✨ 新增功能区（高亮显示） */}
        <div onClick={() => push('MyDolls')} className="flex items-center gap-3 p-4 active:bg-gray-50 bg-gradient-to-r from-rose-50/30 to-transparent">
          <Package size={20} className="text-rose-500" />
          <span className="text-sm text-gray-800 flex-1 font-medium">我的娃娃</span>
          <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">3只</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('AchievementCenter')} className="flex items-center gap-3 p-4 active:bg-gray-50 bg-gradient-to-r from-purple-50/30 to-transparent">
          <Award size={20} className="text-purple-500" />
          <span className="text-sm text-gray-800 flex-1 font-medium">成就中心</span>
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('KnowledgeBase')} className="flex items-center gap-3 p-4 active:bg-gray-50 bg-gradient-to-r from-blue-50/30 to-transparent">
          <Book size={20} className="text-blue-500" />
          <span className="text-sm text-gray-800 flex-1 font-medium">BJD知识库</span>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">新手必读</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        {/* 原有功能区 */}
        <div onClick={() => push('MyContracts')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <FileText size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">我的合同</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
        <div onClick={() => push('AddressManagement')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <MapPin size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">收货地址</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
        <div onClick={() => push('ProfileEdit')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <User size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">编辑资料</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('RealNameVerification')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <CheckCircle2 size={20} className="text-gray-400" />
          <div className="flex-1">
            <span className="text-sm text-gray-700">实名认证</span>
            <p className="text-xs text-gray-400 mt-0.5">提升账号安全性</p>
          </div>
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">未认证</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('PaymentSettings')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <Package size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">支付设置</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('AccountSecurity')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <Settings size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">账号安全</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('MyLikes')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <Heart size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">我的喜欢</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        <div onClick={() => push('MyAlbum')} className="flex items-center gap-3 p-4 active:bg-gray-50">
          <ImageIcon size={20} className="text-gray-400" />
          <span className="text-sm text-gray-700 flex-1">我的相册</span>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
      </div>

      <div className="mt-4 p-4">
        <button onClick={() => push('Login')} className="w-full py-3 text-red-500 bg-white rounded-xl text-sm font-bold">退出登录</button>
      </div>
    </div>
  );
};

const LeaderDashboard = () => {
  const { push } = useRouter();

  return (
    <div className="pb-20 p-4">
      <h1 className="font-bold text-xl mb-4">团长工作台</h1>
      <div className="grid grid-cols-2 gap-3">
        <div onClick={() => push('CreateGroupBuy')} className="bg-purple-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-purple-600 active:scale-95 transition-transform">
          <Plus size={32} />
          <span className="font-bold">发起团购</span>
        </div>
        <div onClick={() => push('OrderManagement')} className="bg-rose-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-rose-600 active:scale-95 transition-transform">
          <ClipboardList size={32} />
          <span className="font-bold">订单管理</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-blue-600 active:scale-95 transition-transform">
          <Truck size={32} />
          <span className="font-bold">发货管理</span>
        </div>
        <div onClick={() => push('SpotProductManagement')} className="bg-orange-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-orange-600 active:scale-95 transition-transform">
          <Package size={32} />
          <span className="font-bold">现货管理</span>
        </div>
        <div onClick={() => push('CreateSpotProduct')} className="bg-green-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-green-600 active:scale-95 transition-transform">
          <Plus size={32} />
          <span className="font-bold">发布现货</span>
        </div>
        <div onClick={() => push('WishPool')} className="bg-amber-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-amber-600 active:scale-95 transition-transform">
          <Sparkles size={32} />
          <span className="font-bold">许愿池选品</span>
        </div>
      </div>
    </div >
  );
};

// --- 广场页面 (社交动态) ---
const Square = () => {
  const { push } = useRouter();
  const [posts, setPosts] = useState([
    { id: 201, user: '养娃大户', avatar: 'bg-red-200', content: '终于等到我的小可爱回家了！这种肤色真的绝美,自然光下通透感满分。 #BJD #私养图', image: 'bg-orange-100', likes: 124, comments: 32, isLiked: false, distance: '1.2km', tags: ['资深玩家'], isVerified: true },
    { id: 202, user: '手作娘小B', avatar: 'bg-green-200', content: '新做的小裙子，还在打版中，大家喜欢长款还是短款？在线蹲一个建议~', image: 'bg-teal-100', likes: 88, comments: 45, isLiked: false, distance: '500m', tags: ['手作娘'], isVerified: true },
    { id: 203, user: '摄影师C', avatar: 'bg-blue-200', content: '周末的外拍聚会，带了三个崽，累并快乐着。', image: 'bg-indigo-100', likes: 256, comments: 12, isLiked: false, distance: '3.5km', tags: ['摄影师'], isVerified: false },
  ]);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleShare = (post) => {
    alert(`分享: ${post.content.substring(0, 20)}...`);
  };

  const PostCard = ({ post }) => (
    <div className="bg-white mb-3 pb-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 p-4 pb-2">
        <div
          onClick={(e) => { e.stopPropagation(); push('PublicUserProfile', { name: post.user, avatar: post.avatar }); }}
          className={`w-10 h-10 rounded-full ${post.avatar} cursor-pointer relative`}
        >
          {post.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <ShieldCheck size={12} className="text-blue-500 fill-blue-100" />
            </div>
          )}
        </div>
        <div
          onClick={(e) => { e.stopPropagation(); push('PublicUserProfile', { name: post.user, avatar: post.avatar }); }}
          className="cursor-pointer flex-1"
        >
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-gray-800">{post.user}</p>
            {post.tags && post.tags.map((tag, i) => (
              <span key={i} className="text-[10px] bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
            <span>2小时前</span>
            <span>·</span>
            <div className="flex items-center gap-0.5">
              <MapPin size={10} />
              <span>{post.distance || '0.5km'}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400"><MoreHorizontal size={18} /></button>
      </div>
      <div onClick={() => push('PostDetail', { id: post.id })} className={`w-full aspect-[4/3] ${post.image} mb-3 cursor-pointer`} />
      <div className="px-4">
        <p onClick={() => push('PostDetail', { id: post.id })} className="text-gray-700 text-sm leading-relaxed cursor-pointer">{post.content}</p>
        <div className="flex items-center gap-6 mt-3 text-gray-500">
          <button
            onClick={() => handleLike(post.id)}
            className={`flex items-center gap-1.5 ${post.isLiked ? 'text-rose-500' : ''}`}
          >
            <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button
            onClick={() => push('PostDetail', { id: post.id })}
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
          <input type="text" placeholder="搜索娃圈动态..." className="bg-transparent text-sm w-full outline-none" />
        </div>
        <button onClick={() => push('CreatePost')} className="text-rose-500">
          <Plus size={24} />
        </button>
      </div>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-3 space-y-2">
          {/* 知识库快捷入口 */}
          <div onClick={() => push('KnowledgeBase')} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 flex items-center gap-3 cursor-pointer active:scale-98 transition-transform">
            <div className="bg-white p-2 rounded-full shadow-sm text-blue-500">
              <Book size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-gray-800">BJD新手指南</p>
              <p className="text-xs text-gray-600">入门必读 · 品牌大全 · 避坑攻略</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>

          {/* AI文案助手 */}
          <div onClick={() => push('CreatePost')} className="bg-gradient-to-r from-rose-100 to-purple-100 rounded-xl p-3 flex items-center gap-3 cursor-pointer active:scale-98 transition-transform">
            <div className="bg-white p-2 rounded-full shadow-sm text-rose-500">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">发帖没灵感？</p>
              <p className="text-xs text-gray-600">让 AI 帮你写出神仙文案 ✨</p>
            </div>
          </div>
        </div>
        {posts.map(post => <PostCard key={post.id} post={post} />)}
        {/* 重复显示更多内容 */}
        {posts.map(post => <PostCard key={`dup-${post.id}`} post={post} />)}
      </div>
    </div>
  );
};


// --- 消息页面 ---
const Messages = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [notificationFilter, setNotificationFilter] = useState('all');

  const MOCK_CHATS = [
    { id: 301, name: '爱丽丝的衣橱 (商家)', lastMsg: '亲，这款现货今天就可以发顺丰哦~', time: '10:23', unread: 2, avatar: 'bg-orange-400' },
    { id: 302, name: '【鹿神】进度通知群', lastMsg: '团长: 工厂回复说下周开始打磨了，大家稍安勿躁。', time: '昨天', unread: 0, avatar: 'bg-blue-400' },
    { id: 303, name: '兔兔团长', lastMsg: '好的，尾款链接已经发你了。', time: '周一', unread: 0, avatar: 'bg-rose-400' },
  ];

  const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'comment', title: '新团开团通知', content: '一加 - 原神神里绫华定制机 | 12月3日正式发布', time: '7小时前', unread: 11, avatar: 'bg-blue-200' },
    { id: 2, type: 'comment', title: '补款通知', content: '8.6 版本维护通知，新活动预告', time: '8小时前', unread: 17, avatar: 'bg-purple-200' },
    { id: 3, type: 'follow', title: '参团成功通知', content: '绝区零FES 2025 情报公开', time: '9小时前', unread: 38, avatar: 'bg-yellow-200' },
    { id: 4, type: 'like', title: '参团失败通知', content: '3.8 前瞻特别节目预告', time: '12-01', unread: 20, avatar: 'bg-pink-200' },
    { id: 5, type: 'comment', title: '参团结束通知', content: '米游币抽神抽-绝区零专场现已开启！', time: '11-28', unread: 2, avatar: 'bg-green-200' },
  ];

  const totalUnread = activeTab === 'chat'
    ? MOCK_CHATS.reduce((sum, chat) => sum + chat.unread, 0)
    : MOCK_NOTIFICATIONS.reduce((sum, notif) => sum + notif.unread, 0);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header with Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center justify-center gap-8 h-14">
          <button
            onClick={() => setActiveTab('chat')}
            className={`text-base font-bold pb-1 transition-colors ${activeTab === 'chat' ? 'text-gray-900 border-b-2 border-rose-500' : 'text-gray-400'}`}
          >
            聊天
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`text-base font-bold pb-1 transition-colors relative ${activeTab === 'notifications' ? 'text-gray-900 border-b-2 border-rose-500' : 'text-gray-400'}`}
          >
            通知
            {totalUnread > 0 && activeTab === 'notifications' && (
              <span className="absolute -top-1 -right-4 bg-rose-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                {totalUnread > 99 ? '99+' : totalUnread}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Filters */}
      {activeTab === 'notifications' && (
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-4">
          <button
            onClick={() => setNotificationFilter('all')}
            className={`flex items-center gap-1 text-sm ${notificationFilter === 'all' ? 'text-gray-900 font-bold' : 'text-gray-500'}`}
          >
            <MessageSquare size={16} />
            <span>评论和@</span>
          </button>
          <button
            onClick={() => setNotificationFilter('follow')}
            className={`flex items-center gap-1 text-sm ${notificationFilter === 'follow' ? 'text-gray-900 font-bold' : 'text-gray-500'}`}
          >
            <Heart size={16} />
            <span>新增关注</span>
          </button>
          <button
            onClick={() => setNotificationFilter('like')}
            className={`flex items-center gap-1 text-sm ${notificationFilter === 'like' ? 'text-gray-900 font-bold' : 'text-gray-500'}`}
          >
            <Heart size={16} fill="currentColor" />
            <span>收到的赞</span>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="bg-white">
        {activeTab === 'chat' ? (
          <div className="divide-y divide-gray-50">
            {MOCK_CHATS.map(chat => (
              <div key={chat.id} className="flex gap-3 p-4 active:bg-gray-50">
                <div className={`w-12 h-12 rounded-full ${chat.avatar} flex items-center justify-center text-white font-bold shrink-0`}>
                  {chat.name[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="flex items-center">
                    <span className="bg-rose-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1.5">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {MOCK_NOTIFICATIONS.map(notif => (
              <div key={notif.id} className="flex gap-3 p-4 active:bg-gray-50">
                <div className={`w-12 h-12 rounded-full ${notif.avatar} flex items-center justify-center shrink-0`}>
                  <span className="text-2xl">📢</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-sm">{notif.title}</h3>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{notif.content}</p>
                </div>
                {notif.unread > 0 && (
                  <div className="flex items-center">
                    <span className="bg-cyan-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1.5 font-bold">
                      {notif.unread}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// --- Main App Container ---

const MainApp = () => {
  const { currentRoute, replace } = useRouter();
  const { currentUser, notifications } = useApp();
  const [activeTab, setActiveTab] = useState('shop');

  // Redirect to Login if no user (initial load)
  useEffect(() => {
    if (!currentUser) {
      replace('Login');
    } else {
      // Set default tab based on role
      if (currentUser.role === ROLES.LEADER) setActiveTab('home');
      else setActiveTab('shop');
    }
  }, [currentUser]); // Run when currentUser changes

  // Render current screen based on RouteStack
  const renderScreen = () => {
    switch (currentRoute.name) {
      case 'Login': return <Login />;
      case 'ForgotPassword': return <ForgotPassword />;
      case 'ProductDetail': return <ProductDetail />;
      case 'OrderDetail': return <OrderDetail />;
      case 'OrderManagement': return <OrderManagement />;
      case 'CreateGroupBuy': return <CreateGroupBuy />;
      case 'TransferLanding': return <TransferLanding />;
      case 'RealNameVerification': return <RealNameVerification />;
      case 'ProfileEdit': return <ProfileEdit />;
      case 'PaymentSettings': return <PaymentSettings />;
      case 'AccountSecurity': return <AccountSecurity />;
      case 'CreatePost': return <CreatePost />;
      case 'PostDetail': return <PostDetail />;
      case 'ContractSigning': return <ContractSigning />;
      case 'LeaderProfile': return <LeaderProfile />;
      case 'MerchantProfile': return <MerchantProfile />;
      case 'MyGroupBuys': return <MyGroupBuys />;
      case 'PublicUserProfile': return <PublicUserProfile />;
      case 'MyFollowing': return <MyFollowing />;
      case 'MyLikes': return <MyLikes />;
      case 'MyAlbum': return <MyAlbum />;
      case 'GroupBuyManagement': return <GroupBuyManagement />;
      case 'GroupBuyDetail': return <GroupBuyDetail />;
      case 'ShippingManagement': return <ShippingManagement />;
      case 'MyContracts': return <MyContracts />;
      case 'AddressManagement': return <AddressManagement />;
      // 新增路由
      case 'MyDolls': return <MyDolls />;
      case 'DollProfile': return <DollProfile />;
      case 'AchievementCenter': return <AchievementCenter />;
      case 'KnowledgeBase': return <KnowledgeBase />;
      case 'AchievementCenter': return <AchievementCenter />;
      case 'KnowledgeBase': return <KnowledgeBase />;
      case 'SkinMatchStudio': return <SkinMatchStudio />;
      case 'WishPool': return <WishPool />;
      case 'CreateSpotProduct': return <CreateSpotProduct />;
      case 'SpotProductManagement': return <SpotProductManagement />;
      case 'Home':
      default:
        // Tab View
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {activeTab === 'shop' && <UserShop />}
              {activeTab === 'home' && <LeaderDashboard />}
              {activeTab === 'me' && <UserProfile />}
              {activeTab === 'square' && <Square />}
              {activeTab === 'messages' && <Messages />}
            </div>
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} role={currentUser?.role || ROLES.USER} />
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50 shadow-2xl overflow-hidden relative font-sans text-gray-900 flex flex-col">
      {renderScreen()}

      {/* User Switcher - 只在非登录页显示 - 已移动到个人中心 */}
      {/* {currentRoute.name !== 'Login' && <UserSwitcher />} */}

      {/* Notifications Toast */}
      <div className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="bg-gray-900/90 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-in fade-in slide-in-from-top-5">
            {n.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <MainApp />
      </RouterProvider>
    </AppProvider>
  );
}