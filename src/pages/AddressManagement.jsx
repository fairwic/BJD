import React, { useState } from 'react';
import { useRouter } from '../router/RouteStack';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';

const AddressManagement = () => {
    const { pop } = useRouter();
    const { currentUser } = useApp();

    // Mock Addresses
    const [addresses, setAddresses] = useState([
        { id: 1, name: currentUser.name, phone: currentUser.phone || '13800138000', address: currentUser.address || '北京市朝阳区建国路88号', isDefault: true },
        { id: 2, name: '李四', phone: '13900139000', address: '上海市浦东新区陆家嘴环路1号', isDefault: false },
    ]);

    const handleDelete = (id) => {
        if (confirm('确定要删除这个地址吗？')) {
            setAddresses(prev => prev.filter(a => a.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={pop}><ChevronLeft size={24} /></button>
                    <h1 className="font-bold text-lg">收货地址</h1>
                </div>
                <button className="text-rose-500 text-sm font-bold flex items-center gap-1">
                    <Plus size={18} /> 新增
                </button>
            </div>

            <div className="p-4 space-y-3">
                {addresses.map(addr => (
                    <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900 text-lg">{addr.name}</span>
                                    <span className="text-gray-500 text-sm">{addr.phone}</span>
                                    {addr.isDefault && (
                                        <span className="bg-rose-50 text-rose-500 text-[10px] px-1.5 py-0.5 rounded">默认</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 mt-1 leading-relaxed">{addr.address}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-3 pt-3 border-t border-gray-50 text-gray-400 text-sm">
                            <button className="flex items-center gap-1 hover:text-gray-600">
                                <Edit2 size={14} /> 编辑
                            </button>
                            <button onClick={() => handleDelete(addr.id)} className="flex items-center gap-1 hover:text-red-500">
                                <Trash2 size={14} /> 删除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressManagement;
