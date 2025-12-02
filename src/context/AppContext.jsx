import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS, ROLES, MOCK_ORDERS, MOCK_GROUP_BUYS, ORDER_STATUS } from '../data/mock';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(USERS[0]); // Default to first user
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [groupBuys, setGroupBuys] = useState(MOCK_GROUP_BUYS);
    const [notifications, setNotifications] = useState([]);

    // Login / Switch User
    const login = (userId) => {
        const user = USERS.find(u => u.id === userId);
        if (user) {
            setCurrentUser(user);
            addNotification(`欢迎回来，${user.name}`);
        }
    };

    // Create Order (Join Group Buy)
    const createOrder = (groupBuyId, skuId) => {
        const groupBuy = groupBuys.find(g => g.id === groupBuyId);
        const sku = groupBuy.skus.find(s => s.id === skuId);

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
            createTime: new Date().toISOString().split('T')[0],
            image: groupBuy.image,
            title: groupBuy.title,
            leader: groupBuy.leader,
        };

        setOrders(prev => [newOrder, ...prev]);
        return newOrder.id;
    };

    // Pay Deposit
    const payDeposit = (orderId) => {
        setOrders(prev => prev.map(o => {
            if (o.id === orderId) {
                return { ...o, status: ORDER_STATUS.WAIT_VERIFY, paidDeposit: o.deposit };
            }
            return o;
        }));
        addNotification('定金支付成功，等待团长审核');
    };

    // Verify Order (Leader)
    const verifyOrder = (orderId) => {
        setOrders(prev => prev.map(o => {
            if (o.id === orderId) {
                return { ...o, status: ORDER_STATUS.PRODUCTION };
            }
            return o;
        }));
        addNotification('订单审核通过');
    };

    // Update Progress (Leader)
    const updateProgress = (groupBuyId, progress, status) => {
        setGroupBuys(prev => prev.map(g => {
            if (g.id === groupBuyId) {
                return { ...g, progress, status };
            }
            return g;
        }));

        // If progress is 100%, trigger final payment for all related orders
        if (progress === 100) {
            setOrders(prev => prev.map(o => {
                if (o.groupBuyId === groupBuyId && o.status === ORDER_STATUS.PRODUCTION) {
                    return { ...o, status: ORDER_STATUS.WAIT_FINAL };
                }
                return o;
            }));
        }
    };

    // Pay Final
    const payFinal = (orderId) => {
        setOrders(prev => prev.map(o => {
            if (o.id === orderId) {
                return { ...o, status: ORDER_STATUS.WAIT_SHIP, paidFinal: o.finalPayment };
            }
            return o;
        }));
        addNotification('尾款支付成功，等待发货');
    };

    // Ship Order (Leader)
    const shipOrder = (orderId) => {
        setOrders(prev => prev.map(o => {
            if (o.id === orderId) {
                return { ...o, status: ORDER_STATUS.SHIPPED };
            }
            return o;
        }));
        addNotification('发货成功');
    };

    // Transfer Order (User A -> User B)
    const generateTransferCode = (orderId) => {
        // In a real app, this would generate a unique token
        return `TRANS-${orderId}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    };

    const claimTransfer = (code) => {
        // Mock parsing code: TRANS-o1-ABCDE
        const parts = code.split('-');
        if (parts.length < 3) return { success: false, message: '无效的转单码' };

        const orderId = parts[1];
        const order = orders.find(o => o.id === orderId);

        if (!order) return { success: false, message: '订单不存在' };
        if (order.userId === currentUser.id) return { success: false, message: '不能转给自己' };

        // Transfer logic: Update userId to current user
        setOrders(prev => prev.map(o => {
            if (o.id === orderId) {
                return { ...o, userId: currentUser.id, status: ORDER_STATUS.TRANSFERRED }; // Mark as transferred briefly or just keep current status?
                // Let's keep status but maybe add a flag. For simplicity, just change owner.
            }
            return o;
        }));

        addNotification('转单成功！订单已归入您的名下');
        return { success: true };
    };

    const createGroupBuy = (data) => {
        const newGroupBuy = {
            id: Date.now(),
            leaderId: currentUser.id,
            leader: currentUser.name,
            status: '征集中',
            progress: 0,
            image: 'bg-gray-200', // Default image
            ...data
        };
        setGroupBuys(prev => [newGroupBuy, ...prev]);
        addNotification('团购创建成功！');
        return newGroupBuy.id;
    };

    const addNotification = (msg) => {
        setNotifications(prev => [...prev, { id: Date.now(), msg }]);
        setTimeout(() => {
            setNotifications(prev => prev.slice(1));
        }, 3000);
    };

    return (
        <AppContext.Provider value={{
            currentUser,
            users: USERS,
            orders,
            groupBuys,
            notifications,
            login,
            createOrder,
            payDeposit,
            verifyOrder,
            updateProgress,
            payFinal,
            shipOrder,
            generateTransferCode,
            claimTransfer,
            createGroupBuy
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
