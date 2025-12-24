import React, { createContext, useContext, useState, useEffect } from "react";
import {
  USERS,
  ROLES,
  MOCK_ORDERS,
  MOCK_GROUP_BUYS,
  MOCK_PRODUCTS,
  ORDER_STATUS,
} from "../data/mock";

const AppContext = createContext();

// Move Mock Data here for persistence
const INITIAL_REQUIREMENTS = [
  {
    id: 1,
    userId: "user_001", // Assumed ID
    user: {
      name: "是兔兔呀",
      avatarBg: "bg-rose-100 text-rose-500",
      avatarText: "是",
    },
    time: "2小时前",
    title: "求一个三分男娃古风妆，清冷感",
    desc: "如题，要求妆面干净，清冷风格，不用太浓。工期希望能在一个月内。",
    tags: [
      { text: "古风" },
      { text: "指定妆" },
      { text: "加急", type: "urgent" },
    ],
    price: "¥200-300",
    status: "open", // open, processing, completed
    images: [],
  },
  {
    id: 2,
    userId: "user_002",
    user: {
      name: "猫咪老师",
      avatarBg: "bg-blue-100 text-blue-500",
      avatarText: "猫",
    },
    time: "5小时前",
    title: "六分素体拉筋+穿铝线",
    desc: "老V社素体，皮筋松了，需要重新拉筋，顺便穿铝线增加可动。",
    tags: [{ text: "保养" }, { text: "拉筋" }],
    price: "¥50-80",
    status: "open",
    images: [],
  },
  {
    id: 3,
    userId: "user_003",
    user: {
      name: "草莓酱",
      avatarBg: "bg-orange-100 text-orange-500",
      avatarText: "草",
    },
    time: "昨天",
    title: "接一个自由妆，风格不限，工期要快",
    desc: "主要想换个心情，风格由妆师发挥，只要好看就行。急单！",
    tags: [{ text: "自由妆" }, { text: "急单" }],
    price: "¥150以内",
    status: "open",
    images: [],
  },
];

const INITIAL_CHATS = [
  {
    id: 301,
    name: "爱丽丝的衣橱 (商家)",
    lastMsg: "亲，这款现货今天就可以发顺丰哦~",
    time: "10:23",
    unread: 2,
    avatar: "bg-orange-400",
    messages: [],
  },
  {
    id: 302,
    name: "【鹿神】进度通知群",
    lastMsg: "团长: 工厂回复说下周开始打磨了，大家稍安勿躁。",
    time: "昨天",
    unread: 0,
    avatar: "bg-blue-400",
    messages: [],
  },
  {
    id: 303,
    name: "兔兔团长",
    lastMsg: "好的，尾款链接已经发你了。",
    time: "周一",
    unread: 0,
    avatar: "bg-rose-400",
    messages: [],
  },
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(USERS[0]); // Default to first user
  const [orders, setOrders] = useState(MOCK_ORDERS);
  // Combine Merchant Products and Group Buys into a single "Product" source for simplicity in this demo
  const [groupBuys, setGroupBuys] = useState([
    ...MOCK_GROUP_BUYS,
    ...MOCK_PRODUCTS.map((p) => ({
      ...p,
      // Add fields expected by ProductDetail if missing in MOCK_PRODUCTS
      leader: p.shop,
      status: "现货/Spot",
      deposit: p.price, // Spot items full price as deposit equivalent for demo logic
      skus: [{ id: "default", name: "默认规格", price: p.price }],
      description: "这是一个精美的现货商品，下单后极速发货。",
    })),
  ]);
  const [notifications, setNotifications] = useState([]);

  // New State for Requirements and Chats
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [chats, setChats] = useState(INITIAL_CHATS);

  // Login / Switch User
  const login = (userId) => {
    const user = USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      addNotification(`欢迎回来，${user.name}`);
    }
  };

  // Create Order (Join Group Buy)
  const createOrder = (groupBuyId, skuId) => {
    const groupBuy = groupBuys.find((g) => g.id === groupBuyId);
    const sku = groupBuy.skus.find((s) => s.id === skuId);

    const newOrder = {
      id: `o${Date.now()}`,
      userId: currentUser.id,
      groupBuyId,
      skuId,
      skuName: sku.name,
      price: sku.price,
      deposit: groupBuy.deposit,
      paidDeposit: 0,
      finalPayment: sku.price - groupBuy.deposit,
      paidFinal: 0,
      status: ORDER_STATUS.UNPAID_DEPOSIT,
      createTime: new Date().toISOString().split("T")[0],
      image: groupBuy.image,
      title: groupBuy.title,
      leader: groupBuy.leader,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder.id;
  };

  // Pay Deposit
  const payDeposit = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: ORDER_STATUS.WAIT_VERIFY,
            paidDeposit: o.deposit,
          };
        }
        return o;
      }),
    );
    addNotification("定金支付成功，等待团长审核");
  };

  // Verify Order (Leader)
  const verifyOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return { ...o, status: ORDER_STATUS.PRODUCTION };
        }
        return o;
      }),
    );
    addNotification("订单审核通过");
  };

  // Update Progress (Leader)
  const updateProgress = (groupBuyId, progress, status) => {
    setGroupBuys((prev) =>
      prev.map((g) => {
        if (g.id === groupBuyId) {
          return { ...g, progress, status };
        }
        return g;
      }),
    );

    // If progress is 100%, trigger final payment for all related orders
    if (progress === 100) {
      setOrders((prev) =>
        prev.map((o) => {
          if (
            o.groupBuyId === groupBuyId &&
            o.status === ORDER_STATUS.PRODUCTION
          ) {
            return { ...o, status: ORDER_STATUS.WAIT_FINAL };
          }
          return o;
        }),
      );
    }
  };

  // Pay Final
  const payFinal = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: ORDER_STATUS.WAIT_SHIP,
            paidFinal: o.finalPayment,
          };
        }
        return o;
      }),
    );
    addNotification("尾款支付成功，等待发货");
  };

  // Ship Order (Leader)
  const shipOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return { ...o, status: ORDER_STATUS.SHIPPED };
        }
        return o;
      }),
    );
    addNotification("发货成功");
  };

  // Transfer Order (User A -> User B)
  const generateTransferCode = (orderId) => {
    // In a real app, this would generate a unique token
    return `TRANS-${orderId}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const claimTransfer = (code) => {
    // Mock parsing code: TRANS-o1-ABCDE
    const parts = code.split("-");
    if (parts.length < 3) return { success: false, message: "无效的转单码" };

    const orderId = parts[1];
    const order = orders.find((o) => o.id === orderId);

    if (!order) return { success: false, message: "订单不存在" };
    if (order.userId === currentUser.id)
      return { success: false, message: "不能转给自己" };

    // Transfer logic: Update userId to current user
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            userId: currentUser.id,
            status: ORDER_STATUS.TRANSFERRED,
          }; // Mark as transferred briefly or just keep current status?
          // Let's keep status but maybe add a flag. For simplicity, just change owner.
        }
        return o;
      }),
    );

    addNotification("转单成功！订单已归入您的名下");
    return { success: true };
  };

  const createGroupBuy = (data) => {
    const newGroupBuy = {
      id: Date.now(),
      leaderId: currentUser.id,
      leader: currentUser.name,
      status: "征集中",
      progress: 0,
      image: "bg-gray-200", // Default image
      ...data,
    };
    setGroupBuys((prev) => [newGroupBuy, ...prev]);
    addNotification("团购创建成功！");
    return newGroupBuy.id;
  };

  // --- Requirement & Chat Logic ---

  const createRequirement = (data) => {
    const newReq = {
      id: Date.now(),
      userId: currentUser.id,
      user: {
        name: currentUser.name,
        avatarBg: "bg-gray-200 text-gray-700", // Simple mock
        avatarText: currentUser.name[0],
      },
      time: "刚刚",
      status: "open",
      images: [],
      ...data,
    };
    setRequirements((prev) => [newReq, ...prev]);
    addNotification("需求发布成功");
    return newReq.id;
  };

  const takeRequirement = (reqId) => {
    // 1. Update Requirement Status
    const req = requirements.find((r) => r.id === reqId);
    if (!req) return null;

    setRequirements((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, status: "processing", artistId: currentUser.id }
          : r,
      ),
    );

    // 2. Create Chat Session
    const existingChat = chats.find(
      (c) => c.reqId === reqId && c.artistId === currentUser.id,
    );
    if (existingChat) return existingChat.id;

    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      reqId: reqId,
      artistId: currentUser.id,
      userId: req.userId,
      name: req.user.name,
      avatar: req.user.avatarBg.split(" ")[0], // Hacky way to get a color
      lastMsg: "我已接单，请问有什么具体要求吗？",
      time: "刚刚",
      unread: 0,
      messages: [
        { type: "sys", text: `您已接下 "${req.title}"，请与金主沟通细节` },
        { type: "me", text: "你好，我已接单，请问有什么具体要求吗？" },
      ],
    };
    setChats((prev) => [newChat, ...prev]);
    addNotification("接单成功！已开启会话");
    return newChatId;
  };

  const sendChatMessage = (chatId, text) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMsg: text,
            time: "刚刚",
            messages: [...(c.messages || []), { type: "me", text }],
          };
        }
        return c;
      }),
    );
  };

  const addNotification = (msg) => {
    setNotifications((prev) => [...prev, { id: Date.now(), msg }]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: USERS,
        orders,
        groupBuys,
        notifications,
        requirements, // New
        chats, // New
        login,
        createOrder,
        payDeposit,
        verifyOrder,
        updateProgress,
        payFinal,
        shipOrder,
        generateTransferCode,
        claimTransfer,
        createGroupBuy,
        createRequirement, // New
        takeRequirement, // New
        sendChatMessage, // New
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
