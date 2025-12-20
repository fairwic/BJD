
export const ROLES = {
    MERCHANT: 'merchant',
    USER: 'user',
    LEADER: 'leader',
};

export const USERS = [
    { id: 'u1', name: '是兔兔呀', role: ROLES.USER, avatar: 'bg-rose-200', balance: 5000 },
    { id: 'u2', name: '吃土少女B', role: ROLES.USER, avatar: 'bg-blue-200', balance: 200 },
    { id: 'l1', name: '知名团长A', role: ROLES.LEADER, avatar: 'bg-yellow-200', balance: 10000 },
    { id: 'm1', name: '爱丽丝的衣橱', role: ROLES.MERCHANT, avatar: 'bg-purple-200', balance: 50000 },
];

export const CATEGORY_CONFIG = {
    SIZES: [
        { id: 'all', label: '全部尺寸' },
        { id: 'uncle', label: '叔' },
        { id: '1/3', label: '三分' },
        { id: '1/4', label: '四分' },
        { id: '1/6', label: '六分' },
        { id: '1/8', label: '八分' },
        { id: '1/12', label: 'OB11/12分' },
    ],
    TYPES: [
        { id: 'all', label: '全部' },
        { id: 'full', label: '整娃' },
        { id: 'body', label: '素体' },
        { id: 'head', label: '单头' },
        { id: 'outfit', label: '娃衣' },
        { id: 'wig', label: '假发' },
        { id: 'eyes', label: '眼珠' },
        { id: 'shoes', label: '鞋子' },
        { id: 'props', label: '道具' },
    ]
};

export const MOCK_PRODUCTS = [
    {
        id: 1,
        title: '1套 BJD 娃娃，带有富有表达力的蓝色眼睛和黑色直发，带刘海',
        price: 59,
        image: 'https://img.kwcdn.com/product/open/b9aed2e34c41492885b740fd8b520bb1-goods.jpeg?imageView2/2/w/500/q/70/format/avif',
        shop: 'Temu精选',
        tags: ['6分', '整娃', '热销'],
        size: '1/6',
        category: 'full',
        type: 'spot'
    },
    {
        id: 2,
        title: '12.6英寸1/6比例BJD/MJD可动人偶 - 12关节球窝关节可动玩偶',
        price: 148,
        image: 'https://img.kwcdn.com/product/open/d965e0cf5b4942b283b90a888cd2595c-goods.jpeg?imageView2/2/w/500/q/70/format/avif',
        shop: 'BJD梦工厂',
        tags: ['6分', '素体', '可动'],
        size: '1/6',
        category: 'full',
        type: 'spot'
    },
    {
        id: 3,
        title: '节日装饰手办玩偶 - 关节可活动，无需电源，适合家居装饰',
        price: 95,
        image: 'https://img.kwcdn.com/product/fancy/c2f4da76-873a-442c-9841-b0113827dfe2.jpg?imageView2/2/w/500/q/70/format/avif',
        shop: '萌系收藏',
        tags: ['摆件', '礼物'],
        size: '1/8',
        category: 'full',
        type: 'spot'
    },
    {
        id: 4,
        title: '12.6in 1/6收藏玩偶,超模娃娃时尚12关节可动人偶,清晰真实的妆容',
        price: 179,
        image: 'https://img.kwcdn.com/product/open/f9e9459767484e9fb0c6a30507b65f35-goods.jpeg?imageView2/2/w/500/q/70/format/avif',
        shop: '时尚超模',
        tags: ['6分', '超模', '妆面'],
        size: '1/6',
        category: 'full',
        type: 'spot'
    },
    {
        id: 5,
        title: '1/12比例古风BJD娃娃，适配OB11骨架，12关节可动全身造型',
        price: 145,
        image: 'https://img.kwcdn.com/product/fancy/52fafb00-eafc-4ccd-a96c-c2bca5d83c50.jpg?imageView2/2/w/500/q/70/format/avif',
        shop: '古风雅韵',
        tags: ['OB11', '12分', '古风'],
        size: '1/12',
        category: 'full',
        type: 'spot'
    },
    {
        id: 6,
        title: '1/8比例BJD娃娃扎克 - 可动动漫动作人偶',
        price: 208,
        image: 'https://img.kwcdn.com/product/fancy/7cdd95e8-22f8-472b-917a-f7f2409cfceb.jpg?imageView2/2/w/500/q/70/format/avif',
        shop: 'Q版专卖',
        tags: ['8分', 'Q版'],
        size: '1/8',
        category: 'full',
        type: 'spot'
    },
    {
        id: 7,
        title: '【假发】6-7寸高温丝 手作造型款 银灰色',
        price: 120,
        image: 'bg-gray-200',
        shop: '爱丽丝的衣橱',
        tags: ['假发', '通用'],
        size: '1/3',
        category: 'wig',
        type: 'spot'
    },
    {
        id: 8,
        title: '【眼珠】14mm 树脂眼 追视效果极佳 星空款',
        price: 68,
        image: 'bg-indigo-200',
        shop: '瞳孔深处',
        tags: ['通用', '眼珠'],
        size: 'all',
        category: 'eyes',
        type: 'spot'
    }
];

export const MOCK_GROUP_BUYS = [
    {
        id: 101,
        title: '【二样征集】原创特体 "鹿神" 树脂素体',
        status: '征集中',
        progress: 75,
        leader: '知名团长A',
        leaderId: 'l1',
        price: 1500,
        deposit: 500,
        deadline: '3天后截团',
        image: 'bg-purple-100',
        description: '鹿神特体二样修改完毕，增加了可动性，关节更加顺滑。',
        skus: [
            { id: 's1', name: '白肌', price: 1500 },
            { id: 's2', name: '普肌', price: 1500 },
            { id: 's3', name: '烧肌', price: 1600 },
        ]
    },
    {
        id: 102,
        title: '【大货进度】六分BJD "小小兔" 尾款补款通知',
        status: '补款中',
        progress: 90,
        leader: '知名团长A',
        leaderId: 'l1',
        price: 800,
        deposit: 300,
        deadline: '请尽快补款',
        image: 'bg-yellow-100',
        description: '小小兔大货已出，请各位家长尽快补款。',
        skus: [
            { id: 's4', name: '全套', price: 800 },
        ]
    },
];

export const ORDER_STATUS = {
    UNPAID_DEPOSIT: 'unpaid_deposit', // 待付定金
    WAIT_VERIFY: 'wait_verify',       // 待审核 (已付定金)
    PRODUCTION: 'production',         // 制作中
    WAIT_FINAL: 'wait_final',         // 待付尾款
    WAIT_SHIP: 'wait_ship',           // 待发货 (已付尾款)
    SHIPPED: 'shipped',               // 已发货
    COMPLETED: 'completed',           // 已完成
    TRANSFERRED: 'transferred',       // 已转单
};

export const MOCK_ORDERS = [
    {
        id: 'o1',
        userId: 'u1',
        groupBuyId: 101,
        skuId: 's1',
        skuName: '白肌',
        price: 1500,
        deposit: 500,
        paidDeposit: 500,
        finalPayment: 1000,
        paidFinal: 0,
        status: ORDER_STATUS.PRODUCTION,
        createTime: '2023-10-01',
        image: 'bg-purple-100',
        title: '【二样征集】原创特体 "鹿神" 树脂素体',
        leader: '知名团长A',
    }
];

// 轮播图数据
export const MOCK_BANNERS = [
    {
        id: 1,
        type: 'group_buy',
        title: '🔥 鹿神特体二样',
        subtitle: '382人已上车，征集即将截止',
        targetId: 101,
        gradient: 'from-purple-600 to-indigo-700',
        badge: '本周热团',
        image: null, // 可选：背景图片URL
    },
    {
        id: 2,
        type: 'spot',
        title: '精选六分娃',
        subtitle: '新品现货，即拍即发',
        targetId: 1,
        gradient: 'from-rose-500 to-pink-600',
        badge: '现货',
        image: 'https://img.kwcdn.com/product/open/b9aed2e34c41492885b740fd8b520bb1-goods.jpeg',
    },
    {
        id: 3,
        type: 'artist',
        title: '✨ 云墨妆坊',
        subtitle: '古风清冷系妆面大师，本月预约8折',
        targetId: 'artist_001',
        gradient: 'from-amber-500 to-orange-600',
        badge: '推荐妆师',
        image: null,
    },
    {
        id: 4,
        type: 'activity',
        title: '🎄 圣诞活动',
        subtitle: '分享晒娃照，赢取限定眼珠！',
        targetId: null,
        targetUrl: 'WishPool', // 跳转到许愿池页面
        gradient: 'from-green-500 to-emerald-600',
        badge: '限时活动',
        image: null,
    },
    {
        id: 5,
        type: 'group_buy',
        title: '小小兔大货出货',
        subtitle: '尾款补款通知，请尽快处理',
        targetId: 102,
        gradient: 'from-blue-500 to-cyan-600',
        badge: '补款中',
        image: null,
    },
];
