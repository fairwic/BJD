/**
 * API Mock 数据
 * 用于前端开发和测试，模拟后端API响应
 */

import { USERS, ROLES, ORDER_STATUS, MOCK_ORDERS, MOCK_GROUP_BUYS, BARTER_STATUS, MOCK_BARTERS } from './mock';

// ==================== 通用响应格式 ====================

const createSuccessResponse = (data, message = 'success') => ({
  code: 200,
  message,
  data,
  timestamp: Date.now()
});

const createErrorResponse = (code, message) => ({
  code,
  message,
  data: null,
  timestamp: Date.now()
});

// ==================== 用户认证模块 ====================

export const authAPI = {
  // 发送验证码
  sendCode: (phone, type) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          expireTime: 60
        }, '验证码已发送'));
      }, 500);
    });
  },

  // 验证码登录
  loginWithCode: (phone, code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USERS.find(u => u.phone === phone);
        if (!user || code !== '123456') {
          resolve(createErrorResponse(10002, '验证码错误'));
          return;
        }

        resolve(createSuccessResponse({
          token: `mock_token_${user.id}_${Date.now()}`,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            isRealName: user.isRealName || false,
            balance: user.balance
          }
        }, '登录成功'));
      }, 800);
    });
  },

  // 密码登录
  loginWithPassword: (phone, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USERS.find(u => u.phone === phone);
        if (!user) {
          resolve(createErrorResponse(10005, '用户不存在'));
          return;
        }

        // Mock: 任何密码都通过
        resolve(createSuccessResponse({
          token: `mock_token_${user.id}_${Date.now()}`,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            isRealName: user.isRealName || false,
            balance: user.balance
          }
        }, '登录成功'));
      }, 800);
    });
  },

  // 重置密码
  resetPassword: (phone, code, newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code !== '123456') {
          resolve(createErrorResponse(10002, '验证码错误'));
          return;
        }

        resolve(createSuccessResponse(null, '密码重置成功'));
      }, 800);
    });
  }
};

// ==================== 用户资料模块 ====================

export const userAPI = {
  // 获取用户信息
  getUserInfo: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USERS.find(u => u.id === userId);
        if (!user) {
          resolve(createErrorResponse(10005, '用户不存在'));
          return;
        }

        resolve(createSuccessResponse({
          ...user,
          bio: user.bio || '这个人很懒，什么都没写',
          email: user.email || '',
          followers: user.followers || 0,
          following: user.following || 56,
          likes: user.likes || 0,
          createTime: user.createTime || '2023-01-01T00:00:00Z'
        }));
      }, 300);
    });
  },

  // 更新用户资料
  updateUserInfo: (userId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '资料更新成功'));
      }, 500);
    });
  },

  // 上传头像
  uploadAvatar: (userId, file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          url: `https://cdn.bjdmaster.com/avatars/${userId}_${Date.now()}.jpg`
        }, '上传成功'));
      }, 1000);
    });
  }
};

// ==================== 实名认证模块 ====================

export const realNameAPI = {
  // 提交实名认证
  submitRealName: (userId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          status: 'pending'
        }, '认证申请已提交，预计1-3个工作日审核完成'));
      }, 1500);
    });
  },

  // 查询认证状态
  getRealNameStatus: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          status: 'approved', // pending | approved | rejected
          realName: '张三',
          approvedAt: '2023-10-05T10:00:00Z'
        }));
      }, 300);
    });
  }
};

// ==================== 地址管理模块 ====================

export const addressAPI = {
  // 获取地址列表
  getAddressList: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse([
          {
            id: 1,
            name: '张三',
            phone: '13800138000',
            province: '北京市',
            city: '北京市',
            district: '朝阳区',
            address: '建国路88号',
            isDefault: true
          },
          {
            id: 2,
            name: '李四',
            phone: '13900139000',
            province: '上海市',
            city: '上海市',
            district: '浦东新区',
            address: '陆家嘴环路1号',
            isDefault: false
          }
        ]));
      }, 300);
    });
  },

  // 新增地址
  addAddress: (userId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          id: Date.now()
        }, '地址添加成功'));
      }, 500);
    });
  },

  // 更新地址
  updateAddress: (userId, addressId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '地址更新成功'));
      }, 500);
    });
  },

  // 删除地址
  deleteAddress: (userId, addressId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '地址删除成功'));
      }, 500);
    });
  },

  // 设置默认地址
  setDefaultAddress: (userId, addressId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '默认地址设置成功'));
      }, 500);
    });
  }
};

// ==================== 团购模块 ====================

export const groupBuyAPI = {
  // 获取团购列表
  getGroupBuyList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...MOCK_GROUP_BUYS];

        // 筛选
        if (params.status && params.status !== 'all') {
          list = list.filter(g => g.status === params.status);
        }
        if (params.leaderId) {
          list = list.filter(g => g.leaderId === params.leaderId);
        }

        // 分页
        const page = params.page || 1;
        const pageSize = params.pageSize || 20;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedList = list.slice(start, end);

        resolve(createSuccessResponse({
          total: list.length,
          list: paginatedList
        }));
      }, 500);
    });
  },

  // 获取团购详情
  getGroupBuyDetail: (groupBuyId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const groupBuy = MOCK_GROUP_BUYS.find(g => g.id === parseInt(groupBuyId));
        if (!groupBuy) {
          resolve(createErrorResponse(20001, '团购不存在'));
          return;
        }

        const leader = USERS.find(u => u.id === groupBuy.leaderId);

        resolve(createSuccessResponse({
          ...groupBuy,
          leader: {
            id: leader.id,
            name: leader.name,
            avatar: leader.avatar,
            rating: leader.rating || 4.8,
            followers: leader.followers || 1000,
            isVerified: leader.isRealName
          }
        }));
      }, 500);
    });
  },

  // 创建团购
  createGroupBuy: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          id: Date.now()
        }, '团购创建成功'));
      }, 1000);
    });
  },

  // 更新团购进度
  updateProgress: (groupBuyId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '进度更新成功，已通知所有参团用户'));
      }, 800);
    });
  },

  // 导入SKU（Excel）
  importSkus: (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          skus: [
            { name: '白肌', price: 1500 },
            { name: '普肌', price: 1500 },
            { name: '烧肌', price: 1600 }
          ]
        }, '导入成功'));
      }, 1500);
    });
  }
};

// ==================== 订单模块 ====================

export const orderAPI = {
  // 创建订单
  createOrder: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `o${Date.now()}`;
        resolve(createSuccessResponse({
          id: orderId,
          status: 'unpaid_deposit',
          contractId: `CT-${orderId}`
        }, '订单创建成功'));
      }, 800);
    });
  },

  // 获取订单列表
  getOrderList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...MOCK_ORDERS];

        // 筛选
        if (params.userId) {
          list = list.filter(o => o.userId === params.userId);
        }
        if (params.status && params.status !== 'all') {
          list = list.filter(o => o.status === params.status);
        }

        // 分页
        const page = params.page || 1;
        const pageSize = params.pageSize || 20;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedList = list.slice(start, end);

        resolve(createSuccessResponse({
          total: list.length,
          list: paginatedList
        }));
      }, 500);
    });
  },

  // 获取订单详情
  getOrderDetail: (orderId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = MOCK_ORDERS.find(o => o.id === orderId);
        if (!order) {
          resolve(createErrorResponse(30001, '订单不存在'));
          return;
        }

        const groupBuy = MOCK_GROUP_BUYS.find(g => g.id === order.groupBuyId);

        resolve(createSuccessResponse({
          ...order,
          groupBuy: {
            id: groupBuy.id,
            title: groupBuy.title,
            image: groupBuy.image,
            leader: groupBuy.leader,
            progress: groupBuy.progress
          },
          sku: {
            id: order.skuId,
            name: order.skuName,
            price: order.price
          },
          address: {
            id: 1,
            name: '张三',
            phone: '13800138000',
            address: '北京市朝阳区建国路88号'
          },
          shipping: order.shipping || {
            trackingNumber: '',
            company: '',
            shippedAt: null
          }
        }));
      }, 500);
    });
  },

  // 支付定金
  payDeposit: (orderId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          status: 'wait_verify'
        }, '定金支付成功，等待团长审核'));
      }, 1000);
    });
  },

  // 支付尾款
  payFinal: (orderId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          status: 'wait_ship'
        }, '尾款支付成功，等待发货'));
      }, 1000);
    });
  },

  // 审核订单（团长）
  verifyOrder: (orderId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.action === 'reject') {
          resolve(createSuccessResponse({
            status: 'unpaid_deposit'
          }, '订单已拒绝'));
          return;
        }

        resolve(createSuccessResponse({
          status: 'production'
        }, '订单审核通过'));
      }, 800);
    });
  },

  // 发货（团长）
  shipOrder: (orderId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '发货成功，已通知买家'));
      }, 800);
    });
  },

  // 导出订单（团长）
  exportOrders: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock: 返回blob URL
        resolve(createSuccessResponse({
          downloadUrl: 'blob:http://localhost:5173/mock-excel-url'
        }, '导出成功'));
      }, 1500);
    });
  }
};

// ==================== 转单模块 ====================

export const transferAPI = {
  // 生成转单码
  generateTransferCode: (orderId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const code = `TRANS-${orderId}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        resolve(createSuccessResponse({
          transferCode: code,
          expireTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }, '转单码生成成功'));
      }, 500);
    });
  },

  // 查询转单信息
  getTransferInfo: (transferCode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock解析转单码
        const parts = transferCode.split('-');
        if (parts.length < 3) {
          resolve(createErrorResponse(40001, '转单码无效'));
          return;
        }

        const orderId = parts[1];
        const order = MOCK_ORDERS.find(o => o.id === orderId);

        if (!order) {
          resolve(createErrorResponse(40001, '转单码无效'));
          return;
        }

        const seller = USERS.find(u => u.id === order.userId);

        resolve(createSuccessResponse({
          transferCode,
          order: {
            id: order.id,
            title: order.title,
            skuName: order.skuName,
            image: order.image,
            price: order.price,
            deposit: order.deposit,
            progress: 75,
            status: order.status
          },
          seller: {
            id: seller.id,
            name: seller.name,
            avatar: seller.avatar
          },
          expireTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          isExpired: false
        }));
      }, 500);
    });
  },

  // 接收转单
  claimTransfer: (transferCode, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const parts = transferCode.split('-');
        if (parts.length < 3) {
          resolve(createErrorResponse(40001, '转单码无效'));
          return;
        }

        const orderId = parts[1];

        resolve(createSuccessResponse({
          orderId,
          newOwnerId: 'u2' // Mock新买家ID
        }, '转单成功！订单已归入您的名下'));
      }, 1000);
    });
  }
};

// ==================== 合同模块 ====================

export const contractAPI = {
  // 签署合同
  signContract: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contractId = `CT-${data.orderId}`;
        resolve(createSuccessResponse({
          contractId,
          contractUrl: `https://cdn.bjdmaster.com/contracts/${contractId}.pdf`,
          signedAt: new Date().toISOString()
        }, '合同签署成功'));
      }, 1500);
    });
  },

  // 获取合同列表
  getContractList: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse([
          {
            id: 'CT-o1',
            orderId: 'o1',
            title: '【二样征集】原创特体 "鹿神" 树脂素体',
            status: 'signed',
            signedAt: '2023-10-01T10:05:00Z',
            contractUrl: 'https://cdn.bjdmaster.com/contracts/CT-o1.pdf'
          }
        ]));
      }, 500);
    });
  },

  // 下载合同
  downloadContract: (contractId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          downloadUrl: `https://cdn.bjdmaster.com/contracts/${contractId}.pdf`
        }));
      }, 500);
    });
  }
};

// ==================== 社交模块 ====================

export const socialAPI = {
  // 发布动态
  createPost: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          id: Date.now()
        }, '发布成功'));
      }, 1000);
    });
  },

  // 获取动态列表
  getPostList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPosts = [
          {
            id: 201,
            user: {
              id: 'u1',
              name: '养娃大户',
              avatar: 'bg-red-200',
              isVerified: true,
              tags: ['资深玩家']
            },
            content: '终于等到我的小可爱回家了！这种肤色真的绝美，自然光下通透感满分。',
            images: ['bg-orange-100', 'bg-pink-100'],
            tags: ['BJD', '私养图'],
            likes: 124,
            comments: 32,
            isLiked: false,
            distance: '1.2km',
            createTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 202,
            user: {
              id: 'u2',
              name: '手作娘小B',
              avatar: 'bg-green-200',
              isVerified: true,
              tags: ['手作娘']
            },
            content: '新做的小裙子，还在打版中，大家喜欢长款还是短款？',
            images: ['bg-teal-100'],
            tags: ['手作', '娃衣'],
            likes: 88,
            comments: 45,
            isLiked: false,
            distance: '500m',
            createTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
          }
        ];

        const page = params.page || 1;
        const pageSize = params.pageSize || 20;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        resolve(createSuccessResponse({
          total: mockPosts.length,
          list: mockPosts.slice(start, end)
        }));
      }, 500);
    });
  },

  // 获取动态详情
  getPostDetail: (postId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          id: postId,
          user: {
            id: 'u1',
            name: '养娃大户',
            avatar: 'bg-red-200',
            isVerified: true,
            tags: ['资深玩家']
          },
          content: '终于等到我的小可爱回家了！这种肤色真的绝美...',
          images: ['bg-orange-100', 'bg-pink-100'],
          tags: ['BJD', '私养图'],
          likes: 124,
          comments: 32,
          isLiked: false,
          distance: '1.2km',
          createTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        }));
      }, 500);
    });
  },

  // 点赞/取消点赞
  likePost: (postId, action) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          likes: action === 'like' ? 125 : 124
        }, action === 'like' ? '点赞成功' : '取消点赞'));
      }, 300);
    });
  },

  // 评论动态
  commentPost: (postId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          id: Date.now(),
          user: {
            id: 'u2',
            name: '手作娘小B',
            avatar: 'bg-green-200'
          },
          content: data.content,
          likes: 0,
          createTime: new Date().toISOString()
        }, '评论成功'));
      }, 800);
    });
  },

  // 获取评论列表
  getCommentList: (postId, params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          total: 32,
          list: [
            {
              id: 1,
              user: {
                id: 'u2',
                name: '手作娘小B',
                avatar: 'bg-green-200'
              },
              content: '太美了！求链接！',
              likes: 5,
              createTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              replies: []
            },
            {
              id: 2,
              user: {
                id: 'l1',
                name: '摄影师C',
                avatar: 'bg-blue-200'
              },
              content: '这个肤色确实绝了，拍照效果一定很好',
              likes: 3,
              createTime: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(),
              replies: []
            }
          ]
        }));
      }, 500);
    });
  },

  // 关注/取消关注
  followUser: (userId, action) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, action === 'follow' ? '关注成功' : '取消关注'));
      }, 500);
    });
  },

  // 获取关注列表
  getFollowingList: (userId, params) => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(createSuccessResponse({
            total: 2,
            list: [
              {
                id: 'l1',
                name: '知名团长A',
                avatar: 'bg-yellow-200',
                followers: 1000
              },
              {
                id: 'm1',
                name: '爱丽丝的衣橱',
                avatar: 'bg-purple-200',
                followers: 5000
              }
            ]
          }));
        }, 500);
      });
  }
,

  // 获取粉丝列表
  getFollowerList: (userId, params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse({
          total: 342,
          list: []
        }));
      }, 500);
    });
  }
};

// ==================== 以物换物模块 ====================

export const barterAPI = {
    // 发起换物提议
    createProposal: (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newBarter = {
                    id: `b${Date.now()}`,
                    initiatorId: data.initiatorId,
                    targetUserId: data.targetUserId,
                    initiatorProduct: data.initiatorProduct,
                    targetProduct: data.targetProduct,
                    cashTopUp: data.cashTopUp || 0,
                    status: BARTER_STATUS.PROPOSED,
                    createTime: new Date().toISOString(),
                    depositAmount: Math.max(data.initiatorProduct.price, data.targetProduct.price) * 1.2, 
                    serviceType: data.serviceType || 'direct', // 'direct' or 'platform'
                    initiatorDepositPaid: false,
                    targetDepositPaid: false,
                    initiatorTracking: '',
                    targetTracking: '',
                    initiatorShipVideo: null,
                    targetShipVideo: null,
                    initiatorReceiveVideo: null,
                    targetReceiveVideo: null
                };
                MOCK_BARTERS.push(newBarter);
                resolve(createSuccessResponse(newBarter, '换物提议已发送'));
            }, 800);
        });
    },

    // 接受提议
    acceptProposal: (barterId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const barter = MOCK_BARTERS.find(b => b.id === barterId);
                if (barter) {
                    barter.status = BARTER_STATUS.ACCEPTED;
                }
                resolve(createSuccessResponse(null, '已接受提议，请双方支付押金'));
            }, 600);
        });
    },

    // 支付押金
    payDeposit: (barterId, userId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const barter = MOCK_BARTERS.find(b => b.id === barterId);
                if (!barter) {
                     resolve(createErrorResponse(404, 'Barter not found'));
                     return;
                }

                if (userId === barter.initiatorId) {
                    barter.initiatorDepositPaid = true;
                } else if (userId === barter.targetUserId) {
                    barter.targetDepositPaid = true;
                }

                // Check if both paid
                if (barter.initiatorDepositPaid && barter.targetDepositPaid) {
                    barter.status = BARTER_STATUS.AWAITING_SHIPMENT;
                }

                resolve(createSuccessResponse({
                    status: barter.status,
                    initiatorDepositPaid: barter.initiatorDepositPaid,
                    targetDepositPaid: barter.targetDepositPaid
                }, '押金支付成功'));
            }, 1000);
        });
    },

    // 提交运单号 (+ 存证视频)
    submitTracking: (barterId, userId, trackingNumber, videoFile) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const barter = MOCK_BARTERS.find(b => b.id === barterId);
                 if (!barter) {
                     resolve(createErrorResponse(404, 'Barter not found'));
                     return;
                }

                if (userId === barter.initiatorId) {
                    barter.initiatorTracking = trackingNumber;
                    if (videoFile) barter.initiatorShipVideo = 'mock_video_url.mp4';
                } else if (userId === barter.targetUserId) {
                    barter.targetTracking = trackingNumber;
                    if (videoFile) barter.targetShipVideo = 'mock_video_url.mp4';
                }
                
                // If at least one shipped
                if (barter.initiatorTracking || barter.targetTracking) {
                     barter.status = BARTER_STATUS.SHIPPED;
                }
                
                // [V2.0] If Platform mode, and both shipped, update status to IN_PLATFORM
                if (barter.serviceType === 'platform' && barter.initiatorTracking && barter.targetTracking) {
                    barter.status = BARTER_STATUS.IN_PLATFORM;
                }

                resolve(createSuccessResponse(null, '运单号提交成功'));
            }, 500);
        });
    },

    // 确认收货 (+ 开箱视频)
    confirmReceipt: (barterId, userId, videoFile) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                 const barter = MOCK_BARTERS.find(b => b.id === barterId);
                 if (!barter) {
                     resolve(createErrorResponse(404, 'Barter not found'));
                     return;
                }
                
                if (userId === barter.initiatorId) {
                    if (videoFile) barter.initiatorReceiveVideo = 'mock_unbox.mp4';
                } else {
                    if (videoFile) barter.targetReceiveVideo = 'mock_unbox.mp4';
                }

                // Dual Confirmation Check
                const isCompleted = barter.initiatorReceiveVideo && barter.targetReceiveVideo;
                
                if (isCompleted) {
                    barter.status = BARTER_STATUS.COMPLETED;
                    resolve(createSuccessResponse({ isCompleted: true }, '双方已确认收货，交易完成'));
                } else {
                     resolve(createSuccessResponse({ isCompleted: false }, '您已确认收货，等待对方确认'));
                }
            }, 800);
        });
    },
    
    // 获取换物详情
    getBarterDetail: (barterId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const barter = MOCK_BARTERS.find(b => b.id === barterId);
                 if (!barter) {
                     resolve(createErrorResponse(404, 'Barter not found'));
                     return;
                }
                resolve(createSuccessResponse(barter));
            }, 500);
        });
    }
};

// ==================== 通知模块 ====================

export const notificationAPI = {
  // 获取通知列表
  getNotificationList: (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockNotifications = [
          {
            id: 1,
            type: 'system',
            title: '补款通知',
            content: '您参与的团购【鹿神素体】已制作完成，请在30天内补齐尾款',
            relatedId: 'o1',
            relatedType: 'order',
            isRead: false,
            createTime: new Date(Date.now() - 10 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            type: 'comment',
            title: '新评论',
            content: '手作娘小B 评论了你的动态',
            relatedId: 201,
            relatedType: 'post',
            isRead: false,
            createTime: new Date(Date.now() - 30 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            type: 'like',
            title: '新点赞',
            content: '摄影师C 赞了你的动态',
            relatedId: 201,
            relatedType: 'post',
            isRead: true,
            createTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          }
        ];

        let list = [...mockNotifications];

        // 筛选
        if (params.type && params.type !== 'all') {
          list = list.filter(n => n.type === params.type);
        }
        if (params.isRead !== 'all') {
          const isRead = params.isRead === 'true';
          list = list.filter(n => n.isRead === isRead);
        }

        const unreadCount = mockNotifications.filter(n => !n.isRead).length;

        resolve(createSuccessResponse({
          total: list.length,
          unreadCount,
          list: list.slice(0, params.pageSize || 20)
        }));
      }, 500);
    });
  },

  // 标记已读
  markAsRead: (notificationId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '已标记为已读'));
      }, 300);
    });
  },

  // 全部标记已读
  markAllAsRead: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSuccessResponse(null, '已全部标记为已读'));
      }, 500);
    });
  }
};

// ==================== 统一导出 ====================

export default {
  auth: authAPI,
  user: userAPI,
  realName: realNameAPI,
  address: addressAPI,
  groupBuy: groupBuyAPI,
  order: orderAPI,
  transfer: transferAPI,
  contract: contractAPI,
  social: socialAPI,
  barter: barterAPI,
  notification: notificationAPI
};

