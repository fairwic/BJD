
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
    { id: 1, title: '【现货】三分BJD 洛丽塔宫廷风洋装 "蔷薇少女"', price: 328, image: 'bg-pink-100', shop: '爱丽丝的衣橱', tags: ['三分', '洋装'], size: '1/3', category: 'outfit', type: 'spot' },
    { id: 2, title: '【限时】四分通用 休闲卫衣套装 多色可选', price: 89, image: 'bg-blue-100', shop: '爱丽丝的衣橱', tags: ['四分', '休闲'], size: '1/4', category: 'outfit', type: 'spot' },
    { id: 3, title: '【假发】6-7寸高温丝 手作造型款 银灰色', price: 120, image: 'bg-gray-200', shop: '爱丽丝的衣橱', tags: ['假发', '通用'], size: '1/3', category: 'wig', type: 'spot' },
    { id: 4, title: '【整娃】AS天使工房 74cm叔体 官方正版', price: 2800, image: 'bg-stone-200', shop: 'AS官方店', tags: ['叔', '整娃'], size: 'uncle', category: 'full', type: 'spot' },
    { id: 5, title: '【眼珠】14mm 树脂眼 追视效果极佳 星空款', price: 68, image: 'bg-indigo-200', shop: '瞳孔深处', tags: ['通用', '眼珠'], size: 'all', category: 'eyes', type: 'spot' },
    { id: 6, title: '【鞋子】三分女 黑色小皮鞋 百搭款', price: 45, image: 'bg-neutral-200', shop: '足下生风', tags: ['三分', '鞋子'], size: '1/3', category: 'shoes', type: 'spot' },
    { id: 7, title: '【道具】复古手提箱 适合三分/叔', price: 158, image: 'bg-amber-100', shop: '道具屋', tags: ['通用', '道具'], size: 'all', category: 'props', type: 'spot' },
    { id: 8, title: '【素体】四分特体 胖胖体 可动性强', price: 800, image: 'bg-orange-100', shop: '自制太太', tags: ['四分', '素体'], size: '1/4', category: 'body', type: 'spot' },
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
