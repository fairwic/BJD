import React, { useState, useEffect } from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import api from '../data/apiMock';
import { ArrowLeft, Package, ShieldCheck, Truck, CheckCircle, AlertCircle, MapPin, Copy, Video, PlayCircle, Eye, Loader2 } from 'lucide-react';

const BARTER_STATUS = {
    PROPOSED: 'proposed',
    ACCEPTED: 'accepted',
    AWAITING_SHIPMENT: 'awaiting_shipment',
    SHIPPED: 'shipped',
    IN_PLATFORM: 'in_platform',
    PLATFORM_PASSED: 'platform_passed',
    INSPECTION: 'inspection',
    COMPLETED: 'completed',
    DISPUTE: 'dispute',
};

export default function BarterOrderDetail() {
    const { currentRoute, pop } = useRouter();
    const { currentUser } = useApp();
    const barterId = currentRoute.params?.id; 
    const [barter, setBarter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Tracking & Video
    const [trackingInput, setTrackingInput] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const currentUserId = currentUser ? currentUser.id : 'u1'; // Safety fallback

    useEffect(() => {
        loadBarter();
    }, [barterId]);

    const loadBarter = async () => {
        setLoading(true);
        try {
            const res = await api.barter.getBarterDetail(barterId);
            if (res.code === 200) {
                setBarter(res.data);
            } else {
                alert('加载失败');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---
    const handlePayDeposit = async () => {
        setActionLoading(true);
        try {
            await api.barter.payDeposit(barterId, currentUserId);
            alert('押金支付成功！');
            loadBarter();
        } catch (e) {
            alert('支付失败');
        } finally {
            setActionLoading(false);
        }
    };

    const handleSubmitTracking = async () => {
        if (!trackingInput) {
            alert('请输入运单号');
            return;
        }
        if (!videoFile) {
            alert('【安全强制】请上传封箱视频以保障您的权益');
            return;
        }
        
        setActionLoading(true);
        try {
            // Mock upload
            await api.barter.submitTracking(barterId, currentUserId, trackingInput, videoFile);
            alert('发货及存证视频提交成功！');
            setShowTrackingModal(false);
            setVideoFile(null);
            setTrackingInput('');
            loadBarter();
        } catch (e) {
            alert('提交失败');
        } finally {
            setActionLoading(false);
        }
    };

    const handleConfirmReceipt = async () => {
         if (!videoFile) {
            alert('【安全强制】请上传开箱视频以确认商品无误');
            return;
        }
        setActionLoading(true);
        try {
            await api.barter.confirmReceipt(barterId, currentUserId, videoFile);
            loadBarter();
            // Show modal based on completion status
            // We can't easily know if *just* completed from here without response data, 
            // but we can infer or just show a generic "Success" modal that adapts its text.
            setShowSuccessModal(true);
        } catch (e) {
            alert('操作失败');
        } finally {
            setActionLoading(false);
        }
    };

    const handleAcceptProposal = async () => {
        setActionLoading(true);
        try {
            await api.barter.acceptProposal(barterId);
            alert('已接受交换！请支付押金以继续。');
            loadBarter();
        } catch(e) {
            alert('操作失败: ' + e.message);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
    if (!barter) return <div className="min-h-screen flex items-center justify-center">订单不存在</div>;

    const isInitiator = currentUserId === barter.initiatorId;
    const myRole = isInitiator ? 'initiator' : 'target';

    const myProduct = isInitiator ? barter.initiatorProduct : barter.targetProduct;
    const partnerProduct = isInitiator ? barter.targetProduct : barter.initiatorProduct;
    
    const myDepositPaid = isInitiator ? barter.initiatorDepositPaid : barter.targetDepositPaid;
    
    const myTracking = isInitiator ? barter.initiatorTracking : barter.targetTracking;
    const partnerTracking = isInitiator ? barter.targetTracking : barter.initiatorTracking;

    const myReceiveVideo = isInitiator ? barter.initiatorReceiveVideo : barter.targetReceiveVideo;
    const partnerReceiveVideo = isInitiator ? barter.targetReceiveVideo : barter.initiatorReceiveVideo;

    const handleCopy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        alert('已复制到剪贴板');
    };

    // Platform Service Logic
    const isPlatformService = barter.serviceType === 'platform';

    // Status Steps Calculation
    let STATUS_STEPS = [];
    if (isPlatformService) {
         STATUS_STEPS = [
            { key: 'proposed', label: '提议' },
            { key: 'accepted', label: '待发货' }, // merged accepted/awaiting
            { key: 'in_platform', label: '验货中' },
            { key: 'platform_passed', label: '平台代发' },
            { key: 'completed', label: '完成' },
        ];
    } else {
        STATUS_STEPS = [
            { key: 'proposed', label: '提议' },
            { key: 'accepted', label: '已接受' },
            { key: 'awaiting_shipment', label: '待发货' },
            { key: 'shipped', label: '运输中' },
            { key: 'completed', label: '完成' },
        ];
    }
    
    // Helper to find step index
    const getStepIndex = (status) => {
        // Simple mapping for demo
        if (status === BARTER_STATUS.COMPLETED) return STATUS_STEPS.length - 1;
        if (isPlatformService) {
             if (status === BARTER_STATUS.IN_PLATFORM) return 2;
             if (status === BARTER_STATUS.PLATFORM_PASSED) return 3;
             if (status === BARTER_STATUS.SHIPPED) return 1; // Both shipped -> in platform soon
             if (status === BARTER_STATUS.AWAITING_SHIPMENT) return 1;
             if (status === BARTER_STATUS.ACCEPTED) return 1;
             return 0;
        } else {
             if (status === BARTER_STATUS.SHIPPED || status === BARTER_STATUS.INSPECTION) return 3;
             if (status === BARTER_STATUS.AWAITING_SHIPMENT) return 2;
             if (status === BARTER_STATUS.ACCEPTED) return 1;
             return 0;
        }
    };
    
    const activeStepIndex = getStepIndex(barter.status);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm px-4 h-14 flex items-center gap-3">
                <button onClick={pop} className="p-2 -ml-2">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex-1">
                    <h1 className="text-base font-bold text-gray-900">
                        {isPlatformService ? '平台验货订单' : '互保直寄订单'}
                    </h1>
                </div>
                {isPlatformService && (
                    <div className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1">
                        <ShieldCheck size={12} />
                        平台担保
                    </div>
                )}
            </div>

            {/* Status Stepper */}
            <div className="bg-white p-6 mb-3">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-3 h-0.5 bg-gray-100 -z-1" />
                    {STATUS_STEPS.map((step, index) => {
                        const isActive = index <= activeStepIndex;
                        const isCurrent = index === activeStepIndex;
                        return (
                            <div key={step.key} className="flex flex-col items-center relative z-10">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                                    isActive ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-200 text-gray-300'
                                }`}>
                                    {isActive ? <CheckCircle size={12} /> : index + 1}
                                </div>
                                <span className={`text-[10px] mt-2 ${isCurrent ? 'text-rose-500 font-bold' : 'text-gray-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 space-y-4">
                
                {/* 1. Smart Status Banner */}
                {/* Logic to show what we are waiting for */}
                {barter.status === BARTER_STATUS.ACCEPTED && myDepositPaid && !(isInitiator ? barter.targetDepositPaid : barter.initiatorDepositPaid) && (
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3">
                        <Loader2 className="w-5 h-5 text-blue-600 shrink-0 animate-spin mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-blue-800">等待对方支付押金</p>
                            <p className="text-xs text-blue-600 mt-1">您已支付，待对方支付后即可开始发货。</p>
                        </div>
                    </div>
                )}
                 {(barter.status === BARTER_STATUS.AWAITING_SHIPMENT || barter.status === BARTER_STATUS.SHIPPED) && myTracking && !partnerTracking && (
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3">
                        <Loader2 className="w-5 h-5 text-blue-600 shrink-0 animate-spin mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-blue-800">等待对方发货</p>
                            <p className="text-xs text-blue-600 mt-1">您已发货，请耐心等待对方发出包裹。</p>
                        </div>
                    </div>
                )}
                 {((!isPlatformService && barter.status === BARTER_STATUS.SHIPPED) || 
                          (isPlatformService && barter.status === BARTER_STATUS.PLATFORM_PASSED)) && partnerTracking && myReceiveVideo && !partnerReceiveVideo && (
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3">
                        <Loader2 className="w-5 h-5 text-blue-600 shrink-0 animate-spin mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-blue-800">等待对方确认收货</p>
                            <p className="text-xs text-blue-600 mt-1">系统将自动通知对方，双方确认后即可退还押金。</p>
                        </div>
                    </div>
                )}


                {/* 2. New Progress Dashboard Grid */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                       <h3 className="font-bold text-gray-900 text-sm">交易流程看板</h3>
                       <span className="text-[10px] text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                           {isPlatformService ? '平台验货模式' : '互保直寄模式'}
                       </span>
                   </div>
                   
                   <div className="p-4 grid grid-cols-3 gap-y-6 text-center relative">
                        {/* Table Header like labels */}
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left">阶段</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">我方状态</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">对方状态</div>

                        {/* ROW 1: Deposit */}
                        <div className="text-xs font-bold text-gray-700 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px]">1</div>
                             互保押金
                        </div>
                        <div className="flex justify-center">
                            {myDepositPaid ? 
                                <div className="flex flex-col items-center text-green-600 gap-1 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} fill="#dcfce7" />
                                    <span className="text-[10px] font-bold">已支付</span>
                                </div> : 
                                <div className="flex flex-col items-center text-gray-400 gap-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                    <span className="text-[10px]">待支付</span>
                                </div>
                            }
                        </div>
                        <div className="flex justify-center">
                             {(isInitiator ? barter.targetDepositPaid : barter.initiatorDepositPaid) ? 
                                <div className="flex flex-col items-center text-green-600 gap-1 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} fill="#dcfce7" />
                                    <span className="text-[10px] font-bold">已支付</span>
                                </div> : 
                                <div className="flex flex-col items-center text-gray-400 gap-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                    <span className="text-[10px]">待支付</span>
                                </div>
                            }
                        </div>

                        {/* Connecting Line 1 */}
                        <div className="col-span-3 h-[1px] bg-gray-50 mx-2"></div>

                        {/* ROW 2: Ship */}
                        <div className="text-xs font-bold text-gray-700 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px]">2</div>
                             发货状态
                        </div>
                         <div className="flex justify-center">
                            {myTracking ? 
                                <div className="flex flex-col items-center text-green-600 gap-1 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} fill="#dcfce7" />
                                    <span className="text-[10px] font-bold">已发货</span>
                                </div> : 
                                <div className="flex flex-col items-center text-gray-400 gap-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                    <span className="text-[10px]">待发货</span>
                                </div>
                            }
                        </div>
                        <div className="flex justify-center">
                             {partnerTracking ? 
                                <div className="flex flex-col items-center text-green-600 gap-1 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} fill="#dcfce7" />
                                    <span className="text-[10px] font-bold">已发货</span>
                                </div> : 
                                <div className="flex flex-col items-center text-gray-400 gap-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                    <span className="text-[10px]">待发货</span>
                                </div>
                            }
                        </div>

                         {/* Connecting Line 2 */}
                        <div className="col-span-3 h-[1px] bg-gray-50 mx-2"></div>

                        {/* ROW 3: Receive */}
                        <div className="text-xs font-bold text-gray-700 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px]">3</div>
                             收货确认
                        </div>
                         <div className="flex justify-center">
                            {myReceiveVideo ? 
                                <div className="flex flex-col items-center text-green-600 gap-1 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} fill="#dcfce7" />
                                    <span className="text-[10px] font-bold">确认无误</span>
                                </div> : 
                                <div className="flex flex-col items-center text-gray-400 gap-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                    <span className="text-[10px]">待收货</span>
                                </div>
                            }
                        </div>
                        <div className="flex justify-center">
                             {partnerReceiveVideo ? 
                                <div className="flex flex-col items-center text-green-600 gap-1 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} fill="#dcfce7" />
                                    <span className="text-[10px] font-bold">确认无误</span>
                                </div> : 
                                <div className="flex flex-col items-center text-gray-400 gap-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                    <span className="text-[10px]">待收货</span>
                                </div>
                            }
                        </div>
                   </div>
                </div>
                
                {/* Platform Inspection Card (V2.0) */}
                {isPlatformService && barter.status === BARTER_STATUS.IN_PLATFORM && (
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl animate-pulse">
                        <div className="flex items-center gap-2 mb-2">
                            <Eye className="text-blue-600" size={18} />
                            <h3 className="font-bold text-blue-800">平台正在验货中</h3>
                        </div>
                        <p className="text-xs text-blue-600">
                            平台鉴定师正在对双方物品进行真伪和成色查验，预计24小时内出具报告。
                        </p>
                    </div>
                )}

                {/* Evidence & Address Info */}
                 {barter.status === BARTER_STATUS.AWAITING_SHIPMENT && (
                    <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
                        <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                            <MapPin size={16} />
                            {isPlatformService ? '请发货至平台仓库' : '请发货给对方'}
                        </h4>
                         {isPlatformService ? (
                            <div className="text-xs text-rose-700 space-y-1 bg-white/50 p-2 rounded">
                                <p><span className="font-bold">收件人：</span>谷子平台鉴定中心</p>
                                <p><span className="font-bold">电话：</span>400-888-8888</p>
                                <p><span className="font-bold">地址：</span>浙江省杭州市余杭区...鉴定仓</p>
                            </div>
                        ) : (
                             <div className="text-xs text-rose-700 space-y-1 bg-white/50 p-2 rounded">
                                <p><span className="font-bold">收件人：</span>{barter.targetUserId === currentUserId ? '我' : '对方'}</p>
                                {/* Mock Address */}
                                <p><span className="font-bold">地址：</span>上海市浦东新区...</p>
                            </div>
                        )}
                        <p className="text-[10px] text-rose-500 mt-2 flex items-center gap-1">
                            <Video size={10} />
                            {isPlatformService ? '发货前请务必录制封箱视频，作为平台复核凭证' : '强制要求：必须上传封箱视频'}
                        </p>
                    </div>
                )}


                {/* Products Comparison */}
                <div className="flex gap-2">
                    {/* My Item */}
                    <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-br-lg font-bold">我方</div>
                        <div className="w-full aspect-square bg-gray-100 rounded-lg mt-6 mb-2 overflow-hidden">
                             {myProduct.image?.startsWith('http') ? (
                                <img src={myProduct.image} className="w-full h-full object-cover" />
                            ) : (<div className={`w-full h-full ${myProduct.image}`} />)}
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{myProduct.title}</h4>
                        {barter.initiatorShipVideo && (
                            <div className="mt-2 text-[10px] text-blue-500 flex items-center gap-1">
                                <PlayCircle size={10} /> 封箱视频已传
                            </div>
                        )}
                    </div>

                    {/* Exchange Icon */}
                    <div className="flex flex-col justify-center items-center text-gray-300">
                        <div className="h-full w-[1px] bg-gray-200 absolute top-0 bottom-0 left-1/2 -translate-x-1/2 -z-10"></div>
                        <div className="bg-white p-1 rounded-full border border-gray-100 shadow-sm z-0">
                            <Package className="w-4 h-4 text-rose-500" />
                        </div>
                    </div>

                    {/* Partner Item */}
                    <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 bg-rose-50 text-rose-500 text-[10px] px-2 py-1 rounded-bl-lg font-bold">对方</div>
                         <div className="w-full aspect-square bg-gray-100 rounded-lg mt-6 mb-2 overflow-hidden">
                             {partnerProduct.image?.startsWith('http') ? (
                                <img src={partnerProduct.image} className="w-full h-full object-cover" />
                            ) : (<div className={`w-full h-full ${partnerProduct.image}`} />)}
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{partnerProduct.title}</h4>
                         {barter.targetShipVideo && (
                            <div className="mt-2 text-[10px] text-blue-500 flex items-center gap-1">
                                <PlayCircle size={10} /> 封箱视频已传
                            </div>
                        )}
                    </div>
                </div>

                {/* Logistics Info List */}
                {(myTracking || partnerTracking) && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                            <Truck className="w-4 h-4 text-gray-500" />
                            <span className="text-xs font-bold text-gray-600">
                                {isPlatformService ? '平台物流进度' : '双方物流进度'}
                            </span>
                        </div>
                         <div className="p-4 space-y-4">
                            {/* My Shipment */}
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-700">我发出的包裹</p>
                                    {myTracking ? (
                                        <button onClick={() => handleCopy(myTracking)} className="mt-1 flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded border border-gray-100 w-fit transition-colors group">
                                            <span className="text-xs text-gray-600 font-mono group-hover:text-gray-900">{myTracking}</span>
                                            <Copy size={10} className="text-gray-400 group-hover:text-gray-600" />
                                        </button>
                                    ) : <p className="text-xs text-gray-400 mt-1">暂未发货</p>}
                                </div>
                            </div>
                            {/* Partner Shipment */}
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-rose-300 mt-1.5" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-700">对方发出的包裹</p>
                                    {partnerTracking ? (
                                        <button onClick={() => handleCopy(partnerTracking)} className="mt-1 flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded border border-gray-100 w-fit transition-colors group">
                                            <span className="text-xs text-gray-600 font-mono group-hover:text-gray-900">{partnerTracking}</span>
                                            <Copy size={10} className="text-gray-400 group-hover:text-gray-600" />
                                        </button>
                                    ) : <p className="text-xs text-gray-400 mt-1">暂未发货</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 safe-area-bottom z-20">
                {barter.status === BARTER_STATUS.COMPLETED ? (
                     <div className="w-full py-4 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center gap-2 text-green-700 font-bold">
                        <CheckCircle className="fill-green-600 text-white" size={24} />
                        交易圆满完成
                    </div>
                ) : (
                    <>
                        {barter.status === BARTER_STATUS.PROPOSED && !isInitiator && (
                             <button 
                                onClick={handleAcceptProposal}
                                disabled={actionLoading}
                                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all"
                            >
                                {actionLoading ? '处理中...' : '接受交换提议'}
                            </button>
                        )}
                        {barter.status === BARTER_STATUS.PROPOSED && isInitiator && (
                             <div className="w-full py-3 rounded-xl font-bold text-gray-400 bg-gray-100 text-center">
                                等待对方接受...
                            </div>
                        )}
                        {barter.status === BARTER_STATUS.ACCEPTED && !myDepositPaid && (
                             <button 
                                onClick={handlePayDeposit}
                                disabled={actionLoading}
                                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-500/20 active:scale-[0.98] transition-all"
                            >
                                {actionLoading ? '处理中...' : `支付互保押金 ¥${barter.depositAmount}`}
                            </button>
                        )}
                        
                        {(barter.status === BARTER_STATUS.AWAITING_SHIPMENT || barter.status === BARTER_STATUS.SHIPPED) && myTracking === '' && (
                             <button 
                                onClick={() => setShowTrackingModal(true)}
                                className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
                            >
                                {isPlatformService ? '发货给平台 (需录视频)' : '发货并上传凭证'}
                            </button>
                        )}
        
                        {/* V2.0 Platform Logic: Only show Confirm Receipt when Platform Passed & Shipped to User */}
                        {/* Simplified for mock: If shipped (direct) OR platform_passed (platform) */}
                        {((!isPlatformService && barter.status === BARTER_STATUS.SHIPPED) || 
                          (isPlatformService && barter.status === BARTER_STATUS.PLATFORM_PASSED)) && partnerTracking && (
                             <>
                                {!myReceiveVideo ? (
                                    <button 
                                        onClick={() => setShowReceiveModal(true)}
                                        className="w-full py-3 rounded-xl font-bold text-white bg-green-600 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all"
                                    >
                                        确认收货 (需录视频)
                                    </button>
                                ) : (
                                    <div className="w-full py-3 rounded-xl font-bold text-gray-500 bg-gray-100 text-center flex items-center justify-center gap-2">
                                        <CheckCircle size={16} />
                                        您已确认，等待对方确认收货...
                                    </div>
                                )}
                             </>
                        )}
                    </>
                )}
            </div>
            
             {/* Shipping Modal with Video Upload */}
             {showTrackingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {isPlatformService ? '发货至平台' : '发货给对方'}
                        </h3>
                        <input 
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 mb-4"
                            placeholder="请输入快递单号"
                        />
                        {/* Fake Video Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                上传封箱视频 <span className="text-rose-500">*</span>
                            </label>
                            <div 
                                onClick={() => setVideoFile('mock_file')}
                                className={`w-full h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                                    videoFile ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-300 bg-gray-50 text-gray-400 hover:bg-gray-100'
                                }`}
                            >
                                <Video className="mb-1" />
                                <span className="text-xs">{videoFile ? '视频已选择 (mocked)' : '点击上传 (模拟)'}</span>
                            </div>
                        </div>

                         <div className="flex gap-3">
                            <button
                                onClick={() => setShowTrackingModal(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100"
                            >取消</button>
                            <button
                                onClick={handleSubmitTracking}
                                disabled={!trackingInput || !videoFile || actionLoading}
                                className="flex-[2] py-3 rounded-xl font-bold text-white bg-blue-600 disabled:opacity-50"
                            >提交发货</button>
                        </div>
                    </div>
                </div>
             )}

            {/* Receiving Modal with Video Upload */}
             {showReceiveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                         <h3 className="text-lg font-bold text-gray-900 mb-4">确认收货</h3>
                         <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                上传开箱视频 <span className="text-rose-500">*</span>
                            </label>
                            <p className="text-xs text-gray-400 mb-2">请确保视频完整展示开箱过程及物品状况</p>
                            <div 
                                onClick={() => setVideoFile('mock_file')}
                                className={`w-full h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                                    videoFile ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-300 bg-gray-50 text-gray-400 hover:bg-gray-100'
                                }`}
                            >
                                <Video className="mb-1" />
                                <span className="text-xs">{videoFile ? '视频已选择 (mocked)' : '点击上传 (模拟)'}</span>
                            </div>
                        </div>
                         <div className="flex gap-3">
                            <button onClick={() => setShowReceiveModal(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100">取消</button>
                            <button onClick={handleConfirmReceipt} disabled={!videoFile || actionLoading} className="flex-[2] py-3 rounded-xl font-bold text-white bg-green-600 disabled:opacity-50">确认无误收货</button>
                        </div>
                    </div>
                </div>
             )}

             {/* Success Modal */}
             {showSuccessModal && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-2xl text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${barter.status === BARTER_STATUS.COMPLETED ? 'bg-green-100' : 'bg-blue-100'}`}>
                            {barter.status === BARTER_STATUS.COMPLETED ? 
                                <CheckCircle className="w-8 h-8 text-green-600" /> :
                                <Loader2 className="w-8 h-8 text-blue-600" />
                            }
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {barter.status === BARTER_STATUS.COMPLETED ? '交易圆满完成' : '已确认收货'}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            {barter.status === BARTER_STATUS.COMPLETED ? 
                                '双方均已确认收货，互保押金将在24小时内原路退回至您的账户。' : 
                                '您已确认无误收货。请耐心等待对方确认收货，待双方均确认后，系统将自动退还押金。'
                            }
                        </p>
                        <button 
                            onClick={() => setShowSuccessModal(false)}
                            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg active:scale-[0.98] transition-all ${
                                barter.status === BARTER_STATUS.COMPLETED ? 
                                'bg-green-600 shadow-green-500/20' : 
                                'bg-blue-600 shadow-blue-500/20'
                            }`}
                        >
                            我知道了
                        </button>
                    </div>
                 </div>
             )}
        </div>
    );
}
